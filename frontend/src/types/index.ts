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
