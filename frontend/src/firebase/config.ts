// ─── FIREBASE CONFIGURATION ───────────────────────────────────────────────────
// Initialize Firebase app with project credentials.
// To complete setup, update the values below from Firebase Console →
//   Project Settings → Your Apps → Firebase SDK snippet → Config

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'BBn9YqSISCgKdIM5x5hiFcaTulrCI0xhUa8Rp_9dHR6HmcKFmKE0eQI5_S99xB1IXeQRNoo2v9u4ng02epwFbN0',
  // ⚠️  Fill these from Firebase Console → Project Settings → Your Apps
  authDomain:    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN    || 'vasant-valley-school.firebaseapp.com',
  projectId:     import.meta.env.VITE_FIREBASE_PROJECT_ID     || 'vasant-valley-school',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'vasant-valley-school.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId:         import.meta.env.VITE_FIREBASE_APP_ID         || '',
};

// Initialize services
const app              = initializeApp(firebaseConfig);
export const auth      = getAuth(app);
export const db        = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({ prompt: 'select_account' });

export default app;
