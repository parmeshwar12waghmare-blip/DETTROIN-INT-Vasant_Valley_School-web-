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

import { localImages, schoolImages } from '../assets/images';

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
      img: localImages.demo || schoolImages.stemLab,
      description:
        'High-speed computing rigs, 3D printers, IoT hardware kits, and robotics assembly stations.',
    },
    {
      id: '2',
      name: 'Olympic Semi-Covered Pool & Aquatic Center',
      category: 'sports',
      img: localImages.building || schoolImages.swimmingPool,
      description:
        'Temperature-controlled 25m swimming pool with certified lifeguard supervisors and training tracks.',
    },
    {
      id: '3',
      name: 'Central Digital Library & Knowledge Hub',
      category: 'labs',
      img: localImages.infraBanner || schoolImages.library,
      description:
        'Over 30,000 volumes, international academic journals, e-readers, and quiet study pods.',
    },
    {
      id: '4',
      name: 'Grand Performing Arts Amphitheatre',
      category: 'arts',
      img: localImages.valley || schoolImages.amphitheatre,
      description:
        'Acoustically designed 800-seater theatre hosting drama productions, musical concert nights, and debates.',
    },
    {
      id: '5',
      name: 'Vasant Sports Arena & Athletic Ground',
      category: 'sports',
      img: localImages.ground || schoolImages.sportsArena,
      description:
        'Synthetic basketball courts, lawn tennis arena, and FIFA-grade football turf ground.',
    },
    {
      id: '6',
      name: 'Vasant Main Campus Heritage Pavilion',
      category: 'arts',
      img: localImages.campusMain || schoolImages.artsStudio,
      description:
        'Iconic architecture surrounded by botanical gardens, solar pavilions, and creative design studios.',
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
