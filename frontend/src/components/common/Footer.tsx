import React from 'react';
import { GraduationCap, Mail, Phone, MapPin, ShieldCheck } from 'lucide-react';

interface FooterProps {
  /** Smooth-scrolls the window to the section whose id matches the given string */
  scrollToSection: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ scrollToSection }) => {
  return (
    <footer style={{ background: '#1F1F1F', color: '#ECECEC', borderTop: '1px solid #2a2a2a' }} className="pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12" style={{ borderBottom: '1px solid #2a2a2a' }}>

          {/* Column 1: Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow" style={{ background: '#F04424' }}>
                <GraduationCap size={22} color="#fff" />
              </div>
              <h2 className="text-xl font-bold tracking-tight" style={{ color: '#FFFFFF' }}>VASANT VALLEY</h2>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: '#777777' }}>
              Nurturing holistic development, creative inquiry, and leadership with high academic integrity since 1990.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                style={{ background: 'rgba(240,68,36,0.12)', color: '#F04424', border: '1px solid rgba(240,68,36,0.25)' }}
              >
                <ShieldCheck size={13} /> CBSE Affiliated #2730182
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm" style={{ color: '#FFFFFF', borderLeft: '3px solid #F04424', paddingLeft: '10px' }}>
              Quick Navigation
            </h3>
            <ul className="space-y-2 text-sm" style={{ color: '#777777' }}>
              {[
                ['academics', 'Curriculum & Academics'],
                ['admissions', 'Admissions Criteria & Forms'],
                ['campus', 'Campus Facilities & STEM Labs'],
                ['news', 'Events & Notice Board'],
                ['contact', 'Contact School Administration'],
              ].map(([tab, label]) => (
                <li key={tab}>
                  <button
                    onClick={() => scrollToSection(tab)}
                    className="cursor-pointer transition-colors hover:text-white"
                    style={{ color: '#777777' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#F04424')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#777777')}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Visiting Hours */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm" style={{ color: '#FFFFFF', borderLeft: '3px solid #FFD47D', paddingLeft: '10px' }}>
              Visiting Hours
            </h3>
            <div className="text-sm space-y-2" style={{ color: '#777777' }}>
              <p><strong style={{ color: '#ECECEC' }}>Monday – Friday:</strong> 07:30 AM – 03:30 PM</p>
              <p><strong style={{ color: '#ECECEC' }}>Saturday:</strong> 08:00 AM – 12:30 PM (2nd & 4th)</p>
              <p><strong style={{ color: '#ECECEC' }}>Sunday & Holidays:</strong> Closed</p>
              <p className="text-xs pt-1" style={{ color: '#FFD47D' }}>
                * Prior appointment mandatory for campus visits.
              </p>
            </div>
          </div>

          {/* Column 4: Contact */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm" style={{ color: '#FFFFFF', borderLeft: '3px solid #F04424', paddingLeft: '10px' }}>
              Campus Address
            </h3>
            <div className="text-sm space-y-2.5" style={{ color: '#777777' }}>
              <p className="flex items-start gap-2.5">
                <MapPin size={17} style={{ color: '#F04424' }} className="shrink-0 mt-0.5" />
                <span>Sector C, Vasant Kunj, New Delhi – 110070</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone size={17} style={{ color: '#F04424' }} className="shrink-0" />
                <span>+91 (011) 2689-2354 / 2689-2355</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail size={17} style={{ color: '#F04424' }} className="shrink-0" />
                <span>info@vasantvalley.edu</span>
              </p>
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs" style={{ color: '#777777' }}>
          <p>© {new Date().getFullYear()} Vasant Valley School. All Rights Reserved. Built with React & Tailwind CSS.</p>
          <div className="flex items-center gap-6">
            <span className="cursor-pointer hover:text-white transition-colors">Privacy Policy</span>
            <span className="cursor-pointer hover:text-white transition-colors">Terms of Service</span>
            <span className="cursor-pointer hover:text-white transition-colors">CBSE Disclosure</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
