// src/types/types.ts

/**
 * Defines the structure for a user record in the ERP system.
 */
export interface ERPUser {
  id?: string;
  portalId?: string;
  name: string;
  email: string;
  role: 'Admin' | 'Staff' | 'Student' | 'admin' | 'student' | 'parent' | 'teacher';
  phone?: string;
  department?: string;
  grade?: string;
  rollNo?: string;
  parentName?: string;
  attendanceRate?: number;
  feeStatus?: string;
  dueAmount?: number;
  notices: Array<{ id: string; title: string; date: string; category: string; content: string }>;
  grades: Array<{ subject: string; score: number; grade: string; teacher: string }>;
  schedule: Array<{ day: string; period: string; subject: string; room: string; teacher: string }>;
}

/**
 * Defines the structure for a general admission application.
 */
export interface AdmissionApplication {
  id?: string;
  studentName: string;
  dob?: Date | string;
  programApplied?: string;
  parentName?: string;
  email?: string;
  phone?: string;
  grade?: string;
  previousSchool?: string;
  message?: string;
  status?: string;
}

/**
 * Defines the structure for contact form submissions.
 */
export interface ContactInquiry {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  inquiryType: 'General' | 'Admissions' | 'Careers' | string;
}

// Type definitions for content modules (assuming they were intended to be here or imported)
export type SchoolEvent = {
  id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  description: string;
  featured: boolean;
};

export type Announcement = {
  id: string;
  title: string;
  category: string;
  content: string;
  date: string;
  isUrgent: boolean;
};

export interface ERPQueryResult {
  queryType: string;
  queryExecuted: string;
  executionTimeMs: number;
  data: Record<string, unknown>[];
}