// ─── FIREBASE AUTH SERVICE ────────────────────────────────────────────────────
// Centralised authentication helpers for email/password, Google OAuth,
// admin user creation, password reset, and auth-state observation.

import {
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged,
  type User,
  type NextOrObserver,
} from 'firebase/auth';
import { auth, googleProvider } from './config';
import { createUserProfile, getUserProfile } from './firestoreService';

// ── Email / Password Sign-In ─────────────────────────────────────────────────
export const signInWithEmail = async (email: string, password: string) => {
  const credential = await signInWithEmailAndPassword(auth, email, password);
  const profile    = await getUserProfile(credential.user.uid);
  return { user: credential.user, profile };
};

// ── Google OAuth Sign-In ─────────────────────────────────────────────────────
export const signInWithGoogle = async () => {
  const credential = await signInWithPopup(auth, googleProvider);
  // Auto-create profile in Firestore for first-time Google users
  const existing   = await getUserProfile(credential.user.uid);
  if (!existing) {
    await createUserProfile(credential.user.uid, {
      name:      credential.user.displayName || 'New User',
      email:     credential.user.email       || '',
      role:      'student',
      portalId:  `VVS-GOOGLE-${Date.now().toString().slice(-6)}`,
      photoURL:  credential.user.photoURL    || '',
      createdAt: new Date().toISOString(),
      isActive:  true,
    });
  }
  const profile = await getUserProfile(credential.user.uid);
  return { user: credential.user, profile };
};

// ── Admin: Create New ERP User ────────────────────────────────────────────────
export const createERPUser = async (
  email: string,
  password: string,
  profileData: {
    name: string;
    role: 'student' | 'parent' | 'teacher' | 'admin';
    portalId: string;
    grade?: string;
    phone?: string;
  }
) => {
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(credential.user, { displayName: profileData.name });
  await createUserProfile(credential.user.uid, {
    ...profileData,
    email,
    createdAt: new Date().toISOString(),
    isActive: true,
  });
  return credential.user;
};

// ── Sign Out ──────────────────────────────────────────────────────────────────
export const signOutUser = () => signOut(auth);

// ── Password Reset Email ──────────────────────────────────────────────────────
export const resetPassword = (email: string) =>
  sendPasswordResetEmail(auth, email);

// ── Auth State Observer ───────────────────────────────────────────────────────
export const onAuthChange = (callback: NextOrObserver<User>) =>
  onAuthStateChanged(auth, callback);

// ── Map Firebase error codes to user-friendly messages ───────────────────────
export const getAuthErrorMessage = (code: string): string => {
  const messages: Record<string, string> = {
    'auth/user-not-found':      'No account found with this email address.',
    'auth/wrong-password':      'Incorrect password. Please try again.',
    'auth/invalid-email':       'Please enter a valid email address.',
    'auth/too-many-requests':   'Too many login attempts. Please wait and retry.',
    'auth/network-request-failed': 'Network error. Check your connection.',
    'auth/popup-closed-by-user':'Google sign-in was cancelled.',
    'auth/email-already-in-use':'This email is already registered.',
    'auth/weak-password':       'Password must be at least 6 characters.',
    'auth/invalid-credential':  'Invalid credentials. Please check and retry.',
  };
  return messages[code] || 'Authentication failed. Please try again.';
};
