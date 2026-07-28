// ─── 3D VIEW ASSETS & LINKS PATHS REGISTRY ───────────────────────────────────────
// This file serves as the centralized repository for 360-degree virtual tour panoramas,
// 3D scene view links, location coordinates, hotspots, and metadata.

export interface Hotspot3D {
  id: string;
  x: number; // percentage horizontal position (0-100)
  y: number; // percentage vertical position (0-100)
  title: string;
  description: string;
  icon?: 'info' | 'lab' | 'trophy' | 'book' | 'music' | 'camera';
}

export interface ViewPage360 {
  id: string;
  title: string;
  category: 'Campus' | 'STEM & Labs' | 'Sports & Fitness' | 'Arts & Culture' | 'Library & Innovation';
  description: string;
  imageUrl: string;
  thumbnailUrl: string;
  path: string;
  virtualTourUrl: string;
  hotspots: Hotspot3D[];
  highlights: string[];
  specs: {
    area: string;
    capacity: string;
    features: string;
  };
}

export const VIEW_3D_PATHS: ViewPage360[] = [
  {
    id: 'main-campus-quad',
    title: 'Main Academic Quadrangle 360°',
    category: 'Campus',
    description: 'Explore the central courtyard of Vasant Valley School surrounded by lush greenery, modern classrooms, and architectural heritage.',
    imageUrl: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1920&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=400&q=80',
    path: '/3d-view/main-campus',
    virtualTourUrl: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=2400&q=90',
    highlights: ['Solar-Powered Green Buildings', 'Central Assembly Ground', 'Wi-Fi Enabled Outdoor Seating'],
    specs: {
      area: '15 Acres',
      capacity: '2,500 Students',
      features: 'Eco-friendly Architecture, Amphitheatre, Botanical Garden'
    },
    hotspots: [
      { id: 'h1', x: 28, y: 45, title: 'Senior Academic Wing', description: 'Smart classrooms with interactive digital displays and climate control.', icon: 'info' },
      { id: 'h2', x: 62, y: 52, title: 'Open Air Amphitheatre', description: 'Hosts morning assemblies, drama festivals, and musical concerts.', icon: 'music' },
      { id: 'h3', x: 80, y: 38, title: 'Administrative Pavilion', description: 'Admissions desk, Principal office, and Parent helpdesk.', icon: 'info' }
    ]
  },
  {
    id: 'stem-robotics-lab',
    title: 'STEM & AI Robotics Innovation Hub 360°',
    category: 'STEM & Labs',
    description: 'State-of-the-art laboratory equipped with 3D printers, humanoid robotics kits, drone testing arenas, and IoT development boards.',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1920&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80',
    path: '/3d-view/stem-robotics-lab',
    virtualTourUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=2400&q=90',
    highlights: ['3D Rapid Prototyping Station', 'Drone Flight Cage', 'NVIDIA AI Compute Workstations'],
    specs: {
      area: '4,500 Sq. Ft.',
      capacity: '60 Students/Session',
      features: 'Laser Cutters, Microcontroller Bench, AR/VR Headsets'
    },
    hotspots: [
      { id: 'h4', x: 35, y: 50, title: '3D Printing Workstation', description: 'Industrial grade PLA & ABS 3D printers for student engineering prototypes.', icon: 'lab' },
      { id: 'h5', x: 72, y: 42, title: 'Autonomous Drone Flight Test Cell', description: 'Enclosed safety cage for testing quadcopter algorithms.', icon: 'info' }
    ]
  },
  {
    id: 'olympic-sports-complex',
    title: 'Vasant Sports Complex & Indoor Arena 360°',
    category: 'Sports & Fitness',
    description: 'World-class athletic facility housing an Olympic-standard swimming pool, synthetic turf football pitch, and indoor basketball stadium.',
    imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1920&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=400&q=80',
    path: '/3d-view/sports-complex',
    virtualTourUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=2400&q=90',
    highlights: ['Temperature-Controlled Pool', 'FIBA Basketball Court', 'Professional Track & Field'],
    specs: {
      area: '8 Acres',
      capacity: '1,200 Spectators',
      features: 'Floodlights, Professional Coaching Staff, Gymnasium'
    },
    hotspots: [
      { id: 'h6', x: 45, y: 58, title: 'Synthetic Athletics Track', description: '8-lane Olympic standard track certified for national sports meets.', icon: 'trophy' },
      { id: 'h7', x: 82, y: 35, title: 'Heated Indoor Swimming Pool', description: 'Half-Olympic 25-meter pool with automated water filtration.', icon: 'info' }
    ]
  },
  {
    id: 'digital-library-knowledge',
    title: 'Knowledge Commons & Digital Library 360°',
    category: 'Library & Innovation',
    description: 'A tranquil learning sanctuary with over 35,000 physical volumes, Kindle e-readers, research pods, and subscription to global academic journals.',
    imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1920&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=400&q=80',
    path: '/3d-view/digital-library',
    virtualTourUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=2400&q=90',
    highlights: ['35,000+ Printed Books', 'JSTOR & EBSCO Digital Database', 'Silent Study Cubicles'],
    specs: {
      area: '6,000 Sq. Ft.',
      capacity: '200 Readers',
      features: 'Automated RFID Book Checkout, Kindle Station, Discussion Rooms'
    },
    hotspots: [
      { id: 'h8', x: 30, y: 40, title: 'Digital E-Journal Station', description: 'Access to research repositories like JSTOR, IEEE, and Britannica.', icon: 'book' },
      { id: 'h9', x: 65, y: 60, title: 'Collaborative Group Discussion Pods', description: 'Soundproof pods with shared screens for group research projects.', icon: 'info' }
    ]
  },
  {
    id: 'auditorium-arts',
    title: 'Grand Performing Arts Auditorium 360°',
    category: 'Arts & Culture',
    description: 'A 1,000-seater air-conditioned auditorium with acoustic wall paneling, professional lighting rigs, and Dolby Atmos audio setup.',
    imageUrl: 'https://images.unsplash.com/photo-1469488865564-c2de10f69f96?auto=format&fit=crop&w=1920&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1469488865564-c2de10f69f96?auto=format&fit=crop&w=400&q=80',
    path: '/3d-view/auditorium',
    virtualTourUrl: 'https://images.unsplash.com/photo-1469488865564-c2de10f69f96?auto=format&fit=crop&w=2400&q=90',
    highlights: ['Dolby Atmos Sound System', 'Dimmable Stage Rigs', 'Green Rooms & Orchestra Pit'],
    specs: {
      area: '10,000 Sq. Ft.',
      capacity: '1,000 Seats',
      features: 'Motorized Stage Curtains, HD Recording System, Backstage Lounge'
    },
    hotspots: [
      { id: 'h10', x: 50, y: 42, title: 'Main Proscenium Stage', description: 'Elevated wooden stage designed for large-scale theatrical plays.', icon: 'music' }
    ]
  }
];

export const get3DPageByPath = (path: string): ViewPage360 | undefined => {
  return VIEW_3D_PATHS.find((p) => p.path === path || p.id === path);
};
