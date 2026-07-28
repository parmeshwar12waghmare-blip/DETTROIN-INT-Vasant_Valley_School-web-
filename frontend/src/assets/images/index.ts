import img1 from './1.jpg';
import imgDemo from './demo.jpg';
import imgGround from './ground.jpg';
import imgGroupStaff from './group staf.jpg';
import imgInfraBanner from './infra-banner-1.jpg';
import imgLogo from './logo.jpg';
import imgValley from './valley-1.png';
import imgVasantValleyMain from './vasant-valley-school-gate.png';

export const cloudImages = {
  groupStaff: 'https://res.cloudinary.com/lskutfol/image/upload/v1785261234/group_staf_yhwued.jpg',
  chairman: 'https://res.cloudinary.com/lskutfol/image/upload/v1785267344/profile_icon_wblvzk.jpg',
  demo: 'https://res.cloudinary.com/lskutfol/image/upload/v1785261202/demo_eoluqi.jpg',
  valley: 'https://res.cloudinary.com/lskutfol/image/upload/v1785261200/valley-1_pcseq7.png',
  infraBanner: 'https://res.cloudinary.com/lskutfol/image/upload/v1785261199/infra-banner-1_gl6vmu.jpg',
  ground: 'https://res.cloudinary.com/lskutfol/image/upload/v1785261193/ground_ols6il.jpg',
  building: 'https://res.cloudinary.com/lskutfol/image/upload/v1785261176/1_oc4zfa.jpg',
  campusMain: 'https://res.cloudinary.com/lskutfol/image/upload/v1785261172/vasant-valley-school-vasant-kunj-delhi-english-medium-schools-lclkv1qukt_djcdt3.avif',
  principal: 'https://res.cloudinary.com/lskutfol/image/upload/v1785261159/principle_qkf7z2.jpg',
  logo: imgLogo,
};

export const localImages = {
  logo: imgLogo,
  campusMain: cloudImages.campusMain || imgVasantValleyMain,
  ground: cloudImages.ground || imgGround,
  groupStaff: cloudImages.groupStaff || imgGroupStaff,
  infraBanner: cloudImages.infraBanner || imgInfraBanner,
  valley: cloudImages.valley || imgValley,
  demo: cloudImages.demo || imgDemo,
  building: cloudImages.building || img1,
  chairman: cloudImages.chairman,
  principal: cloudImages.principal,
};

export const schoolImages = {
  campusHero: cloudImages.campusMain,
  principal: cloudImages.principal,
  groupStaff: cloudImages.groupStaff,
  chairman: cloudImages.chairman,
  stemLab: cloudImages.demo,
  swimmingPool: cloudImages.building,
  library: cloudImages.infraBanner,
  amphitheatre: cloudImages.valley,
  sportsArena: cloudImages.ground,
  artsStudio: cloudImages.demo,
};
