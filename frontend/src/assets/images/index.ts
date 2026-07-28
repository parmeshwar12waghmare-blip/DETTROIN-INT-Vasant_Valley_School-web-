import img1 from './1.jpg';
import imgDemo from './demo.jpg';
import imgGround from './ground.jpg';
import imgGroupStaff from './group staf.jpg';
import imgInfraBanner from './infra-banner-1.jpg';
import imgLogo from './logo.jpg';
import imgValley from './valley-1.png';
import imgVasantValleyMain from './vasant-valley-school-vasant-kunj-delhi-english-medium-schools-lclkv1qukt.avif';

export const localImages = {
  logo: imgLogo,
  campusMain: imgVasantValleyMain,
  ground: imgGround,
  groupStaff: imgGroupStaff,
  infraBanner: imgInfraBanner,
  valley: imgValley,
  demo: imgDemo,
  building: img1,
};

export const schoolImages = {
  campusHero: imgVasantValleyMain || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
  principal: imgGroupStaff || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
  stemLab: imgDemo || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80',
  swimmingPool: img1 || 'https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?auto=format&fit=crop&w=600&q=80',
  library: imgInfraBanner || 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=600&q=80',
  amphitheatre: imgValley || 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80',
  sportsArena: imgGround || 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=600&q=80',
  artsStudio: imgDemo || 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&q=80'
};
