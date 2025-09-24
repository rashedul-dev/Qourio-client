# 🚀 Quorio - Delivery Management System

Quorio is a comprehensive, full-stack parcel delivery management system designed to streamline logistics for senders, receivers, and administrators. The frontend is a modern and responsive web application built with React, TypeScript, and Redux Toolkit, providing a seamless user experience for managing, tracking, and analyzing parcel deliveries.

## 🌐 Live Deployment

| Environment  | URL                                                    |
| ------------ | ------------------------------------------------------ |
| **Frontend** | [qourio.vercel.app](https://qourio.vercel.app)         |
| **Backend**  | [qourio-api.vercel.app](https://qourio-api.vercel.app) |

## ✨ Key Features

### 👥 Role-Based Dashboards

- **Sender**: Create, track, and manage outgoing parcels
- **Receiver**: View incoming parcels and confirm deliveries
- **Admin**: Comprehensive system oversight and management

### 📦 Parcel Lifecycle Management

- **Create & Track**: Full parcel creation and real-time tracking
- **Status Updates**: Complete status management throughout delivery process
- **Delivery Confirmation**: Secure receiver confirmation system

### 🔍 Advanced Tracking

- **Public Tracking Page**: Anyone can track parcels using tracking ID
- **Real-time Updates**: Live status updates and history tracking
- **Comprehensive Analytics**: Visual insights into delivery performance

### 🛡️ Security & Authentication

- **JWT Authentication**: Secure token-based authentication
- **Email Verification**: OTP-based email verification system
- **Role-based Access**: Granular permissions for different user types

### 🎨 Modern UI/UX

- **Responsive Design**: Optimized for desktop and mobile devices
- **Dark/Light Mode**: Toggle between themes for comfortable viewing
- **Shadcn UI**: Beautiful, accessible components built with Tailwind CSS

## 🛠️ Tech Stack

### Frontend

- **Framework**: React (Vite)
- **Language**: TypeScript
- **State Management**: Redux Toolkit, RTK Query
- **Styling**: Tailwind CSS, Shadcn UI
- **Routing**: React Router v6
- **Forms**: React Hook Form with Zod validation
- **Charts**: Recharts for data visualization

### Development Tools

- **Linting**: ESLint
- **Package Manager**: npm
- **Version Control**: Git

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or later)
- npm or yarn package manager

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18 or later)
- npm or another package manager

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/rashedul-dev/Qourio-client.git
    cd Qourio-client
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project by copying the example file:

    ```bash
    cp .env.example .env
    ```

    Populate the `.env` file with your specific configuration values.

4.  **Run the development server:**
    The application will be available at `http://localhost:3000`.
    ```bash
    npm run dev
    ```

### 🔐 Demo Credentials

You can use the following credentials to test the different user roles:

| Role     | Email                | Password       |
| -------- | -------------------- | -------------- |
| Admin    | `admin@gmail.com`    | `ADMIN!123`    |
| Sender   | `sender@gmail.com`   | `!SENDER123`   |
| Receiver | `receiver@gmail.com` | `!RECEIVER123` |

### 📜 Available Scripts

In the project directory, you can run:

- `npm run dev`
  Runs the app in development mode.

- `npm run build`
  Builds the app for production to the `dist` folder.

- `npm run lint`
  Lints the codebase using ESLint.

- `npm run preview`
  Serves the production build locally to preview it.

## 📂 Project Structure

The project is organized to separate concerns and maintain a clean codebase.

