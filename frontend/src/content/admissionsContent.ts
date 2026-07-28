// ─── ADMISSIONS SECTION CONTENT ──────────────────────────────────────────────
// Edit this file to update admission steps, eligibility criteria, and contact info.
// Component that reads this file: src/components/admissions/AdmissionsSection.tsx
// NOTE: This section has NO images — all content is text-based.

export const admissionsContent = {
  sectionBadge: 'Join Our Community',
  sectionTitle: 'Admissions Process 2026–2027',
  sectionSubtitle:
    'Begin your journey towards an extraordinary educational experience for your child.',

  steps: [
    {
      step: '01',
      title: 'Online Registration',
      desc: 'Fill out the application form with student details.',
    },
    {
      step: '02',
      title: 'Document Upload',
      desc: 'Submit birth certificate, past academic records & ID.',
    },
    {
      step: '03',
      title: 'Interaction / Test',
      desc: 'Friendly interaction for Nursery or test for Grades I–XI.',
    },
    {
      step: '04',
      title: 'Seat Offer & Fee',
      desc: 'Receive offer letter and finalize enrollment online.',
    },
  ],

  eligibility: [
    {
      grade: 'Nursery',
      rule: 'Child must be 3+ years of age as of March 31, 2026.',
    },
    {
      grade: 'Grade I',
      rule: 'Child must be 5+ years of age with past pre-school reports.',
    },
    {
      grade: 'Grade XI',
      rule: 'Admissions based on Class X Board scores and entrance assessment.',
    },
  ],

  contact: {
    phone: '+91 (011) 2689-2354 (Ext. 104)',
    email: 'admissions@vasantvalley.edu',
    helpText:
      'Our Admissions Counselor team is available for phone consultations and campus tours Monday through Saturday.',
  },

  gradeOptions: [
    { value: 'Nursery', label: 'Nursery / LKG' },
    { value: 'Kindergarten', label: 'Kindergarten / HKG' },
    { value: 'Grade 1-5', label: 'Grade I to V (Primary)' },
    { value: 'Grade 6-8', label: 'Grade VI to VIII (Middle)' },
    { value: 'Grade 9-10', label: 'Grade IX & X (Secondary)' },
    { value: 'Grade 11-12', label: 'Grade XI & XII (Senior Sec)' },
  ],
};
