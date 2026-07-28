// ─── HERO SECTION CONTENT ───────────────────────────────────────────────────
// Edit this file to update the Hero section text, stats, and button labels.
// Component that reads this file: src/components/home/HeroSection.tsx

export const heroContent = {
  // ── Top badge text above the main heading ─────────────────────────────────
  badge: 'Admissions Open · Academic Session 2026–27',

  // ── Main heading — headingLine1 is black, headingAccent is red (#F04424) ──
  headingLine1: 'Shaping Minds.',
  headingAccent: 'Inspiring Futures.',

  // ── Description paragraph below the heading ───────────────────────────────
  description:
    'Vasant Valley School offers a transformative education blending academic rigor, creative innovation, and character building — recognized among India\'s premier educational institutions.',

  // ── CTA button labels ─────────────────────────────────────────────────────
  primaryButton: 'Apply Online Now',
  secondaryButton: 'Explore Campus Life',

  // ── Statistics displayed below the buttons ────────────────────────────────
  stats: [
    { number: '100%', label: 'CBSE Pass Rate' },
    { number: '1:10', label: 'Teacher–Student Ratio' },
    { number: '35+', label: 'Years of Excellence' },
  ],

  // ── HERO IMAGE ────────────────────────────────────────────────────────────
  // WHERE IT APPEARS: Large photo on the right side of the Hero banner.
  // USED IN: src/components/home/HeroSection.tsx → <img src={c.heroImage} />
  // TO CHANGE: Replace the URL below with your own image URL or local path
  //   - Online image: 'https://your-cdn.com/school-campus.jpg'
  //   - Local image:  '/images/hero-campus.jpg'  (place file in frontend/public/images/)
  heroImage:
    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',

  // ── Floating badge overlay on the hero image ──────────────────────────────
  heroBadgeTitle: '#1 Day Co-Ed School',
  heroBadgeSubtitle: 'Education World India Rankings',
};
