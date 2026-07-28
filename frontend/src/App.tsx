import React, { useState } from 'react';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { PortalModal } from './components/common/PortalModal';
import { HeroSection } from './components/home/HeroSection';
import { HighlightsSection } from './components/home/HighlightsSection';
import { AcademicsSection } from './components/academics/AcademicsSection';
// ─── SCROLL HELPER ────────────────────────────────────────────────────────────
// Smoothly scrolls the page to a section by its HTML id attribute.
// Used by Header nav links and Hero CTA buttons.
const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

export const App: React.FC = () => {
  const [isPortalOpen, setIsPortalOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-emerald-500 selection:text-white">

      {/* ─── Sticky Navigation Header ──────────────────────────────────────────
          Passes scrollToSection so nav links use smooth anchor scrolling
          instead of tab-switching. */}
      <Header
        scrollToSection={scrollToSection}
        onOpenPortal={() => setIsPortalOpen(true)}
      />

    </div>
  );
};

export default App;