```
src/
├── App.tsx                         # Main application component with routing
├── main.tsx                        # Application entry point
├── index.css                       # Global styles and Tailwind imports
│
├── components/                     # UI components, layouts, and feature modules
│   ├── DeleteConfirmation.tsx      # Reusable confirmation dialog
│   ├── Error.tsx, ErrorBoundary.tsx # Error handling components
│   ├── Loading.tsx, NotFound.tsx   # Common UI states
│   ├── app-sidebar.tsx             # Main application sidebar
│   │
│   ├── icons/
│   │   └── Logo.tsx                # Application logo component
│   │
│   ├── layout/                     # Layout components
│   │   ├── CommonLayout.tsx        # Shared layout structure
│   │   ├── DashboardLayout.tsx     # Dashboard-specific layout
│   │   ├── Footer.tsx, Navbar.tsx  # Navigation components
│   │   └── ModeToggle.tsx          # Dark/light mode toggle
│   │
│   ├── modules/                    # Feature-specific components
│   │   ├── authentication/         # Auth-related components
│   │   │   ├── LoginForm.tsx       # User login form
│   │   │   └── RegisterForm.tsx    # User registration form
│   │   │
│   │   ├── admin/                  # Admin panel components
│   │   │   ├── parcels/            # Parcel management
│   │   │   │   ├── AdminParcelDetails.tsx     # Parcel detail view
│   │   │   │   ├── AdminParcelModal.tsx       # Parcel edit modal
│   │   │   │   ├── AdminParcelsTable.tsx      # Parcels data table
│   │   │   │   │
│   │   │   │   └── analytics/      # Analytics dashboard
│   │   │   │       ├── Overview-cards.tsx               # Key metrics cards
│   │   │   │       ├── Delivery-status-bar-chart.tsx    # Delivery status chart
│   │   │   │       └── Type-pie-chart.tsx              # Parcel type distribution
│   │   │   │
│   │   │   └── users/              # User management
│   │   │       └── UsersTable.tsx  # Users data table
│   │   │
│   │   ├── home/                   # Homepage sections
│   │   │   ├── hero-section.tsx    # Hero banner
│   │   │   ├── features-section.tsx # Features showcase
│   │   │   ├── pricing-section.tsx # Pricing information
│   │   │   └── testimonials-section.tsx # Customer testimonials
│   │   │
│   │   ├── receiver/               # Receiver dashboard components
│   │   │   ├── ReceiverHistoryParcelTable.tsx  # Delivery history table
│   │   │   └── ReceiverIncomingParcelTable.tsx # Incoming parcels table
│   │   │
│   │   ├── sender/                 # Sender dashboard components
│   │   │   ├── SendParcelModal.tsx # New parcel creation modal
│   │   │   ├── SenderParcelTable.tsx # Sent parcels table
│   │   │   └── StatusTimeLine.tsx  # Parcel status timeline
│   │   │
│   │   └── trackParcel/            # Parcel tracking components
│   │       ├── track-parcel-form.tsx # Tracking number input form
│   │       ├── tracking-results.tsx # Tracking results display
│   │       └── timeline.tsx        # Parcel tracking timeline
│   │
│   └── ui/                         # Reusable Shadcn UI components
│       ├── button.tsx, card.tsx    # Basic UI components
│       ├── form.tsx, input.tsx     # Form components
│       ├── table.tsx, dialog.tsx   # Data display components
│       └── ... other shadcn components
│
├── config/                         # Configuration settings
│   └── index.ts                    # App configuration constants
│
├── hooks/                          # Custom React hooks
│   ├── use-mobile.ts               # Mobile device detection hook
│   └── useTheme.ts                 # Theme management hook
│
├── lib/                            # Core utility libraries
│   ├── axios.ts                    # Axios HTTP client configuration
│   └── utils.ts                    # General utility functions
│
├── pages/                          # Top-level page components for routes
│   ├── HomePage.tsx                # Landing page
│   ├── Login.tsx, Register.tsx     # Authentication pages
│   ├── TrackParcel.tsx             # Parcel tracking page
│   │
│   ├── admin/                      # Admin dashboard pages
│   │   ├── analytics/Analytics.tsx # Admin analytics dashboard
│   │   ├── parcels/ViewParcels.tsx # All parcels overview
│   │   └── user/AllUsers.tsx       # User management page
│   │
│   ├── receiver/                   # Receiver dashboard pages
│   │   ├── DeliveryHistory.tsx     # Past deliveries page
│   │   └── IncomingParcels.tsx     # Expected deliveries page
│   │
│   └── sender/                     # Sender dashboard pages
│       ├── MyParcels.tsx           # Sent parcels overview
│       └── ParcelStatus.tsx        # Individual parcel status
│
├── providers/                      # React context providers
│   └── theme-provider.tsx          # Theme context provider component
│
├── redux/                          # Redux Toolkit state management
│   ├── api/                        # Base API configuration
│   │   ├── axiosBaseQuery.ts       # Custom Axios base query for RTK Query
│   │   └── baseApi.ts              # Base API slice configuration
│   │
│   ├── features/                   # RTK Query API slices
│   │   ├── auth/authApi.ts         # Authentication API endpoints
│   │   ├── parcel/parcelApi.ts     # Parcel operations API
│   │   └── user/userApi.ts         # User management API
│   │
│   ├── hooks.ts                    # Typed Redux hooks
│   └── store.ts                    # Redux store configuration
│
├── routes/                         # React Router configuration
│   ├── index.tsx                   # Main routing setup
│   ├── constants.ts                # Route constants and paths
│   └── *SidebarItems.ts            # Role-based sidebar navigation
│
├── types/                          # TypeScript type definitions
│   ├── auth-type.ts                # Authentication-related types
│   ├── parcel-type.ts              # Parcel data types
│   └── user-type.ts                # User data types
│
└── utils/                          # General utility functions
    ├── estimatedDeliveryDate.ts    # Delivery date calculation
    ├── formatAddress.ts            # Address formatting utility
    ├── getStatusColor.ts           # Status color mapping
    └── withAuth.tsx                # HOC for authentication
├── tsconfig.json                   # TypeScript configuration
├── vite.config.ts                  # Vite build configuration
└── vercel.json                     # Vercel deployment configuration
```

## ⚙️ Environment Variables

The following environment variables are required for the application to run. Create a `.env` file from the `.env.example` and provide the necessary values.

```env
# VITE_BASE_URL=http://localhost:5000/api/v1
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=template_id
VITE_EMAILJS_PUBLIC_ID=your_public_id
```

<div align="left">
Built with ❤️ using modern web technologies
</div>
