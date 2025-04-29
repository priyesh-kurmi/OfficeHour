import { prisma } from "@/lib/prisma";
// Add this import at the top of the file
import { getTaskAssignmentTemplate, getTaskReassignedTemplate } from "../../emails/templates/task-templates";
// Remove or comment this import since it's causing errors
// import { sendWhatsAppMessage } from './email';
import { sendWhatsAppNotification } from "./whatsapp";
import { sendActivityNotificationEmail } from "./email";


interface NotificationOptions {
  title: string;
  content: string;
  sentById: string;
  sentToId: string;
  taskId?: string; // Added taskId property
  sendEmail?: boolean;
  emailSubject?: string;
  emailHtml?: string; // Added emailHtml property
  sendWhatsApp?: boolean;
}

// Add this helper function
async function cleanupOldNotifications(userId: string, maxNotifications: number = 20) {
  try {
    // Get all notifications for the user, ordered by creation date
    const allUserNotifications = await prisma.notification.findMany({
      where: { sentToId: userId },
      orderBy: { createdAt: "desc" },
      select: { id: true },
    });

    // If we have more than the max, delete the oldest ones
    if (allUserNotifications.length > maxNotifications) {
      // Get IDs of notifications to delete (everything beyond the max)
      const notificationsToDelete = allUserNotifications
        .slice(maxNotifications)
        .map(n => n.id);

      // Delete the old notifications
      if (notificationsToDelete.length > 0) {
        await prisma.notification.deleteMany({
          where: {
            id: { in: notificationsToDelete }
          }
        });
        
        console.log(`Cleaned up ${notificationsToDelete.length} old notifications for user ${userId}`);
      }
    }
  } catch (error) {
    console.error("Error cleaning up old notifications:", error);
  }
}

export async function createNotification({
  title,
  content,
  sentById,
  sentToId,
  taskId,
  sendEmail = false,
  emailSubject,
  sendWhatsApp = false,
}: NotificationOptions) {
  try {
    
    const notification = await prisma.notification.create({
      data: {
        title,
        content,
        sentById,
        sentToId,
        taskId,
      },
      include: {
        sentTo: true,
      },
    });

    // Clean up old notifications to keep only the most recent 20
    await cleanupOldNotifications(sentToId, 20);

    // Send email if requested
    if (sendEmail && notification.sentTo.email) {
      try {
        await sendActivityNotificationEmail(
          notification.sentTo.email,
          notification.sentTo.name || "User",
          emailSubject || title,
          content
        );
        console.log("Email sent successfully");
      } catch (error) {
        console.error("Failed to send email:", error);
      }
    }

    if (sendWhatsApp && notification.sentTo.phone) {
      try {
        // Fetch the assigner's name
        const assigner = await prisma.user.findUnique({
          where: { id: sentById },
        });
    
        if (!assigner) {
          throw new Error("Assigner not found");
        }
    
        // Handle task details
        let taskDetails = {
          title: "No title provided",
          note: "No additional note provided",
          dueDate: "No due date",
        };
    
        if (taskId) {
          const task = await prisma.task.findUnique({
            where: { id: taskId },
          });
    
          if (task) {
            taskDetails = {
              title: task.title || "No title provided",
              note: task.description || "No additional note provided",
              dueDate: task.dueDate
                ? new Date(task.dueDate).toLocaleDateString()
                : "No due date",
            };
          }
        }
    
        // Define variables as an ordered array for numbered placeholders
        const variables = [
          taskDetails.title, // {{1}}
          assigner.name || "Unknown", // {{2}}
          taskDetails.note, // {{3}}
          taskDetails.dueDate, // {{4}}
        ];
    
        // Call the WhatsApp notification function
        await sendWhatsAppNotification(notification.sentTo.phone, "new_task", variables);
        console.log("WhatsApp notification sent successfully");
      } catch (error) {
        console.error("Failed to send WhatsApp notification:", error instanceof Error ? error.message : error);
      }
    }


    return notification;
  } catch (error) {
    console.error("Failed to create notification:", error);
    throw error;
  }
}

