import { localImages } from '../assets/images';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  qualifications: string;
  photo: string;
  bio: string;
  quote: string;
  experience: string;
  email: string;
}

export interface AboutValue {
  title: string;
  description: string;
  iconName: string;
}

export const aboutContent = {
  // ── ABOUT HERO SPECIFIC CONTENT ───────────────────────────────────────────
  hero: {
    badge: '35+ Years of Legacy & Integrity',
    headingLine1: 'Nurturing Leaders,',
    headingAccent: 'Inspiring World Changers.',
    description:
      'Founded in 1990, Vasant Valley School stands as a beacon of academic rigor, holistic values, and technological innovation — dedicated to nurturing curious minds into ethical global leaders.',
    heroImage: localImages.infraBanner || localImages.campusMain,
    badgeTitle: '#1 Educational Institution',
    badgeSubtitle: '35 Years of Academic Distinction',
    stats: [
      { number: '1990', label: 'Year Established' },
      { number: '15,000+', label: 'Global Alumni' },
      { number: '150+', label: 'Expert Faculty' },
    ],
  },

  // ── MISSION & VISION ──────────────────────────────────────────────────────
  mission: {
    badge: 'Our Foundational Purpose',
    title: 'Empowering Minds Through Integrity & Innovation',
    description:
      'Our mission is to foster an inclusive environment where academic curiosity thrives alongside character development, emotional intelligence, and technological literacy.',
    vision:
      'To build an internationally benchmarked institution that inspires every child to discover their unique potential and make meaningful contributions to society.',
  },

  // ── LEADERSHIP TEAM MEMBERS (WITH PHOTOS) ──────────────────────────────────
  team: [
    {
      id: 'm1',
      name: 'Dr. Rekha Krishnan',
      role: 'Principal & Director of Education',
      qualifications: 'Ph.D. in Educational Leadership (Oxford), M.Sc. Physics',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
      bio: 'Over 28 years of experience in global curriculum design and pedagogy innovation. Recipient of the National Teacher Excellence Award.',
      quote: 'Education is not merely acquiring knowledge, but awakening the passion to learn and serve.',
      experience: '28+ Years',
      email: 'principal@vasantvalley.edu.in',
    },
    {
      id: 'm2',
      name: 'Mr. Vikramaditya Sen',
      role: 'Chairman, Board of Governors',
      qualifications: 'M.B.A. (Harvard Business School), B.Tech (IIT Delhi)',
      photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
      bio: 'Prominent industrialist and philanthropist guiding Vasant Valley\'s strategic expansion, green campus initiatives, and STEM partnerships.',
      quote: 'We equip our students not just for examinations, but for life\'s unpredictable challenges.',
      experience: '32+ Years',
      email: 'chairman@vasantvalley.edu.in',
    },
    {
      id: 'm3',
      name: 'Mrs. Sunita Verma',
      role: 'Head of STEM & Academic Curriculum',
      qualifications: 'M.Sc. Mathematics, M.Ed. (Cambridge University)',
      photo: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=600&q=80',
      bio: 'Spearheaded the integration of AI, Robotics, and experiential laboratory learning across Senior Secondary stages.',
      quote: 'Curiosity is the engine of invention. We encourage students to ask "Why?" and "What if?".',
      experience: '20+ Years',
      email: 's.verma@vasantvalley.edu.in',
    },
    {
      id: 'm4',
      name: 'Dr. Rajeshwar K. Gupta',
      role: 'Dean of Student Welfare & Senior Faculty',
      qualifications: 'Ph.D. in Applied Mathematics (Delhi University)',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      bio: 'Dedicated mentor oversees student counseling, career guidance, inter-school athletics, and international exchange programs.',
      quote: 'Character and empathy are the true measures of an educated mind.',
      experience: '24+ Years',
      email: 'rk.gupta@vasantvalley.edu.in',
    },
  ] as TeamMember[],

  // ── CORE VALUES ───────────────────────────────────────────────────────────
  values: [
    {
      title: 'Integrity & Ethics',
      description: 'Building honest, accountable, and compassionate citizens who lead with moral courage.',
      iconName: 'ShieldCheck',
    },
    {
      title: 'Academic Mastery',
      description: 'Encouraging analytical rigor, intellectual curiosity, and lifelong love for discovery.',
      iconName: 'BookOpen',
    },
    {
      title: 'Innovation & STEM',
      description: 'Equipping students with AI, robotics, coding, and futuristic problem-solving tools.',
      iconName: 'Cpu',
    },
    {
      title: 'Global Citizenship',
      description: 'Fostering cultural empathy, environmental sustainability, and international perspectives.',
      iconName: 'Globe',
    },
  ] as AboutValue[],
};
