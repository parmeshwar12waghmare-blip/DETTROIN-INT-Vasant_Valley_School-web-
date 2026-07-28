// ─── DATABASE SEEDER ──────────────────────────────────────────────────────────
// Pre-populates Firestore with demo ERP users, events, and announcements.
// Call seedDemoData() from the Admin panel one-time setup.

import {
  setDocument,
  addToCollection,
  COLLECTIONS,
} from './firestoreService';

const DEMO_USERS = [
  {
    uid: 'demo-student-001',
    portalId: 'VVS-2026-981',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@vasantvalley.edu.in',
    role: 'student',
    grade: 'Class X-A',
    rollNo: '2026-104',
    parentName: 'Rajesh Sharma',
    phone: '+91 98765 43210',
    attendanceRate: 96.5,
    feeStatus: 'Paid',
    dueAmount: 0,
    isActive: true,
    photoURL: '',
  },
  {
    uid: 'demo-parent-001',
    portalId: 'VVS-PARENT-402',
    name: 'Rajesh Sharma',
    email: 'rajesh.sharma@gmail.com',
    role: 'parent',
    linkedStudentId: 'VVS-2026-981',
    phone: '+91 98765 43210',
    isActive: true,
    photoURL: '',
  },
  {
    uid: 'demo-teacher-001',
    portalId: 'VVS-TCH-108',
    name: 'Dr. R. K. Gupta',
    email: 'rk.gupta@vasantvalley.edu.in',
    role: 'teacher',
    department: 'Mathematics & Advanced Sciences',
    phone: '+91 99887 76655',
    isActive: true,
    photoURL: '',
  },
  {
    uid: 'demo-admin-001',
    portalId: 'VVS-ADMIN-001',
    name: 'Principal Meera Nair',
    email: 'admin@vasantvalley.edu.in',
    role: 'admin',
    department: 'Administration',
    phone: '+91 11 2613 0000',
    isActive: true,
    photoURL: '',
  },
];

const DEMO_GRADES = [
  { portalId: 'VVS-2026-981', subject: 'Mathematics (Advanced)', score: 95, grade: 'A1', teacher: 'Dr. R. K. Gupta', term: 'Term 1 2026' },
  { portalId: 'VVS-2026-981', subject: 'Physics & STEM Innovation', score: 92, grade: 'A1', teacher: 'Mrs. S. Verma', term: 'Term 1 2026' },
  { portalId: 'VVS-2026-981', subject: 'Chemistry Laboratory', score: 88, grade: 'A2', teacher: 'Dr. N. Mehta', term: 'Term 1 2026' },
  { portalId: 'VVS-2026-981', subject: 'Computer Science & AI', score: 98, grade: 'A1', teacher: 'Mr. V. Anand', term: 'Term 1 2026' },
  { portalId: 'VVS-2026-981', subject: 'English Literature', score: 90, grade: 'A1', teacher: 'Ms. P. Iyer', term: 'Term 1 2026' },
];

const DEMO_ATTENDANCE = [
  { portalId: 'VVS-2026-981', month: 'April 2026', presentDays: 22, totalDays: 22, percentage: '100%' },
  { portalId: 'VVS-2026-981', month: 'May 2026', presentDays: 20, totalDays: 21, percentage: '95.2%' },
  { portalId: 'VVS-2026-981', month: 'June 2026', presentDays: 18, totalDays: 18, percentage: '100%' },
  { portalId: 'VVS-2026-981', month: 'July 2026', presentDays: 21, totalDays: 22, percentage: '95.4%' },
];

const DEMO_FEES = [
  { portalId: 'VVS-2026-981', term: 'Term 1 (Apr – Jun)', amount: '₹45,000', status: 'Paid', receiptNo: 'REC-2026-8812', date: '10-Apr-2026' },
  { portalId: 'VVS-2026-981', term: 'Term 2 (Jul – Sep)', amount: '₹45,000', status: 'Paid', receiptNo: 'REC-2026-9430', date: '05-Jul-2026' },
  { portalId: 'VVS-2026-981', term: 'Term 3 (Oct – Dec)', amount: '₹45,000', status: 'Pending', receiptNo: 'N/A', date: 'Due: 10-Oct-2026' },
];

const DEMO_EVENTS = [
  { title: 'Annual Science & Innovation Expo 2026', category: 'Academic', date: 'August 15, 2026', time: '09:00 AM – 04:00 PM', location: 'Main Auditorium & STEM Labs', description: 'Students present prototypes in Robotics, AI, Renewable Energy, and Biotechnology.', featured: true },
  { title: 'Inter-School Athletics Championship', category: 'Sports', date: 'August 22, 2026', time: '08:00 AM – 05:00 PM', location: 'Vasant Sports Complex', description: 'Track and field events featuring top regional school teams.', featured: true },
  { title: 'Symphony & Performing Arts Night', category: 'Cultural', date: 'September 05, 2026', time: '06:00 PM – 09:00 PM', location: 'Open Air Amphitheatre', description: 'Classical musical ensembles, contemporary dance, and theatrical plays.', featured: false },
  { title: 'Parent-Teacher Career Counseling Workshop', category: 'Workshop', date: 'September 12, 2026', time: '10:00 AM – 01:00 PM', location: 'Conference Hall B', description: 'Guiding Senior Secondary students through global university admissions.', featured: false },
];

const DEMO_ANNOUNCEMENTS = [
  { title: 'Admissions Open for Academic Session 2026-2027', category: 'Important', content: 'Online registration for Nursery to Class IX & Class XI is now open.', isUrgent: true },
  { title: 'First Term Examination Schedule Released', category: 'Exam', content: 'The detailed date sheet for Grade VI to XII examinations is available in the student portal.', isUrgent: false },
  { title: 'Monsoon Break Advisory', category: 'Holiday', content: 'School will remain closed on Friday for scheduled campus maintenance.', isUrgent: false },
];

// ─── MAIN SEED FUNCTION ────────────────────────────────────────────────────────
export const seedDemoData = async (onProgress?: (msg: string) => void) => {
  const log = (msg: string) => { console.log(msg); onProgress?.(msg); };

  log('🌱 Seeding Firestore demo data...');

  // Users
  for (const u of DEMO_USERS) {
    const { uid, ...data } = u;
    await setDocument(COLLECTIONS.USERS, uid, data);
    log(`✅ User seeded: ${u.name} (${u.role})`);
  }

  // Grades
  for (const g of DEMO_GRADES) {
    await addToCollection(COLLECTIONS.GRADES, g);
  }
  log(`✅ ${DEMO_GRADES.length} grade records seeded`);

  // Attendance
  for (const a of DEMO_ATTENDANCE) {
    await addToCollection(COLLECTIONS.ATTENDANCE, a);
  }
  log(`✅ ${DEMO_ATTENDANCE.length} attendance records seeded`);

  // Fees
  for (const f of DEMO_FEES) {
    await addToCollection(COLLECTIONS.FEES, f);
  }
  log(`✅ ${DEMO_FEES.length} fee records seeded`);

  // Events
  for (const e of DEMO_EVENTS) {
    await addToCollection(COLLECTIONS.EVENTS, e);
  }
  log(`✅ ${DEMO_EVENTS.length} events seeded`);

  // Announcements
  for (const a of DEMO_ANNOUNCEMENTS) {
    await addToCollection(COLLECTIONS.ANNOUNCEMENTS, a);
  }
  log(`✅ ${DEMO_ANNOUNCEMENTS.length} announcements seeded`);

  log('🎉 Firestore seeding complete!');
  return { success: true, message: 'Demo data seeded to Firestore successfully.' };
};
