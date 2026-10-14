import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore, type UserRole } from '@/stores/authStore';

interface ProtectedRouteProps {
  role?: UserRole;
}

const ROLE_DASHBOARDS: Record<UserRole, string> = {
  BRAND: '/dashboard',
  CREATOR: '/creator/dashboard',
  ADMIN: '/admin',
};

/**
 * Protects routes from unauthenticated or unauthorized access.
 * - With no role prop: requires authentication only.
 * - With role prop: requires authentication AND the specific role.
 */
export default function ProtectedRoute({ role }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();

  // Not authenticated → redirect to login with return URL
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Role required but doesn't match → redirect to user's own dashboard
  if (role && user.role !== role) {
    // Admin can access everything
    if (user.role === 'ADMIN') return <Outlet />;
    return <Navigate to={ROLE_DASHBOARDS[user.role]} replace />;
  }

  return <Outlet />;
}
