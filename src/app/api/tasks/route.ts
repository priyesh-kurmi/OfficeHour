import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { sendTaskAssignedNotification } from "@/lib/notifications";
import { syncTaskAssignments } from "@/lib/task-assignment";
import { sendTaskCreatedNotificationToAdmins } from "@/lib/notifications";

// Schema for task creation
const taskCreateSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().optional(),
  priority: z.enum(["low", "medium", "high"]),
  status: z.enum(["pending", "in_progress", "review", "completed", "cancelled"]),
  dueDate: z.string().optional().nullable(),
  assignedToIds: z.array(z.string()).optional().default([]),
  assignedToId: z.string().optional().nullable(), // Legacy field
  clientId: z.string().optional().nullable(),
});

// GET all tasks with optional filtering
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email as string },
    });

    if (!currentUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const billingStatus = searchParams.get("billingStatus");
    const searchTerm = searchParams.get("search");
    const assignedToMe = searchParams.get("assignedToMe") === "true";
    
    // Get pagination parameters
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("limit") || "20");
    const sortField = searchParams.get("sortField") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") || "desc";
    
    // Build the where clause based on the user's role
    const where: Record<string, unknown> = {};

    // Apply status filter if provided
    if (status && status !== "all") {
      where.status = status;
    }
    
    // Apply billing status filter if provided
    if (billingStatus) {
      where.billingStatus = billingStatus;
    }

    // Apply "assigned to me" filter if requested
    if (assignedToMe) {
      where.assignees = {
        some: {
          userId: currentUser.id
        }
      };
    } 
    // Otherwise apply regular role-based filtering
    else {
      // Apply role-based filtering and log it
      if (currentUser.role === "ADMIN") {
        // Admin can see all tasks, no additional filtering needed
      } else if (currentUser.role === "PARTNER") {
        where.OR = [
          { assignedById: currentUser.id },
          { assignees: { some: { userId: currentUser.id } } }
        ];
      } else if (currentUser.role === "BUSINESS_EXECUTIVE" || currentUser.role === "BUSINESS_CONSULTANT") {
        where.assignees = {
          some: {
            userId: currentUser.id
          }
        };
      } else {
        where.OR = [
          { assignees: { some: { userId: currentUser.id } } }
        ];
      }
    }

    // Add search filter if provided
    if (searchTerm) {
      where.OR = [
        ...(Array.isArray(where.OR) ? where.OR : []),
        { title: { contains: searchTerm, mode: 'insensitive' } },
        { description: { contains: searchTerm, mode: 'insensitive' } }
      ];
    }

    // Check the database directly for completed tasks with pending_billing status
    const directCheckCount = await prisma.task.count({
      where: {
        status: "completed",
        billingStatus: "pending_billing"
      }
    });
    
    // Use directCheckCount or remove it:
    console.log(`Found ${directCheckCount} tasks with pending billing status`);
    
    // Create orderBy object for prisma
    const orderBy = {
      [sortField]: sortOrder
    };

    // Count total matching tasks for pagination
    const totalCount = await prisma.task.count({ where });
    
    // Execute the actual query with pagination
    const tasks = await prisma.task.findMany({
      where,
      include: {
        assignedBy: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        assignees: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                role: true,
                avatar: true,
              },
            },
          },
        },
        client: {
          select: {
            id: true,
            contactPerson: true,
            companyName: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    // Return both tasks and pagination metadata
    return NextResponse.json({
      tasks,
      pagination: {
        total: totalCount,
        page,
        pageSize,
        pageCount: Math.ceil(totalCount / pageSize)
      }
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get authenticated user
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Only admin and partner can create tasks
    if (session.user.role !== "ADMIN" && session.user.role !== "PARTNER") {
      return NextResponse.json({ error: "Only administrators and partners can create tasks" }, { status: 403 });
    }

    // Get current user for assignedBy
    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email as string },
    });

    if (!currentUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Parse request body
    const body = await request.json();
    
    // Validate request data
    const validatedData = taskCreateSchema.parse(body);

    // Start a transaction to create task and assignees
    const result = await prisma.$transaction(async (tx) => {
      // Create the task first without any assignee references
      const task = await tx.task.create({
        data: {
          title: validatedData.title,
          description: validatedData.description,
          priority: validatedData.priority,
          status: validatedData.status,
          dueDate: validatedData.dueDate ? new Date(validatedData.dueDate) : null,
          assignedById: currentUser.id,
          clientId: validatedData.clientId,
        },
      });
      
      // Determine final list of assignees
      const assigneeIds = validatedData.assignedToIds?.length 
        ? validatedData.assignedToIds 
        : (validatedData.assignedToId ? [validatedData.assignedToId] : []);
      
      // Use the helper function to handle assignments
      return syncTaskAssignments(tx, task.id, assigneeIds);
    });

    // Create activity log
    if (result) {
      await prisma.activity.create({
        data: {
          type: "task",
          action: "created",
          target: validatedData.title,
          details: { taskId: result.id },
          userId: currentUser.id,
        },
      });
    } else {
      console.error("Failed to create task: result is null");
      return NextResponse.json(
        { error: "Failed to create task" },
        { status: 500 }
      );
    }

    await sendTaskCreatedNotificationToAdmins(
      result.id,
      validatedData.title,
      currentUser.id
    );

    // Send notifications to all assignees
    if (validatedData.assignedToIds && validatedData.assignedToIds.length > 0) {
      for (const assigneeId of validatedData.assignedToIds) {
        if (assigneeId !== currentUser.id) {
          await sendTaskAssignedNotification(
            result.id,
            validatedData.title,
            currentUser.id,
            assigneeId,
            undefined,
            validatedData.dueDate ? new Date(validatedData.dueDate) : undefined
          );
        }
      }
    } 
    // Handle legacy single assignment notification
    else if (validatedData.assignedToId && validatedData.assignedToId !== currentUser.id) {
      await sendTaskAssignedNotification(
        result.id,
        validatedData.title,
        currentUser.id,
        validatedData.assignedToId,
        undefined,
        validatedData.dueDate ? new Date(validatedData.dueDate) : undefined
      );
    }

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Error creating task:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 }
    );
  }
}