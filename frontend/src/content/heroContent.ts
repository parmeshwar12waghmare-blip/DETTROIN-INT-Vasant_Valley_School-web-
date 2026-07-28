import { localImages } from '../assets/images';

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
  heroImage: localImages.campusMain,

  // ── Floating badge overlay on the hero image ──────────────────────────────
  heroBadgeTitle: '#1 Day Co-Ed School',
  heroBadgeSubtitle: 'Education World India Rankings',
};
