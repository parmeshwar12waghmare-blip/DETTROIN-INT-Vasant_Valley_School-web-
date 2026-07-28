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
      name: 'Mrs. Rekha Purie',
      role: 'Chairperson / Chairman',
      qualifications: 'Chairperson, Vasant Valley School',
      photo: 'https://res.cloudinary.com/lskutfol/image/upload/v1785261202/chairman_pilwdi.jpg',
      bio: 'Visionary educationist and founder-chairperson guiding Vasant Valley School\'s mission of holistic development, academic distinction, and ethical leadership.',
      quote: 'Education is not merely acquiring knowledge, but awakening the passion to learn and serve.',
      experience: '35+ Years',
      email: 'chairperson@vasantvalley.edu.in',
    },
    {
      id: 'm2',
      name: 'Ms. Sharmila Bakshi',
      role: 'Principal',
      qualifications: 'Principal, Vasant Valley School',
      photo: 'https://res.cloudinary.com/lskutfol/image/upload/v1785261159/principle_qkf7z2.jpg',
      bio: 'Leading Vasant Valley School with a focus on academic rigor, student-centered learning, pedagogical innovation, and character building.',
      quote: 'We equip our students not just for examinations, but for life\'s journey as compassionate and ethical citizens.',
      experience: '25+ Years',
      email: 'principal@vasantvalley.edu.in',
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
