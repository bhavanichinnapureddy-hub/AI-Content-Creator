import { create } from 'zustand';

export type UserRole = 'BRAND' | 'CREATOR' | 'ADMIN';

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  displayName: string;
  avatarUrl?: string;
  isEmailVerified: boolean;
  companyName?: string;
  headline?: string;
}

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  isLoading: boolean;

  // Actions
  initialize: () => void;
  login: (email: string, password?: string, asRole?: UserRole) => Promise<void>;
  switchDemoRole: (role: UserRole) => void;
  logout: () => Promise<void>;
  setUser: (user: AuthUser | null) => void;
}

const DEMO_USERS: Record<UserRole, AuthUser> = {
  BRAND: {
    id: "user-brand-1",
    email: "brand@aiforge.demo",
    role: "BRAND",
    displayName: "Aetheria Studios",
    companyName: "Aetheria Smart Wearables",
    avatarUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80",
    isEmailVerified: true
  },
  CREATOR: {
    id: "user-creator-1",
    email: "creator@aiforge.demo",
    role: "CREATOR",
    displayName: "Alex Vance",
    headline: "Senior AI Filmmaker & Commercial Director",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    isEmailVerified: true
  },
  ADMIN: {
    id: "user-admin-1",
    email: "admin@aiforge.demo",
    role: "ADMIN",
    displayName: "System Administrator",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80",
    isEmailVerified: true
  }
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isInitialized: true,
  isLoading: false,

  initialize: () => {
    const saved = localStorage.getItem('aiforge_user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        set({ user: parsed, isAuthenticated: true, isInitialized: true });
        return;
      } catch (e) {
        // ignore
      }
    }
    // Default to initialized without logged in user
    set({ isInitialized: true });
  },

  login: async (email: string, _password?: string, asRole?: UserRole) => {
    set({ isLoading: true });
    await new Promise((r) => setTimeout(r, 400)); // Smooth UX transition

    let targetRole: UserRole = asRole || 'BRAND';
    if (email.toLowerCase().includes('admin')) targetRole = 'ADMIN';
    else if (email.toLowerCase().includes('creator')) targetRole = 'CREATOR';
    else if (email.toLowerCase().includes('brand')) targetRole = 'BRAND';

    const selectedUser = DEMO_USERS[targetRole];
    localStorage.setItem('aiforge_user', JSON.stringify(selectedUser));

    set({
      user: selectedUser,
      isAuthenticated: true,
      isLoading: false
    });
  },

  switchDemoRole: (role: UserRole) => {
    const selectedUser = DEMO_USERS[role];
    localStorage.setItem('aiforge_user', JSON.stringify(selectedUser));
    set({
      user: selectedUser,
      isAuthenticated: true
    });
  },

  logout: async () => {
    localStorage.removeItem('aiforge_user');
    set({
      user: null,
      isAuthenticated: false
    });
  },

  setUser: (user) => {
    if (user) {
      localStorage.setItem('aiforge_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('aiforge_user');
    }
    set({ user, isAuthenticated: !!user });
  }
}));

// Initialize auth immediately
useAuthStore.getState().initialize();