// Rest of your notification functions remain unchanged
export async function sendTaskAssignedNotification(
  taskId: string,
  taskTitle: string,
  assignerUserId: string,
  assigneeUserId: string,
  note?: string,
  dueDate?: Date,
) {
  try {
    // Get user details
    const [assigner, assignee] = await Promise.all([
      prisma.user.findUnique({ where: { id: assignerUserId } }),
      prisma.user.findUnique({ where: { id: assigneeUserId } })
    ]);

    if (!assigner || !assignee) {
      throw new Error("User not found");
    }

    // Create notification
    const notificationContent = `${assigner.name} assigned you a task: ${taskTitle}${
      note ? ` - Note: ${note}` : ""
    } [taskId: ${taskId}]`;

    const emailHtml = getTaskAssignmentTemplate(
      taskTitle,
      assigner.name,
      note,
      dueDate
    );

    await createNotification({
      title: "New Task Assigned",
      content: notificationContent,
      sentById: assignerUserId,
      sentToId: assigneeUserId,
      taskId,
      sendEmail: true,
      emailSubject: `Task Assigned:${taskTitle}`,
      emailHtml,
      sendWhatsApp: !!assignee.phone,
    });

    // Log activity
    await prisma.activity.create({
      data: {
        type: "task",
        action: "assigned",
        target: taskTitle,
        details: { taskId },
        userId: assignerUserId,
      },
    });
  } catch (error) {
    console.error("Failed to send task assignment notification:", error);
  }
}

export async function sendTaskReassignedNotification(
  taskId: string,
  taskTitle: string,
  reassignerUserId: string,
  previousAssigneeId: string | null,
  newAssigneeId: string
) {
  try {
    // Get user details
    const [reassigner, newAssignee] = await Promise.all([
      prisma.user.findUnique({ where: { id: reassignerUserId } }),
      prisma.user.findUnique({ where: { id: newAssigneeId } })
    ]);

    if (!reassigner || !newAssignee) {
      throw new Error("User not found");
    }

    await createNotification({
      title: "New Task Assigned",
      content: `${reassigner.name} reassigned the task "${taskTitle}" to you. [taskId:${taskId}]`,
      taskId,
      sentById: reassignerUserId,
      sentToId: newAssigneeId,
      sendEmail: true,
      emailSubject: `Task Assigned: ${taskTitle}`,
      emailHtml: getTaskAssignmentTemplate(taskTitle, reassigner.name),
      sendWhatsApp: !!newAssignee.phone,
    });

    // If there was a previous assignee, notify them as well
    if (previousAssigneeId && previousAssigneeId !== newAssigneeId) {
      const previousAssignee = await prisma.user.findUnique({
        where: { id: previousAssigneeId }
      });

      if (previousAssignee) {
        await createNotification({
          title: "Task Reassigned",
          content: `Your task "${taskTitle}" has been reassigned to ${newAssignee.name}.`,
          sentById: reassignerUserId,
          sentToId: previousAssigneeId,
          sendEmail: true,
          emailSubject: `Task Reassigned: ${taskTitle}`,
          emailHtml: getTaskReassignedTemplate(taskTitle, newAssignee.name),
          sendWhatsApp: !!previousAssignee.phone,
        });
      }
    }

    // Log activity
    await prisma.activity.create({
      data: {
        type: "task",
        action: "reassigned",
        target: taskTitle,
        details: {
          taskId,
          previousAssigneeId,
          newAssigneeId,
        },
        userId: reassignerUserId,
      },
    });
  } catch (error) {
    console.error("Failed to send task reassignment notification:", error);
  }
}

