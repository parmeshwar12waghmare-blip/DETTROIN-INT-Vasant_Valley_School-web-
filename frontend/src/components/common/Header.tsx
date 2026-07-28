import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Menu, X, GraduationCap, ChevronRight, Award } from 'lucide-react';

// ─── HEADER CONTENT ───────────────────────────────────────────────────────────
// To change the school name / tagline displayed in the logo area, edit here.
const SCHOOL_NAME = 'VASANT VALLEY';
const SCHOOL_TAGLINE = 'School · Excellence & Integrity';

// ─── TOP INFO BAR CONTENT ─────────────────────────────────────────────────────
// Phone, email, and location shown in the dark bar at the very top of the page.
const TOP_BAR = {
  phone: '+91 (011) 2689-2354',
  email: 'admissions@vasantvalley.edu',
  location: 'Vasant Kunj, New Delhi',
  rankBadge: '#1 Ranked Day School',
  portalLabel: 'Parent & Student Portal',
};

// ─── NAVIGATION ITEMS ─────────────────────────────────────────────────────────
// Each item's `id` must match the `id=""` attribute on the corresponding
// section element in App.tsx so smooth-scroll anchoring works correctly.
const navItems = [
  { id: 'home',         label: 'Home' },
  { id: 'about',        label: 'About Us' },
  { id: 'academics',    label: 'Academics' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'admissions',   label: 'Admissions' },
  { id: 'campus',       label: 'Campus Life' },
  { id: 'news',         label: 'News & Events' },
  { id: 'contact',      label: 'Contact Us' },
];

// ─── HEADER PROPS ─────────────────────────────────────────────────────────────
interface NavbarProps {
  /** Smooth-scrolls the window to the section whose id matches the given string */
  scrollToSection: (id: string) => void;
  onOpenPortal: () => void;
  onOpen360Tour?: () => void;
}

export const Header: React.FC<NavbarProps> = ({ scrollToSection, onOpenPortal, onOpen360Tour }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ─── ACTIVE SECTION TRACKER ──────────────────────────────────────────────
  // Uses IntersectionObserver to highlight the nav item whose section is
  // currently visible in the viewport.
  const [activeSection, setActiveSection] = useState<string>('home');

  useEffect(() => {
    const sectionIds = navItems.map((n) => n.id);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        // Fire when the section is at least 40% visible from the top
        rootMargin: '-40% 0px -40% 0px',
        threshold: 0,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (id: string) => {
    scrollToSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50" style={{ boxShadow: '0 1px 0 #ECECEC' }}>

      {/* ─── Top Info Bar ──────────────────────────────────────────────────── */}
      <div style={{ background: '#1F1F1F', color: '#ECECEC' }} className="text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-5 flex-wrap justify-center">
            <span className="flex items-center gap-1.5">
              <Phone size={12} style={{ color: '#F04424' }} /> {TOP_BAR.phone}
            </span>
            <span className="flex items-center gap-1.5">
              <Mail size={12} style={{ color: '#F04424' }} /> {TOP_BAR.email}
            </span>
            <span className="hidden md:flex items-center gap-1.5">
              <MapPin size={12} style={{ color: '#F04424' }} /> {TOP_BAR.location}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span
              className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold"
              style={{ background: 'rgba(240,68,36,0.15)', color: '#FFD47D', border: '1px solid rgba(240,68,36,0.3)' }}
            >
              <Award size={11} style={{ color: '#FFD47D' }} /> {TOP_BAR.rankBadge}
            </span>
            <button
              onClick={onOpenPortal}
              className="flex items-center gap-1 font-bold cursor-pointer transition text-red-500 hover:text-red-400"
            >
              ERP Login <ChevronRight size={12} />
            </button>
          </div>
        </div>
      </div>

      {/* ─── Main Navigation ───────────────────────────────────────────────── */}
      <nav style={{ background: '#FFFFFF', borderBottom: '1px solid #ECECEC' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">

            {/* Logo — clicking scrolls back to the #home section */}
            <div
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => scrollToSection('home')}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300"
                style={{ background: '#F04424' }}
              >
                <GraduationCap size={26} color="#fff" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight leading-none" style={{ color: '#111111' }}>
                  {SCHOOL_NAME}
                </h1>
                <p className="text-xs tracking-widest font-semibold uppercase mt-0.5" style={{ color: '#F04424' }}>
                  {SCHOOL_TAGLINE}
                </p>
              </div>
            </div>

            {/* Desktop Nav Links — smooth-scroll to section anchor on click */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className="px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer"
                    style={{
                      background: isActive ? 'rgba(240,68,36,0.08)' : 'transparent',
                      color: isActive ? '#F04424' : '#555555',
                      fontWeight: isActive ? 700 : 500,
                    }}
                  >
                    {item.label}
                  </button>
                );
              })}

              {onOpen360Tour && (
                <button
                  onClick={onOpen360Tour}
                  className="px-3.5 py-2 rounded-xl text-sm font-bold text-amber-600 bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 transition cursor-pointer flex items-center gap-1.5"
                >
                  360° Tour
                </button>
              )}

              <button
                onClick={onOpenPortal}
                className="ml-2 px-4 py-2.5 rounded-xl text-sm font-bold bg-slate-900 hover:bg-slate-800 text-white transition cursor-pointer shadow-sm"
              >
                ERP Login
              </button>

              <button
                onClick={() => handleNavClick('admissions')}
                className="ml-2 btn-primary text-sm"
              >
                Apply 2026–27
              </button>
            </div>

            {/* Mobile Hamburger */}
            <div className="flex lg:hidden items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl transition"
                style={{ color: '#555555' }}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer — same smooth-scroll behaviour as desktop */}
        {mobileMenuOpen && (
          <div
            className="lg:hidden px-4 pt-2 pb-6 space-y-1.5"
            style={{ borderTop: '1px solid #ECECEC', background: '#FFFFFF' }}
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="w-full text-left px-4 py-3 rounded-xl text-base font-medium transition"
                style={{
                  background: activeSection === item.id ? 'rgba(240,68,36,0.08)' : 'transparent',
                  color: activeSection === item.id ? '#F04424' : '#555555',
                  fontWeight: activeSection === item.id ? 700 : 500,
                }}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2">
              <button
                onClick={() => handleNavClick('admissions')}
                className="btn-primary w-full justify-center"
              >
                Apply for Admissions 2026–27
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
