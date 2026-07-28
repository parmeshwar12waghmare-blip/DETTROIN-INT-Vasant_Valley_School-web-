// ─── FIRESTORE SERVICE ────────────────────────────────────────────────────────
// All Firestore CRUD helpers for user profiles, ERP data collections,
// events, admissions, contact inquiries, and real-time subscriptions.

import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  addDoc,
  onSnapshot,
  serverTimestamp,
  type DocumentData,
  type QueryConstraint,
  type Unsubscribe,
} from 'firebase/firestore';
import { db } from './config';

// ─── COLLECTION NAMES ─────────────────────────────────────────────────────────
export const COLLECTIONS = {
  USERS:          'users',
  STUDENTS:       'students',
  ATTENDANCE:     'attendance',
  FEES:           'fees',
  GRADES:         'grades',
  EVENTS:         'events',
  ANNOUNCEMENTS:  'announcements',
  CONTACT:        'contact_inquiries',
  ADMISSIONS:     'admissions',
  QUERY_LOGS:     'query_logs',
} as const;

// ─── GENERIC HELPERS ──────────────────────────────────────────────────────────
export const getDocument = async <T = DocumentData>(
  collectionName: string, docId: string
): Promise<T | null> => {
  const snap = await getDoc(doc(db, collectionName, docId));
  return snap.exists() ? ({ id: snap.id, ...snap.data() } as T) : null;
};

export const setDocument = async (
  collectionName: string, docId: string, data: DocumentData
) => setDoc(doc(db, collectionName, docId), { ...data, updatedAt: serverTimestamp() });

export const updateDocument = async (
  collectionName: string, docId: string, data: Partial<DocumentData>
) => updateDoc(doc(db, collectionName, docId), { ...data, updatedAt: serverTimestamp() });

export const deleteDocument = async (collectionName: string, docId: string) =>
  deleteDoc(doc(db, collectionName, docId));

export const addToCollection = async (collectionName: string, data: DocumentData) =>
  addDoc(collection(db, collectionName), { ...data, createdAt: serverTimestamp() });

export const queryCollection = async <T = DocumentData>(
  collectionName: string, ...constraints: QueryConstraint[]
): Promise<T[]> => {
  const q    = query(collection(db, collectionName), ...constraints);
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as T));
};

// ─── USER PROFILES ────────────────────────────────────────────────────────────
export const getUserProfile = (uid: string) =>
  getDocument(COLLECTIONS.USERS, uid);

export const createUserProfile = (uid: string, data: DocumentData) =>
  setDoc(doc(db, COLLECTIONS.USERS, uid), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

export const updateUserProfile = (uid: string, data: Partial<DocumentData>) =>
  updateDocument(COLLECTIONS.USERS, uid, data);

export const getAllUsers = (maxCount = 50) =>
  queryCollection(COLLECTIONS.USERS, orderBy('createdAt', 'desc'), limit(maxCount));

export const getUsersByRole = (role: string) =>
  queryCollection(COLLECTIONS.USERS, where('role', '==', role), orderBy('createdAt', 'desc'));

export const suspendUser = (uid: string) =>
  updateDocument(COLLECTIONS.USERS, uid, { isActive: false, suspendedAt: serverTimestamp() });

export const activateUser = (uid: string) =>
  updateDocument(COLLECTIONS.USERS, uid, { isActive: true, suspendedAt: null });

// ─── STUDENT ACADEMIC DATA ────────────────────────────────────────────────────
export const getStudentData = (uid: string) =>
  getDocument(COLLECTIONS.STUDENTS, uid);

export const getStudentAttendance = (portalId: string) =>
  queryCollection(
    COLLECTIONS.ATTENDANCE,
    where('portalId', '==', portalId),
    orderBy('month', 'desc'),
    limit(12)
  );

export const getStudentFees = (portalId: string) =>
  queryCollection(
    COLLECTIONS.FEES,
    where('portalId', '==', portalId),
    orderBy('term', 'asc')
  );

export const getStudentGrades = (portalId: string) =>
  queryCollection(
    COLLECTIONS.GRADES,
    where('portalId', '==', portalId),
    orderBy('subject', 'asc')
  );

// ─── EVENTS & ANNOUNCEMENTS ───────────────────────────────────────────────────
export const getUpcomingEvents = () =>
  queryCollection(COLLECTIONS.EVENTS, orderBy('date', 'asc'), limit(10));

export const getFeaturedEvents = () =>
  queryCollection(
    COLLECTIONS.EVENTS,
    where('featured', '==', true),
    orderBy('date', 'asc'),
    limit(4)
  );

export const addEvent = (data: DocumentData) =>
  addToCollection(COLLECTIONS.EVENTS, data);

export const getAnnouncements = () =>
  queryCollection(COLLECTIONS.ANNOUNCEMENTS, orderBy('createdAt', 'desc'), limit(10));

export const addAnnouncement = (data: DocumentData) =>
  addToCollection(COLLECTIONS.ANNOUNCEMENTS, data);

// ─── ADMISSIONS & CONTACT ─────────────────────────────────────────────────────
export const submitAdmission = (data: DocumentData) =>
  addToCollection(COLLECTIONS.ADMISSIONS, { ...data, status: 'pending' });

export const submitContactInquiry = (data: DocumentData) =>
  addToCollection(COLLECTIONS.CONTACT, data);

export const getAllAdmissions = () =>
  queryCollection(COLLECTIONS.ADMISSIONS, orderBy('createdAt', 'desc'), limit(100));

export const getAllContactInquiries = () =>
  queryCollection(COLLECTIONS.CONTACT, orderBy('createdAt', 'desc'), limit(100));

// ─── REAL-TIME SUBSCRIPTIONS ──────────────────────────────────────────────────
export const subscribeToUserProfile = (
  uid: string,
  callback: (data: DocumentData | null) => void
): Unsubscribe =>
  onSnapshot(doc(db, COLLECTIONS.USERS, uid), snap =>
    callback(snap.exists() ? { id: snap.id, ...snap.data() } : null)
  );

export const subscribeToAnnouncements = (
  callback: (data: DocumentData[]) => void
): Unsubscribe =>
  onSnapshot(
    query(collection(db, COLLECTIONS.ANNOUNCEMENTS), orderBy('createdAt', 'desc'), limit(10)),
    snap => callback(snap.docs.map(d => ({ id: d.id, ...d.data() })))
  );

// ─── QUERY LOGGING ────────────────────────────────────────────────────────────
export const logERPQuery = (queryData: DocumentData) =>
  addToCollection(COLLECTIONS.QUERY_LOGS, queryData);
