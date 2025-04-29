<!-- # Office Hour


## 📋 Table of Contents

- [Overview](#overview)
- [Live Demo](#live-demo)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [System Architecture](#system-architecture)
- [Project Structure](#project-structure)
- [User Roles & Permissions](#user-roles--permissions)
- [Installation & Setup](#installation--setup)
- [Database Schema](#database-schema)
- [API Reference](#api-reference)
- [Performance Optimizations](#performance-optimizations)
- [Security Measures](#security-measures)
- [UI/UX Design](#uiux-design)
- [Deployment & CI/CD](#deployment--cicd)
- [Future Roadmap](#future-roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## 📝 Overview

MV Company is a comprehensive office management system designed to streamline workflow, enhance team collaboration, and manage client relationships effectively. Built with scalability and security in mind, it provides a unified platform for task management, client engagement, team communication, and resource tracking.

### 🎯 Objectives

- Streamline office workflow and task management
- Enhance team collaboration and communication
- Maintain comprehensive client management
- Provide role-based dashboards and access control
- Ensure data security and privacy compliance
- Enable real-time notifications and updates
- Facilitate efficient resource allocation

## 🚀 Live Demo

Access the live demo: [https://mvcompany.vercel.app/](https://mvcompany.vercel.app/)

## ✨ Key Features

### 🧑‍💼 User Management
- Multi-level user roles with granular permissions
- Secure authentication using NextAuth with Google OAuth integration
- Custom avatars using DiceBear API and Cloudinary
- User profiles with activity tracking

### 👥 Client Management
- Client portfolio organization with detailed profiles
- Segmentation between permanent and guest clients
- Client history tracking with pinnable important notes
- Secure credential storage for client systems
- Access expiry management for guest clients

### 📋 Task Management
- Comprehensive task creation with priority levels
- Multiple assignee support with task tracking
- Status updates with change history
- Deadline management with overdue detection
- Billing status tracking for completed tasks

### 💬 Communication System
- Integrated team chat
- Real-time notifications with keyboard shortcuts (alt+T)
- Detailed task comments with attachment support
- Client communication records

### 📊 Dashboard Experience
- Role-specific dashboards with relevant metrics
- Responsive design for all device sizes
- Collapsible sidebar for improved workspace
- Dark/light mode support for visual comfort

### 📂 Document & Resource Management
- Attachment organization by client and task
- Secure file upload via Cloudinary integration
- MIME type verification for security
- File size tracking and management

### 📱 Responsive Design
- Fully responsive mobile-first approach
- Custom mobile navigation experience
- Touch-friendly interface elements
- Optimized layouts for different screen sizes

### ⚙️ System Automation
- Scheduled tasks via cron jobs
- Automated cache warming for performance
- Expiration management for guest client access
- Intelligent data pruning and management

### 🔍 Activity Tracking
- Comprehensive audit logs for all system activities
- User action tracking for accountability
- Client interaction history
- Time-based activity reporting

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

MV Company follows a modern architecture leveraging Next.js App Router and the latest React patterns:

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

MV Company implements a sophisticated role-based access control system:

### ADMIN
- Full system access
- User management
- Client management
- Task creation and assignment
- Billing approval
- System configuration

### PARTNER
- Client portfolio management
- Team management for assigned clients
- Task creation and oversight
- Billing management
- Report generation

### Junior Staff
- Client relationship management
- Progress tracking
- Client communication
- Task execution
- Detail documentation
- Workspace Analytics
- Progress reporting

### PERMANENT_CLIENT
- Service request submission
- Task History Management with Notes pinning support
- Credentials Management
- Communication with assigned team

### GUEST_CLIENT
- Limited-time access(will be deleted from database on selected expiry date)
- Specific service access
- Basic communication features

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

MV Company provides a comprehensive REST API via Next.js API routes:

### Authentication
- `POST /api/auth/register` - Create new user account
- `POST /api/auth/login` - Authenticate user
- `GET /api/auth/session` - Get current session
- `POST /api/auth/reset-password` - Initiate password reset

### Users
- `GET /api/users` - List users (with filtering)
- `GET /api/users/:id` - Get user details
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Deactivate user
- `GET /api/users/me` - Get current user profile

### Tasks
- `GET /api/tasks` - List tasks (with filtering)
- `POST /api/tasks` - Create new task
- `GET /api/tasks/:id` - Get task details
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `PUT /api/tasks/:id/status` - Update task status
- `POST /api/tasks/:id/comments` - Add comment to task
- `GET /api/tasks/:id/comments` - Get task comments

### Clients
- `GET /api/clients` - List clients
- `POST /api/clients` - Create new client
- `GET /api/clients/:id` - Get client details
- `PUT /api/clients/:id` - Update client
- `DELETE /api/clients/:id` - Remove client
- `GET /api/clients/:id/tasks` - Get client tasks
- `GET /api/clients/:id/history` - Get client history

### Notifications
- `GET /api/notifications` - Get user notifications
- `PUT /api/notifications/:id` - Mark notification as read
- `DELETE /api/notifications/:id` - Delete notification

### Cron Jobs
- `POST /api/cron/expired-clients` - Process expired client access
- `POST /api/cron/cache-warmup` - Warm system caches

## ⚡ Performance Optimizations

MV Company incorporates several performance optimization techniques:

### Code Optimization
- **Package Import Optimization**: Selective imports from large packages
- **Bundle Size Reduction**: Using `@next/bundle-analyzer` for optimization
- **Code Splitting**: Lazy loading of non-critical components
- **Tree Shaking**: Removing unused code

### Rendering Strategies
- **Server Components**: Using Next.js App Router capabilities
- **Efficient Client Hydration**: Minimizing client-side JavaScript
- **Suspense and Lazy Loading**: For better loading experiences
- **Virtualization**: Using Tanstack Virtual for long lists

### Data Management
- **Redis Caching**: For frequently accessed data
- **Optimistic Updates**: For better UI responsiveness
- **Debouncing**: For input fields and search operations
- **Selective Refetching**: Minimizing data transfer

### Asset Optimization
- **Image Optimization**: Via Next.js image component and Cloudinary
- **SVG Optimization**: Clean SVGs with minimal paths
- **Font Optimization**: Subset loading and display swap
- **CSS Optimization**: TailwindCSS purging unused styles

### Infrastructure
- **Edge Caching**: Via Vercel's edge network
- **CDN Usage**: For static assets delivery
- **HTTP/2**: For parallel resource loading
- **Compression**: Using Brotli/gzip for text resources

## 🔒 Security Measures

Security is a top priority in MV Company:

### Authentication & Authorization
- **Secure Password Storage**: Using bcrypt for password hashing
- **JWT Implementation**: For secure session management
- **OAuth Integration**: For social login security
- **Role-Based Access Control**: Granular permissions
- **Session Management**: Automatic timeout and refresh

### Data Protection
- **Input Validation**: Using Zod for all form inputs
- **SQL Injection Prevention**: Using Prisma's parameterized queries
- **XSS Protection**: Content Security Policy headers
- **CSRF Protection**: Built into Next.js
- **Sensitive Data Encryption**: For stored credentials

### Infrastructure Security
- **HTTPS Only**: Enforced secure connections
- **Security Headers**: Implemented via Vercel.json
- **Rate Limiting**: For API endpoints
- **Environment Isolation**: Strict separation of environments
- **Secret Management**: Using environment variables

### Compliance Features
- **Data Minimization**: Collecting only necessary information
- **Audit Trails**: Comprehensive activity logging
- **Data Retention Policies**: Automated data cleanup
- **Privacy Controls**: User data management options
- **Secure Deletion**: Complete removal of user data when requested

## 🎨 UI/UX Design

MV Company features a thoughtfully crafted user interface:

### Design System
- **Component Library**: Custom-built UI components based on Radix primitives
- **Typography**: Consistent type scale with appropriate hierarchy
- **Color System**: Accessible color palette with dark/light modes
- **Spacing System**: Consistent spacing for visual harmony
- **Animation**: Subtle animations for enhanced feedback

### Accessibility
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader Support**: Semantic HTML with ARIA attributes
- **Focus Management**: Visible focus indicators
- **Color Contrast**: WCAG 2.1 AA compliant
- **Responsive Design**: Works on all screen sizes

### User Experience
- **Progressive Disclosure**: Complex features revealed as needed
- **Contextual Help**: Tooltips and guided interactions
- **Error Handling**: Clear error messages with recovery paths
- **Loading States**: Skeletons and progress indicators
- **Empty States**: Helpful guidance for new users

### Navigation
- **Responsive Sidebar**: Collapsible for space efficiency
- **Breadcrumbs**: For complex navigation paths
- **Search**: Quick access to system resources
- **Keyboard Shortcuts**: For power users (alt+T for notifications)
- **Context Preservation**: Maintaining state during navigation

## 🚢 Deployment & CI/CD

### Deployment Platform
- **Hosting**: Vercel for serverless deployment
- **Database**: Neon.tech for PostgreSQL
- **Caching**: Aiven for Redis
- **Storage**: Cloudinary for file storage

### CI/CD Pipeline
- **Source Control**: GitHub
- **Automated Testing**: On push and pull requests
- **Preview Deployments**: For pull request review
- **Production Deployment**: On main branch updates
- **Post-Deployment Verification**: Automated checks

### Monitoring
- **Error Tracking**: Vercel's built-in error monitoring
- **Performance Metrics**: Core Web Vitals tracking
- **Usage Analytics**: Anonymous user journey analysis
- **Uptime Monitoring**: Regular health checks
- **Log Management**: Structured logging for troubleshooting

## 🔮 Future Roadmap

MV Company is continuously evolving with plans for:

### Short-term
- Enhanced reporting capabilities
- Advanced search functionality
- File version control
- Kanban view for task management
- Email integration for task creation

### Medium-term
- Mobile application development
- API expansion for third-party integration
- Advanced analytics dashboard
- Time tracking features
- Service catalog management

### Long-term
- AI-assisted task prioritization
- Automated document processing
- Multi-language support
- White-label client portal
- Integration marketplace

## 🤝 Contributing

Contributions to MV Company are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code follows the project's coding standards and includes appropriate tests.


## 📞 Contact

### Project Creator

- **Sahil Vishwakarma** - [GitHub](https://github.com/sahilvishwa2108) - [LinkedIn](https://linkedin.com/in/sahilvishwa2108)
---

<p align="center">
  <i>Made with ❤️ by Sahil Vishwakarma</i>
</p> -->
