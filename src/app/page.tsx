"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Head from "next/head";

export default function Home() {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [heroVisible, setHeroVisible] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const heroRef = useRef(null);

  // Preload the hero background image as early as possible
  useEffect(() => {
    // Use theme-aware background
    document.body.style.backgroundColor = "";

    // Preload image
    const img = new Image();
    img.src = "/9161244.png";
    img.onload = () => {
      setImageLoaded(true);
    };
  }, []);

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

  // Set up intersection observer for hero section
  // Replace your current Intersection Observer useEffect with this:
  useEffect(() => {
    const handleScrollFade = () => {
      // Fade out the hero background immediately after minimal scrolling
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      const fadeThreshold = viewportHeight * 0.4; // 10% of viewport height

      if (scrollPosition > fadeThreshold) {
        setHeroVisible(false);
      } else {
        setHeroVisible(true);
      }
    };

    // Initial check
    handleScrollFade();

    // Add scroll event listener
    window.addEventListener("scroll", handleScrollFade);

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScrollFade);
    };
  }, []);

  return (
    <>
      <Head>
        {/* Preload critical image */}
        <link rel="preload" href="/9161244.png" as="image" />
        {/* Ensure light theme for landing page */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
            body, html { 
              margin: 0;
              padding: 0;
            }
            .hero-section-base {
              background-color: #f3f3f3;
            }
          `,
          }}
        />
      </Head>

      <main className="min-h-screen bg-white">
        {/* Header - Rounded and detached */}
        <header
          className={`fixed w-full z-[100] transition-all duration-300 ${
            visible ? "top-4" : "-top-28"
          }`}
        >
          <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-gray-200">
            <div className="flex items-center">
              <h1 className="text-lg font-bold text-black">OfficeHour</h1>
            </div>

            {/* Navigation - Reduced spacing */}
            <nav className="hidden md:flex space-x-6">
              <a href="/" className="hover-underline-animation">
                Home
              </a>
              <a href="/features" className="hover-underline-animation">
                Features
              </a>
              <a href="/pricing" className="hover-underline-animation">
                Pricing
              </a>
              <a href="/contact" className="hover-underline-animation">
                Contact Us
              </a>
              <a href="/about" className="hover-underline-animation">
                About Us
              </a>
            </nav>

            {/* Buttons - More compact */}
            <div className="flex items-center space-x-2 md:space-x-3">
              <Link href="/login">
                <button className="btn-fancy">Login</button>
              </Link>
              <Link href="/login">
                <button className="btn-fancy">Sign up</button>
              </Link>
            </div>
          </div>

          <style jsx>{`
            .hover-underline-animation {
              font-size: 15px;
              color: #000000;
              font-family: inherit;
              font-weight: normal;
              cursor: pointer;
              position: relative;
              border: none;
              background: none;
              text-transform: uppercase;
              transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
              transition-duration: 400ms;
              transition-property: color;
              text-decoration: none;
            }

            .hover-underline-animation:focus,
            .hover-underline-animation:hover {
              color: #000000;
            }

            .hover-underline-animation:after {
              content: "";
              pointer-events: none;
              bottom: -2px;
              left: 50%;
              position: absolute;
              width: 0%;
              height: 2px;
              background-color: #000000;
              transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
              transition-duration: 400ms;
              transition-property: width, left;
            }

            .hover-underline-animation:focus:after,
            .hover-underline-animation:hover:after {
              width: 100%;
              left: 0%;
            }

            .btn-fancy {
              width: 100px;
              height: 35px;
              font-size: 0.9em;
              cursor: pointer;
              background-color: #171717;
              color: #fff;
              border: none;
              border-radius: 5px;
              transition: all 0.4s;
              padding: 6px 12px;
              font-weight: 500;
            }

            @media (min-width: 768px) {
              .btn-fancy {
                width: 130px;
                height: 40px;
                font-size: 1.1em;
                padding: 8px 16px;
              }
            }

            .btn-fancy:hover {
              border-radius: 5px;
              transform: translateY(-10px);
              box-shadow: 0 7px 0 -2px #f85959, 0 15px 0 -4px #39a2db,
                0 16px 10px -3px #39a2db;
            }

            .btn-fancy:active {
              transition: all 0.2s;
              transform: translateY(-5px);
              box-shadow: 0 2px 0 -2px #f85959, 0 8px 0 -4px #39a2db,
                0 12px 10px -3px #39a2db;
            }
          `}</style>
        </header>

        {/* Hero Section - Modified for instant loading */}
        <section
          ref={heroRef}
          className="min-h-screen flex items-center justify-center relative overflow-hidden bg-white hero-section-base"
        >
          {/* Grid paper background - Immediately visible */}
          <div
            className="absolute inset-0 grid-paper-bg"
            style={{ opacity: 1 }}
          ></div>

          {/* Background Image with Animation - Only this element animates */}
          <div
            className={`absolute inset-0 z-[15] transition-all duration-1000 ${
              heroVisible && imageLoaded
                ? "opacity-85 translate-y-0"
                : "opacity-0 translate-y-20"
            }`}
            style={{
              backgroundImage: "url('/9161244.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              pointerEvents: "none",
            }}
          ></div>

          {/* Floating elements - No animation for initial load */}
          <div className="absolute top-[20%] right-[10%] w-64 h-64 rounded-full bg-blue-200 opacity-10 animate-float"></div>
          <div className="absolute bottom-[15%] left-[5%] w-48 h-48 rounded-full bg-blue-300 opacity-10 animate-float-delay"></div>

          <div className="container mx-auto px-6 relative z-10">
            {/* Center - Main content */}
            <div className="w-full max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                Run your business
                <br />
                like a pro!!
              </h2>
              <p className="text-lg md:text-xl lg:text-2xl text-gray-600 mb-6 md:mb-8 max-w-2xl mx-auto">
                From managing teams to tracking tasks and clients, OfficeHour
                keeps everything—and everyone—in sync.
              </p>
              <Link href="/login">
                <button className="btn-glow">Get Started Free</button>
              </Link>
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

            @keyframes float {
              0% {
                transform: translateY(0) rotate(0);
              }
              50% {
                transform: translateY(-15px) rotate(5deg);
              }
              100% {
                transform: translateY(0) rotate(0);
              }
            }

            @keyframes float-delay {
              0% {
                transform: translateY(0) rotate(0);
              }
              50% {
                transform: translateY(-10px) rotate(-5deg);
              }
              100% {
                transform: translateY(0) rotate(0);
              }
            }

            .animate-float {
              animation: float 6s ease-in-out infinite;
            }

            .animate-float-delay {
              animation: float-delay 7s ease-in-out infinite;
              animation-delay: 1s;
            }

            .btn-glow {
              position: relative;
              padding: 12px 20px; /* Reduced padding for shorter width */
              border-radius: 7px;
              border: 1px solid #000; /* Black border */
              font-size: 15px; /* Slightly smaller font */
              text-transform: uppercase;
              font-weight: 600;
              letter-spacing: 2px;
              background: #000; /* Black background */
              color: #fff;
              overflow: hidden;
              box-shadow: 0 0 0 0 transparent;
              -webkit-transition: all 0.2s ease-in;
              -moz-transition: all 0.2s ease-in;
              transition: all 0.2s ease-in;
              width: auto; /* Let content determine width */
              min-width: 180px; /* Add minimum width */
              max-width: 220px; /* Add maximum width */
            }

            .btn-glow:hover {
              background: #0d9488; /* Changed to teal-600 color */
              border-color: #0d9488; /* Changed to match teal */
              box-shadow: 0 0 30px 5px rgba(13, 148, 136, 0.5); /* Teal shadow */
              -webkit-transition: all 0.2s ease-out;
              -moz-transition: all 0.2s ease-out;
              transition: all 0.2s ease-out;
            }
            .btn-glow:hover::before {
              -webkit-animation: sh02 0.5s 0s linear;
              -moz-animation: sh02 0.5s 0s linear;
              animation: sh02 0.5s 0s linear;
            }

            .btn-glow::before {
              content: "";
              display: block;
              width: 0px;
              height: 86%;
              position: absolute;
              top: 7%;
              left: 0%;
              opacity: 0;
              background: #fff;
              box-shadow: 0 0 50px 30px #fff;
              -webkit-transform: skewX(-20deg);
              -moz-transform: skewX(-20deg);
              -ms-transform: skewX(-20deg);
              -o-transform: skewX(-20deg);
              transform: skewX(-20deg);
            }

            @keyframes sh02 {
              from {
                opacity: 0;
                left: 0%;
              }

              50% {
                opacity: 1;
              }

              to {
                opacity: 0;
                left: 100%;
              }
            }

            .btn-glow:active {
              box-shadow: 0 0 0 0 transparent;
              -webkit-transition: box-shadow 0.2s ease-in;
              -moz-transition: box-shadow 0.2s ease-in;
              transition: box-shadow 0.2s ease-in;
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
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-black"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 2H21l-3 6 3 6h-8.5l-1-2H5a2 2 0 00-2 2zm9-13.5V9"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 md:mb-8">
                Our Mission
              </h3>
              <p className="text-sm md:text-base lg:text-lg xl:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
                At OfficeHour, we help business owners easily manage their
                teams, tasks, and clients—all in one place.
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
          <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-gradient-to-tr from-blue-50 to-blue-100 rounded-tl-[4rem] rounded-tr-[4rem]">
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
              <div className="flex flex-col md:flex-row items-stretch max-w-7xl mx-auto">
                {/* Left side - Image */}
                <div className="w-full md:w-3/5 mb-6 md:mb-10 px-2 md:px-4">
                  <div className="bg-transparent rounded-lg w-full shadow-xl transform transition duration-500 hover:scale-105 overflow-hidden flex items-center justify-center">
                    <img 
                      src="/user.png" 
                      alt="User & Role Management Dashboard"
                      className="w-full h-auto object-contain rounded-lg"
                    />
                  </div>
                </div>

                {/* Right side - Content */}
                <div className="w-full md:w-2/5 md:pl-10 px-2 md:px-4 flex flex-col justify-center">
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
                    User & Role Management
                  </h3>
                  <h4 className="text-lg md:text-xl lg:text-2xl font-semibold text-blue-600 mb-3 md:mb-4">
                    Put the Right People in the Right Seats
                  </h4>
                  <p className="text-base md:text-lg text-gray-700 mb-4 md:mb-6">
                    No more access chaos.
                  </p>
                  <p className="text-base md:text-lg text-gray-700 mb-4 md:mb-6">
                    Create and manage users with laser-precise Role-Based Access
                    Control for:
                  </p>
                  <ul className="space-y-2 md:space-y-4 mb-6 md:mb-8">
                    <li className="flex items-start transform transition duration-300 hover:translate-x-2 text-black">
                      <span className="font-medium mr-2 text-black">•</span>
                      <span>
                        <span className="font-medium">Admins</span> – Full
                        control of your business backend
                      </span>
                    </li>
                    <li className="flex items-start transform transition duration-300 hover:translate-x-2 text-black">
                      <span className="font-medium mr-2 text-black">•</span>
                      <span>
                        <span className="font-medium">Partners</span> –
                        High-level collaborators
                      </span>
                    </li>
                    <li className="flex items-start transform transition duration-300 hover:translate-x-2 text-black">
                      <span className="font-medium mr-2 text-black">•</span>
                      <span>
                        <span className="font-medium">Business Executives</span>{" "}
                        – Manage, assign, monitor
                      </span>
                    </li>
                    <li className="flex items-start transform transition duration-300 hover:translate-x-2 text-black">
                      <span className="font-medium mr-2 text-black">•</span>
                      <span>
                        <span className="font-medium">Consultants</span> –
                        Strategic advisors with curated access
                      </span>
                    </li>
                  </ul>
                  <p className="text-base md:text-lg font-medium text-gray-800">
                    You decide who sees what—nothing more, nothing less.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Section: Task Management */}
          <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-50 to-white rounded-tl-[4rem] rounded-tr-[4rem]">
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
                <rect
                  width="100%"
                  height="100%"
                  fill="url(#checklist-pattern)"
                />
              </svg>
            </div>

            {/* Floating task cards */}
            <div className="absolute top-[20%] left-[15%] w-32 h-16 bg-green-200 rounded-md opacity-20 transform rotate-6 animate-float"></div>
            <div className="absolute bottom-[25%] right-[10%] w-24 h-12 bg-green-200 rounded-md opacity-20 transform -rotate-3 animate-float-delay"></div>

            <div className="container mx-auto px-6 relative z-10">
              <div className="flex flex-col md:flex-row-reverse items-stretch max-w-7xl mx-auto">
                {/* Right side - Image */}
                <div className="w-full md:w-3/5 mb-6 md:mb-10 px-2 md:px-4 flex">
                  <div className="bg-transparent rounded-lg w-full shadow-xl transform transition duration-500 hover:scale-105 overflow-hidden flex items-center justify-center">
                    <img 
                      src="/task.png" 
                      alt="Task Management Dashboard"
                      className="w-full h-auto object-contain rounded-lg"
                    />
                  </div>
                </div>

                {/* Left side - Content */}
                <div className="w-full md:w-2/5 md:pr-10 px-2 md:px-4 flex flex-col justify-center">
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
                    Task Management
                  </h3>
                  <h4 className="text-lg md:text-xl lg:text-2xl font-semibold text-green-600 mb-3 md:mb-4">
                    Make Work Flow Like Clockwork
                  </h4>
                  <p className="text-base md:text-lg text-gray-700 mb-4 md:mb-6">
                    Stop wasting time in endless status meetings.
                  </p>
                  <p className="text-base md:text-lg text-gray-700 mb-4 md:mb-6">
                    With OfficeHour, seniors can assign tasks directly to their
                    juniors, track progress, and hit deadlines without chasing.
                  </p>
                  <ul className="space-y-2 md:space-y-4 mb-6 md:mb-8">
                    <li className="flex items-start transform transition duration-300 hover:translate-x-2 text-black">
                      <span className="font-medium mr-2 text-black">•</span>
                      <span>Assign & track tasks</span>
                    </li>
                    <li className="flex items-start transform transition duration-300 hover:translate-x-2 text-black">
                      <span className="font-medium mr-2 text-black">•</span>
                      <span>Set priorities</span>
                    </li>
                    <li className="flex items-start transform transition duration-300 hover:translate-x-2 text-black">
                      <span className="font-medium mr-2 text-black">•</span>
                      <span>Monitor productivity from your dashboard</span>
                    </li>
                  </ul>
                  <p className="text-base md:text-lg font-medium text-gray-800">
                    Your team's day just got 10x more productive.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Section: Client Management */}
          <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-gradient-to-tr from-purple-50 to-purple-100 rounded-tl-[4rem] rounded-tr-[4rem]">
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
              <div className="flex flex-col md:flex-row items-stretch max-w-7xl mx-auto">
                {/* Left side - Image */}
                <div className="w-full md:w-3/5 mb-6 md:mb-10 px-2 md:px-4 flex">
                  <div className="bg-transparent rounded-lg w-full shadow-xl transform transition duration-500 hover:scale-105 overflow-hidden flex items-center justify-center">
                    <img 
                      src="/client.png" 
                      alt="Client Management Dashboard"
                      className="w-full h-auto object-contain rounded-lg"
                    />
                  </div>
                </div>

                {/* Right side - Content */}
                <div className="w-full md:w-2/5 md:pl-10 px-2 md:px-4 flex flex-col justify-center">
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
                    Client Management
                  </h3>
                  <h4 className="text-lg md:text-xl lg:text-2xl font-semibold text-purple-600 mb-3 md:mb-4">
                    Know Your Clients, Inside and Out
                  </h4>
                  <p className="text-base md:text-lg text-gray-700 mb-4 md:mb-6">
                    Upload, organize, and centralize all your client data in one
                    place.
                  </p>
                  <p className="text-base md:text-lg text-gray-700 mb-4 md:mb-6">
                    Admins control what goes in, and the rest of the team can
                    access exactly what they need—instantly.
                  </p>
                  <ul className="space-y-2 md:space-y-4 mb-6 md:mb-8">
                    <li className="flex items-start transform transition duration-300 hover:translate-x-2 text-black">
                      <span className="font-medium mr-2 text-black">•</span>
                      <span>Secure client records</span>
                    </li>
                    <li className="flex items-start transform transition duration-300 hover:translate-x-2 text-black">
                      <span className="font-medium mr-2 text-black">•</span>
                      <span>Easy access for non-admins</span>
                    </li>
                    <li className="flex items-start transform transition duration-300 hover:translate-x-2 text-black">
                      <span className="font-medium mr-2 text-black">•</span>
                      <span>Stronger client relationships</span>
                    </li>
                  </ul>
                  <p className="text-base md:text-lg font-medium text-gray-800">
                    No more Excel sheets. No more data silos.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Section: Group Chat */}
          <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-yellow-50 to-white rounded-tl-[4rem] rounded-tr-[4rem]">
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
              <div className="flex flex-col md:flex-row-reverse items-stretch max-w-7xl mx-auto">
                {/* Right side - Image */}
                <div className="w-full md:w-3/5 mb-6 md:mb-10 px-2 md:px-4 flex">
                  <div className="bg-transparent rounded-lg w-full shadow-xl transform transition duration-500 hover:scale-105 overflow-hidden flex items-center justify-center">
                    <img 
                      src="/chat.png" 
                      alt="Group Chat Interface"
                      className="w-full h-auto object-contain rounded-lg"
                    />
                  </div>
                </div>

                {/* Left side - Content */}
                <div className="w-full md:w-2/5 md:pr-10 px-2 md:px-4 flex flex-col justify-center">
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
                    Group Chat
                  </h3>
                  <h4 className="text-lg md:text-xl lg:text-2xl font-semibold text-yellow-600 mb-3 md:mb-4">
                    One Team. One Thread.
                  </h4>
                  <p className="text-base md:text-lg text-gray-700 mb-4 md:mb-6">
                    Bring your whole team together.
                  </p>
                  <p className="text-base md:text-lg text-gray-700 mb-4 md:mb-6">
                    Discuss tasks, brainstorm ideas, or make quick decisions in
                    real-time with our built-in group chat.
                  </p>
                  <ul className="space-y-2 md:space-y-4 mb-6 md:mb-8">
                    <li className="flex items-start transform transition duration-300 hover:translate-x-2 text-black">
                      <span className="font-medium mr-2 text-black">•</span>
                      <span>Fast internal communication</span>
                    </li>
                    <li className="flex items-start transform transition duration-300 hover:translate-x-2 text-black">
                      <span className="font-medium mr-2 text-black">•</span>
                      <span>Private and secure</span>
                    </li>
                    <li className="flex items-start transform transition duration-300 hover:translate-x-2 text-black">
                      <span className="font-medium mr-2 text-black">•</span>
                      <span>Available on all devices</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Section: Smart Dashboard */}
          <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-gradient-to-tr from-orange-50 to-orange-100 rounded-tl-[4rem] rounded-tr-[4rem]">
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
                <rect
                  width="100%"
                  height="100%"
                  fill="url(#dashboard-pattern)"
                />
              </svg>
            </div>

            {/* Floating elements - data indicators */}
            <div className="absolute top-[20%] right-[15%] w-24 h-24 rounded-lg bg-indigo-200 opacity-20 transform rotate-12 animate-float"></div>
            <div className="absolute bottom-[10%] left-[10%] w-32 h-20 rounded-lg bg-indigo-200 opacity-20 transform -rotate-6 animate-float-delay"></div>

            <div className="container mx-auto px-6 relative z-10">
              <div className="flex flex-col md:flex-row items-stretch max-w-7xl mx-auto">
                {/* Left side - Image */}
                <div className="w-full md:w-3/5 mb-6 md:mb-10 px-2 md:px-4 flex">
                  <div className="bg-transparent rounded-lg w-full shadow-xl transform transition duration-500 hover:scale-105 overflow-hidden flex items-center justify-center">
                    <img 
                      src="/dashboard.png" 
                      alt="Smart Dashboard"
                      className="w-full h-auto object-contain rounded-lg"
                    />
                  </div>
                </div>

                {/* Right side - Content */}
                <div className="w-full md:w-2/5 md:pl-10 px-2 md:px-4 flex flex-col justify-center">
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
                    Smart Dashboard
                  </h3>
                  <h4 className="text-lg md:text-xl lg:text-2xl font-semibold text-orange-600 mb-3 md:mb-4">
                    Insights That Drive Action
                  </h4>
                  <p className="text-base md:text-lg text-gray-700 mb-4 md:mb-6">
                    See what matters—at a glance.
                  </p>
                  <ul className="space-y-2 md:space-y-4 mb-6 md:mb-8">
                    <li className="flex items-start transform transition duration-300 hover:translate-x-2 text-black">
                      <span className="font-medium mr-2 text-black">•</span>
                      <span>Real-time task updates</span>
                    </li>
                    <li className="flex items-start transform transition duration-300 hover:translate-x-2 text-black">
                      <span className="font-medium mr-2 text-black">•</span>
                      <span>Project statuses</span>
                    </li>
                    <li className="flex items-start transform transition duration-300 hover:translate-x-2 text-black">
                      <span className="font-medium mr-2 text-black">•</span>
                      <span>Key business metrics</span>
                    </li>
                  </ul>
                  <p className="text-base md:text-lg font-medium text-gray-800">
                    All in one visual, intuitive dashboard.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        {/* CTA Section */}
        {/* CTA Section */}
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-black to-blue-800 text-white">
          {/* Radial highlight */}
          <div
            className="absolute inset-0 bg-no-repeat bg-center"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)",
            }}
          ></div>

          {/* Upward arrow elements */}
          <div className="absolute top-[15%] left-[10%] w-32 h-32 opacity-15 animate-float">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlSpace="preserve"
              version="1.1"
              viewBox="0 0 784.11 815.53"
              fill="white"
            >
              <path d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"></path>
            </svg>
          </div>

          <div className="absolute top-[25%] right-[15%] w-20 h-20 opacity-15 animate-float-delay">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlSpace="preserve"
              version="1.1"
              viewBox="0 0 784.11 815.53"
              fill="white"
            >
              <path d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"></path>
            </svg>
          </div>

          <div className="absolute bottom-[25%] left-[20%] w-24 h-24 opacity-15 animate-float">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlSpace="preserve"
              version="1.1"
              viewBox="0 0 784.11 815.53"
              fill="white"
            >
              <path d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"></path>
            </svg>
          </div>

          <div className="absolute bottom-[15%] right-[10%] w-16 h-16 opacity-15 animate-float-delay">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlSpace="preserve"
              version="1.1"
              viewBox="0 0 784.11 815.53"
              fill="white"
            >
              <path d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"></path>
            </svg>
          </div>

          <div className="container mx-auto px-6 relative z-10 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 md:mb-8">
              Ready to Take Control of Your Business?
            </h2>
            <p className="text-lg md:text-2xl mb-8 md:mb-12 max-w-3xl mx-auto">
              Start your journey with OfficeHour today. Get a free walkthrough
              and see how effortless business management can be.
            </p>

            {/* Star Button */}
            <Link href="/login">
              <button className="star-button relative">
              Create Your Free Account
              <div className="star-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlSpace="preserve"
                  version="1.1"
                  style={{
                    shapeRendering: "geometricPrecision",
                    textRendering: "geometricPrecision",
                    imageRendering: "auto",
                    fillRule: "evenodd",
                    clipRule: "evenodd",
                  }}
                  viewBox="0 0 784.11 815.53"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <g id="Layer_x0020_1">
                    <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                    <path
                      className="fil0"
                      d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                    ></path>
                  </g>
                </svg>
              </div>
              <div className="star-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlSpace="preserve"
                  version="1.1"
                  style={{
                    shapeRendering: "geometricPrecision",
                    textRendering: "geometricPrecision",
                    imageRendering: "auto",
                    fillRule: "evenodd",
                    clipRule: "evenodd",
                  }}
                  viewBox="0 0 784.11 815.53"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <g id="Layer_x0020_1">
                    <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                    <path
                      className="fil0"
                      d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                    ></path>
                  </g>
                </svg>
              </div>
              <div className="star-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlSpace="preserve"
                  version="1.1"
                  style={{
                    shapeRendering: "geometricPrecision",
                    textRendering: "geometricPrecision",
                    imageRendering: "auto",
                    fillRule: "evenodd",
                    clipRule: "evenodd",
                  }}
                  viewBox="0 0 784.11 815.53"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <g id="Layer_x0020_1">
                    <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                    <path
                      className="fil0"
                      d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                    ></path>
                  </g>
                </svg>
              </div>
              <div className="star-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlSpace="preserve"
                  version="1.1"
                  style={{
                    shapeRendering: "geometricPrecision",
                    textRendering: "geometricPrecision",
                    imageRendering: "auto",
                    fillRule: "evenodd",
                    clipRule: "evenodd",
                  }}
                  viewBox="0 0 784.11 815.53"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <g id="Layer_x0020_1">
                    <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                    <path
                      className="fil0"
                      d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                    ></path>
                  </g>
                </svg>
              </div>
              <div className="star-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlSpace="preserve"
                  version="1.1"
                  style={{
                    shapeRendering: "geometricPrecision",
                    textRendering: "geometricPrecision",
                    imageRendering: "auto",
                    fillRule: "evenodd",
                    clipRule: "evenodd",
                  }}
                  viewBox="0 0 784.11 815.53"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <g id="Layer_x0020_1">
                    <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                    <path
                      className="fil0"
                      d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                    ></path>
                  </g>
                </svg>
              </div>
              <div className="star-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlSpace="preserve"
                  version="1.1"
                  style={{
                    shapeRendering: "geometricPrecision",
                    textRendering: "geometricPrecision",
                    imageRendering: "auto",
                    fillRule: "evenodd",
                    clipRule: "evenodd",
                  }}
                  viewBox="0 0 784.11 815.53"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <g id="Layer_x0020_1">
                    <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                    <path
                      className="fil0"
                      d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                    ></path>
                  </g>
                </svg>
              </div>
            </button>
            </Link>
          </div>

          {/* Add this CSS for the star button */}
          <style jsx>{`

            .star-button {
              position: relative;
              padding: 10px 20px;
              background: #000000;
              font-size: 14px;
              font-weight: 500;
              color: #fff;
              border: 3px solid #fec195;
              border-radius: 8px;
              box-shadow: 0 0 0 #fec1958c;
              transition: all 0.3s ease-in-out;
              cursor: pointer;
            }

            @media (min-width: 768px) {
              .star-button {
                padding: 12px 35px;
                font-size: 18px;
              }
            }

            .star-1 {
              position: absolute;
              top: 20%;
              left: 20%;
              width: 25px;
              height: auto;
              filter: drop-shadow(0 0 0 #fffdef);
              z-index: -5;
              transition: all 1s cubic-bezier(0.05, 0.83, 0.43, 0.96);
            }

            .star-2 {
              position: absolute;
              top: 45%;
              left: 45%;
              width: 15px;
              height: auto;
              filter: drop-shadow(0 0 0 #fffdef);
              z-index: -5;
              transition: all 1s cubic-bezier(0, 0.4, 0, 1.01);
            }

            .star-3 {
              position: absolute;
              top: 40%;
              left: 40%;
              width: 5px;
              height: auto;
              filter: drop-shadow(0 0 0 #fffdef);
              z-index: -5;
              transition: all 1s cubic-bezier(0, 0.4, 0, 1.01);
            }

            .star-4 {
              position: absolute;
              top: 20%;
              left: 40%;
              width: 8px;
              height: auto;
              filter: drop-shadow(0 0 0 #fffdef);
              z-index: -5;
              transition: all 0.8s cubic-bezier(0, 0.4, 0, 1.01);
            }

            .star-5 {
              position: absolute;
              top: 25%;
              left: 45%;
              width: 15px;
              height: auto;
              filter: drop-shadow(0 0 0 #fffdef);
              z-index: -5;
              transition: all 0.6s cubic-bezier(0, 0.4, 0, 1.01);
            }

            .star-6 {
              position: absolute;
              top: 5%;
              left: 50%;
              width: 5px;
              height: auto;
              filter: drop-shadow(0 0 0 #fffdef);
              z-index: -5;
              transition: all 0.8s ease;
            }

            .star-button:hover {
              background: transparent;
              color: #fec195;
              box-shadow: 0 0 25px #fec1958c;
            }

            .star-button:hover .star-1 {
              position: absolute;
              top: -80%;
              left: -30%;
              width: 25px;
              height: auto;
              filter: drop-shadow(0 0 10px #fffdef);
              z-index: 2;
            }

            .star-button:hover .star-2 {
              position: absolute;
              top: -25%;
              left: 10%;
              width: 15px;
              height: auto;
              filter: drop-shadow(0 0 10px #fffdef);
              z-index: 2;
            }

            .star-button:hover .star-3 {
              position: absolute;
              top: 55%;
              left: 25%;
              width: 5px;
              height: auto;
              filter: drop-shadow(0 0 10px #fffdef);
              z-index: 2;
            }

            .star-button:hover .star-4 {
              position: absolute;
              top: 30%;
              left: 80%;
              width: 8px;
              height: auto;
              filter: drop-shadow(0 0 10px #fffdef);
              z-index: 2;
            }

            .star-button:hover .star-5 {
              position: absolute;
              top: 25%;
              left: 115%;
              width: 15px;
              height: auto;
              filter: drop-shadow(0 0 10px #fffdef);
              z-index: 2;
            }

            .star-button:hover .star-6 {
              position: absolute;
              top: 5%;
              left: 60%;
              width: 5px;
              height: auto;
              filter: drop-shadow(0 0 10px #fffdef);
              z-index: 2;
            }

            .fil0 {
              fill: #fffdef;
            }
          `}</style>
        </section>

        {/* Footer */}
        <footer className="py-16 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
          <div className="container mx-auto px-6 text-center">
            <div className="mb-8">
              <h3 className="text-3xl font-bold text-white mb-4">
                OfficeHour
              </h3>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Streamline your business operations and boost productivity with OfficeHour. 
                The all-in-one solution for modern teams.
              </p>
            </div>
            
            <div className="border-t border-gray-700 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <p className="text-gray-400">
                  © 2025 OfficeHour. All rights reserved.
                </p>
                <p className="text-gray-400 flex items-center">
                  Made with 
                  <span className="text-red-500 mx-1 animate-pulse">♥</span>
                  by 
                  <span className="text-orange-400 ml-1 font-semibold">Priyesh Kurmi</span>
                </p>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
