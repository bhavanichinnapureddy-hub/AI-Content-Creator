# 🌐 CreatorSphere AI — AI Content Creator Marketplace

> **Live Demo:** [https://ai-content-creator-7ypk.onrender.com](https://ai-content-creator-7ypk.onrender.com)  
> **GitHub Repository:** [https://github.com/bhavanichinnapureddy-hub/AI-Content-Creator](https://github.com/bhavanichinnapureddy-hub/AI-Content-Creator)

---

## 📌 1. Project Overview

**CreatorSphere AI** is an intelligent, multi-sided collaboration marketplace designed to connect verified digital creators with businesses, marketing agencies, and brands. In today's digital economy, brand-creator partnerships are fragmented across informal social DMs, unverified portfolios, and insecure payment arrangements. 

CreatorSphere AI resolves this friction by providing a structured, enterprise-grade platform featuring:
- **Three Isolated Role Portals:** Dedicated experiences for **Admins**, **Creators**, and **Customers (Brands)**.
- **Smart Discovery Engine:** Multi-faceted filtering across 26+ creative disciplines, regional location tiers, hourly rate brackets, and verification status.
- **AI-Powered Studio:** Generative writing tools for video scripts, viral captions, and brand pitch decks.
- **End-to-End Campaign Lifecycle:** Structured workflow from initial campaign brief to creator proposal bidding, active collaboration milestones, and real-time messaging.
- **Platform Moderation & Trust:** Admin verification queue for identity vetting, fraud dispute resolution, and platform health analytics.

---

## 🛠️ 2. Tech Stack

| Category | Technology | Purpose & Rationale |
|---|---|---|
| **Frontend Framework** | **React 19** (`react`, `react-dom`) | Modern reactive UI rendering, hooks architecture, and concurrent rendering capabilities. |
| **Build & Dev Tool** | **Vite 8** (`vite`, `@vitejs/plugin-react`) | Sub-second Hot Module Replacement (HMR), optimized production bundling, and lightweight preview runtime. |
| **Styling & UI System**| **Tailwind CSS v4** (`@tailwindcss/vite`) | Next-generation utility-first styling with high-performance CSS engine and responsive design tokens. |
| **Routing & Navigation**| **React Router v7** (`react-router-dom`) | Declarative client-side routing with Role-Based Access Control (RBAC) route guards. |
| **Iconography** | **Lucide React** (`lucide-react`) | Accessible, ultra-lightweight SVG iconography. |
| **Data Visualizations**| **Recharts** (`recharts`) | Interactive SVG-based charts for platform analytics, revenue trends, and growth metrics. |
| **State & Persistence**| **Context API + LocalStorage Schema Engine** | Reactive client-side relational storage preserving state, auth sessions, and user records across sessions. |
| **Backend Integration**| **Node.js Vite Middleware + Nodemailer** | Embedded endpoint (`/api/send-reset-email`) for transactional password reset emails. |
| **Deployment & Hosting**| **Render Web Service** / **Vercel** / **Netlify** | Continuous deployment pipeline connected directly to the GitHub `main` branch. |

---

## ✨ 3. Features

### 🛡️ Admin Portal
- **Executive Analytics Dashboard:** Visual platform health metrics showing total revenue, gross transaction volume, creator-to-customer ratios, and active collaboration count.
- **Interactive Revenue Charts:** Monthly growth curves, category demand heatmaps, and transaction breakdowns powered by Recharts.
- **Creator Verification Queue:** Administrative inspection portal to verify badges, examine social portfolios, and approve or reject creator applications.
- **Dispute & Fraud Resolution:** Ticket management center to review reported content, resolve customer escrow disputes, and protect platform integrity.
- **User Directory Management:** Administrative oversight of all registered creator and brand profiles.

### 🎨 Creator Portal
- **AI Studio Tools:** Built-in generative AI assistants for rapid drafting of video scripts, creative brief responses, and social media captions.
- **Dynamic Portfolio Showcase:** Showcase multimedia assets, past client case studies, service categories, and hourly pricing tiers.
- **Campaign Application & Pitching:** Browse public brand campaigns, submit custom proposal pitches with delivery estimates, and quote pricing.
- **Collaboration & Milestone Tracker:** Track active client jobs across status phases (Drafting, In Review, Revisions, Completed).
- **Earnings & Payout Analytics:** Real-time visibility into pending payouts, completed milestones, and revenue trends.

### 💼 Customer / Brand Portal
- **Advanced Creator Discovery:** Filterable marketplace across 26+ industry categories (AI Prompting, 3D Animation, Podcast Production, UGC, etc.), ratings, and Indian/Global cities.
- **Campaign Creation Studio:** Post detailed creative briefs specifying deliverables, target audience, budget ranges, and deadlines.
- **Proposal Review & Hiring:** Compare incoming creator bids, view applicant credentials, and award projects with a single click.
- **Direct Real-Time Messaging:** Threaded communication channels with hired creators for sharing revisions and project feedback.
- **Bookmarked Talent (Saved Items):** Shortlist favorite creators for upcoming marketing initiatives.

### 🔒 Core Platform & Security Features
- **Strict Role-Based Access Control (RBAC):** Zero credential bleeding between Admin, Creator, and Customer portals with dedicated redirection handlers.
- **Persistent Data Store:** Browser-based relational storage engine preserving all modifications, new campaigns, and messages.
- **Multi-Role Landing Page:** Intuitive onboarding screen welcoming guests and directing each user type to their respective sign-in portal.
- **Error Shielding:** Component-level `ErrorBoundary` wrappers preventing full-page crashes.
- **Adaptive Dark/Light Theme:** Custom brand styling matching professional Peacock Green and Blue tones.

---

## 📖 4. Documentation

### 👥 Demo Access & Judge Credentials

Judges and evaluators can log in using the dedicated pre-configured accounts:

| Role | Portal Link | Username / Email | Password |
|---|---|---|---|
| **🛡️ Admin** | [`/admin/login`](https://ai-content-creator-7ypk.onrender.com/admin/login) | `admin` | `AdminPassword123!` |
| **🎨 Creator** | [`/creator/login`](https://ai-content-creator-7ypk.onrender.com/creator/login) | `aria.montgomery@creator.contenthub.io` | `Password123!` |
| **💼 Customer / Brand** | [`/customer/login`](https://ai-content-creator-7ypk.onrender.com/customer/login) | `sarah@luminaryaudio.com` | `Password123!` |

---

### 🏗️ System Architecture & Data Flow

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

### 💾 Database & Persistence Architecture

The platform uses a persistent, normalized client-side storage architecture backed by rich relational seed databases:

1. **Storage Engine (`src/context/AuthContext.jsx`):**
   - Automatically synchronizes in-memory React state with browser `localStorage`.
   - **Collections & Schemas:**
     - `contenthub_auth_user`: Active authenticated session token & user profile.
     - `contenthub_creators`: Registered creators, tiers, categories, hourly rates, verification badges.
     - `contenthub_customers`: Registered brand / business profiles and company details.
     - `contenthub_campaigns`: Brand campaigns, budget ranges, deliverables, and deadlines.
     - `contenthub_collabs`: Active collaboration contracts, milestones, and payment states.
     - `contenthub_applications`: Creator proposals submitted for active campaigns.
     - `contenthub_reports`: Content moderation and dispute tickets for admin resolution.
     - `contenthub_notifications`: Real-time notification feed with read/unread statuses.
     - `contenthub_messages`: Direct conversation threads between creators and brands.

2. **Seed Database (`src/data/initialData.js`):**
   - Preloaded with realistic production data:
     - **10+ Verified Creators** across Tech, Lifestyle, Gaming, Design, Fitness, Fashion.
     - **5+ Brand Customers** with active campaigns and live budgets.
     - **26+ Industry Categories** (`src/data/categories.js`).
     - **100+ Indian & Global Cities** (`src/data/indianLocations.js`).

---

### 🔑 API Keys & Environment Configuration

The application includes an embedded Node.js backend middleware for transactional emails and password resets:

```bash
# Server Port
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

- **Endpoint:** `POST /api/send-reset-email`  
- **Graceful Fallback:** If SMTP credentials are omitted, the frontend provides instant local UI recovery for seamless demo testing.

---

### 📂 Project Directory Structure

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

### 🚀 Local Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/bhavanichinnapureddy-hub/AI-Content-Creator.git
   cd AI-Content-Creator
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run local development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. **Production Build & Preview:**
   ```bash
   npm run build
   npm run start
   ```

---

## 📄 License
This project was built for Hackathon presentation under the **MIT License**.