export async function sendTaskStatusUpdateNotification(
  taskId: string,
  taskTitle: string,
  updaterUserId: string,
  creatorUserId: string,
  oldStatus: string,
  newStatus: string
) {
  try {
    // Skip notification if updater is also the creator
    if (updaterUserId === creatorUserId) {
      return;
    }

    // Get user details
    const [updater, creator] = await Promise.all([
      prisma.user.findUnique({ where: { id: updaterUserId } }),
      prisma.user.findUnique({ where: { id: creatorUserId } }),
    ]);

    if (!updater || !creator) {
      throw new Error("User not found");
    }

    // Create notification
    const notificationTitle = "Task Status Updated";
    const notificationContent = `${updater.name} changed task "${taskTitle}" status from ${oldStatus} to ${newStatus} [taskId: ${taskId}]`;

    // Email HTML
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2>Task Status Updated</h2>
        <p><strong>Task:</strong> ${taskTitle}</p>
        <p><strong>Status change:</strong> ${oldStatus} → ${newStatus}</p>
        <p><strong>Updated by:</strong> ${updater.name}</p>
        <p>Log in to the system to view task details.</p>
        <p>Thank you,<br>Office Management Team</p>
      </div>
    `;

    await createNotification({
      title: notificationTitle,
      content: notificationContent,
      sentById: updaterUserId,
      sentToId: creatorUserId,
      taskId,
      sendEmail: true,
      emailSubject: `Task Status Update: ${taskTitle}`,
      emailHtml,
      sendWhatsApp: !!creator.phone,
    });

    // Log activity
    await prisma.activity.create({
      data: {
        type: "task",
        action: "status_changed",
        target: taskTitle,
        details: {
          taskId,
          oldStatus,
          newStatus,
        },
        userId: updaterUserId,
      },
    });
  } catch (error) {
    console.error("Failed to send task status update notification:", error);
  }
}



// Add this function after the other notification functions only for admins

export async function sendTaskCreatedNotificationToAdmins(
  taskId: string,
  taskTitle: string,
  creatorUserId: string
) {
  try {
    // Get creator details
    const creator = await prisma.user.findUnique({ 
      where: { id: creatorUserId } 
    });

    if (!creator) {
      throw new Error("Creator user not found");
    }

    // Find all admin users except the creator
    const adminUsers = await prisma.user.findMany({
      where: {
        role: "ADMIN",
        NOT: {
          id: creatorUserId
        }
      }
    });

    // Create a notification for each admin user
    for (const admin of adminUsers) {
      await createNotification({
        title: "New Task Created",
        content: `${creator.name} created a new task: ${taskTitle} [taskId: ${taskId}]`,
        sentById: creatorUserId,
        sentToId: admin.id,
        taskId,
        sendEmail: true,
        emailSubject: `New Task Created: ${taskTitle}`,
        emailHtml: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2>New Task Created</h2>
            <p><strong>Task:</strong> ${taskTitle}</p>
            <p><strong>Created by:</strong> ${creator.name}</p>
            <p>Log in to the system to view task details.</p>
            <p>Thank you,<br>Office Management Team</p>
          </div>
        `,
        sendWhatsApp: !!admin.phone,
      });
    }
  } catch (error) {
    console.error("Failed to send task creation notification to admins:", error);
  }
}

// Add this new function after your other notification functions only for admins

