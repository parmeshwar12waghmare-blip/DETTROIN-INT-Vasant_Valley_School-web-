// API service layer reading backend endpoints (/api/contact, /api/admissions, /api/erp)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export interface InquiryItem {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  phone: string;
  subject?: string;
  message: string;
  createdAt?: string;
  status?: string;
}

export interface ApplicationItem {
  _id?: string;
  id?: string;
  studentName: string;
  parentName?: string;
  email: string;
  phone?: string;
  grade?: string;
  previousSchool?: string;
  message?: string;
  status?: 'pending' | 'reviewed' | 'accepted' | 'rejected' | string;
  activationStatus?: 'Active' | 'Pending Activation' | string;
  password?: string;
  createdAt?: string;
}

export interface StudentUser {
  _id?: string;
  id?: string;
  portalId?: string;
  name: string;
  email: string;
  role: string;
  grade?: string;
  rollNo?: string;
  department?: string;
  addedBy?: string;
}

// Default Fallback Data (In case backend is offline/disconnected)
const FALLBACK_INQUIRIES: InquiryItem[] = [
  { _id: 'inq-1', name: 'Aarav Sharma', email: 'aarav@example.com', phone: '+91 98765 43210', subject: 'Class X Admission', message: 'Inquiring about syllabus, fee structure, and scholarship deadlines.', createdAt: '2026-07-26', status: 'Pending' },
  { _id: 'inq-2', name: 'Ananya Patel', email: 'ananya@example.com', phone: '+91 98123 45678', subject: 'Hostel Facilities', message: 'Would like details regarding boarding and transportation routes.', createdAt: '2026-07-27', status: 'Responded' }
];

const FALLBACK_APPLICATIONS: ApplicationItem[] = [
  { _id: 'app-1', studentName: 'Rahul Deshmukh', parentName: 'Sanjay Deshmukh', email: 'rahul.d@example.com', phone: '+91 97890 12345', grade: 'Class X', previousSchool: 'St. Xavier High School', message: 'Applied for Science & STEM stream', status: 'accepted', activationStatus: 'Active', password: 'pass123', createdAt: '2026-07-20' },
  { _id: 'app-2', studentName: 'Priya Nair', parentName: 'Vijay Nair', email: 'priya.nair@example.com', phone: '+91 98989 12345', grade: 'Class XI', previousSchool: 'Delhi Public School', message: 'Applied for Computer Science stream', status: 'pending', activationStatus: 'Pending Activation', password: 'pass123', createdAt: '2026-07-25' }
];

const FALLBACK_STUDENTS: StudentUser[] = [
  { _id: 'stu-1', portalId: 'VVS-2026-981', name: 'Rahul Deshmukh', email: 'rahul.d@example.com', role: 'student', grade: 'Class X-A', rollNo: '2026-104', addedBy: 'Admin Activation' },
  { _id: 'stu-2', portalId: 'VVS-2026-982', name: 'Neha Gupta', email: 'neha.g@example.com', role: 'student', grade: 'Class X-B', rollNo: '2026-105', addedBy: 'Teacher' }
];

export const erpApi = {
  // Read Backend Inquiries
  getInquiries: async (): Promise<InquiryItem[]> => {
    try {
      const res = await fetch(`${API_BASE_URL}/contact`);
      if (res.ok) {
        const data = await res.json();
        return Array.isArray(data) ? data : FALLBACK_INQUIRIES;
      }
    } catch (e) {
      console.warn('Backend offline, using inquiries fallback');
    }
    return FALLBACK_INQUIRIES;
  },

  deleteInquiry: async (id: string): Promise<boolean> => {
    try {
      const res = await fetch(`${API_BASE_URL}/contact/${id}`, { method: 'DELETE' });
      return res.ok;
    } catch (e) {
      return true;
    }
  },

  // Read Backend Applications
  getApplications: async (): Promise<ApplicationItem[]> => {
    try {
      const res = await fetch(`${API_BASE_URL}/admissions`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          return data.map(app => ({
            ...app,
            activationStatus: app.status === 'accepted' ? 'Active' : 'Pending Activation',
            password: app.password || 'pass123'
          }));
        }
      }
    } catch (e) {
      console.warn('Backend offline, using applications fallback');
    }
    return FALLBACK_APPLICATIONS;
  },

  toggleApplicationActivation: async (app: ApplicationItem): Promise<ApplicationItem[]> => {
    const nextStatus = app.activationStatus === 'Active' ? 'pending' : 'accepted';
    try {
      await fetch(`${API_BASE_URL}/admissions/${app._id || app.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus })
      });
    } catch (e) {
      console.warn('Update backend status error, updating local state');
    }
    return erpApi.getApplications();
  },

  // Read & Manage ERP Students
  getStudents: async (): Promise<StudentUser[]> => {
    try {
      const res = await fetch(`${API_BASE_URL}/erp/students`);
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.students)) {
          return data.students;
        }
      }
    } catch (e) {
      console.warn('Backend offline, using students fallback');
    }
    return FALLBACK_STUDENTS;
  },

  addStudent: async (studentData: Partial<StudentUser>, addedByRole: string): Promise<StudentUser[]> => {
    try {
      const payload = {
        portalId: studentData.portalId || `VVS-2026-${Math.floor(100 + Math.random() * 900)}`,
        password: 'pass123',
        name: studentData.name,
        email: studentData.email,
        role: 'student',
        grade: studentData.grade || 'Class X-A',
        rollNo: studentData.rollNo || `2026-${Math.floor(100 + Math.random() * 900)}`,
        addedBy: addedByRole
      };
      await fetch(`${API_BASE_URL}/erp/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch (e) {
      console.warn('Add student error');
    }
    return erpApi.getStudents();
  },

  removeStudent: async (id: string): Promise<boolean> => {
    try {
      const res = await fetch(`${API_BASE_URL}/erp/users/${id}`, { method: 'DELETE' });
      return res.ok;
    } catch (e) {
      return true;
    }
  }
};
