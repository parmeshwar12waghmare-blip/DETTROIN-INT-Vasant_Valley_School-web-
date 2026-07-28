// ─── AUTH CONTEXT — Database Auth ─────────────────────────────────────────────
// Provides session auth state to the entire app via React Context.

import React, { createContext, useContext, useState, useCallback } from 'react';
import type { ERPUser } from '../types';

interface AuthContextValue {
  user: ERPUser | null;
  loading: boolean;
  loginUser: (u: ERPUser) => void;
  logoutUser: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<ERPUser | null>(null);
  const loading = false;

  const loginUser = useCallback((u: ERPUser) => {
    setUser(u);
  }, []);

  const logoutUser = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an <AuthProvider>');
  return ctx;
};
