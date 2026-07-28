// ─── CAMPUS SECTION CONTENT ──────────────────────────────────────────────────
// Edit this file to add, remove, or update campus facilities.
// Component that reads this file: src/components/campus/CampusSection.tsx
//
// ── HOW TO CHANGE IMAGES ──────────────────────────────────────────────────────
// Each facility object has an `img` field.
// WHERE IT APPEARS: Facility card thumbnail in the "Campus Life" grid section.
// TO CHANGE: Replace the URL string for the specific facility:
//   - Online image: 'https://your-cdn.com/stem-lab.jpg'
//   - Local image:  '/images/stem-lab.jpg'  (place file in frontend/public/images/)

export const campusContent = {
  // ── Section header text ───────────────────────────────────────────────────
  sectionBadge: 'World-Class Infrastructure',
  sectionTitle: 'Interactive Campus Exploration',
  sectionSubtitle:
    'Spanning over 8 acres of lush green eco-friendly space engineered for holistic growth.',

  facilities: [
    {
      id: '1',
      name: 'Advanced STEM & AI Lab',
      category: 'labs',
      // FACILITY IMAGE #1 — STEM & AI Lab card thumbnail
      // WHERE: Campus section grid, card 1 (STEM & Labs category)
      // USED IN: CampusSection.tsx → <img src={fac.img} />
      img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80',
      description:
        'High-speed computing rigs, 3D printers, IoT hardware kits, and robotics assembly stations.',
    },
    {
      id: '2',
      name: 'Olympic Semi-Covered Pool',
      category: 'sports',
      // FACILITY IMAGE #2 — Swimming Pool card thumbnail
      // WHERE: Campus section grid, card 2 (Sports Complex category)
      // USED IN: CampusSection.tsx → <img src={fac.img} />
      img: 'https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?auto=format&fit=crop&w=600&q=80',
      description:
        'Temperature-controlled 25m swimming pool with certified lifeguard supervisors and training tracks.',
    },
    {
      id: '3',
      name: 'Central Digital Library',
      category: 'labs',
      // FACILITY IMAGE #3 — Library card thumbnail
      // WHERE: Campus section grid, card 3 (STEM & Labs category)
      // USED IN: CampusSection.tsx → <img src={fac.img} />
      img: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=600&q=80',
      description:
        'Over 30,000 volumes, international academic journals, e-readers, and quiet study pods.',
    },
    {
      id: '4',
      name: 'Grand Performing Arts Amphitheatre',
      category: 'arts',
      // FACILITY IMAGE #4 — Amphitheatre / Theatre card thumbnail
      // WHERE: Campus section grid, card 4 (Arts & Culture category)
      // USED IN: CampusSection.tsx → <img src={fac.img} />
      img: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80',
      description:
        'Acoustically designed 800-seater theatre hosting drama productions, musical concert nights, and debates.',
    },
    {
      id: '5',
      name: 'Vasant Sports Arena & Courts',
      category: 'sports',
      // FACILITY IMAGE #5 — Sports Courts / Arena card thumbnail
      // WHERE: Campus section grid, card 5 (Sports Complex category)
      // USED IN: CampusSection.tsx → <img src={fac.img} />
      img: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=600&q=80',
      description:
        'Synthetic basketball courts, lawn tennis arena, and FIFA-grade football turf ground.',
    },
    {
      id: '6',
      name: 'Fine Arts Studio & Pottery Hub',
      category: 'arts',
      // FACILITY IMAGE #6 — Fine Arts Studio card thumbnail
      // WHERE: Campus section grid, card 6 (Arts & Culture category)
      // USED IN: CampusSection.tsx → <img src={fac.img} />
      img: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&q=80',
      description:
        'Dedicated spaces for oil painting, clay molding, sculpture, printmaking, and graphic design.',
    },
  ],

  // ── Filter button options (key must match the `category` values above) ────
  filterOptions: [
    { key: 'all',    label: 'All Facilities' },
    { key: 'labs',   label: 'STEM & Labs' },
    { key: 'sports', label: 'Sports Complex' },
    { key: 'arts',   label: 'Arts & Culture' },
  ],
};
