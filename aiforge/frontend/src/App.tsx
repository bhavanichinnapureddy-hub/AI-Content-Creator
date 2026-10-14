import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { useAuthStore } from '@/stores/authStore';
import LoadingScreen from '@/components/ui/LoadingScreen';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

// ─── Lazy-loaded Pages ────────────────────────────────────────────────────────

const LandingPage      = lazy(() => import('@/pages/Landing'));
const LoginPage        = lazy(() => import('@/pages/auth/Login'));
const SignupPage       = lazy(() => import('@/pages/auth/Signup'));
const ForgotPassword   = lazy(() => import('@/pages/auth/ForgotPassword'));
const ResetPassword    = lazy(() => import('@/pages/auth/ResetPassword'));

const BrandDashboard   = lazy(() => import('@/pages/brand/Dashboard'));
const CreatorDashboard = lazy(() => import('@/pages/creator/Dashboard'));
const AdminDashboard   = lazy(() => import('@/pages/admin/Dashboard'));

const CreatorDiscovery = lazy(() => import('@/pages/discovery/CreatorDiscovery'));
const CreatorProfile   = lazy(() => import('@/pages/discovery/CreatorProfile'));
const PortfolioDetail  = lazy(() => import('@/pages/discovery/PortfolioDetail'));

const BriefCreate      = lazy(() => import('@/pages/briefs/BriefCreate'));
const BriefDetail      = lazy(() => import('@/pages/briefs/BriefDetail'));

const EngagementDetail = lazy(() => import('@/pages/engagements/EngagementDetail'));

const PaymentsPage     = lazy(() => import('@/pages/payments/Payments'));
const SettingsPage     = lazy(() => import('@/pages/settings/Settings'));

const AdminVerification = lazy(() => import('@/pages/admin/Verification'));
const AdminAnalytics    = lazy(() => import('@/pages/admin/Analytics'));
const AdminUsers        = lazy(() => import('@/pages/admin/Users'));

const NotFoundPage     = lazy(() => import('@/pages/errors/NotFound'));
const ErrorPage        = lazy(() => import('@/pages/errors/Error'));

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  const { isInitialized } = useAuthStore();

  // Wait for auth state to be initialized before rendering routes
  if (!isInitialized) {
    return <LoadingScreen />;
  }

  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Public creator discovery */}
          <Route path="/creators" element={<CreatorDiscovery />} />
          <Route path="/creators/:id" element={<CreatorProfile />} />
          <Route path="/creators/:creatorId/portfolio/:itemId" element={<PortfolioDetail />} />

          {/* Brand routes */}
          <Route element={<ProtectedRoute role="BRAND" />}>
            <Route path="/dashboard" element={<BrandDashboard />} />
            <Route path="/briefs/new" element={<BriefCreate />} />
            <Route path="/briefs/:id" element={<BriefDetail />} />
            <Route path="/engagements/:id" element={<EngagementDetail />} />
            <Route path="/payments" element={<PaymentsPage />} />
          </Route>

          {/* Creator routes */}
          <Route element={<ProtectedRoute role="CREATOR" />}>
            <Route path="/creator/dashboard" element={<CreatorDashboard />} />
            <Route path="/creator/engagements/:id" element={<EngagementDetail />} />
            <Route path="/creator/payments" element={<PaymentsPage />} />
          </Route>

          {/* Shared authenticated routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/settings" element={<SettingsPage />} />
          </Route>

          {/* Admin routes */}
          <Route element={<ProtectedRoute role="ADMIN" />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/verification" element={<AdminVerification />} />
            <Route path="/admin/analytics" element={<AdminAnalytics />} />
            <Route path="/admin/users" element={<AdminUsers />} />
          </Route>

          {/* Fallback */}
          <Route path="/error" element={<ErrorPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
