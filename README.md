# 🌐 CreatorSphere AI — AI Content Creator Marketplace

> **CreatorSphere AI** is a role-separated creator discovery and collaboration marketplace connecting verified brands with creators across 26+ industry categories. Featuring AI Studio tools, full analytics dashboards, portfolio showcases, secure order workflows, and instant notifications.

---

## 🔗 Quick Links
- **Live Website:** [https://ai-content-creator-7ypk.onrender.com](https://ai-content-creator-7ypk.onrender.com)
- **GitHub Repository:** [https://github.com/bhavanichinnapureddy-hub/AI-Content-Creator](https://github.com/bhavanichinnapureddy-hub/AI-Content-Creator)

---

## 👥 Demo Access & Judge Credentials

Judges and evaluators can log in using the dedicated portals below:

| Role | Direct Portal URL | Email / Username | Password |
|---|---|---|---|
| **🛡️ Admin** | [`/admin/login`](https://ai-content-creator-7ypk.onrender.com/admin/login) | `admin` | `AdminPassword123!` |
| **🎨 Creator** | [`/creator/login`](https://ai-content-creator-7ypk.onrender.com/creator/login) | `aria.montgomery@creator.contenthub.io` | `Password123!` |
| **💼 Customer / Brand** | [`/customer/login`](https://ai-content-creator-7ypk.onrender.com/customer/login) | `sarah@luminaryaudio.com` | `Password123!` |

---

## 🏗️ Architecture & How It Was Built

CreatorSphere AI is built as a reactive Single Page Application (SPA) powered by React 19 and Vite with an integrated Node.js preview runtime for zero-latency mock state synchronization.

```
┌─────────────────────────────────────────────────────────────┐
│                       CreatorSphere AI                      │
├─────────────────┬──────────────────────┬────────────────────┤
│  🛡️ Admin Role   │   🎨 Creator Role    │  💼 Customer Role  │
├─────────────────┼──────────────────────┼────────────────────┤
│ • Platform Stats│ • AI Studio Tools    │ • Creator Discovery│
│ • Creator Verif.│ • Portfolio Manager  │ • Campaign Creation│
│ • Fraud Reports │ • Proposal Sender    │ • Order Tracking   │
│ • Revenue Charts│ • Earnings & Payouts │ • Direct Messaging │
└────────┬────────┴──────────┬───────────┴──────────┬─────────┘
         │                   │                      │
         └───────────────────┼──────────────────────┘
                             ▼
     ┌──────────────────────────────────────────────────┐
     │           Centralized Auth & State Layer         │
     │      (React Context API + Custom Hooks)          │
     ├──────────────────────────────────────────────────┤
     │  • Role-Based Access Control (RBAC) Router       │
     │  • Reactive State Synchronizer                   │
     │  • Toast Notification & Theme Providers          │
     └───────────────────────┬──────────────────────────┘
                             ▼
     ┌──────────────────────────────────────────────────┐
     │         Data Persistence & Storage Layer         │
     │  • LocalStorage Schema Engine (Client-side DB)   │
     │  • Seed Mock Database (26+ Categories & Users)   │
     │  • Node.js SMTP Backend Handler (/api/reset)     │
     └──────────────────────────────────────────────────┘
```

---

## 💾 Database & Storage Architecture

The platform uses a persistent, normalized client-side storage architecture with fallback to rich seed databases:

### 1. Storage Engine
- **Primary Persistence:** Browser `LocalStorage` key-value engine with automatic serialization.
- **Relational Sync:** Maintained in memory via React `AuthContext` to prevent stale state across components.
- **Tables / Collections Stored:**
  - `contenthub_auth_user`: Active authenticated session token & user profile.
  - `contenthub_creators`: Registered creators, tiers, categories, hourly rates, verification badges.
  - `contenthub_customers`: Registered brand / business profiles and company details.
  - `contenthub_campaigns`: Brand campaigns, budget ranges, deliverables, and deadlines.
  - `contenthub_collabs`: Active collaboration contracts, milestones, and payment states.
  - `contenthub_applications`: Creator proposals submitted for active campaigns.
  - `contenthub_reports`: Content moderation and dispute tickets for admin resolution.
  - `contenthub_notifications`: Real-time notification feed with read/unread statuses.
  - `contenthub_messages`: Direct conversation threads between creators and brands.

### 2. Seed Database (`src/data/initialData.js`)
- Preloaded with realistic production data:
  - **10+ Verified Creators** across Tech, Lifestyle, Gaming, Design, Fitness, Fashion.
  - **5+ Brand Customers** with active campaigns and live budgets.
  - **26+ Industry Categories** (AI Prompting, 3D Animation, Podcast Production, UGC, etc.).
  - **100+ Indian & Global Cities** (`src/data/indianLocations.js`).

---

## 🔑 API Keys & Environment Variables

The project includes an integrated backend plugin for password reset and transactional emails.

### `.env` Configuration
To enable live SMTP email sending, copy `.env.example` to `.env`:

```bash
# Server Port Configuration
PORT=10000

# SMTP Email Configuration (Nodemailer)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_specific_password
EMAIL_FROM=CreatorSphere AI <no-reply@creatorsphere.ai>

# Client Configuration
VITE_APP_NAME="CreatorSphere AI"
VITE_API_URL="/api"
```

### Integrated API Endpoints
- **`POST /api/send-reset-email`**
  - **Description:** Sends a secure 15-minute expiring password reset token link via SMTP.
  - **Payload:** `{ "to": "user@domain.com", "resetLink": "https://..." }`
  - **Fallback:** If SMTP credentials are not configured, the frontend gracefully informs the user and enables direct instant password reset in the UI.

---

## 📂 Project Directory Structure

```text
Content-Creator/
├── public/                     # Static assets & redirect configurations
│   ├── _redirects              # SPA rewrite rule for Netlify / Render
│   └── favicon.svg             # Application brand favicon
├── src/
│   ├── assets/                 # Brand illustrations & logos
│   ├── components/             # Reusable UI components
│   │   ├── BackNavButton.jsx   # Consistent back navigation
│   │   ├── ErrorBoundary.jsx   # Error shield & fallback UI
│   │   ├── PasswordField.jsx   # Secure input with toggle visibility
│   │   ├── ProtectedRoute.jsx  # Role-Based Access Control guard
│   │   ├── PublicNavbar.jsx    # Top navigation with role quick-links
│   │   ├── Sidebar.jsx         # Dashboard navigation bar
│   │   ├── SplashScreen.jsx    # Animated launch screen
│   │   └── UserAvatar.jsx      # Initials & image avatar generator
│   ├── context/                # Global state management
│   │   ├── AuthContext.jsx     # Master database & auth store (980+ lines)
│   │   ├── ThemeContext.jsx    # Dark / Light peacock theme store
│   │   └── ToastContext.jsx    # Toast notification queue
│   ├── data/                   # Initial mock database seed
│   │   ├── categories.js       # 26+ creative categories
│   │   ├── indianLocations.js  # Locations & regional tiers
│   │   └── initialData.js      # Production-grade mock database records
│   ├── layouts/
│   │   └── MainLayout.jsx      # Dashboard wrapper with responsive sidebar
│   ├── pages/                  # Application views
│   │   ├── WelcomePage.jsx     # 3-Role landing page (Admin, Creator, Customer)
│   │   ├── AdminLoginPage.jsx  # Admin authentication
│   │   ├── AdminDashboardPage.jsx # Platform metrics & management
│   │   ├── AdminAnalyticsPage.jsx # Revenue charts & user growth
│   │   ├── AdminVerificationPage.jsx # Creator badge approvals
│   │   ├── CreatorAuthPage.jsx # Creator sign-in & sign-up
│   │   ├── CreatorDashboardPage.jsx # Creator statistics & active jobs
│   │   ├── AIStudioPage.jsx    # AI script & caption generator
│   │   ├── CustomerAuthPage.jsx# Brand sign-in & sign-up
│   │   ├── CustomerDashboardPage.jsx # Campaign manager & budget stats
│   │   ├── DiscoverCreatorsPage.jsx # Filterable creator marketplace
│   │   ├── CampaignsListPage.jsx # Public & private campaign directory
│   │   ├── CollaborationsPage.jsx # Active orders & milestone tracker
│   │   ├── MessagesPage.jsx    # Real-time chat interface
│   │   └── NotificationsPage.jsx# Activity notifications center
│   ├── utils/
│   │   ├── timestamps.js       # Relative & exact time formatters
│   │   └── validation.js       # Role & email validators
│   ├── App.jsx                 # Route definitions & router tree
│   ├── index.css               # Global Tailwind CSS directives
│   └── main.jsx                # React DOM root entry
├── index.html                  # HTML entry point with metadata
├── package.json                # NPM packages & build scripts
├── render.yaml                 # Render infrastructure-as-code
├── vercel.json                 # Vercel SPA rewrite configuration
└── vite.config.js              # Vite 8 + Tailwind v4 + SMTP server middleware
```

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend Framework** | React 19 (`react`, `react-dom`) |
| **Build & Dev Tool** | Vite 8 with HMR & Rollup chunking |
| **Styling & Design** | Tailwind CSS v4 (`@tailwindcss/vite`), Custom Peacock Theme |
| **Routing** | React Router v7 (`react-router-dom`) with Role Guards |
| **Icons** | Lucide React (`lucide-react`) |
| **Data Visualizations**| Recharts (`recharts`) responsive charts & graphs |
| **Persistence** | LocalStorage Key-Value Schema Engine |
| **Backend Integration**| Vite Preview & Dev Server Middleware with Nodemailer |
| **Deployment** | Render Web Service / Vercel SPA / Netlify |

---

## 🚀 How to Run Locally

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/bhavanichinnapureddy-hub/AI-Content-Creator.git
   cd AI-Content-Creator
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Production Build & Preview:**
   ```bash
   npm run build
   npm run start
   ```

---

## 🌟 Key Features

1. **Role-Separated Portals:**
   - Dedicated login flows and dashboards for **Admin**, **Creator**, and **Customer**.
   - Zero credential bleeding between roles with strict route authorization.

2. **Creator Marketplace & Discovery:**
   - Multi-parameter filtering by 26+ categories, rating, hourly rate, and location.
   - Comprehensive creator profiles with portfolios, past reviews, and verification badges.

3. **Campaign Management:**
   - Brands can post detailed campaigns with deadlines, deliverables, and budgets.
   - Creators can apply with custom pitches and proposed quotes.

4. **AI Studio:**
   - AI-assisted content tools for generating video scripts, captions, and creative briefs.

5. **Dispute & Fraud Resolution:**
   - Dedicated Admin verification queue to approve creator badges and manage reports.

---

## 📄 License
This project was created for Hackathon submission under the **MIT License**.
