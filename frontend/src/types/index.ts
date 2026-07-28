export interface AdmissionApplication {
  id?: string;
  studentName: string;
  parentName: string;
  email: string;
  phone: string;
  grade: string;
  previousSchool?: string;
  message?: string;
  status?: 'pending' | 'reviewed' | 'accepted' | 'rejected';
  createdAt?: string;
}

export interface SchoolEvent {
  id: string;
  title: string;
  category: 'Academic' | 'Sports' | 'Cultural' | 'Workshop' | 'Exhibition';
  date: string;
  time: string;
  location: string;
  description: string;
  featured?: boolean;
}

export interface Announcement {
  id: string;
  title: string;
  date: string;
  category: 'Important' | 'General' | 'Exam' | 'Holiday';
  content: string;
  isUrgent?: boolean;
}

export interface ContactInquiry {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface ERPUserGrade {
  subject: string;
  score: number;
  grade: string;
  teacher: string;
}

export interface ERPUserSchedule {
  day: string;
  period: string;
  subject: string;
  room: string;
  teacher: string;
}

export interface ERPUserNotice {
  id: string;
  title: string;
  date: string;
  category: string;
  content: string;
}

export interface ERPUser {
  portalId: string;
  name: string;
  email: string;
  role: 'student' | 'parent' | 'teacher' | 'admin';
  grade: string;
  rollNo: string;
  parentName: string;
  attendanceRate: number;
  feeStatus: string;
  dueAmount: number;
  grades: ERPUserGrade[];
  schedule: ERPUserSchedule[];
  notices: ERPUserNotice[];
}

export interface ERPDashboardData {
  user: ERPUser;
  stats: {
    totalStudents: number;
    averageAttendance: string;
    activeCourses: number;
    feeSyncStatus: string;
  };
}

export interface ERPQueryResult {
  success: boolean;
  queryType: string;
  queryExecuted: string;
  executionTimeMs: number;
  data: any[];
}

// ─── FIREBASE USER PROFILE ────────────────────────────────────────────────────
export interface FirebaseUserProfile {
  id?: string;
  uid?: string;
  portalId: string;
  name: string;
  email: string;
  role: 'student' | 'parent' | 'teacher' | 'admin';
  grade?: string;
  rollNo?: string;
  parentName?: string;
  department?: string;
  phone?: string;
  photoURL?: string;
  isActive: boolean;
  createdAt?: any;
  updatedAt?: any;
  lastSeen?: string;
  suspendedAt?: any;
  linkedStudentId?: string;
}

