import React from 'react';
import { ArrowRight, Sparkles, Award, ChevronRight } from 'lucide-react';
import { heroContent } from '../../content/heroContent';

interface HeroProps {
  onApplyClick: () => void;
  onExploreClick: () => void;
}

export const HeroSection: React.FC<HeroProps> = ({ onApplyClick, onExploreClick }) => {
  const c = heroContent;
  return (
    <section
      id="home"
      style={{ background: '#FBF8F6', borderBottom: '1px solid #ECECEC' }}
      className="pt-16 pb-24 lg:py-28 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left */}
          <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
            <div className="inline-flex items-center gap-2">
              <span className="ent-badge">
                <Sparkles size={12} style={{ color: '#FFD47D' }} />
                {c.badge}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]" style={{ color: '#111111' }}>
              {c.headingLine1}{' '}
              <span style={{ color: '#F04424' }}>{c.headingAccent}</span>
            </h1>

            <p className="text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0" style={{ color: '#555555' }}>
              {c.description}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button onClick={onApplyClick} className="btn-primary w-full sm:w-auto text-base px-8 py-4">
                {c.primaryButton} <ArrowRight size={18} />
              </button>
              <button onClick={onExploreClick} className="btn-ghost w-full sm:w-auto text-base px-8 py-4">
                {c.secondaryButton} <ChevronRight size={18} />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 max-w-lg mx-auto lg:mx-0" style={{ borderTop: '1px solid #ECECEC' }}>
              {c.stats.map((s, i) => (
                <div key={i} className="text-center lg:text-left">
                  <p className="text-3xl font-extrabold" style={{ color: i === 0 ? '#111111' : '#F04424' }}>{s.number}</p>
                  <p className="text-xs font-medium mt-0.5" style={{ color: '#777777' }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="absolute -inset-1 rounded-3xl opacity-30 blur-2xl" style={{ background: 'linear-gradient(135deg, #F04424, #FFD47D)' }} />
              <div className="relative rounded-2xl overflow-hidden" style={{ border: '1px solid #ECECEC', boxShadow: '0 8px 40px rgba(0,0,0,0.12)' }}>
                <img src={c.heroImage} alt="Vasant Valley School Campus" className="w-full h-96 object-cover" />
                <div
                  className="absolute bottom-4 left-4 right-4 flex items-center gap-4 p-4 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.92)', border: '1px solid #ECECEC', backdropFilter: 'blur(12px)', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                >
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(240,68,36,0.1)', border: '1px solid rgba(240,68,36,0.2)' }}>
                    <Award size={22} style={{ color: '#F04424' }} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold" style={{ color: '#111111' }}>{c.heroBadgeTitle}</h4>
                    <p className="text-xs" style={{ color: '#777777' }}>{c.heroBadgeSubtitle}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
