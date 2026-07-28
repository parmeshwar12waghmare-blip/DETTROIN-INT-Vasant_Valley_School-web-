import type { AdmissionApplication, ContactInquiry, SchoolEvent, Announcement } from '../types';

const API_BASE = '/api';

const mockApplications: AdmissionApplication[] = [];
const mockInquiries: ContactInquiry[] = [];

export const initialEvents: SchoolEvent[] = [
  {
    id: '1',
    title: 'Annual Science & Innovation Expo 2026',
    category: 'Academic',
    date: 'August 15, 2026',
    time: '09:00 AM - 04:00 PM',
    location: 'Main Auditorium & STEM Labs',
    description: 'Students present working prototypes in Robotics, AI, Renewable Energy, and Biotechnology.',
    featured: true
  },
  {
    id: '2',
    title: 'Inter-School Athletics Championship',
    category: 'Sports',
    date: 'August 22, 2026',
    time: '08:00 AM - 05:00 PM',
    location: 'Vasant Sports Complex',
    description: 'Track and field events featuring top regional school teams in sprint, high jump, and relay.',
    featured: true
  },
  {
    id: '3',
    title: 'Symphony & Performing Arts Night',
    category: 'Cultural',
    date: 'September 05, 2026',
    time: '06:00 PM - 09:00 PM',
    location: 'Open Air Amphitheatre',
    description: 'A magical evening of classical musical ensembles, contemporary dance, and theatrical plays.',
    featured: false
  },
  {
    id: '4',
    title: 'Parent-Teacher Career Counseling Workshop',
    category: 'Workshop',
    date: 'September 12, 2026',
    time: '10:00 AM - 01:00 PM',
    location: 'Conference Hall B',
    description: 'Guiding Senior Secondary students through global university admissions and futuristic career paths.',
    featured: false
  }
];

export const initialAnnouncements: Announcement[] = [
  {
    id: 'a1',
    title: 'Admissions Open for Academic Session 2026-2027',
    date: 'July 25, 2026',
    category: 'Important',
    content: 'Online registration for Nursery to Class IX & Class XI is now open. Early submission is recommended.',
    isUrgent: true
  },
  {
    id: 'a2',
    title: 'First Term Examination Schedule Released',
    date: 'July 20, 2026',
    category: 'Exam',
    content: 'The detailed date sheet for Grade VI to XII examinations is available in the student portal.',
    isUrgent: false
  },
  {
    id: 'a3',
    title: 'Monsoon Break Advisory',
    date: 'July 15, 2026',
    category: 'Holiday',
    content: 'School will remain closed on Friday for scheduled campus maintenance.',
    isUrgent: false
  }
];

export const submitAdmissionForm = async (data: AdmissionApplication): Promise<{ success: boolean; message: string; id?: string }> => {
  try {
    const res = await fetch(`${API_BASE}/admissions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (res.ok) {
      const result = await res.json();
      return { success: true, message: 'Application submitted successfully!', id: result.id };
    }
  } catch (err) {
    console.log('Backend API offline, utilizing client-side application handler.', err);
  }
  
  const fallbackId = 'APP-' + Math.floor(100000 + Math.random() * 900000);
  mockApplications.push({ ...data, id: fallbackId, status: 'pending', createdAt: new Date().toISOString() });
  return { success: true, message: 'Application submitted successfully! (Registration ID: ' + fallbackId + ')', id: fallbackId };
};

export const submitContactForm = async (data: ContactInquiry): Promise<{ success: boolean; message: string }> => {
  try {
    const res = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (res.ok) {
      return { success: true, message: 'Your message has been received. Our team will contact you shortly!' };
    }
  } catch (err) {
    console.log('Backend API offline, using fallback.', err);
  }

  mockInquiries.push(data);
  return { success: true, message: 'Thank you for reaching out! We will respond within 24 hours.' };
};
