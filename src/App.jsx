import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { MainLayout } from './layouts/MainLayout';
import { ErrorBoundary } from './components/ErrorBoundary';

// Pages
import { WelcomePage } from './pages/WelcomePage';
import { CreatorAuthPage } from './pages/CreatorAuthPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { CustomerAuthPage } from './pages/CustomerAuthPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';

// Authenticated Pages
import { CreatorHomePage } from './pages/CreatorHomePage';
import { CreatorDashboardPage } from './pages/CreatorDashboardPage';
import { AdminHomePage } from './pages/AdminHomePage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AdminVerificationPage } from './pages/AdminVerificationPage';
import { AdminReportsPage } from './pages/AdminReportsPage';
import { AdminAnalyticsPage } from './pages/AdminAnalyticsPage';
import { CustomerHomePage } from './pages/CustomerHomePage';
import { CustomerDashboardPage } from './pages/CustomerDashboardPage';
import { MyCampaignsPage } from './pages/MyCampaignsPage';

// Marketplace & Feature Pages
import { DiscoverCreatorsPage } from './pages/DiscoverCreatorsPage';
import { CreatorProfilePage } from './pages/CreatorProfilePage';
import { CampaignsListPage } from './pages/CampaignsListPage';
import { CampaignDetailPage } from './pages/CampaignDetailPage';
import { CreateCampaignPage } from './pages/CreateCampaignPage';
import { ApplicationsPage } from './pages/ApplicationsPage';
import { CollaborationsPage } from './pages/CollaborationsPage';
import { AIStudioPage } from './pages/AIStudioPage';
import { ProfilePage } from './pages/ProfilePage';
import { PortfolioPage } from './pages/PortfolioPage';
import { MessagesPage } from './pages/MessagesPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { SettingsPage } from './pages/SettingsPage';
import { SavedItemsPage } from './pages/SavedItemsPage';
import { AboutUsPage } from './pages/AboutUsPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { SplashScreen } from './components/SplashScreen';

export function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <ErrorBoundary>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      <ThemeProvider>
        <AuthProvider>
        <ToastProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Portal & Auth Routes */}
              <Route path="/" element={<WelcomePage />} />
              <Route path="/select-role" element={<WelcomePage />} />
              <Route path="/about" element={<AboutUsPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />

              {/* Creator Dedicated Auth */}
              <Route path="/creator/login" element={<CreatorAuthPage isSignUp={false} />} />
              <Route path="/creator/signup" element={<CreatorAuthPage isSignUp={true} />} />

              {/* Admin Dedicated Auth (No sign up) */}
              <Route path="/admin/login" element={<AdminLoginPage />} />

              {/* Customer / Brand Dedicated Auth */}
              <Route path="/customer/login" element={<CustomerAuthPage isSignUp={false} />} />
              <Route path="/customer/signup" element={<CustomerAuthPage isSignUp={true} />} />

              {/* CREATOR PROTECTED ROUTES */}
              <Route
                path="/creator/home"
                element={
                  <ProtectedRoute allowedRoles={['creator']}>
                    <MainLayout><CreatorHomePage /></MainLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/creator/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['creator']}>
                    <MainLayout><CreatorDashboardPage /></MainLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/portfolio"
                element={
                  <ProtectedRoute allowedRoles={['creator']}>
                    <MainLayout><PortfolioPage /></MainLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/saved-campaigns"
                element={
                  <ProtectedRoute allowedRoles={['creator']}>
                    <MainLayout><SavedItemsPage mode="campaigns" /></MainLayout>
                  </ProtectedRoute>
                }
              />

              {/* ADMIN PROTECTED ROUTES */}
              <Route
                path="/admin/home"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <MainLayout><AdminHomePage /></MainLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <MainLayout><AdminDashboardPage defaultTab="overview" /></MainLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/creators"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <MainLayout><AdminDashboardPage defaultTab="creators" /></MainLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/customers"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <MainLayout><AdminDashboardPage defaultTab="customers" /></MainLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <MainLayout><AdminDashboardPage defaultTab="users" /></MainLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/campaigns"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <MainLayout><AdminDashboardPage defaultTab="campaigns" /></MainLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/verify-creators"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <MainLayout><AdminVerificationPage /></MainLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/reports"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <MainLayout><AdminReportsPage /></MainLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/analytics"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <MainLayout><AdminAnalyticsPage /></MainLayout>
                  </ProtectedRoute>
                }
              />

              {/* CUSTOMER / BRAND PROTECTED ROUTES */}
              <Route
                path="/customer/home"
                element={
                  <ProtectedRoute allowedRoles={['customer']}>
                    <MainLayout><CustomerHomePage /></MainLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/customer/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['customer']}>
                    <MainLayout><CustomerDashboardPage /></MainLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/create-campaign"
                element={
                  <ProtectedRoute allowedRoles={['customer']}>
                    <MainLayout><CreateCampaignPage /></MainLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/my-campaigns"
                element={
                  <ProtectedRoute allowedRoles={['customer']}>
                    <MainLayout><MyCampaignsPage /></MainLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/saved-creators"
                element={
                  <ProtectedRoute allowedRoles={['customer']}>
                    <MainLayout><SavedItemsPage mode="creators" /></MainLayout>
                  </ProtectedRoute>
                }
              />

              {/* CROSS-ROLE SHARED & PROTECTED ROUTES */}
              <Route
                path="/discover-creators"
                element={
                  <ProtectedRoute allowedRoles={['creator', 'customer', 'admin']}>
                    <MainLayout><DiscoverCreatorsPage /></MainLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/creator-profile/:id"
                element={
                  <ProtectedRoute allowedRoles={['creator', 'customer', 'admin']}>
                    <MainLayout><CreatorProfilePage /></MainLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/campaigns"
                element={
                  <ProtectedRoute allowedRoles={['creator', 'customer', 'admin']}>
                    <MainLayout><CampaignsListPage /></MainLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/campaign/:id"
                element={
                  <ProtectedRoute allowedRoles={['creator', 'customer', 'admin']}>
                    <MainLayout><CampaignDetailPage /></MainLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/applications"
                element={
                  <ProtectedRoute allowedRoles={['creator', 'customer', 'admin']}>
                    <MainLayout><ApplicationsPage /></MainLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/collaborations"
                element={
                  <ProtectedRoute allowedRoles={['creator', 'customer', 'admin']}>
                    <MainLayout><CollaborationsPage /></MainLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/ai-studio"
                element={
                  <ProtectedRoute allowedRoles={['creator', 'customer', 'admin']}>
                    <MainLayout><AIStudioPage /></MainLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/messages"
                element={
                  <ProtectedRoute allowedRoles={['creator', 'customer', 'admin']}>
                    <MainLayout><MessagesPage /></MainLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/notifications"
                element={
                  <ProtectedRoute allowedRoles={['creator', 'customer', 'admin']}>
                    <MainLayout><NotificationsPage /></MainLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute allowedRoles={['creator', 'customer', 'admin']}>
                    <MainLayout><ProfilePage /></MainLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute allowedRoles={['creator', 'customer', 'admin']}>
                    <MainLayout><SettingsPage /></MainLayout>
                  </ProtectedRoute>
                }
              />

              {/* 404 Route */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </BrowserRouter>
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  </ErrorBoundary>
  );
}

export default App;
