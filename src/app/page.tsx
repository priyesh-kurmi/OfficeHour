"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <main className="min-h-screen">
      {/* Header - Rounded and detached */}
      <header
        className={`fixed w-full z-[100] transition-all duration-300 ${
          visible ? "top-4" : "-top-28"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center bg-white rounded-full shadow-md">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-blue-600">OfficeHour</h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/"
              className="font-medium text-gray-700 hover:text-blue-600 transition"
            >
              Home
            </Link>
            <Link
              href="/features"
              className="font-medium text-gray-700 hover:text-blue-600 transition"
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className="font-medium text-gray-700 hover:text-blue-600 transition"
            >
              Pricing
            </Link>
            <Link
              href="/contact"
              className="font-medium text-gray-700 hover:text-blue-600 transition"
            >
              Contact Us
            </Link>
            <Link
              href="/about"
              className="font-medium text-gray-700 hover:text-blue-600 transition"
            >
              About Us
            </Link>
          </nav>

          {/* Buttons */}
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 text-blue-600 font-medium border border-blue-600 rounded-md hover:bg-blue-50 transition">
              Login
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition">
              Sign up for free
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Grid paper background */}
        <div className="absolute inset-0 grid-paper-bg"></div>

        {/* Floating elements */}
        <div className="absolute top-[20%] right-[10%] w-64 h-64 rounded-full bg-blue-200 opacity-10 animate-float"></div>
        <div className="absolute bottom-[15%] left-[5%] w-48 h-48 rounded-full bg-blue-300 opacity-10 animate-float-delay"></div>

        <div className="container mx-auto px-6 relative z-10 pt-16">
          {/* Center - Main content */}
          <div className="w-full max-w-4xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Run your business
              <br />
              like a pro!!
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
              From managing teams to tracking tasks and clients, OfficeHour
              keeps everything—and everyone—in sync.
            </p>
            <button className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition text-lg shadow-lg transform hover:scale-105 duration-300">
              Get Started Free
            </button>
            <div className="mt-16">
              <p className="text-sm text-gray-500 mb-4">
                Trusted by innovative companies worldwide
              </p>
              <div className="flex justify-center gap-8 flex-wrap">
                <div className="w-24 h-8 bg-gray-300 rounded opacity-50"></div>
                <div className="w-24 h-8 bg-gray-300 rounded opacity-50"></div>
                <div className="w-24 h-8 bg-gray-300 rounded opacity-50"></div>
                <div className="w-24 h-8 bg-gray-300 rounded opacity-50"></div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .grid-paper-bg {
            width: 100%;
            height: 100%;
            --color: #e1e1e1;
            background-color: #f3f3f3;
            background-image: linear-gradient(
                0deg,
                transparent 24%,
                var(--color) 25%,
                var(--color) 26%,
                transparent 27%,
                transparent 74%,
                var(--color) 75%,
                var(--color) 76%,
                transparent 77%,
                transparent
              ),
              linear-gradient(
                90deg,
                transparent 24%,
                var(--color) 25%,
                var(--color) 26%,
                transparent 27%,
                transparent 74%,
                var(--color) 75%,
                var(--color) 76%,
                transparent 77%,
                transparent
              );
            background-size: 55px 55px;
          }
        `}</style>
      </section>

      {/* Mission Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-50 to-white">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" className="absolute inset-0">
            <pattern
              id="wave-pattern"
              width="100"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0,10 C30,0 70,0 100,10 C130,20 170,20 200,10"
                fill="none"
                stroke="#4F46E5"
                strokeWidth="2"
              />
            </pattern>
            <rect width="100%" height="100%" fill="url(#wave-pattern)" />
          </svg>
        </div>

        {/* Floating elements */}
        <div className="absolute top-[30%] left-[20%] w-32 h-32 rounded-lg bg-blue-200 opacity-20 rotate-12 animate-float"></div>
        <div className="absolute bottom-[20%] right-[15%] w-20 h-20 rounded-lg bg-blue-300 opacity-20 -rotate-12 animate-float-delay"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="w-full max-w-4xl mx-auto px-6 py-10 text-center">
            <div className="mb-10 transform hover:scale-105 transition duration-500">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-blue-100 shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-4xl md:text-5xl lg:text-5xl font-bold text-gray-900 mb-8">
              Our Mission
            </h3>
            <p className="text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
              At OfficeHour, we help business owners easily manage their teams,
              tasks, and clients—all in one place.
              <br />
              <br />
              With simple tools for communication, task tracking, and client
              management, we make running your business smoother and more
              efficient.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Sections with Sticky Scrolling Effect */}
      <div className="relative">
        {/* Feature Section: User & Role Management */}
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-gradient-to-tr from-blue-50 to-blue-100">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%234F46E5' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E\")",
                backgroundSize: "24px 24px",
              }}
            ></div>
          </div>

          {/* Abstract user silhouettes */}
          <div className="absolute top-[10%] right-[5%] opacity-10">
            <svg
              width="120"
              height="120"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                fill="#4F46E5"
              />
              <path
                d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z"
                fill="#4F46E5"
              />
            </svg>
          </div>
          <div className="absolute bottom-[15%] left-[10%] opacity-10">
            <svg
              width="100"
              height="100"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                fill="#4F46E5"
              />
              <path
                d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z"
                fill="#4F46E5"
              />
            </svg>
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row items-center max-w-6xl mx-auto">
              {/* Left side - Image */}
              <div className="w-full md:w-1/2 mb-10 md:mb-0 px-4">
                <div className="bg-blue-100 rounded-lg p-6 w-full h-96 flex items-center justify-center shadow-xl transform transition duration-500 hover:scale-105">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-32 w-32 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
              </div>

              {/* Right side - Content */}
              <div className="w-full md:w-1/2 md:pl-10 px-4">
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  👥 User & Role Management
                </h3>
                <h4 className="text-xl md:text-2xl font-semibold text-blue-600 mb-4">
                  Put the Right People in the Right Seats
                </h4>
                <p className="text-lg text-gray-700 mb-6">
                  No more access chaos.
                </p>
                <p className="text-lg text-gray-700 mb-6">
                  Create and manage users with laser-precise Role-Based Access
                  Control for:
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start transform transition duration-300 hover:translate-x-2">
                    <span className="text-xl mr-2">🔐</span>
                    <span>
                      <span className="font-medium">Admins</span> – Full control
                      of your business backend
                    </span>
                  </li>
                  <li className="flex items-start transform transition duration-300 hover:translate-x-2">
                    <span className="text-xl mr-2">🤝</span>
                    <span>
                      <span className="font-medium">Partners</span> – High-level
                      collaborators
                    </span>
                  </li>
                  <li className="flex items-start transform transition duration-300 hover:translate-x-2">
                    <span className="text-xl mr-2">💼</span>
                    <span>
                      <span className="font-medium">Business Executives</span> –
                      Manage, assign, monitor
                    </span>
                  </li>
                  <li className="flex items-start transform transition duration-300 hover:translate-x-2">
                    <span className="text-xl mr-2">🧠</span>
                    <span>
                      <span className="font-medium">Consultants</span> –
                      Strategic advisors with curated access
                    </span>
                  </li>
                </ul>
                <p className="text-lg font-medium text-gray-800">
                  You decide who sees what—nothing more, nothing less.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Section: Task Management */}
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-50 to-white">
          {/* Background pattern - checklist pattern */}
          <div className="absolute inset-0 opacity-5">
            <svg
              width="60"
              height="60"
              viewBox="0 0 60 60"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute inset-0"
              style={{ width: "100%", height: "100%" }}
            >
              <pattern
                id="checklist-pattern"
                x="0"
                y="0"
                width="60"
                height="60"
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x="10"
                  y="10"
                  width="20"
                  height="20"
                  rx="2"
                  fill="#10B981"
                />
                <path
                  d="M15 20L19 24L25 16"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </pattern>
              <rect width="100%" height="100%" fill="url(#checklist-pattern)" />
            </svg>
          </div>

          {/* Floating task cards */}
          <div className="absolute top-[20%] left-[15%] w-32 h-16 bg-green-200 rounded-md opacity-20 transform rotate-6 animate-float"></div>
          <div className="absolute bottom-[25%] right-[10%] w-24 h-12 bg-green-200 rounded-md opacity-20 transform -rotate-3 animate-float-delay"></div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row-reverse items-center max-w-6xl mx-auto">
              {/* Right side - Image */}
              <div className="w-full md:w-1/2 mb-10 md:mb-0 px-4">
                <div className="bg-green-100 rounded-lg p-6 w-full h-96 flex items-center justify-center shadow-xl transform transition duration-500 hover:scale-105">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-32 w-32 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                    />
                  </svg>
                </div>
              </div>

              {/* Left side - Content */}
              <div className="w-full md:w-1/2 md:pr-10 px-4">
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  ✅ Task Management
                </h3>
                <h4 className="text-xl md:text-2xl font-semibold text-green-600 mb-4">
                  Make Work Flow Like Clockwork
                </h4>
                <p className="text-lg text-gray-700 mb-6">
                  Stop wasting time in endless status meetings.
                </p>
                <p className="text-lg text-gray-700 mb-6">
                  With OfficeHour, seniors can assign tasks directly to their
                  juniors, track progress, and hit deadlines without chasing.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start transform transition duration-300 hover:translate-x-2">
                    <span className="text-xl mr-2">📌</span>
                    <span>Assign & track tasks</span>
                  </li>
                  <li className="flex items-start transform transition duration-300 hover:translate-x-2">
                    <span className="text-xl mr-2">🧠</span>
                    <span>Set priorities</span>
                  </li>
                  <li className="flex items-start transform transition duration-300 hover:translate-x-2">
                    <span className="text-xl mr-2">📊</span>
                    <span>Monitor productivity from your dashboard</span>
                  </li>
                </ul>
                <p className="text-lg font-medium text-gray-800">
                  Your team's day just got 10x more productive.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Section: Client Management */}
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-gradient-to-tr from-purple-50 to-purple-100">
          {/* Background pattern - network connections */}
          <div className="absolute inset-0 opacity-5">
            <svg width="100%" height="100%" className="absolute">
              <pattern
                id="network-pattern"
                x="0"
                y="0"
                width="100"
                height="100"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="10" cy="10" r="2" fill="#8B5CF6" />
                <circle cx="50" cy="20" r="2" fill="#8B5CF6" />
                <circle cx="30" cy="50" r="2" fill="#8B5CF6" />
                <circle cx="70" cy="60" r="2" fill="#8B5CF6" />
                <circle cx="90" cy="30" r="2" fill="#8B5CF6" />
                <path
                  d="M10 10L50 20L90 30"
                  stroke="#8B5CF6"
                  strokeWidth="0.5"
                />
                <path
                  d="M50 20L30 50L70 60"
                  stroke="#8B5CF6"
                  strokeWidth="0.5"
                />
              </pattern>
              <rect width="100%" height="100%" fill="url(#network-pattern)" />
            </svg>
          </div>

          {/* Floating elements - client cards */}
          <div className="absolute top-[15%] right-[10%] w-40 h-20 bg-purple-200 rounded-md opacity-20 transform rotate-3 animate-float"></div>
          <div className="absolute bottom-[20%] left-[5%] w-32 h-16 bg-purple-200 rounded-md opacity-20 transform -rotate-6 animate-float-delay"></div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row items-center max-w-6xl mx-auto">
              {/* Left side - Image */}
              <div className="w-full md:w-1/2 mb-10 md:mb-0 px-4">
                <div className="bg-purple-100 rounded-lg p-6 w-full h-96 flex items-center justify-center shadow-xl transform transition duration-500 hover:scale-105">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-32 w-32 text-purple-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
              </div>

              {/* Right side - Content */}
              <div className="w-full md:w-1/2 md:pl-10 px-4">
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  📇 Client Management
                </h3>
                <h4 className="text-xl md:text-2xl font-semibold text-purple-600 mb-4">
                  Know Your Clients, Inside and Out
                </h4>
                <p className="text-lg text-gray-700 mb-6">
                  Upload, organize, and centralize all your client data in one
                  place.
                </p>
                <p className="text-lg text-gray-700 mb-6">
                  Admins control what goes in, and the rest of the team can
                  access exactly what they need—instantly.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start transform transition duration-300 hover:translate-x-2">
                    <span className="text-xl mr-2">🗂️</span>
                    <span>Secure client records</span>
                  </li>
                  <li className="flex items-start transform transition duration-300 hover:translate-x-2">
                    <span className="text-xl mr-2">🔍</span>
                    <span>Easy access for non-admins</span>
                  </li>
                  <li className="flex items-start transform transition duration-300 hover:translate-x-2">
                    <span className="text-xl mr-2">📈</span>
                    <span>Stronger client relationships</span>
                  </li>
                </ul>
                <p className="text-lg font-medium text-gray-800">
                  No more Excel sheets. No more data silos.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Section: Group Chat */}
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-yellow-50 to-white">
          {/* Background pattern - speech bubbles */}
          <div className="absolute inset-0 opacity-5">
            <svg width="100%" height="100%" className="absolute">
              <pattern
                id="chat-pattern"
                x="0"
                y="0"
                width="120"
                height="120"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M10,50 C10,30 30,10 50,10 C70,10 90,30 90,50 C90,70 70,90 50,90 C40,90 30,85 25,80 L10,90 L15,70 C12,65 10,58 10,50"
                  fill="#EAB308"
                />
                <path
                  d="M40,110 C40,98 50,90 60,90 C70,90 80,98 80,110 C80,122 70,130 60,130 C55,130 50,125 48,120 L40,128 L42,116 C41,114 40,112 40,110"
                  fill="#EAB308"
                />
              </pattern>
              <rect width="100%" height="100%" fill="url(#chat-pattern)" />
            </svg>
          </div>

          {/* Floating elements - chat bubbles */}
          <div className="absolute top-[25%] left-[10%] w-32 h-24 rounded-tl-lg rounded-tr-lg rounded-br-lg bg-yellow-200 opacity-20 transform rotate-6 animate-float"></div>
          <div className="absolute bottom-[15%] right-[5%] w-24 h-20 rounded-tl-lg rounded-tr-lg rounded-bl-lg bg-yellow-200 opacity-20 transform -rotate-3 animate-float-delay"></div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row-reverse items-center max-w-6xl mx-auto">
              {/* Right side - Image */}
              <div className="w-full md:w-1/2 mb-10 md:mb-0 px-4">
                <div className="bg-yellow-100 rounded-lg p-6 w-full h-96 flex items-center justify-center shadow-xl transform transition duration-500 hover:scale-105">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-32 w-32 text-yellow-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                    />
                  </svg>
                </div>
              </div>

              {/* Left side - Content */}
              <div className="w-full md:w-1/2 md:pr-10 px-4">
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  💬 Group Chat
                </h3>
                <h4 className="text-xl md:text-2xl font-semibold text-yellow-600 mb-4">
                  One Team. One Thread.
                </h4>
                <p className="text-lg text-gray-700 mb-6">
                  Bring your whole team together.
                </p>
                <p className="text-lg text-gray-700 mb-6">
                  Discuss tasks, brainstorm ideas, or make quick decisions in
                  real-time with our built-in group chat.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start transform transition duration-300 hover:translate-x-2">
                    <span className="text-xl mr-2">💬</span>
                    <span>Fast internal communication</span>
                  </li>
                  <li className="flex items-start transform transition duration-300 hover:translate-x-2">
                    <span className="text-xl mr-2">🔒</span>
                    <span>Private and secure</span>
                  </li>
                  <li className="flex items-start transform transition duration-300 hover:translate-x-2">
                    <span className="text-xl mr-2">📱</span>
                    <span>Available on all devices</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Section: Smart Dashboard */}
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-gradient-to-tr from-indigo-50 to-blue-50">
          {/* Background pattern - dashboard graphs */}
          <div className="absolute inset-0 opacity-5">
            <svg width="100%" height="100%" className="absolute">
              <pattern
                id="dashboard-pattern"
                x="0"
                y="0"
                width="200"
                height="200"
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x="10"
                  y="10"
                  width="180"
                  height="120"
                  rx="5"
                  fill="none"
                  stroke="#4F46E5"
                  strokeWidth="1"
                />
                <rect
                  x="20"
                  y="30"
                  width="160"
                  height="90"
                  rx="2"
                  fill="none"
                  stroke="#4F46E5"
                  strokeWidth="1"
                />
                <path
                  d="M20,80 L50,60 L80,90 L110,40 L140,70 L170,50"
                  fill="none"
                  stroke="#4F46E5"
                  strokeWidth="2"
                />
                <circle cx="50" cy="60" r="2" fill="#4F46E5" />
                <circle cx="80" cy="90" r="2" fill="#4F46E5" />
                <circle cx="110" cy="40" r="2" fill="#4F46E5" />
                <circle cx="140" cy="70" r="2" fill="#4F46E5" />
                <circle cx="170" cy="50" r="2" fill="#4F46E5" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#dashboard-pattern)" />
            </svg>
          </div>

          {/* Floating elements - data indicators */}
          <div className="absolute top-[20%] right-[15%] w-24 h-24 rounded-lg bg-indigo-200 opacity-20 transform rotate-12 animate-float"></div>
          <div className="absolute bottom-[10%] left-[10%] w-32 h-20 rounded-lg bg-indigo-200 opacity-20 transform -rotate-6 animate-float-delay"></div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row items-center max-w-6xl mx-auto">
              {/* Left side - Image */}
              <div className="w-full md:w-1/2 mb-10 md:mb-0 px-4">
                <div className="bg-indigo-100 rounded-lg p-6 w-full h-96 flex items-center justify-center shadow-xl transform transition duration-500 hover:scale-105">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-32 w-32 text-indigo-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
              </div>

              {/* Right side - Content */}
              <div className="w-full md:w-1/2 md:pl-10 px-4">
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  📊 Smart Dashboard
                </h3>
                <h4 className="text-xl md:text-2xl font-semibold text-indigo-600 mb-4">
                  Insights That Drive Action
                </h4>
                <p className="text-lg text-gray-700 mb-6">
                  See what matters—at a glance.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start transform transition duration-300 hover:translate-x-2">
                    <span className="text-xl mr-2">👁️</span>
                    <span>Real-time task updates</span>
                  </li>
                  <li className="flex items-start transform transition duration-300 hover:translate-x-2">
                    <span className="text-xl mr-2">🚦</span>
                    <span>Project statuses</span>
                  </li>
                  <li className="flex items-start transform transition duration-300 hover:translate-x-2">
                    <span className="text-xl mr-2">🧮</span>
                    <span>Key business metrics</span>
                  </li>
                </ul>
                <p className="text-lg font-medium text-gray-800">
                  All in one visual, intuitive dashboard.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-600 to-blue-700 text-white">
        {/* Radial highlight */}
        <div
          className="absolute inset-0 bg-no-repeat bg-center"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)",
          }}
        ></div>

        {/* Upward arrow elements */}
        <div className="absolute top-[20%] left-[10%] w-16 h-32 opacity-10 transform rotate-45 animate-float">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 17L17 7M17 7H8M17 7V16"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="absolute bottom-[15%] right-[15%] w-16 h-32 opacity-10 transform rotate-45 animate-float-delay">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 17L17 7M17 7H8M17 7V16"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to transform your business?
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            Join thousands of businesses saving time and increasing productivity
            with OfficeHour.
          </p>
          <button className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-md hover:bg-blue-50 transition text-lg shadow-lg transform hover:scale-105 duration-300">
            Start Your Free Trial
          </button>
          <p className="mt-4 text-blue-100">
            No credit card required. 14-day free trial.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-gray-400">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <h3 className="text-xl font-bold text-white mb-4">OfficeHour</h3>
              <p className="max-w-xs">
                Streamline your business operations and boost productivity with
                OfficeHour.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-white font-semibold mb-4">Product</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="hover:text-white transition">
                      Features
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition">
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition">
                      Testimonials
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition">
                      FAQ
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Company</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="hover:text-white transition">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition">
                      Careers
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition">
                      Contact
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition">
                      Blog
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Legal</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="hover:text-white transition">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition">
                      Terms of Service
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition">
                      Cookie Policy
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center">
            <p>© 2023 OfficeHour. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
