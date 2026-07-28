// ─── NEWS & EVENTS SECTION CONTENT ───────────────────────────────────────────
// Edit events and announcements here without touching the NewsSection component.
// Component that reads this file: src/components/news/NewsSection.tsx
// NOTE: This section has NO images — all content is text-based.

import type { SchoolEvent, Announcement } from '../types';

export const newsContent = {
  sectionBadge: 'Happenings & Updates',
  sectionTitle: 'Events & Official Notice Board',
  sectionSubtitle:
    'Stay informed with upcoming campus activities, academic schedules, and accomplishments.',

  filterCategories: ['All', 'Academic', 'Sports', 'Cultural', 'Workshop'],
};

export const events: SchoolEvent[] = [
  {
    id: '1',
    title: 'Annual Science & Innovation Expo 2026',
    category: 'Academic',
    date: 'August 15, 2026',
    time: '09:00 AM – 04:00 PM',
    location: 'Main Auditorium & STEM Labs',
    description:
      'Students present working prototypes in Robotics, AI, Renewable Energy, and Biotechnology.',
    featured: true,
  },
  {
    id: '2',
    title: 'Inter-School Athletics Championship',
    category: 'Sports',
    date: 'August 22, 2026',
    time: '08:00 AM – 05:00 PM',
    location: 'Vasant Sports Complex',
    description:
      'Track and field events featuring top regional school teams in sprint, high jump, and relay.',
    featured: true,
  },
  {
    id: '3',
    title: 'Symphony & Performing Arts Night',
    category: 'Cultural',
    date: 'September 05, 2026',
    time: '06:00 PM – 09:00 PM',
    location: 'Open Air Amphitheatre',
    description:
      'A magical evening of classical musical ensembles, contemporary dance, and theatrical plays.',
    featured: false,
  },
  {
    id: '4',
    title: 'Parent-Teacher Career Counseling Workshop',
    category: 'Workshop',
    date: 'September 12, 2026',
    time: '10:00 AM – 01:00 PM',
    location: 'Conference Hall B',
    description:
      'Guiding Senior Secondary students through global university admissions and futuristic career paths.',
    featured: false,
  },
];

export const announcements: Announcement[] = [
  {
    id: 'a1',
    title: 'Admissions Open for Academic Session 2026-2027',
    date: 'July 25, 2026',
    category: 'Important',
    content:
      'Online registration for Nursery to Class IX & Class XI is now open. Early submission is recommended.',
    isUrgent: true,
  },
  {
    id: 'a2',
    title: 'First Term Examination Schedule Released',
    date: 'July 20, 2026',
    category: 'Exam',
    content:
      'The detailed date sheet for Grade VI to XII examinations is available in the student portal.',
    isUrgent: false,
  },
  {
    id: 'a3',
    title: 'Monsoon Break Advisory',
    date: 'July 15, 2026',
    category: 'Holiday',
    content: 'School will remain closed on Friday for scheduled campus maintenance.',
    isUrgent: false,
  },
];
