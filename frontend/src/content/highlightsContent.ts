// ─── HIGHLIGHTS / HOME SECTION CONTENT ──────────────────────────────────────
// Edit this file to update the "Why Families Choose" pillars and Principal quote.
// Component that reads this file: src/components/home/HighlightsSection.tsx

export const highlightsContent = {
  // ── Section header text ───────────────────────────────────────────────────
  sectionBadge: 'Our Core Pillars',
  sectionTitle: 'Why Families Choose Vasant Valley',
  sectionSubtitle:
    'We provide a balanced ecosystem where scholarly excellence harmonizes with artistic expression and athletic vigor.',

  // ── Pillar Cards (icons are defined in HighlightsSection.tsx, not here) ───
  pillars: [
    {
      title: 'Academic Mastery',
      description:
        'Progressive CBSE curriculum emphasizing critical thinking, problem-solving, and individualized learning pathways.',
    },
    {
      title: 'STEM & Robotics Lab',
      description:
        'State-of-the-art innovation hubs equipping students with coding, AI fundamentals, 3D printing, and scientific inquiry.',
    },
    {
      title: 'World-Class Sports',
      description:
        'Olympic-standard facilities for swimming, tennis, basketball, football, and martial arts with expert coaching.',
    },
    {
      title: 'Values & Leadership',
      description:
        'Cultivating empathy, global citizenship, environmental stewardship, and ethical leadership in every student.',
    },
  ],

  principal: {
    // ── Principal text details ─────────────────────────────────────────────
    name: 'Dr. Sunita Sharma',
    role: 'Principal, Vasant Valley School',
    credential: 'Ph.D. in Educational Leadership (Harvard), 25+ Years Experience',
    quote:
      "Education is not merely about accumulating knowledge; it is about building character, fostering resilience, and awakening the unique genius within each child. Welcome to a vibrant community dedicated to lifelong learning.",

    // ── PRINCIPAL PHOTO ───────────────────────────────────────────────────
    // WHERE IT APPEARS: Round portrait photo inside the dark "Principal Card"
    //   at the bottom of the Highlights section (the black background card).
    // USED IN: src/components/home/HighlightsSection.tsx → <img src={c.principal.photo} />
    // TO CHANGE: Replace the URL below with your own image URL or local path
    //   - Online image: 'https://your-cdn.com/principal-photo.jpg'
    //   - Local image:  '/images/principal.jpg'  (place file in frontend/public/images/)
    photo:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
  },
};
