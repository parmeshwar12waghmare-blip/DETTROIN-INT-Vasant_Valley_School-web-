// ─── AUTH CONTEXT ─────────────────────────────────────────────────────────────
// Provides Firebase auth state to the entire app via React Context.
// Wrap <App> with <AuthProvider> in main.tsx.

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { User } from 'firebase/auth';
import {
  signInWithEmail,
  signInWithGoogle,
  signOutUser,
  onAuthChange,
  getAuthErrorMessage,
} from '../firebase/authService';
import { getUserProfile, updateUserProfile } from '../firebase/firestoreService';
import type { FirebaseUserProfile } from '../types';

// ─── Context Shape ─────────────────────────────────────────────────────────────
interface AuthContextValue {
  currentUser:   User | null;
  userProfile:   FirebaseUserProfile | null;
  loading:       boolean;
  authError:     string | null;
  login:         (email: string, password: string) => Promise<{ user: User; profile: any }>;
  loginWithGoogle: () => Promise<{ user: User; profile: any }>;
  logout:        () => Promise<void>;
  refreshProfile: () => Promise<void>;
  clearError:    () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// ─── Provider ─────────────────────────────────────────────────────────────────
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser,  setCurrentUser]  = useState<User | null>(null);
  const [userProfile,  setUserProfile]  = useState<FirebaseUserProfile | null>(null);
  const [loading,      setLoading]      = useState(true);
  const [authError,    setAuthError]    = useState<string | null>(null);

  // Load Firestore profile whenever auth user changes
  const loadProfile = useCallback(async (user: User | null) => {
    if (user) {
      try {
        const profile = await getUserProfile(user.uid) as FirebaseUserProfile | null;
        setUserProfile(profile);
        // Update last-seen timestamp
        if (profile) {
          await updateUserProfile(user.uid, { lastSeen: new Date().toISOString() });
        }
      } catch {
        setUserProfile(null);
      }
    } else {
      setUserProfile(null);
    }
  }, []);

  // Firebase auth observer — runs once on mount
  useEffect(() => {
    const unsubscribe = onAuthChange(async (user) => {
      setCurrentUser(user);
      await loadProfile(user);
      setLoading(false);
    });
    return unsubscribe;
  }, [loadProfile]);

  const login = useCallback(async (email: string, password: string) => {
    setAuthError(null);
    try {
      const result = await signInWithEmail(email, password);
      setUserProfile(result.profile as FirebaseUserProfile);
      return result;
    } catch (err: any) {
      const msg = getAuthErrorMessage(err.code);
      setAuthError(msg);
      throw new Error(msg);
    }
  }, []);

  const loginWithGoogle = useCallback(async () => {
    setAuthError(null);
    try {
      const result = await signInWithGoogle();
      setUserProfile(result.profile as FirebaseUserProfile);
      return result;
    } catch (err: any) {
      const msg = getAuthErrorMessage(err.code);
      setAuthError(msg);
      throw new Error(msg);
    }
  }, []);

  const logout = useCallback(async () => {
    await signOutUser();
    setCurrentUser(null);
    setUserProfile(null);
  }, []);

  const refreshProfile = useCallback(async () => {
    if (currentUser) await loadProfile(currentUser);
  }, [currentUser, loadProfile]);

  const clearError = useCallback(() => setAuthError(null), []);

  return (
    <AuthContext.Provider value={{
      currentUser, userProfile, loading, authError,
      login, loginWithGoogle, logout, refreshProfile, clearError,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// ─── Hook ──────────────────────────────────────────────────────────────────────
export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an <AuthProvider>');
  return ctx;
};
