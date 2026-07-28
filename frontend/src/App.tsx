import React, { useState } from 'react';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { PortalModal } from './components/common/PortalModal';
import { HeroSection } from './components/home/HeroSection';
import { HighlightsSection } from './components/home/HighlightsSection';
import { AcademicsSection } from './components/academics/AcademicsSection';
import { AdmissionsSection } from './components/admissions/AdmissionsSection';
import { CampusSection } from './components/campus/CampusSection';
import { NewsSection } from './components/news/NewsSection';
import { ContactSection } from './components/contact/ContactSection';

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

      {/* ─── Main Content — All sections are rendered together ──────────────────
          Each section has a unique id="" so the Header nav can scroll to it.
          No lazy loading / tab switching — everything is on one long page. */}
      <main className="flex-grow">

        {/* id="home" — Hero banner at the very top */}
        <HeroSection
          onApplyClick={() => scrollToSection('admissions')}
          onExploreClick={() => scrollToSection('campus')}
        />

        {/* id="highlights" — Why families choose Vasant Valley pillars */}
        <HighlightsSection />

        {/* id="academics" — Primary / Middle / Senior stage tabs */}
        <AcademicsSection />

        {/* id="admissions" — Online application form & eligibility info */}
        <AdmissionsSection />

        {/* id="campus" — Facility gallery with category filter */}
        <CampusSection />

        {/* id="news" — Upcoming events & circular notice board */}
        <NewsSection />

        {/* id="contact" — Contact form & address details */}
        <ContactSection />

      </main>

      {/* ─── Footer ──────────────────────────────────────────────────────────── */}
      <Footer scrollToSection={scrollToSection} />

      {/* ─── Student & Parent ERP Portal Dialog ─────────────────────────────── */}
      <PortalModal
        isOpen={isPortalOpen}
        onClose={() => setIsPortalOpen(false)}
      />
    </div>
  );
};

export default App;