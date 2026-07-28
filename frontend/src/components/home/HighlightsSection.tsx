import React from 'react';
import { BookOpen, Cpu, Trophy, HeartHandshake } from 'lucide-react';
import { highlightsContent } from '../../content/highlightsContent.ts';

const pillarIcons = [
  <BookOpen style={{ color: '#F04424' }} size={30} />,
  <Cpu style={{ color: '#F04424' }} size={30} />,
  <Trophy style={{ color: '#F04424' }} size={30} />,
  <HeartHandshake style={{ color: '#F04424' }} size={30} />,
];

export const HighlightsSection: React.FC = () => {
  const c = highlightsContent;
  return (
    <section id="highlights" className="ent-section-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="ent-badge">{c.sectionBadge}</span>
          <h2 className="ent-section-title mt-3">{c.sectionTitle}</h2>
          <p className="ent-section-subtitle">{c.sectionSubtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {c.pillars.map((pillar, idx) => (
            <div key={idx} className="ent-card p-8 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="p-3 inline-block rounded-xl" style={{ background: 'rgba(240,68,36,0.08)' }}>
                  {pillarIcons[idx]}
                </div>
                <h3 className="text-lg font-bold" style={{ color: '#111111' }}>{pillar.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#555555' }}>{pillar.description}</p>
              </div>
              <div className="mt-6 pt-4 flex items-center justify-between text-xs font-semibold" style={{ borderTop: '1px solid #ECECEC', color: '#F04424' }}>
                <span>Learn More</span>
                <span>→</span>
              </div>
            </div>
          ))}
        </div>

        {/* Principal Card */}
        <div className="mt-20 rounded-2xl p-8 sm:p-12 relative overflow-hidden" style={{ background: '#1F1F1F', border: '1px solid #2a2a2a' }}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 text-center">
              <img src={c.principal.photo} alt={c.principal.name}
                className="w-44 h-44 rounded-2xl object-cover mx-auto shadow-lg"
                style={{ border: '2px solid rgba(240,68,36,0.4)' }} />
              <h4 className="text-lg font-bold mt-4" style={{ color: '#FFFFFF' }}>{c.principal.name}</h4>
              <p className="text-xs font-medium mt-1" style={{ color: '#F04424' }}>{c.principal.role}</p>
            </div>
            <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
              <span className="text-4xl font-bold block leading-none" style={{ color: '#FFD47D' }}>"</span>
              <p className="text-base italic leading-relaxed" style={{ color: '#ECECEC' }}>{c.principal.quote}</p>
              <p className="text-xs font-semibold tracking-wider uppercase" style={{ color: '#777777' }}>{c.principal.credential}</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};