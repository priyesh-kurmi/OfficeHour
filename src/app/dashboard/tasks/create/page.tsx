"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import "react-day-picker/style.css";
import "@/styles/day-picker.css"; // Import after the default styles
import { TaskPageLayout } from "@/components/layouts/task-page-layout";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { SearchableMultiSelect } from "@/components/tasks/searchable-multi-select";
import { SearchableSelect } from "@/components/tasks/searchable-select";
import { Skeleton } from "@/components/ui/skeleton";
import { DayPicker } from "react-day-picker";
import { getSession } from "next-auth/react";

// Update the task form schema
const taskFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().optional(),
  priority: z.enum(["low", "medium", "high"]),
  status: z.enum(["pending", "in_progress", "review", "completed", "cancelled"]),
  dueDate: z.date().optional().nullable(),
  // Only use assignedToIds array
  assignedToIds: z.array(z.string()).optional().default([]),
  clientId: z.string().optional().nullable(),
});

type TaskFormValues = z.infer<typeof taskFormSchema>;

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

interface Client {
  id: string;
  contactPerson: string;
  companyName?: string;
}

// Single component approach without Suspense
export default function CreateTaskPage() {
  const router = useRouter();
  const [clientIdParam, setClientIdParam] = useState<string | null>(null);
  
  const [users, setUsers] = useState<User[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);
  
  // Get URL parameters using window.location on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const url = new URL(window.location.href);
        const clientId = url.searchParams.get('clientId');
        setClientIdParam(clientId);
      } catch (error) {
        console.error("Error parsing URL parameters:", error);
      }
    }
  }, []);
  
  // Initialize form with updated defaults
  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "medium",
      status: "pending",
      dueDate: null,
      assignedToIds: [], // Properly initialized as array
      clientId: null,
    },
  });

  // Update form when clientIdParam changes
  useEffect(() => {
    if (clientIdParam) {
      form.setValue('clientId', clientIdParam);
    }
  }, [clientIdParam, form]);

  // Load users and clients on component mount
  useEffect(() => {
    const fetchData = async () => {
      setIsDataLoading(true);
      try {
        // Get the current user session
        const session = await getSession();
        const currentUserRole = session?.user?.role;
        
        // Fetch users with role-based filtering
        const usersResponse = await axios.get('/api/users');
        
        // MODIFY THIS FILTERING LOGIC
        if (currentUserRole === 'ADMIN') {
          // Admins can assign to anyone (including other admins)
          setUsers(usersResponse.data.users.filter((user) => 
            ['ADMIN', 'PARTNER', 'BUSINESS_EXECUTIVE', 'BUSINESS_CONSULTANT'].includes(user.role)
          ));
        } else if (currentUserRole === 'PARTNER') {
          // Partners can assign to other partners and junior staff
          setUsers(usersResponse.data.users.filter((user) => 
            ['PARTNER', 'BUSINESS_EXECUTIVE', 'BUSINESS_CONSULTANT'].includes(user.role)
          ));
        } else {
          // Default case (keep original filtering)
          setUsers(usersResponse.data.users.filter((user) => 
            ['BUSINESS_EXECUTIVE', 'BUSINESS_CONSULTANT', 'PARTNER'].includes(user.role)
          ));
        }
        
        // Fetch clients
        await fetchClients();
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load required data');
      } finally {
        setIsDataLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Fetch clients with proper error handling
  const fetchClients = async () => {
    try {
      const response = await axios.get<{ clients?: Client[] }>("/api/clients");
      
      // More robust handling of the response data
      if (response.data && response.data.clients && Array.isArray(response.data.clients)) {
        setClients(response.data.clients);
      } else if (Array.isArray(response.data)) {
        setClients(response.data);
      } else {
        setClients([]);
        console.warn("Clients data structure unexpected:", response.data);
        toast.warning("Could not load client data properly");
      }
    } catch (error) {
      console.error("Error fetching clients:", error);
      setClients([]);
      toast.error("Failed to load clients");
    }
  };
  
  // Update the onSubmit function's redirect logic

const onSubmit = async (data: TaskFormValues) => {
  try {
    setIsLoading(true);
    
    // Format data as needed
    const taskData = {
      ...data,
      // Convert empty arrays to undefined to avoid validation issues
      assignedToIds: data.assignedToIds && data.assignedToIds.length > 0 
        ? data.assignedToIds 
        : undefined,
      clientId: data.clientId === "null" ? null : data.clientId,
      dueDate: data.dueDate ? data.dueDate.toISOString() : null,
    };
    
    // Submit to API
    await axios.post("/api/tasks", taskData);
    
    toast.success("Task created successfully");
    
    // Always redirect to tasks list page
    router.push("/dashboard/tasks");
  } catch (error) {
    console.error("Error creating task:", error);
    toast.error("Failed to create task");
  } finally {
    setIsLoading(false);
  }
};

  // Loading state
  if (isDataLoading) {
    return (
      <TaskPageLayout title="Create New Task" backHref="/dashboard/tasks" maxWidth="max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>Loading Task Form...</CardTitle>
            <CardDescription>Please wait</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <Skeleton className="h-10 w-full" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
              <Skeleton className="h-28 w-full" />
              <div className="flex justify-end gap-3 pt-4">
                <Skeleton className="h-10 w-20" />
                <Skeleton className="h-10 w-32" />
              </div>
            </div>
          </CardContent>
        </Card>
      </TaskPageLayout>
    );
  }
  return (
    <TaskPageLayout title="Create New Task" backHref="/dashboard/tasks" maxWidth="max-w-3xl">
      <Card className="shadow-md border-t-4 border-t-primary">
        <CardHeader className="bg-muted/30">
          <CardTitle className="flex items-center gap-2 text-primary">
            <Plus className="h-5 w-5" />
            Create New Task
          </CardTitle>
          <CardDescription>
            Fill in the details to create a new task and assign it to team members
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Task Title with animation on focus */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary-foreground/90 font-medium">Task Title*</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter task title" 
                        {...field} 
                        className="transition-all focus:border-primary focus:ring-2 focus:ring-primary/20" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
  
              {/* Priority and Status with custom styled selects */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary-foreground/90 font-medium">Priority</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="transition-all focus:border-primary focus:ring-2 focus:ring-primary/20">
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="low" className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-green-500"></span>
                            <span>Low</span>
                          </SelectItem>
                          <SelectItem value="medium" className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
                            <span>Medium</span>
                          </SelectItem>
                            <SelectItem value="high" className="flex items-center gap-2">
                              <span className="h-2 w-2 rounded-full bg-red-500"></span>
                              <span>High</span>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
  
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary-foreground/90 font-medium">Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="transition-all focus:border-primary focus:ring-2 focus:ring-primary/20">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="pending" className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-gray-500"></span>
                            <span>Pending</span>
                          </SelectItem>
                          <SelectItem value="in_progress" className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                            <span>In Progress</span>
                          </SelectItem>
                          <SelectItem value="review" className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-purple-500"></span>
                            <span>Review</span>
                          </SelectItem>
                          <SelectItem value="completed" className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-green-500"></span>
                            <span>Completed</span>
                          </SelectItem>
                          <SelectItem value="cancelled" className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-red-500"></span>
                            <span>Cancelled</span>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
  
              {/* Client selection and Due Date with improved UI */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="clientId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary-foreground/90 font-medium">Client (Optional)</FormLabel>
                      <FormControl>
                        {/* Replace with SearchableSelect */}
                        <SearchableSelect
                          options={clients.map(client => ({
                            value: client.id,
                            label: client.companyName || client.contactPerson
                          }))}
                          selected={field.value ?? null}
                          onChange={field.onChange}
                          placeholder="Select client"
                          className="transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
  
                <FormField
                  control={form.control}
                  name="dueDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-primary-foreground/90 font-medium">Due Date (Optional)</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "pl-3 text-left font-normal w-full transition-all focus:border-primary focus:ring-2 focus:ring-primary/20",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>No due date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <DayPicker
                            mode="single"
                            selected={field.value || undefined}
                            onSelect={field.onChange}
                            captionLayout="dropdown-months"
                            showOutsideDays
                            fixedWeeks
                            disabled={(date) => date < new Date(Date.now() - 86400000)}
                            footer={field.value ? `Selected: ${format(field.value, 'PPP')}` : "Please select a date"}
                            className="p-3"
                          />
                          <div className="p-3 border-t border-border flex justify-end">
                            <Button
                              variant="ghost"
                              onClick={() => field.onChange(null)}
                              className="h-8"
                            >
                              Clear
                            </Button>
                          </div>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
  
              {/* Team member assignment with improved UI */}
              <FormField
                control={form.control}
                name="assignedToIds"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary-foreground/90 font-medium">Assign To</FormLabel>
                    <FormControl>
                      <SearchableMultiSelect
                        options={users.map(user => ({
                          value: user.id,
                          label: user.name,
                          role: user.role,
                          email: user.email,
                          avatar: user.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`
                        }))}
                        selected={field.value}
                        onChange={field.onChange}
                        placeholder="Select team members"
                        showSelectedOptions={false}
                        className="transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
  
              {/* Description with improved UI */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary-foreground/90 font-medium">Description (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter task description"
                        className="min-h-[120px] resize-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
  
              {/* Buttons with hover effects */}
              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  className="transition-colors hover:bg-destructive/10"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="transition-transform hover:translate-y-[-2px]"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Task"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </TaskPageLayout>
  );
}
