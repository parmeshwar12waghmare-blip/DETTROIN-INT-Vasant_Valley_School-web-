// ─── CONTACT SECTION CONTENT ─────────────────────────────────────────────────
// Edit this file to update contact details, address, hours, and form subjects.
// Component that reads this file: src/components/contact/ContactSection.tsx
// NOTE: This section has NO images — all content is text-based.

export const contactContent = {
  sectionBadge: 'Get In Touch',
  sectionTitle: 'Contact Vasant Valley Administration',
  sectionSubtitle:
    'We are here to answer your questions regarding admissions, academics, and campus visits.',

  details: [
    {
      label: 'Campus Address',
      value: 'Sector C, Vasant Kunj, New Delhi – 110070, India',
      accent: 'rgba(240,68,36,0.12)',
    },
    {
      label: 'Phone Enquiries',
      value: '+91 (011) 2689-2354 / 2689-2355',
      accent: 'rgba(240,68,36,0.12)',
    },
    {
      label: 'Email Desk',
      value: 'info@vasantvalley.edu / admissions@vasantvalley.edu',
      accent: 'rgba(255,212,125,0.12)',
    },
    {
      label: 'Working Hours',
      value: 'Monday – Friday: 8:00 AM – 4:00 PM',
      accent: 'rgba(240,68,36,0.12)',
    },
  ],

  transportNote:
    '5 minutes drive from Chattarpur Metro Station & IGI Airport T3 express highway.',

  subjectOptions: [
    { value: 'Admissions Inquiry', label: 'Admissions Inquiry' },
    { value: 'Fee Structure', label: 'Fee Structure & Scholarships' },
    { value: 'Campus Visit Appointment', label: 'Campus Visit Appointment' },
    { value: 'General Admin', label: 'General Admin & Careers' },
  ],
};
