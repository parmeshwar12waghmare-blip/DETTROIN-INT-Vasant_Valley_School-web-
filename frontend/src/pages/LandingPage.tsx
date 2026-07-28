import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { HighlightsSection } from '../components/home/HighlightsSection';
import { AcademicsSection } from '../components/academics/AcademicsSection';
import { NewsSection } from '../components/news/NewsSection';

interface LandingPageProps {
  onApplyClick: () => void;
  onExploreClick: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onApplyClick, onExploreClick }) => {
  return (
    <div>
      <HeroSection onApplyClick={onApplyClick} onExploreClick={onExploreClick} />
      <HighlightsSection />
      <AcademicsSection />
      <NewsSection />
    </div>
  );
};

export default LandingPage;