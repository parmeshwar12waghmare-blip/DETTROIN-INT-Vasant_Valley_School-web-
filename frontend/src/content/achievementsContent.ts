// ─── ACHIEVEMENTS CONTENT ───────────────────────────────────────────────────
// Centralized data file for Student & Institutional (College/School) Achievements

export interface StudentAchievement {
  id: string;
  studentName: string;
  grade: string;
  title: string;
  category: 'Olympiad' | 'University Placement' | 'Sports' | 'STEM & Innovation' | 'Arts & Literature';
  description: string;
  award: string;
  year: string;
  image: string;
  badge: string;
}

export interface SchoolAchievement {
  id: string;
  title: string;
  issuingBody: string;
  category: 'National Ranking' | 'Academic Excellence' | 'Sustainability' | 'Infrastructure' | 'Global Exchange';
  year: string;
  description: string;
  iconName: string;
  stats: string;
  image: string;
}

export interface UniversityAcceptance {
  university: string;
  location: string;
  logo: string;
  admitCount: number;
  featuredCourse: string;
}

export const achievementsContent = {
  badge: 'Hall of Excellence & Pride',
  title: 'Celebrating Student & Institutional Milestones',
  subtitle: 'From Ivy League university admissions and national STEM championships to top school rankings across India.',

  // ── 1. STUDENT ACHIEVEMENTS ────────────────────────────────────────────────
  students: [
    {
      id: 's1',
      studentName: 'Aarav Sharma & Team',
      grade: 'Class X-A',
      title: 'Global Robotics Olympiad 2026 Champions',
      category: 'STEM & Innovation',
      description: 'Built an AI-powered autonomous search-and-rescue quadcopter drone that secured Gold in Tokyo International Robotics Challenge.',
      award: 'Gold Medalist & $15,000 Innovation Grant',
      year: '2026',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
      badge: 'International Rank #1'
    },
    {
      id: 's2',
      studentName: 'Ananya Verma',
      grade: 'Class XII',
      title: 'MIT & Stanford Early Decision Acceptance',
      category: 'University Placement',
      description: 'Achieved 1580/1600 SAT score and published research on renewable solar polymer materials in international journal.',
      award: 'Full Academic Scholarship',
      year: '2026',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80',
      badge: '100% Scholarship'
    },
    {
      id: 's3',
      studentName: 'Kabir Mehta',
      grade: 'Class XI',
      title: 'National Junior Athletics Track Champion',
      category: 'Sports',
      description: 'Broke the 400m sprint record at the All-India Inter-School Sports Meet with a timing of 47.8 seconds.',
      award: 'National Gold Medal',
      year: '2026',
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=600&q=80',
      badge: 'National Record Holder'
    },
    {
      id: 's4',
      studentName: 'Riya Singhania',
      grade: 'Class IX',
      title: 'Young Author International Literature Award',
      category: 'Arts & Literature',
      description: 'Authored an acclaimed science fiction anthology "Echoes of Tomorrow" published by HarperCollins India.',
      award: 'Best Debut Author Under 16',
      year: '2025',
      image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=600&q=80',
      badge: 'Published Author'
    }
  ] as StudentAchievement[],

  // ── 2. SCHOOL & COLLEGE INSTITUTIONAL ACHIEVEMENTS ─────────────────────────
  school: [
    {
      id: 'sch1',
      title: '#1 Day Co-Ed School in India',
      issuingBody: 'Education World India School Rankings 2025–26',
      category: 'National Ranking',
      year: '2026',
      description: 'Ranked Number 1 across India for academic reputation, teacher competence, leadership quality, and co-curricular education.',
      iconName: 'Trophy',
      stats: '1st Rank nationwide for 5 consecutive years',
      image: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'sch2',
      title: 'CBSE School of Academic Excellence',
      issuingBody: 'Central Board of Secondary Education',
      category: 'Academic Excellence',
      year: '2026',
      description: 'Awarded 100% Distinction rate with Class X and XII school averages exceeding 92.4% across all streams.',
      iconName: 'Award',
      stats: '100% Pass Rate with 78% scoring above 90%',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'sch3',
      title: 'Platinum Green School Accreditation',
      issuingBody: 'Indian Green Building Council (IGBC)',
      category: 'Sustainability',
      year: '2025',
      description: 'Certified zero-carbon footprint campus equipped with 250kW solar panels, rainwater harvesting, and organic farming gardens.',
      iconName: 'Leaf',
      stats: '100% Solar Powered & Zero Waste Campus',
      image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'sch4',
      title: 'Center of STEM & AI Innovation Excellence',
      issuingBody: 'Ministry of Education & NITI Aayog',
      category: 'Infrastructure',
      year: '2025',
      description: 'Recognized model Atal Tinkering Lab with advanced robotics, 3D printing, space science kits, and drone design studios.',
      iconName: 'Cpu',
      stats: 'Over 50+ Student Inventions Patented',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80'
    }
  ] as SchoolAchievement[],

  // ── 3. TOP COLLEGE & UNIVERSITY PLACEMENTS ────────────────────────────────
  universities: [
    { university: 'Harvard University', location: 'USA', logo: '🏛️', admitCount: 6, featuredCourse: 'Computer Science & Economics' },
    { university: 'Stanford University', location: 'USA', logo: '🌲', admitCount: 8, featuredCourse: 'AI Robotics & Engineering' },
    { university: 'University of Oxford', location: 'UK', logo: '🏰', admitCount: 5, featuredCourse: 'PPE & Philosophy' },
    { university: 'MIT (Massachusetts Tech)', location: 'USA', logo: '🔬', admitCount: 4, featuredCourse: 'Aerospace & Biotechnology' },
    { university: 'IIT Bombay & IIT Delhi', location: 'India', logo: '⚙️', admitCount: 32, featuredCourse: 'Computer Science & B.Tech' },
    { university: 'Imperial College London', location: 'UK', logo: '🇬🇧', admitCount: 11, featuredCourse: 'Data Science & Medicine' }
  ] as UniversityAcceptance[]
};
