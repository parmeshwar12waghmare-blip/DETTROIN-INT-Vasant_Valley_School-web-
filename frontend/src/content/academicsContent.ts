// ─── ACADEMICS SECTION CONTENT ───────────────────────────────────────────────
// Edit this file to update the stage descriptions, highlights, subjects, and performance metrics.
// Component that reads this file: src/components/academics/AcademicsSection.tsx
// NOTE: This section has NO images — all content is text-based.

export const academicsContent = {
  sectionBadge: 'Academic Excellence',
  sectionTitle: 'World-Class Learning Framework',
  sectionSubtitle:
    'Curriculum tailored to empower independent thinkers, visionary leaders, and lifelong learners.',

  stages: {
    primary: {
      title: 'Primary Wing (Nursery – Grade V)',
      tagline: 'Fostering Curiosity, Joy & Foundational Literacy',
      highlights: [
        'Play-way & experiential learning methodologies',
        'Phonics, numeracy, and creative art workshops',
        'Daily storytelling, music, and physical expression',
        'Zero-stress assessment framework focused on holistic growth',
      ],
      subjects: ['English & Hindi', 'Mathematics & STEM', 'Environmental Studies', 'Visual Arts & Drama', 'Coding Basics'],
    },
    middle: {
      title: 'Middle Wing (Grade VI – VIII)',
      tagline: 'Critical Inquiry, Analytical Skill & Discovery',
      highlights: [
        'Interdisciplinary projects blending Science, Tech & Humanities',
        'Third language options (French, German, Sanskrit)',
        'Robotics, Maker Space, and Scientific Tinkering Labs',
        'Leadership clubs, Debating societies, and Model UN prep',
      ],
      subjects: ['Physics, Chemistry, Biology', 'Advanced Mathematics', 'History, Civics & Geography', 'Foreign Languages', 'Computer Science'],
    },
    senior: {
      title: 'Senior Secondary Wing (Grade IX – XII)',
      tagline: 'Academic Rigor, Specialized Streams & Career Guidance',
      highlights: [
        'CBSE Board Examination mastery with top national ranks',
        'Specialized streams: Science, Commerce, and Humanities',
        'Global university application assistance and SAT/NEET/JEE mentoring',
        'Research papers, capstone projects, and industry internships',
      ],
      subjects: ['PCMB / Computer Science', 'Economics & Accountancy', 'Psychology & Political Science', 'Applied Maths', 'Design & AI'],
    },
  },

  performance: {
    title: 'Academic Performance',
    subtitle: 'CBSE Board Exam Benchmarks',
    metrics: [
      { label: 'School Batch Average:', value: '92.4%', color: '#F04424' },
      { label: 'Students Scoring > 90%:', value: '68%', color: '#FFD47D' },
      { label: 'Ivy League & Top Varsity:', value: '120+ Alumni', color: '#F04424' },
    ],
  },
};