export async function sendTaskCommentNotificationToAdmins(
  taskId: string,
  taskTitle: string,
  commenterId: string,
  taskCreatorId: string,
  comment: { content: string }
) {
  try {
    // Get commenter details
    const commenter = await prisma.user.findUnique({
      where: { id: commenterId }
    });

    if (!commenter) {
      throw new Error("Commenter user not found");
    }

    // Find all admin users except the task creator (if they're an admin)
    const adminUsers = await prisma.user.findMany({
      where: {
        role: "ADMIN",
        NOT: {
          // Exclude both the commenter and the task creator
          OR: [
            { id: taskCreatorId },
            { id: commenterId }
          ]
        }
      }
    });

    // Create a notification for each admin user
    for (const admin of adminUsers) {
      await createNotification({
        title: "New Comment on Task",
        content: `${commenter.name} commented on task: ${taskTitle} - "${comment.content}"  [taskId: ${taskId}]`,
        sentById: commenterId,
        sentToId: admin.id,
        taskId,
        sendEmail: true,
        emailSubject: `New Comment on Task: ${taskTitle}`,
        emailHtml: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2>New Comment on Task</h2>
            <p><strong>Task:</strong> ${taskTitle}</p>
            <p><strong>Comment by:</strong> ${commenter.name}</p>
            <p><strong>Comment:</strong> ${comment.content}</p>
            <p>Log in to the system to view the comment and task details.</p>
            <p>Thank you,<br>Office Management Team</p>
          </div>
        `,
        sendWhatsApp: !!admin.phone,
      });
    }
  } catch (error) {
    console.error("Failed to send comment notification to admins:", error);
  }
}

// Add this function after your other notification functions for adming

export async function sendTaskUpdatedNotificationToAdmins(
  taskId: string,
  taskTitle: string,
  updaterUserId: string
) {
  try {
    // Get updater details
    const updater = await prisma.user.findUnique({ 
      where: { id: updaterUserId } 
    });

    if (!updater) {
      throw new Error("Updater user not found");
    }

    // Find all admin users except the updater
    const adminUsers = await prisma.user.findMany({
      where: {
        role: "ADMIN",
        NOT: {
          id: updaterUserId
        }
      }
    });

    // Create a notification for each admin user
    for (const admin of adminUsers) {
      await createNotification({
        title: "Task Updated",
        content: `${updater.name} updated task: ${taskTitle} [taskId: ${taskId}]`,
        sentById: updaterUserId,
        sentToId: admin.id,
        taskId,
        sendEmail: true,
        emailSubject: `Task Updated: ${taskTitle}`,
        emailHtml: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2>Task Updated</h2>
            <p><strong>Task:</strong> ${taskTitle}</p>
            <p><strong>Updated by:</strong> ${updater.name}</p>
            <p>Log in to the system to view the updated task details.</p>
            <p>Thank you,<br>Office Management Team</p>
          </div>
        `,
        sendWhatsApp: !!admin.phone,
      });
    }
  } catch (error) {
    console.error("Failed to send task update notification to admins:", error);
  }
}


// Add this function at the end of the file

export async function sendBillingApprovedNotificationToAdmins(
  taskId: string,
  taskTitle: string,
  clientId: string | null,
  clientName: string | null,
  approverUserId: string
) {
  try {
    // Get approver details
    const approver = await prisma.user.findUnique({ 
      where: { id: approverUserId } 
    });

    if (!approver) {
      throw new Error("Approver user not found");
    }

    // Find all admin users except the approver
    const adminUsers = await prisma.user.findMany({
      where: {
        role: "ADMIN",
        NOT: {
          id: approverUserId
        }
      }
    });

    // Create a notification for each admin user
    for (const admin of adminUsers) {
      await createNotification({
        title: "Billing Approved",
        content: `${approver.name} approved billing for task: ${taskTitle}${clientId ? ` [clientId: ${clientId}]` : ''}`,
        sentById: approverUserId,
        sentToId: admin.id,
        taskId,
        sendEmail: true,
        emailSubject: `Billing Approved: ${taskTitle}`,
        emailHtml: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2>Billing Approved</h2>
            <p><strong>Task:</strong> ${taskTitle}</p>
            <p><strong>Client:</strong> ${clientName || 'No client attached'}</p>
            <p><strong>Approved by:</strong> ${approver.name}</p>
            <p>The task has been completed, billed, and removed from the system.</p>
            <p>Thank you,<br>Office Management Team</p>
          </div>
        `,
        sendWhatsApp: !!admin.phone,
      });
    }
  } catch (error) {
    console.error("Failed to send billing approval notification to admins:", error);
  }
}