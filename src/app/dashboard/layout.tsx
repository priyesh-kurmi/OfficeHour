"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useEffect, lazy, Suspense } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import {
  Users,
  ClipboardList,
  MessageSquare,
  Settings,
  Briefcase,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Building2,
  LayoutDashboard,
  ArrowRight,
  Code,
  Heart,
} from "lucide-react";
import { signOut } from "next-auth/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import { ThemeToggle } from "@/components/ui/theme-toggle";

// Lazy load non-critical components
const NotificationProvider = lazy(() =>
  import('@/components/notifications/notification-system').then(mod => ({
    default: mod.NotificationProvider
  }))
);

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  role: string[];
  category?: string; // Optional category for grouping
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  // Close mobile nav when route changes
  useEffect(() => {
    setIsMobileNavOpen(false);
  }, [pathname]);

  const userRole = session?.user?.role || "";

  // Add client-side cache warming for admin users
  useEffect(() => {
    // Only trigger cache warming for authenticated admin users
    if (session?.user?.role === 'ADMIN') {
      // Use the existing session auth instead of an API key
      fetch('/api/cron/cache-warmup', {
        method: 'POST',
        // No Authorization header with key - use the session cookie instead
      }).catch(err => {
        console.error('Cache warmup error:', err);
      });
    }
  }, [session?.user?.id]);

  // Navigation items based on user role with categories
  const navItems: NavItem[] = [
    // Main navigation
    {
      title: "Dashboard",
      href: getRoleDashboardPath(userRole),
      icon: <LayoutDashboard className="h-5 w-5" />,
      role: [
        "ADMIN",
        "PARTNER",
        "BUSINESS_CONSULTANT",
        "BUSINESS_EXECUTIVE",
        "PERMANENT_CLIENT",
        "GUEST_CLIENT",
      ],
      category: "main",
    },
    // Management
    {
      title: "Users",
      href:
        userRole === "ADMIN"
          ? "/dashboard/admin/users"
          : "/dashboard/partner/users",
      icon: <Users className="h-6 w-6" />,
      role: ["ADMIN", "PARTNER"],
      category: "management",
    },
    {
      title: "Tasks",
      href: "/dashboard/tasks", // Point to your implemented tasks page
      icon: <ClipboardList className="h-6 w-6" />,
      role: ["ADMIN", "PARTNER", "BUSINESS_CONSULTANT", "BUSINESS_EXECUTIVE"],
      category: "management",
    },
    {
      title: "Clients",
      href: "/dashboard/clients",
      icon: <Briefcase className="h-6 w-6" />,
      role: ["ADMIN", "PARTNER", "BUSINESS_EXECUTIVE", "BUSINESS_CONSULTANT"],
      category: "management",
    },
    // Services and resources
    {
      title: "Services",
      href: "/dashboard/client/services",
      icon: <Briefcase className="h-6 w-6" />,
      role: ["PERMANENT_CLIENT", "GUEST_CLIENT"],
      category: "resources",
    },
    // Communication
    {
      title: "Team Chat",
      href: "/dashboard/chat",
      icon: <MessageSquare className="h-6 w-6" />,
      role: [
        "ADMIN",
        "PARTNER",
        "BUSINESS_CONSULTANT",
        "BUSINESS_EXECUTIVE",
        "PERMANENT_CLIENT",
        "GUEST_CLIENT",
      ],
      category: "communication",
    },
    // Preferences
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: <Settings className="h-6 w-6" />,
      role: [
        "ADMIN",
        "PARTNER",
        "BUSINESS_CONSULTANT",
        "BUSINESS_EXECUTIVE",
        "PERMANENT_CLIENT",
        "GUEST_CLIENT",
      ],
      category: "preferences",
    },
  ];

  // Function to get visible nav items
  const getVisibleNavItems = () => {
    return navItems.filter((item) => item.role.includes(userRole));
  };

  // Helper to get correct dashboard path for role
  function getRoleDashboardPath(role: string) {
    switch (role) {
      case "ADMIN":
        return "/dashboard/admin";
      case "PARTNER":
        return "/dashboard/partner";
      case "BUSINESS_CONSULTANT":
      case "BUSINESS_EXECUTIVE":
        return "/dashboard/junior";
      case "PERMANENT_CLIENT":
      case "GUEST_CLIENT":
        return "/dashboard/client";
      default:
        return "/dashboard";
    }
  }

  // Get initials for avatar
  const getInitials = (name?: string | null) => {
    return (
      name
        ?.split(" ")
        .map((part) => part[0])
        .join("")
        .toUpperCase()
        .substring(0, 2) || "??"
    );
  };

  // Loading state
  if (status === "loading") {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  // Not authenticated - shouldn't happen due to middleware
  if (status === "unauthenticated") {
    return null;
  }

  // Modified function to determine if a nav item is active (only one at a time)
  const isActiveNavItem = (itemHref: string) => {
    // Handle the case when pathname is null
    if (pathname === null) return false;
    
    // For dashboard root paths like /dashboard/admin, only highlight when exact match
    if (itemHref.split("/").length === 3) {
      // e.g., /dashboard/admin
      return pathname === itemHref;
    }

    // For nested paths like /dashboard/admin/users, highlight when current or child routes
    return pathname === itemHref || pathname.startsWith(`${itemHref}/`);
  };

  // NavItem component with tooltip support for collapsed mode
  const NavItemComponent = ({ item }: { item: NavItem }) => {
    const content = (
      <Link
        href={item.href}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 text-base transition-all duration-200",
          sidebarCollapsed && "justify-center",
          isActiveNavItem(item.href)
            ? "bg-primary/10 text-primary shadow-sm"
            : "text-muted-foreground hover:bg-muted hover:translate-x-1"
        )}
      >
        <div
          className={cn(
            "flex items-center justify-center rounded-md w-9 h-9 transition-colors",
            isActiveNavItem(item.href)
              ? "bg-primary/20 text-primary"
              : "bg-muted/50 text-muted-foreground group-hover:bg-muted/80"
          )}
        >
          {item.icon}
        </div>
        {!sidebarCollapsed && <span className="font-medium">{item.title}</span>}
      </Link>
    );

    if (sidebarCollapsed) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>{content}</TooltipTrigger>
            <TooltipContent side="right">{item.title}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    return content;
  };

  return (
    <Suspense fallback={null}>
      <NotificationProvider>
        <div className="flex min-h-screen flex-col overflow-x-hidden">
          <div className="flex flex-1">
            {/* Fixed Sidebar */}
            <div
              className={cn(
                "hidden fixed top-0 bottom-0 flex-col border-r bg-card transition-all duration-300 z-40 lg:flex",
                sidebarCollapsed ? "w-20" : "w-64"
              )}
            >
              {/* Toggle collapse button - repositioned to top */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-4 z-20 h-6 w-6 -mr-3 rounded-full border bg-background shadow-sm"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              >
                {sidebarCollapsed ? (
                  <ChevronRight className="h-4 w-4" />
                ) : (
                  <ChevronLeft className="h-4 w-4" />
                )}
                <span className="sr-only">Toggle Sidebar</span>
              </Button>

              <div className="flex h-14 items-center border-b px-4">
                <Link
                  href="/"
                  className={cn(
                    "flex items-center gap-2 font-semibold",
                    sidebarCollapsed && "justify-center w-full"
                  )}
                >
                  <Building2 className="h-6 w-6" />
                  {!sidebarCollapsed && <span>MV Company</span>}
                </Link>
              </div>

              <ScrollArea className="flex-1 py-2">
                <nav className="grid gap-1 px-2">
                  {getVisibleNavItems().map((item) => (
                    <NavItemComponent key={item.href} item={item} />
                  ))}
                </nav>
              </ScrollArea>

              <div className="mt-auto border-t p-4">
                <div
                  className={cn(
                    "flex items-center gap-3 rounded-md p-2",
                    sidebarCollapsed && "flex-col"
                  )}
                >
                  <Avatar className="h-9 w-9">
                    <AvatarImage
                      src={session?.user?.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${session?.user?.name}`}
                      alt={session?.user?.name ?? ""}
                    />
                    <AvatarFallback>
                      {getInitials(session?.user?.name)}
                    </AvatarFallback>
                  </Avatar>
                  {!sidebarCollapsed && (
                    <div className="flex flex-1 flex-col truncate">
                      <span className="truncate text-sm font-medium">
                        {session?.user?.name}
                      </span>
                      <span className="truncate text-xs text-muted-foreground">
                        {session?.user?.email}
                      </span>
                    </div>
                  )}
                  {sidebarCollapsed ? (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              signOut({ redirect: true, callbackUrl: "/login" })
                            }
                          >
                            <LogOut className="h-4 w-4" />
                            <span className="sr-only">Log out</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right">Log out</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="ml-auto h-8 w-8"
                      onClick={() =>
                        signOut({ redirect: true, callbackUrl: "/login" })
                      }
                    >
                      <LogOut className="h-4 w-4" />
                      <span className="sr-only">Log out</span>
                    </Button>
                  )}
                </div>
              </div>

              {/* Project Creators Section */}
              <div className={cn(
                "border-t",
                sidebarCollapsed ? "px-1 py-2" : "px-3 py-3"
              )}>
                {sidebarCollapsed ? (
                  // Minimal version for collapsed sidebar
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex justify-center">
                          <Heart className="h-3 w-3 text-rose-500 animate-pulse" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="right" className="max-w-[220px] p-3">
                        <div className="text-center">
                          <p className="font-medium">MV Company</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            © {new Date().getFullYear()} All rights reserved
                          </p>
                          <div className="mt-2 pt-1 border-t border-border/40">
                            <p className="font-medium text-xs">Created by</p>
                            <p className="text-xs">Sahil Vishwakarma</p>
                            <p className="text-xs">Priyesh Kurmi</p>
                          </div>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  // Expanded version with full details
                  <div className="space-y-2">
                    {/* Copyright line */}
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground/70">
                      <span>MV Company</span>
                      <span>© {new Date().getFullYear()}</span>
                    </div>
                    
                    {/* Decorative separator */}
                    <div className="relative flex items-center py-1">
                      <div className="flex-grow border-t border-border/20"></div>
                      <span className="text-[10px] text-muted-foreground/50 mx-2">All rights reserved</span>
                      <div className="flex-grow border-t border-border/20"></div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Main content with margin to account for sidebar */}
            <div
              className={cn(
                "flex flex-1 flex-col",
                sidebarCollapsed ? "lg:ml-20" : "lg:ml-64"
              )}
            >
              {/* Mobile header */}
              <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b bg-background px-4 lg:hidden">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden"
                    onClick={() => setIsMobileNavOpen(true)}
                  >
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                  <Link
                    href="/"
                    className="flex items-center gap-1 font-semibold"
                  >
                    <Building2 className="h-6 w-6" />
                    <span className="font-semibold">MV Company</span>
                  </Link>
                </div>

                {/* Add theme switcher to mobile header - you'll need to import your ThemeToggle component */}
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <Avatar className="h-8 w-8" onClick={() => setIsMobileNavOpen(true)}>
                    <AvatarImage
                      src={session?.user?.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${session?.user?.name}`}
                      alt={session?.user?.name ?? ""}
                    />
                    <AvatarFallback>{getInitials(session?.user?.name)}</AvatarFallback>
                  </Avatar>
                </div>
              </header>

              {/* Dashboard header */}
              <Suspense fallback={<Skeleton className="h-14 w-full border-b" />}>
                <DashboardHeader />
              </Suspense>

              {/* Main content */}
              <main className="flex-1 p-3 sm:p-4 md:p-6 overflow-x-hidden">{children}</main>
            </div>

            {/* Mobile navigation overlay */}
            <div
              className={cn(
                "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-all duration-200 lg:hidden",
                isMobileNavOpen ? "opacity-100" : "opacity-0 pointer-events-none"
              )}
              onClick={() => setIsMobileNavOpen(false)}
            >
              <div
                className={cn(
                  "fixed left-0 top-0 h-full w-[85%] max-w-xs bg-card shadow-xl transition-transform duration-300",
                  isMobileNavOpen ? "translate-x-0" : "-translate-x-full"
                )}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between px-4 py-3 border-b">
                  <Link
                    href="/"
                    className="flex items-center gap-2 font-semibold"
                  >
                    <Building2 className="h-6 w-6" />
                    <span>MV Company</span>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMobileNavOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {/* Rest of the ScrollArea content */}
                <ScrollArea className="h-[calc(100%-64px)] px-4 py-2">
                  <nav className="grid gap-1">
                    {getVisibleNavItems().map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 rounded-md px-3 py-2.5 text-base transition-colors",
                          isActiveNavItem(item.href)
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-muted"
                        )}
                        onClick={() => setIsMobileNavOpen(false)}
                      >
                        <div className="flex items-center justify-center rounded-md w-9 h-9 bg-muted/50">
                          {item.icon}
                        </div>
                        <span>{item.title}</span>
                      </Link>
                    ))}
                  </nav>
                  <div className="mt-6 border-t pt-4 flex flex-col" style={{ minHeight: '180px' }}>
                    <div className="flex items-center gap-3 rounded-md p-2">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={session?.user?.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${session?.user?.name}`}
                          alt={session?.user?.name ?? ""}
                        />
                        <AvatarFallback>
                          {getInitials(session?.user?.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-1 flex-col">
                        <span className="text-sm font-medium line-clamp-1">
                          {session?.user?.name}
                        </span>
                        <span className="text-xs text-muted-foreground line-clamp-1">
                          {session?.user?.email}
                        </span>
                      </div>
                    </div>
                    <div className="mt-3 border-t pt-3">
                      <Button
                        variant="ghost"
                        className="w-full flex items-center justify-between py-3 px-4 bg-muted/30 hover:bg-destructive/10 hover:text-destructive group transition-colors"
                        onClick={() => {
                          setIsMobileNavOpen(false);
                          signOut({ redirect: true, callbackUrl: "/login" });
                        }}
                      >
                        <span className="font-medium flex items-center">
                          <LogOut className="h-4 w-4 mr-3 transition-transform group-hover:rotate-12" />
                          Sign Out
                        </span>
                        <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                      </Button>
                    </div>
                  
                    {/* Creator credits - moved inside the flex-col for better spacing */}
                    <div className="mt-auto pt-4 pb-4 text-xs text-muted-foreground/80">
                      <div className="flex items-center justify-center gap-1.5 mb-2 font-medium">
                        <Code className="h-3.5 w-3.5" /> 
                        <span>Created with</span> 
                        <Heart className="h-3 w-3 text-rose-500 animate-pulse" />
                      </div>
                      <div className="text-center font-medium">
                        Sahil Vishwakarma
                      </div>
                      <div className="text-center font-medium mt-2">
                        Priyesh Kurmi
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </div>
            </div>
          </div>
        </div>
      </NotificationProvider>
    </Suspense>
  );
}
