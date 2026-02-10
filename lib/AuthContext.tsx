"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User, UserRole } from "@/types";

interface AuthContextType {
  user: User | null;
  login: (role: UserRole) => void;
  logout: () => void;
  canEdit: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsInitialized(true);
  }, []);

  const login = (role: UserRole) => {
    const newUser: User = {
      id: "USER-001",
      name:
        role === UserRole.ADMIN
          ? "Admin User"
          : role === UserRole.EDITOR
            ? "Editor User"
            : "Viewer User",
      email: `${role.toLowerCase()}@clinicalrd.com`,
      role,
    };
    setUser(newUser);
    localStorage.setItem("currentUser", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  const canEdit = () => {
    return user?.role === UserRole.ADMIN || user?.role === UserRole.EDITOR;
  };

  // Prevent hydration mismatch by not rendering until initialized
  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, canEdit }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
