<p align="center">
  <img src="https://i.ibb.co/vvJ0YBmw/image-1.png" alt="OfficeHour Logo" width="400">
</p>

# OfficeHour - Office Management System

## 📋 Table of Contents

- [Overview](#overview)
- [Problem & Solution](#problem--solution)
- [Live Demo](#live-demo)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [System Architecture](#system-architecture)
- [Project Structure](#project-structure)
- [User Roles & Permissions](#user-roles--permissions)
- [Screenshots/Demo](#screenshotsdemo)
- [Installation & Setup](#installation--setup)
- [API Reference](#api-reference)
- [Performance Optimizations](#performance-optimizations)
- [Security Measures](#security-measures)
- [UI/UX Design](#uiux-design)
- [Deployment & CI/CD](#deployment--cicd)
- [Limitations & Future Features](#limitations--future-features)
- [What I Learned](#what-i-learned)
- [Contributing](#contributing)
- [Contact](#contact)

## 📝 Overview

OfficeHour is an advanced office management system designed to simplify workflows, improve team collaboration, and efficiently manage client relationships. With a focus on scalability and security, it offers a unified platform for task management, client engagement, team communication, and resource tracking.

## 🛠️ Problem & Solution

### The Problem
Managing office workflows, client relationships, and team collaboration often involves using multiple disconnected tools. This leads to:
- Inefficient task management and missed deadlines.
- Poor communication between team members and clients.
- Difficulty in tracking progress and managing resources.
- Security risks with sensitive client data spread across various platforms.
- Limited scalability for growing businesses.

### Our Solution
OfficeHour addresses these challenges by providing:
- **Centralized Task Management**: A unified platform for creating, tracking, and prioritizing tasks.
- **Improved Collaboration**: Real-time chat, notifications, and role-based dashboards to enhance team communication.
- **Comprehensive Client Management**: Detailed client profiles, history tracking, and secure credential storage.
- **Enhanced Security**: Role-based access control, encrypted data storage, and compliance with privacy standards.
- **Scalability**: Built with modern technologies to grow with your business needs.

## 🚀 Live Demo

Explore the live demo to experience OfficeHour in action, including its key features and user interface:
[**Visit the Website**](https://officehour.vercel.app)

<!-- > The website includes:
> - Step-by-step usage instructions.
> - Screenshots of key features.
> - A walkthrough of the user interface. -->

## ✨ Key Features

### 🧑‍💼 User Management
- Role-based access control with multi-level permissions.
- Secure authentication using NextAuth with Google OAuth integration.
- Customizable user avatars via DiceBear API and Cloudinary.
- Detailed user profiles with activity tracking and audit logs.

### 👥 Client Management
- Organized client portfolios with detailed profiles.
- Segmentation of permanent and guest clients for tailored access.
- Client history tracking with the ability to pin important notes.
- Secure credential storage and access expiry management for guest clients.

### 📋 Task Management
- Create, assign, and prioritize tasks with multiple assignees.
- Track task progress with status updates and change history.
- Manage deadlines with overdue detection and reminders.
- Billing status tracking for completed tasks.

### 💬 Communication & Collaboration
- Integrated team chat for seamless communication.
- Real-time notifications with keyboard shortcuts (e.g., Alt+T).
- Task-specific comments with attachment support.
- Centralized client communication records.

### 📊 Dashboard & Analytics
- Role-specific dashboards displaying relevant metrics and insights.
- Fully responsive design for desktop, tablet, and mobile devices.
- Collapsible sidebar for improved workspace efficiency.
- Dark and light mode support for enhanced user comfort.

### 📂 Document & Resource Management
- Organize attachments by client and task for easy access.
- Secure file uploads with Cloudinary integration and MIME type verification.
- File size tracking and management for optimized storage.

### 📱 Responsive Design
- Mobile-first approach with optimized layouts for all screen sizes.
- Touch-friendly interface elements for better usability.
- Custom mobile navigation for a seamless experience.

### ⚙️ System Automation
- Scheduled tasks and cron jobs for automated workflows.
- Automated cache warming to enhance performance.
- Intelligent data pruning and expiration management for guest clients.

### 🔍 Activity Tracking & Reporting
- Comprehensive audit logs for all system activities.
- User action tracking for accountability and transparency.
- Time-based activity reports for performance analysis.
- Detailed client interaction history.

### 🔒 Security & Compliance
- Role-based access control to ensure data security.
- Encrypted data storage and compliance with privacy standards.
- Regular security audits and activity monitoring.

### 🚀 Performance Optimization
- Lazy loading and caching for faster performance.
- Optimized layouts and components for smooth user experiences.
- Real-time updates powered by WebSockets.

### 🌟 Additional Features
- Multi-language support for global accessibility (planned).
- AI-assisted task prioritization (future roadmap).
- Integration with third-party tools for extended functionality.

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 15.2.4 with App Router
- **UI Library**: React 19.0.0
- **Styling**: TailwindCSS 4.x with custom UI components
- **Component Library**: Radix UI, Shadcn/ui, React DayPicker etc.
- **Theme Management**: next-themes for dark/light mode support
- **Virtualization**: @tanstack/react-virtual
- **Animation**: framer-motion
- **State Management**: React Hooks with Context API
- **Form Handling**: React Hook Form with Zod validation
- **Date Handling**: date-fns
- **Icons**: Lucide React
- **Toast Notifications**: Sonner
- **PDF Generation**: jsPDF

### Backend
- **API Routes**: Next.js API routes with serverless functions
- **Database ORM**: Prisma 6.6.0
- **Authentication**: NextAuth.js 4.24.7
- **Password Hashing**: bcryptjs for secure credential storage
- **Encryption**: crypto-js for data encryption
- **Token Management**: JWT for secure authentication
- **Utility Functions**: lodash for common operations
- **ID Generation**: uuid for unique identifiers
- **Email Service**: Nodemailer with Gmail SMTP
- **File Storage**: Cloudinary
- **Caching**: Redis via Aiven (valkey)
- **WebSockets & PubSub**: Socket.io for real-time features
- **Webhook Processing**: Svix

### Database & Storage
- **Primary Database**: PostgreSQL (hosted on Neon.tech)
- **Caching Layer**: Redis
- **File Storage**: Cloudinary CDN
- **Schema Management**: Prisma Schema

### DevOps & Infrastructure
- **Hosting**: Vercel
- **CI/CD**: Vercel GitHub Integration
- **Cron Jobs**: Vercel Cron
- **Environment Management**: cross-env for cross-platform environment variables

### Development Tools
- **Language**: TypeScript 5.x
- **Linting**: ESLint 9.x
- **Package Management**: npm
- **Build Optimization**: 
  - @next/bundle-analyzer
  - Compression Webpack Plugin
  - Next.js optimizePackageImports

## 🏗️ System Architecture

OfficeHour is built on a modern architecture utilizing Next.js App Router and the latest React best practices.

```
Client (Browser/Mobile)
    ↑↓
Next.js App (Vercel Edge Network)
    ↑↓
API Layer (Next.js API Routes)
    ↑↓
Service Layer (Business Logic)
    ↑↓
Data Access Layer (Prisma ORM)
    ↑↓
PostgreSQL Database (Neon.tech)
```

**Additional Services:**
- Redis for caching and performance
- Cloudinary for asset storage and optimization
- Socket.io for real-time communications
- Nodemailer for email notifications

## 📁 Project Structure

```
🏢 office_management_system/
│
├── 📂 src/
│   ├── 📱 app/                           # Next.js App Router
│   │   ├── 🔌 api/                       # API Routes
│   │   │   ├── 📊 activities/            # Activity tracking
│   │   │   ├── 👑 admin/                 # Admin operations
│   │   │   ├── 🔐 auth/                  # Authentication
│   │   │   ├── 💬 chat/                  # Messaging system
│   │   │   ├── 🏢 clients/               # Client management 
│   │   │   ├── ⏱️ cron/                  # Scheduled tasks
│   │   │   ├── 👨‍💼 junior/               # Junior staff APIs
│   │   │   ├── 🔔 notifications/         # Alert system
│   │   │   ├── 🤝 partner/               # Partner dashboard
│   │   │   ├── ✅ tasks/                 # Task operations
│   │   │   └── 👤 users/                 # User management
│   │   │
│   │   ├── 📊 dashboard/                 # Protected routes
│   │   │   ├── 👑 admin/                 # Admin interface
│   │   │   ├── 💬 chat/                  # Messaging UI
│   │   │   ├── 🏢 clients/               # Client management
│   │   │   ├── 👨‍💼 junior/               # Junior dashboard
│   │   │   ├── 🤝 partner/               # Partner interface
│   │   │   ├── ⚙️ settings/              # User settings
│   │   │   └── ✅ tasks/                 # Task management
│   │   │
│   │   ├── 🔑 forgot-password/          # Password recovery
│   │   ├── 🎨 globals.css               # Global styles
│   │   ├── 📄 layout.tsx                # Root layout
│   │   ├── 🔒 login/                    # Authentication
│   │   ├── ❓ not-found.tsx             # 404 page
│   │   ├── 🏠 page.tsx                  # Landing page
│   │   ├── 🔏 set-password/             # Password setup
│   │   └── 🚪 signout/                  # Logout functionality
│   │
│   ├── 🧩 components/                    # Reusable UI components
│   │   ├── 👑 admin/                     # Admin components
│   │   ├── 🏢 clients/                   # Client components
│   │   ├── ☁️ cloudinary/                # File upload
│   │   ├── 📊 dashboard/                 # Dashboard UI
│   │   ├── 📐 layouts/                   # Page templates
│   │   ├── ⌛ loading/                   # Loading states
│   │   ├── 🔔 notifications/             # Alert components
│   │   ├── ✅ tasks/                     # Task components
│   │   ├── 🌓 theme-provider.tsx         # Theme context
│   │   └── 🎮 ui/                        # UI component library
│   │       ├── 🚨 alert-dialog.tsx       # Confirmations
│   │       ├── 👤 avatar.tsx             # User avatars
│   │       ├── 🏷️ badge.tsx              # Status indicators
│   │       ├── 🧭 breadcrumbs.tsx        # Navigation
│   │       ├── 🔘 button.tsx             # Button styles
│   │       ├── 📅 calendar.tsx           # Date picker
│   │       ├── 🗂️ card.tsx               # Card containers
│   │       └── ... (30+ UI components)    # Component library
│   │
│   ├── 🌐 context/                       # React context
│   │   └── 🔐 auth-provider.tsx          # Auth state
│   │
│   ├── 🪝 hooks/                         # Custom React hooks
│   │   ├── 💾 use-cached-fetch.tsx       # Data caching
│   │   ├── ⏱️ use-debounce.tsx           # Input debouncing
│   │   ├── 📱 use-media-query.tsx        # Responsive design
│   │   ├── 📲 use-mobile.tsx             # Mobile detection
│   │   └── 🔄 use-optimistic-mutation.tsx # Optimistic UI
│   │
│   ├── 🛠️ lib/                           # Utility functions
│   │   ├── 📊 activity-logger.ts         # Activity tracking
│   │   ├── ⚠️ api-error-handler.ts       # Error handling
│   │   ├── 🔐 auth.ts                    # Authentication
│   │   ├── 💾 cache.ts                   # Server caching
│   │   ├── ☁️ cloudinary.ts              # File storage
│   │   ├── 📧 email.ts                   # Email service
│   │   ├── 🔔 notifications.ts           # Alert system
│   │   ├── 🔍 permissions.ts             # Access control
│   │   ├── 💽 prisma.ts                  # Database client
│   │   ├── 🗄️ redis.ts                   # Redis connection
│   │   └── ... (10+ utility modules)     # Helper functions
│   │
│   ├── 🎨 styles/                        # Additional styles
│   │   └── 📅 day-picker.css             # Datepicker CSS
│   │
│   └── 📝 types/                         # TypeScript types
│       └── 🔐 next-auth.d.ts             # Auth definitions
│
├── 📧 emails/                            # Email templates
│   └── 📑 templates/                     # Message templates
│
├── 🗃️ prisma/                            # Database config
│   ├── 📊 schema.prisma                  # Database schema
│   └── 🌱 seed.ts                        # Seed data
│
├── 🖼️ public/                            # Static assets
│   └── 📷 images/                        # Image files
│
├── 📄 .env                               # Environment variables
├── 🙈 .gitignore                         # Git exclusions
├── 🧩 components.json                    # UI component config
├── 🧹 eslint.config.mjs                  # Linting rules
├── 🔒 middleware.ts                      # Auth middleware
├── ⚙️ next.config.ts                     # Next.js config
├── 📦 package.json                       # Dependencies
├── 🎨 postcss.config.mjs                 # CSS processing
├── 📚 README.md                          # Documentation
├── ⚙️ tsconfig.json                      # TypeScript config
└── 🚀 vercel.json                        # Deployment config
```

## 👥 User Roles & Permissions

OfficeHour features a robust role-based access control system to ensure secure and efficient operations:

### **Admin**
- Complete system access and configuration.
- Manage users, clients, and tasks.
- Approve billing and oversee system settings.

### **Partner**
- Manage client portfolios and assigned teams.
- Create and oversee tasks.
- Handle billing and generate reports.

### **Junior Staff**
- Manage client relationships and task execution.
- Track progress and document details.
- Provide workspace analytics and progress reports.

### **Permanent Client**
- Submit service requests and manage task history.
- Pin important notes and securely store credentials.
- Communicate with the assigned team.

### **Guest Client**
- Temporary access with an expiration date.
- Limited service access and basic communication features.

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v18.x or higher)
- npm or yarn
- PostgreSQL database
- Redis instance (optional but recommended)
- Cloudinary account
- Email provider credentials

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/sahilvishwa2108/office_management_system.git
   cd office_management_system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file with the used variables:

4. **Initialize the database**
   ```bash
   npx prisma migrate dev --name init
   ```

5. **Seed the database (optional)**
   ```bash
   npm run seed
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

7. **Build for production**
   ```bash
   npm run build
   ```

8. **Start production server**
   ```bash
   npm run start
   ```
## 📡 API Reference

OfficeHour provides a comprehensive REST API via Next.js API routes:

### **Authentication**
- `POST /api/auth/register` - Register a new user account.
- `POST /api/auth/login` - Authenticate a user.
- `GET /api/auth/session` - Retrieve the current session.
- `POST /api/auth/reset-password` - Initiate a password reset.

### **Users**
- `GET /api/users` - List all users with filtering options.
- `GET /api/users/:id` - Retrieve user details.
- `PUT /api/users/:id` - Update user information.
- `DELETE /api/users/:id` - Deactivate a user.
- `GET /api/users/me` - Retrieve the current user's profile.

### **Tasks**
- `GET /api/tasks` - List tasks with filtering options.
- `POST /api/tasks` - Create a new task.
- `GET /api/tasks/:id` - Retrieve task details.
- `PUT /api/tasks/:id` - Update task information.
- `DELETE /api/tasks/:id` - Delete a task.
- `PUT /api/tasks/:id/status` - Update task status.
- `POST /api/tasks/:id/comments` - Add a comment to a task.
- `GET /api/tasks/:id/comments` - Retrieve task comments.

### **Clients**
- `GET /api/clients` - List all clients.
- `POST /api/clients` - Create a new client.
- `GET /api/clients/:id` - Retrieve client details.
- `PUT /api/clients/:id` - Update client information.
- `DELETE /api/clients/:id` - Remove a client.
- `GET /api/clients/:id/tasks` - Retrieve tasks associated with a client.
- `GET /api/clients/:id/history` - Retrieve client history.

### **Notifications**
- `GET /api/notifications` - Retrieve user notifications.
- `PUT /api/notifications/:id` - Mark a notification as read.
- `DELETE /api/notifications/:id` - Delete a notification.

### **Cron Jobs**
- `POST /api/cron/expired-clients` - Process expired client access.
- `POST /api/cron/cache-warmup` - Warm up system caches.

---

## ⚡ Performance Optimizations

OfficeHour incorporates several techniques to ensure optimal performance:

### **Code Optimization**
- **Selective Imports**: Import only required modules from large packages.
- **Bundle Size Reduction**: Use tools like `@next/bundle-analyzer`.
- **Code Splitting**: Lazy load non-critical components.
- **Tree Shaking**: Remove unused code during build.

### **Rendering Strategies**
- **Server Components**: Leverage Next.js App Router for server-side rendering.
- **Efficient Hydration**: Minimize client-side JavaScript.
- **Lazy Loading**: Load components and data only when needed.
- **Virtualization**: Use libraries like Tanstack Virtual for long lists.

### **Data Management**
- **Caching**: Use Redis for frequently accessed data.
- **Optimistic Updates**: Improve UI responsiveness.
- **Debouncing**: Optimize input fields and search operations.
- **Selective Refetching**: Minimize unnecessary data transfers.

### **Asset Optimization**
- **Image Optimization**: Use Next.js image component and Cloudinary.
- **SVG Optimization**: Simplify SVGs for faster rendering.
- **Font Optimization**: Load only required font subsets.
- **CSS Optimization**: Purge unused styles with TailwindCSS.

### **Infrastructure**
- **Edge Caching**: Utilize Vercel's edge network for faster delivery.
- **CDN**: Deliver static assets via a content delivery network.
- **Compression**: Use Brotli and gzip for text-based resources.

---

## 🔒 Security Measures

OfficeHour prioritizes security with robust measures:

### **Authentication & Authorization**
- **Secure Passwords**: Hash passwords using bcrypt.
- **JWT Tokens**: Manage sessions securely.
- **OAuth Integration**: Enable secure social logins.
- **Role-Based Access Control**: Enforce granular permissions.
- **Session Management**: Automatic session timeouts and refresh.

### **Data Protection**
- **Input Validation**: Validate all inputs using Zod.
- **SQL Injection Prevention**: Use Prisma's parameterized queries.
- **XSS Protection**: Implement Content Security Policy headers.
- **CSRF Protection**: Built-in protection via Next.js.
- **Data Encryption**: Encrypt sensitive data like credentials.

### **Infrastructure Security**
- **HTTPS Enforcement**: Ensure secure connections.
- **Security Headers**: Configure headers via Vercel.
- **Rate Limiting**: Prevent abuse of API endpoints.
- **Environment Isolation**: Separate development, staging, and production environments.
- **Secret Management**: Use environment variables for sensitive data.

### **Compliance Features**
- **Data Minimization**: Collect only necessary information.
- **Audit Trails**: Log all user and system activities.
- **Data Retention Policies**: Automate data cleanup.
- **Privacy Controls**: Allow users to manage their data.
- **Secure Deletion**: Permanently delete user data upon request.

---

## 🎨 UI/UX Design

OfficeHour offers a user-friendly and accessible interface:

### **Design System**
- **Custom Components**: Built on Radix primitives.
- **Consistent Typography**: Clear hierarchy and readability.
- **Accessible Colors**: WCAG-compliant dark and light modes.
- **Responsive Spacing**: Maintain visual harmony across layouts.
- **Subtle Animations**: Enhance user feedback.

### **Accessibility**
- **Keyboard Navigation**: Full support for keyboard users.
- **Screen Reader Compatibility**: Semantic HTML with ARIA attributes.
- **Focus Indicators**: Visible focus for interactive elements.
- **Color Contrast**: Meets WCAG 2.1 AA standards.
- **Responsive Design**: Optimized for all screen sizes.

### **User Experience**
- **Progressive Disclosure**: Reveal advanced features as needed.
- **Contextual Help**: Tooltips and guided interactions.
- **Error Handling**: Clear messages with recovery options.
- **Loading States**: Skeletons and progress indicators.
- **Empty States**: Provide helpful guidance for new users.

### **Navigation**
- **Responsive Sidebar**: Collapsible for better workspace management.
- **Breadcrumbs**: Simplify navigation in complex workflows.
- **Search**: Quickly access resources and data.
- **Keyboard Shortcuts**: Boost productivity (e.g., Alt+T for notifications).
- **State Preservation**: Maintain context during navigation.

---

## 🚢 Deployment & CI/CD

### **Deployment Platform**
- **Hosting**: Vercel for serverless deployment.
- **Database**: Neon.tech for PostgreSQL.
- **Caching**: Aiven for Redis.
- **Storage**: Cloudinary for file management.

### **CI/CD Pipeline**
- **Source Control**: GitHub for version management.
- **Automated Testing**: Run tests on push and pull requests.
- **Preview Deployments**: Review changes with preview builds.
- **Production Deployment**: Automatically deploy on main branch updates.
- **Post-Deployment Checks**: Verify deployments with automated tests.

### **Monitoring**
- **Error Tracking**: Monitor errors with Vercel's built-in tools.
- **Performance Metrics**: Track Core Web Vitals.
- **Usage Analytics**: Analyze user behavior anonymously.
- **Uptime Monitoring**: Ensure system availability.
- **Log Management**: Structured logs for debugging.

---

## 🔮 Limitations & Future Features

OfficeHour is continuously improving, with plans to address current limitations and introduce new features:

### Current Limitations
- Limited mobile app support.
- Basic time tracking and analytics.
- No integration marketplace for third-party tools.
- Single-language support.

### Upcoming Features
- Mobile app for on-the-go access.
- Advanced time tracking and reporting.
- AI-powered task prioritization.
- Multi-language support for global users.
- White-label client portals for branding.
- Integration marketplace for third-party tools.
- Automated document processing for efficiency.

## 🤝 Contributing

We welcome contributions to OfficeHour! To contribute:

1. **Fork the Repository**: Click the "Fork" button at the top of this repository.
2. **Create a Feature Branch**: 
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make Your Changes**: Ensure your code adheres to the project's coding standards.
4. **Commit Your Changes**: Write clear and concise commit messages.
   ```bash
   git commit -m "Add: Description of your feature"
   ```
5. **Push to Your Branch**:
   ```bash
   git push origin feature/your-feature-name
   ```
6. **Open a Pull Request**: Submit your changes for review.

> **Note**: Please include appropriate tests and documentation for your changes. Ensure your code passes all linting and testing checks before submitting.

---

## 📚 What I Learned

Working on OfficeHour has been an enriching experience, allowing me to gain valuable insights and skills in various areas:

### **Technical Skills**
- **Full-Stack Development**: Building a scalable and secure application using Next.js, Prisma, and PostgreSQL.
- **Authentication & Security**: Implementing secure authentication flows with NextAuth and role-based access control.
- **Performance Optimization**: Leveraging caching, lazy loading, and code splitting for improved application performance.
- **Real-Time Features**: Integrating WebSockets for real-time notifications and updates.
- **DevOps**: Setting up CI/CD pipelines, managing environment variables, and deploying to Vercel.

### **Project Management**
- **Planning & Execution**: Breaking down complex features into manageable tasks and delivering them incrementally.
- **Version Control**: Using Git and GitHub for collaborative development and maintaining a clean commit history.
- **Documentation**: Writing clear and concise documentation for users and contributors.

### **Soft Skills**
- **Problem-Solving**: Addressing challenges like data consistency, scalability, and user experience.
- **Collaboration**: Working with contributors and gathering feedback to improve the project.
- **Time Management**: Balancing development, testing, and deployment within deadlines.

This project has not only strengthened my technical expertise but also enhanced my ability to manage and deliver a complete software solution.

## 📞 Contact

Thank you for taking the time to explore OfficeHour! We appreciate your interest and support. For any inquiries or assistance, feel free to reach out:

- **Priyesh Kurmi**  
  - [GitHub](https://github.com/priyesh-kurmi)  
  - [LinkedIn](https://linkedin.com/in/priyesh-kurmi)  
  - [Email](mailto:kpriyesh1908@gmail.com)

---

<p align="center">
  <i>Developed with dedication and passion by Priyesh Kurmi</i>
</p>