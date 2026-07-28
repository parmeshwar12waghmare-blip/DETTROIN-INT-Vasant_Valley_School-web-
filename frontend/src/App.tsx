import React, { useState } from 'react';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { PortalModal } from './components/common/PortalModal';
import { HeroSection } from './components/home/HeroSection';
import { AboutSection } from './components/about/AboutSection';
import { HighlightsSection } from './components/home/HighlightsSection';
import { AcademicsSection } from './components/academics/AcademicsSection';
import { AchievementsSection } from './components/achievements/AchievementsSection';
import { AdmissionsSection } from './components/admissions/AdmissionsSection';
import { CampusSection } from './components/campus/CampusSection';
import { NewsSection } from './components/news/NewsSection';
import { ContactSection } from './components/contact/ContactSection';
import type { ERPUser } from './types';

// ─── SCROLL HELPER ────────────────────────────────────────────────────────────
const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

export const App: React.FC = () => {
  const [isPortalOpen, setIsPortalOpen] = useState<boolean>(false);
  const [_erpUser, setErpUser] = useState<ERPUser | null>(null);

  // If user is currently logged into ERP, display the full ERP Dashboard
  /*if (erpUser) {
    return (
      <ERPDashboard
        user={erpUser}
        onLogout={() => setErpUser(null)}
      />
    );
  }*/

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-red-500 selection:text-white">
      {/* ─── Sticky Navigation Header ────────────────────────────────────────── */}
      <Header
        scrollToSection={scrollToSection}
        onOpenPortal={() => setIsPortalOpen(true)}
      />

      {/* ─── Main Content — All sections rendered together ────────────────── */}
      <main className="flex-grow">
        {/* id="home" — Full Viewport Auto-fit Glassmorphism Hero Section */}
        <HeroSection
          onApplyClick={() => scrollToSection('admissions')}
          onExploreClick={() => scrollToSection('campus')}
        />

        {/* id="highlights" — Why families choose Vasant Valley */}
        <HighlightsSection />

        {/* id="academics" — Stage tabs */}
        <AcademicsSection />

        {/* id="achievements" — Student & School Accolades */}
        <AchievementsSection />

        {/* id="admissions" — Online application form */}
        <AdmissionsSection />

        {/* id="campus" — Facility gallery */}
        <CampusSection />

        {/* id="news" — Upcoming events & notices */}
        <NewsSection />

        {/* id="about" — About Us & Leadership Team Section (2nd last before Footer) */}
        <AboutSection />

        {/* id="contact" — Contact form & address */}
        <ContactSection />
      </main>

      {/* ─── Footer ──────────────────────────────────────────────────────────── */}
      <Footer scrollToSection={scrollToSection} />

      {/* ─── Student & Parent ERP Portal Dialog ─────────────────────────────── */}
      <PortalModal
        isOpen={isPortalOpen}
        onClose={() => setIsPortalOpen(false)}
        onSuccessLogin={(user) => {
          setErpUser(user);
          setIsPortalOpen(false);
        }}
      />
    </div>
  );
};

export default App;