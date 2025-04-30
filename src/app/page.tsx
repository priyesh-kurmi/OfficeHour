"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  ArrowRight,
  ClipboardList,
  Users,
  MessageSquare,
  LayoutDashboard,
  Lock,
  CheckCircle,
  Building2,
  FileText,
  Bell,
  History,
  Key,
  Calendar,
  BarChart3,
  Smartphone,
  Shield,
  Clock,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  // Only show UI after theme is available to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-20 right-[10%] w-64 h-64 rounded-full bg-[#00ADB5]/10 blur-3xl"></div>
        <div className="absolute top-[40%] left-[5%] w-72 h-72 rounded-full bg-[#393E46]/10 blur-3xl"></div>
        <div className="absolute bottom-[10%] right-[15%] w-80 h-80 rounded-full bg-[#00ADB5]/10 blur-3xl"></div>
      </div>

      {/* Header/Navigation */}
      <header
        className={`border-b sticky top-0 z-40 ${
          theme === "dark" ? "bg-[#222831]/95" : "bg-[#EEEEEE]/95"
        } backdrop-blur supports-[backdrop-filter]:bg-opacity-60`}
      >
        <div className="container mx-auto px-4 sm:px-6 flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-[#00ADB5] p-1.5 rounded-md">
              <Building2 className="h-5 w-5 text-[#EEEEEE]" />
            </div>
            <span className="font-semibold text-xl">OfficeHour</span>
          </div>
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex gap-6">
              <a
                href="#features"
                className={`transition-colors ${
                  theme === "dark" ? "text-[#EEEEEE]" : "text-[#393E46]"
                } hover:text-[#00ADB5]`}
              >
                Features
              </a>
              <a
                href="#benefits"
                className={`transition-colors ${
                  theme === "dark" ? "text-[#EEEEEE]" : "text-[#393E46]"
                } hover:text-[#00ADB5]`}
              >
                Benefits
              </a>
            </nav>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Button
                variant="outline"
                asChild
                className={`hover:border-[#00ADB5] hover:text-[#00ADB5] transition-all ${
                  theme === "dark" ? "border-[#EEEEEE]" : "border-[#393E46]"
                }`}
              >
                <Link href="/login">Log In</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-28 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <div className="flex-1 space-y-6">
            <div
              className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
                theme === "dark"
                  ? "bg-[#00ADB5]/30 text-[#00ADB5]"
                  : "bg-[#00ADB5]/10 text-[#00ADB5]"
              } mb-2`}
            >
              <span className="flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5" />
                Revolutionize your workplace
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-[#00ADB5] to-[#393E46] bg-clip-text text-transparent">
                OfficeHour
              </span>
            </h1>
            <p className="text-xl max-w-[600px]">
              Streamline your office operations with our comprehensive
              management solution. Handle clients, tasks, team communication,
              and documentation in one secure platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                size="lg"
                className="gap-2 bg-gradient-to-r from-[#00ADB5] to-[#393E46] hover:from-[#00ADB5]/80 hover:to-[#393E46]/80 border-0 shadow-md hover:shadow-lg transition-all"
                asChild
              >
                <Link href="/login">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className={`border-[#00ADB5] hover:border-[#00ADB5] transition-all ${
                  theme === "dark" ? "text-[#EEEEEE]" : "text-[#393E46]"
                }`}
              >
                Learn More
              </Button>
            </div>
          </div>
          <div className="flex-1 relative min-h-[300px] md:min-h-[400px] w-full">
            <div
              className={`absolute top-0 right-0 h-full w-full bg-gradient-to-br ${
                theme === "dark"
                  ? "from-[#00ADB5]/20 via-[#393E46]/20 to-[#222831]/20"
                  : "from-[#00ADB5]/10 via-[#393E46]/10 to-[#EEEEEE]/10"
              } rounded-lg overflow-hidden shadow-xl border ${
                theme === "dark" ? "border-[#393E46]/50" : "border-[#00ADB5]/50"
              }`}
            >
              <div
                className={`absolute -right-20 -bottom-20 h-60 w-60 ${
                  theme === "dark" ? "bg-[#393E46]/20" : "bg-[#00ADB5]/20"
                } rounded-full filter blur-3xl`}
              ></div>
              <div className="absolute left-10 top-10 right-10 bottom-10">
                <div
                  className={`bg-[#393E46]/80 backdrop-blur-sm border ${
                    theme === "dark"
                      ? "border-[#222831]/20"
                      : "border-[#EEEEEE]/20"
                  } h-full w-full rounded-md shadow-sm overflow-hidden`}
                >
                  <div
                    className={`border-b px-4 py-3 flex items-center gap-2 ${
                      theme === "dark" ? "bg-[#222831]/50" : "bg-[#EEEEEE]/50"
                    }`}
                  >
                    <LayoutDashboard className="h-4 w-4 text-[#00ADB5]" />
                    <span className="font-medium text-sm">
                      Dashboard Preview
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 p-4">
                    <div
                      className={`bg-[#222831] rounded-md border p-3 shadow-sm hover:shadow-md ${
                        theme === "dark"
                          ? "hover:border-[#00ADB5]"
                          : "hover:border-[#393E46]"
                      } transition-all`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium">
                          Active Tasks
                        </span>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            theme === "dark"
                              ? "bg-[#00ADB5]/30 text-[#00ADB5]"
                              : "bg-[#00ADB5]/10 text-[#00ADB5]"
                          }`}
                        >
                          12
                        </span>
                      </div>
                    </div>
                    <div
                      className={`bg-[#222831] rounded-md border p-3 shadow-sm hover:shadow-md ${
                        theme === "dark"
                          ? "hover:border-[#00ADB5]"
                          : "hover:border-[#393E46]"
                      } transition-all`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium">Clients</span>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            theme === "dark"
                              ? "bg-[#393E46]/30 text-[#393E46]"
                              : "bg-[#00ADB5]/10 text-[#00ADB5]"
                          }`}
                        >
                          24
                        </span>
                      </div>
                    </div>
                    <div
                      className={`col-span-2 bg-[#222831] rounded-md border p-3 shadow-sm hover:shadow-md ${
                        theme === "dark"
                          ? "hover:border-[#00ADB5]"
                          : "hover:border-[#393E46]"
                      } transition-all`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-medium">
                          Recent Activity
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className="text-xs flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-[#00ADB5]"></div>
                          Task completed: Client onboarding
                        </div>
                        <div className="text-xs flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-[#393E46]"></div>
                          New client added: Acme Inc.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 relative z-10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-[800px] mx-auto mb-16">
            <div
              className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
                theme === "dark"
                  ? "bg-[#00ADB5]/30 text-[#00ADB5]"
                  : "bg-[#00ADB5]/10 text-[#00ADB5]"
              } mb-4`}
            >
              <span>Powerful Tools</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Comprehensive Office Management
            </h2>
            <p
              className={`text-lg ${
                theme === "dark" ? "text-[#EEEEEE]" : "text-[#393E46]"
              }`}
            >
              OfficeHour offers a complete suite of features designed to
              streamline your workflow and boost productivity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <div
              className={`bg-[#222831] rounded-lg border p-6 hover:shadow-md transition-all group ${
                theme === "dark"
                  ? "hover:border-[#00ADB5]"
                  : "hover:border-[#393E46]"
              }`}
            >
              <div
                className={`h-12 w-12 rounded-lg ${
                  theme === "dark"
                    ? "bg-[#00ADB5]/30 text-[#00ADB5]"
                    : "bg-[#00ADB5]/10 text-[#00ADB5]"
                } flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
              >
                <ClipboardList className="h-6 w-6" />
              </div>
              <h3
                className={`text-xl font-semibold mb-2 transition-colors ${
                  theme === "dark"
                    ? "group-hover:text-[#00ADB5]"
                    : "group-hover:text-[#393E46]"
                }`}
              >
                Task Management
              </h3>
              <p
                className={`${
                  theme === "dark" ? "text-[#EEEEEE]" : "text-[#393E46]"
                }`}
              >
                Create, assign and track tasks with priority levels, due dates,
                and status updates. Generate reports and monitor team
                productivity.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div
              className={`bg-[#222831] rounded-lg border p-6 hover:shadow-md transition-all group ${
                theme === "dark"
                  ? "hover:border-[#00ADB5]"
                  : "hover:border-[#393E46]"
              }`}
            >
              <div
                className={`h-12 w-12 rounded-lg ${
                  theme === "dark"
                    ? "bg-[#393E46]/30 text-[#393E46]"
                    : "bg-[#00ADB5]/10 text-[#00ADB5]"
                } flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
              >
                <Users className="h-6 w-6" />
              </div>
              <h3
                className={`text-xl font-semibold mb-2 transition-colors ${
                  theme === "dark"
                    ? "group-hover:text-[#00ADB5]"
                    : "group-hover:text-[#393E46]"
                }`}
              >
                Client Management
              </h3>
              <p
                className={`${
                  theme === "dark" ? "text-[#EEEEEE]" : "text-[#393E46]"
                }`}
              >
                Manage permanent and guest clients with contact details, notes,
                and company information. Track client history and set access
                expiry for guests.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div
              className={`bg-[#222831] rounded-lg border p-6 hover:shadow-md transition-all group ${
                theme === "dark"
                  ? "hover:border-[#00ADB5]"
                  : "hover:border-[#393E46]"
              }`}
            >
              <div
                className={`h-12 w-12 rounded-lg ${
                  theme === "dark"
                    ? "bg-[#00ADB5]/30 text-[#00ADB5]"
                    : "bg-[#00ADB5]/10 text-[#00ADB5]"
                } flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
              >
                <MessageSquare className="h-6 w-6" />
              </div>
              <h3
                className={`text-xl font-semibold mb-2 transition-colors ${
                  theme === "dark"
                    ? "group-hover:text-[#00ADB5]"
                    : "group-hover:text-[#393E46]"
                }`}
              >
                Team Communication
              </h3>
              <p
                className={`${
                  theme === "dark" ? "text-[#EEEEEE]" : "text-[#393E46]"
                }`}
              >
                Chat with team members in real-time, discuss tasks, and share
                files. Keep all project communication in one centralized
                location.
              </p>
            </div>

            <div
              className={`bg-[#222831] rounded-lg border p-6 hover:shadow-md transition-all group ${
                theme === "dark"
                  ? "hover:border-[#00ADB5]"
                  : "hover:border-[#393E46]"
              }`}
            >
              <div
                className={`h-12 w-12 rounded-lg ${
                  theme === "dark"
                    ? "bg-[#00ADB5]/30 text-[#00ADB5]"
                    : "bg-[#00ADB5]/10 text-[#00ADB5]"
                } flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
              >
                <Lock className="h-6 w-6" />
              </div>
              <h3
                className={`text-xl font-semibold mb-2 transition-colors ${
                  theme === "dark"
                    ? "group-hover:text-[#00ADB5]"
                    : "group-hover:text-[#393E46]"
                }`}
              >
                Role-Based Access
              </h3>
              <p
                className={`${
                  theme === "dark" ? "text-[#EEEEEE]" : "text-[#393E46]"
                }`}
              >
                Control system access with custom roles for admins, partners,
                executives, and consultants. Ensure data security with
                permission-based views.
              </p>
            </div>

            <div
              className={`bg-[#222831] rounded-lg border p-6 hover:shadow-md transition-all group ${
                theme === "dark"
                  ? "hover:border-[#00ADB5]"
                  : "hover:border-[#393E46]"
              }`}
            >
              <div
                className={`h-12 w-12 rounded-lg ${
                  theme === "dark"
                    ? "bg-[#00ADB5]/30 text-[#00ADB5]"
                    : "bg-[#00ADB5]/10 text-[#00ADB5]"
                } flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
              >
                <Bell className="h-6 w-6" />
              </div>
              <h3
                className={`text-xl font-semibold mb-2 transition-colors ${
                  theme === "dark"
                    ? "group-hover:text-[#00ADB5]"
                    : "group-hover:text-[#393E46]"
                }`}
              >
                Notification System
              </h3>
              <p
                className={`${
                  theme === "dark" ? "text-[#EEEEEE]" : "text-[#393E46]"
                }`}
              >
                Stay informed with real-time notifications for task assignments,
                updates, and important deadlines via in-app alerts and email.
              </p>
            </div>

            <div
              className={`bg-[#222831] rounded-lg border p-6 hover:shadow-md transition-all group ${
                theme === "dark"
                  ? "hover:border-[#00ADB5]"
                  : "hover:border-[#393E46]"
              }`}
            >
              <div
                className={`h-12 w-12 rounded-lg ${
                  theme === "dark"
                    ? "bg-[#00ADB5]/30 text-[#00ADB5]"
                    : "bg-[#00ADB5]/10 text-[#00ADB5]"
                } flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
              >
                <FileText className="h-6 w-6" />
              </div>
              <h3
                className={`text-xl font-semibold mb-2 transition-colors ${
                  theme === "dark"
                    ? "group-hover:text-[#00ADB5]"
                    : "group-hover:text-[#393E46]"
                }`}
              >
                Document Management
              </h3>
              <p
                className={`${
                  theme === "dark" ? "text-[#EEEEEE]" : "text-[#393E46]"
                }`}
              >
                Upload, store, and share client documents securely. Track
                document versions and manage access permissions.
              </p>
            </div>

            <div
              className={`bg-[#222831] rounded-lg border p-6 hover:shadow-md transition-all group ${
                theme === "dark"
                  ? "hover:border-[#00ADB5]"
                  : "hover:border-[#393E46]"
              }`}
            >
              <div
                className={`h-12 w-12 rounded-lg ${
                  theme === "dark"
                    ? "bg-[#00ADB5]/30 text-[#00ADB5]"
                    : "bg-[#00ADB5]/10 text-[#00ADB5]"
                } flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
              >
                <History className="h-6 w-6" />
              </div>
              <h3
                className={`text-xl font-semibold mb-2 transition-colors ${
                  theme === "dark"
                    ? "group-hover:text-[#00ADB5]"
                    : "group-hover:text-[#393E46]"
                }`}
              >
                Activity Tracking
              </h3>
              <p
                className={`${
                  theme === "dark" ? "text-[#EEEEEE]" : "text-[#393E46]"
                }`}
              >
                Monitor all system activities with detailed logs. Track changes
                to clients, tasks, and documents for complete accountability.
              </p>
            </div>

            <div
              className={`bg-[#222831] rounded-lg border p-6 hover:shadow-md transition-all group ${
                theme === "dark"
                  ? "hover:border-[#00ADB5]"
                  : "hover:border-[#393E46]"
              }`}
            >
              <div
                className={`h-12 w-12 rounded-lg ${
                  theme === "dark"
                    ? "bg-[#00ADB5]/30 text-[#00ADB5]"
                    : "bg-[#00ADB5]/10 text-[#00ADB5]"
                } flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
              >
                <Key className="h-6 w-6" />
              </div>
              <h3
                className={`text-xl font-semibold mb-2 transition-colors ${
                  theme === "dark"
                    ? "group-hover:text-[#00ADB5]"
                    : "group-hover:text-[#393E46]"
                }`}
              >
                Credential Management
              </h3>
              <p
                className={`${
                  theme === "dark" ? "text-[#EEEEEE]" : "text-[#393E46]"
                }`}
              >
                Store client credentials securely. Manage usernames and
                passwords with encrypted storage and controlled access.
              </p>
            </div>

            <div
              className={`bg-[#222831] rounded-lg border p-6 hover:shadow-md transition-all group ${
                theme === "dark"
                  ? "hover:border-[#00ADB5]"
                  : "hover:border-[#393E46]"
              }`}
            >
              <div
                className={`h-12 w-12 rounded-lg ${
                  theme === "dark"
                    ? "bg-[#00ADB5]/30 text-[#00ADB5]"
                    : "bg-[#00ADB5]/10 text-[#00ADB5]"
                } flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
              >
                <Smartphone className="h-6 w-6" />
              </div>
              <h3
                className={`text-xl font-semibold mb-2 transition-colors ${
                  theme === "dark"
                    ? "group-hover:text-[#00ADB5]"
                    : "group-hover:text-[#393E46]"
                }`}
              >
                Mobile Responsive
              </h3>
              <p
                className={`${
                  theme === "dark" ? "text-[#EEEEEE]" : "text-[#393E46]"
                }`}
              >
                Access your office management system from any device. Fully
                responsive design works on desktops, tablets, and smartphones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 relative z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#222831]/50 to-[#393E46]/50 z-0"></div>
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-[800px] mx-auto mb-16">
            <div
              className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
                theme === "dark"
                  ? "bg-[#00ADB5]/30 text-[#00ADB5]"
                  : "bg-[#00ADB5]/10 text-[#00ADB5]"
              } mb-4`}
            >
              <span>Why Choose Us</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Benefits of Using OfficeHour
            </h2>
            <p
              className={`text-lg ${
                theme === "dark" ? "text-[#EEEEEE]" : "text-[#393E46]"
              }`}
            >
              Discover how our platform can transform your business operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Benefit Card 1 */}
            <div
              className={`bg-[#222831] rounded-lg border p-6 hover:shadow-md transition-all group ${
                theme === "dark"
                  ? "hover:border-[#00ADB5]"
                  : "hover:border-[#393E46]"
              }`}
            >
              <div
                className={`h-12 w-12 rounded-lg ${
                  theme === "dark"
                    ? "bg-[#00ADB5]/30 text-[#00ADB5]"
                    : "bg-[#00ADB5]/10 text-[#00ADB5]"
                } flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
              >
                <Clock className="h-6 w-6" />
              </div>
              <h3
                className={`text-xl font-semibold mb-2 transition-colors ${
                  theme === "dark"
                    ? "group-hover:text-[#00ADB5]"
                    : "group-hover:text-[#393E46]"
                }`}
              >
                Time Savings
              </h3>
              <p
                className={`${
                  theme === "dark" ? "text-[#EEEEEE]" : "text-[#393E46]"
                }`}
              >
                Automate routine tasks and streamline workflows, reducing
                administrative overhead by up to 40%.
              </p>
            </div>

            {/* Benefit Card 2 */}
            <div
              className={`bg-[#222831] rounded-lg border p-6 hover:shadow-md transition-all group ${
                theme === "dark"
                  ? "hover:border-[#00ADB5]"
                  : "hover:border-[#393E46]"
              }`}
            >
              <div
                className={`h-12 w-12 rounded-lg ${
                  theme === "dark"
                    ? "bg-[#393E46]/30 text-[#393E46]"
                    : "bg-[#00ADB5]/10 text-[#00ADB5]"
                } flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
              >
                <BarChart3 className="h-6 w-6" />
              </div>
              <h3
                className={`text-xl font-semibold mb-2 transition-colors ${
                  theme === "dark"
                    ? "group-hover:text-[#00ADB5]"
                    : "group-hover:text-[#393E46]"
                }`}
              >
                Enhanced Productivity
              </h3>
              <p
                className={`${
                  theme === "dark" ? "text-[#EEEEEE]" : "text-[#393E46]"
                }`}
              >
                Increase team output with clear task allocation, priority
                management, and deadline tracking.
              </p>
            </div>

            {/* Benefit Card 3 */}
            <div
              className={`bg-[#222831] rounded-lg border p-6 hover:shadow-md transition-all group ${
                theme === "dark"
                  ? "hover:border-[#00ADB5]"
                  : "hover:border-[#393E46]"
              }`}
            >
              <div
                className={`h-12 w-12 rounded-lg ${
                  theme === "dark"
                    ? "bg-[#00ADB5]/30 text-[#00ADB5]"
                    : "bg-[#00ADB5]/10 text-[#00ADB5]"
                } flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
              >
                <Users className="h-6 w-6" />
              </div>
              <h3
                className={`text-xl font-semibold mb-2 transition-colors ${
                  theme === "dark"
                    ? "group-hover:text-[#00ADB5]"
                    : "group-hover:text-[#393E46]"
                }`}
              >
                Better Collaboration
              </h3>
              <p
                className={`${
                  theme === "dark" ? "text-[#EEEEEE]" : "text-[#393E46]"
                }`}
              >
                Foster teamwork with real-time communication and shared access
                to project resources.
              </p>
            </div>

            <div
              className={`bg-[#222831] rounded-lg border p-6 hover:shadow-md transition-all group ${
                theme === "dark"
                  ? "hover:border-[#00ADB5]"
                  : "hover:border-[#393E46]"
              }`}
            >
              <div
                className={`h-12 w-12 rounded-lg ${
                  theme === "dark"
                    ? "bg-[#00ADB5]/30 text-[#00ADB5]"
                    : "bg-[#00ADB5]/10 text-[#00ADB5]"
                } flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
              >
                <Shield className="h-6 w-6" />
              </div>
              <h3
                className={`text-xl font-semibold mb-2 transition-colors ${
                  theme === "dark"
                    ? "group-hover:text-[#00ADB5]"
                    : "group-hover:text-[#393E46]"
                }`}
              >
                Data Security
              </h3>
              <p
                className={`${
                  theme === "dark" ? "text-[#EEEEEE]" : "text-[#393E46]"
                }`}
              >
                Protect sensitive information with role-based access controls
                and encrypted credential storage.
              </p>
            </div>

            <div
              className={`bg-[#222831] rounded-lg border p-6 hover:shadow-md transition-all group ${
                theme === "dark"
                  ? "hover:border-[#00ADB5]"
                  : "hover:border-[#393E46]"
              }`}
            >
              <div
                className={`h-12 w-12 rounded-lg ${
                  theme === "dark"
                    ? "bg-[#00ADB5]/30 text-[#00ADB5]"
                    : "bg-[#00ADB5]/10 text-[#00ADB5]"
                } flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
              >
                <Calendar className="h-6 w-6" />
              </div>
              <h3
                className={`text-xl font-semibold mb-2 transition-colors ${
                  theme === "dark"
                    ? "group-hover:text-[#00ADB5]"
                    : "group-hover:text-[#393E46]"
                }`}
              >
                Improved Planning
              </h3>
              <p
                className={`${
                  theme === "dark" ? "text-[#EEEEEE]" : "text-[#393E46]"
                }`}
              >
                Plan effectively with visibility into team capacity, deadlines,
                and client priorities.
              </p>
            </div>

            <div
              className={`bg-[#222831] rounded-lg border p-6 hover:shadow-md transition-all group ${
                theme === "dark"
                  ? "hover:border-[#00ADB5]"
                  : "hover:border-[#393E46]"
              }`}
            >
              <div
                className={`h-12 w-12 rounded-lg ${
                  theme === "dark"
                    ? "bg-[#00ADB5]/30 text-[#00ADB5]"
                    : "bg-[#00ADB5]/10 text-[#00ADB5]"
                } flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
              >
                <CheckCircle className="h-6 w-6" />
              </div>
              <h3
                className={`text-xl font-semibold mb-2 transition-colors ${
                  theme === "dark"
                    ? "group-hover:text-[#00ADB5]"
                    : "group-hover:text-[#393E46]"
                }`}
              >
                Client Satisfaction
              </h3>
              <p
                className={`${
                  theme === "dark" ? "text-[#EEEEEE]" : "text-[#393E46]"
                }`}
              >
                Improve client experience with better communication, transparent
                tracking, and faster delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {/* CTA Section */}
      <section className="py-20 relative z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00ADB5]/10 via-[#393E46]/10 to-[#222831]/10 z-0"></div>
        <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="max-w-[800px] mx-auto bg-[#222831]/80 backdrop-blur-sm rounded-xl border border-[#393E46]/50 p-10 shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-[#00ADB5] to-[#393E46] bg-clip-text text-transparent">
              Ready to Transform Your Office Management?
            </h2>
            <p
              className={`text-xl ${
                theme === "dark" ? "text-[#EEEEEE]" : "text-[#393E46]"
              } mb-8`}
            >
              Start streamlining your operations today with OfficeHour.
            </p>
            <Button
              size="lg"
              className="gap-2 bg-gradient-to-r from-[#00ADB5] to-[#393E46] hover:from-[#00ADB5]/80 hover:to-[#393E46]/80 border-0 shadow-md hover:shadow-lg transition-all"
              asChild
            >
              <Link href="/login">
                Get Started <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* Footer */}
      <footer className="py-12 border-t relative z-10">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <div className="flex justify-center items-center mb-4">
            <div className="bg-gradient-to-r from-[#00ADB5] to-[#393E46] p-1.5 rounded-md">
              <Building2 className="h-5 w-5 text-white" />
            </div>
          </div>
          <p
            className={`text-sm ${
              theme === "dark" ? "text-[#EEEEEE]" : "text-[#393E46]"
            } mb-4`}
          >
            © {new Date().getFullYear()} OfficeHour. All rights reserved.
          </p>

          {/* Developer Credits */}
          <div className="mt-6 pt-6 border-t border-[#393E46]/40">
            <p className="text-sm font-medium mb-2 bg-gradient-to-r from-[#00ADB5] to-[#393E46] bg-clip-text text-transparent">
              Designed & Developed by
            </p>
            <div className="flex flex-col items-center">
              <p className="font-medium">Priyesh Kurmi</p>
              <a
                href="mailto:kpriyesh1908@gmail.com"
                className={`text-sm ${
                  theme === "dark" ? "text-[#EEEEEE]" : "text-[#393E46]"
                } hover:text-[#00ADB5] transition-colors`}
              >
                kpriyesh1908@gmail.com
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
