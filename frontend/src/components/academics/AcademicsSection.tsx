import React, { useState } from 'react';
import { Sparkles, Award, CheckCircle2, Download } from 'lucide-react';
import { academicsContent } from '../../content/academicsContent';

export const AcademicsSection: React.FC = () => {
  const [activeStage, setActiveStage] = useState<'primary' | 'middle' | 'senior'>('senior');
  const c = academicsContent;
  const stageData = c.stages[activeStage];

  return (
    <section id="academics" className="ent-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="ent-badge">{c.sectionBadge}</span>
          <h2 className="ent-section-title mt-3">{c.sectionTitle}</h2>
          <p className="ent-section-subtitle">{c.sectionSubtitle}</p>
        </div>

        {/* Stage Tabs */}
        <div className="flex justify-center gap-2 sm:gap-3 mb-10 flex-wrap">
          {(['primary', 'middle', 'senior'] as const).map((stage) => (
            <button
              key={stage}
              onClick={() => setActiveStage(stage)}
              className="px-6 py-2.5 rounded-xl font-semibold text-sm transition-all cursor-pointer capitalize"
              style={{
                background: activeStage === stage ? '#F04424' : '#FFFFFF',
                color: activeStage === stage ? '#FFFFFF' : '#555555',
                border: `1.5px solid ${activeStage === stage ? '#F04424' : '#ECECEC'}`,
                boxShadow: activeStage === stage ? '0 4px 14px rgba(240,68,36,0.3)' : 'none',
                fontWeight: activeStage === stage ? 700 : 500,
              }}
            >
              {stage} School
            </button>
          ))}
        </div>

        {/* Active Stage Card */}
        <div className="rounded-2xl p-8 sm:p-12 relative overflow-hidden" style={{ background: '#1F1F1F', border: '1px solid #2a2a2a' }}>
          <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(240,68,36,0.08)' }} />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-semibold" style={{ background: 'rgba(240,68,36,0.15)', color: '#F04424' }}>
                <Sparkles size={13} /> Stage Overview
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold" style={{ color: '#FFFFFF' }}>{stageData.title}</h3>
              <p className="text-sm font-semibold italic" style={{ color: '#FFD47D' }}>"{stageData.tagline}"</p>

              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider" style={{ color: '#777777' }}>Key Educational Highlights</h4>
                {stageData.highlights.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm" style={{ color: '#ECECEC' }}>
                    <CheckCircle2 size={17} style={{ color: '#F04424' }} className="shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap gap-2">
                <span className="text-xs font-bold w-full mb-1" style={{ color: '#777777' }}>Key Subjects & Disciplines:</span>
                {stageData.subjects.map((sub, idx) => (
                  <span key={idx} className="text-xs px-3 py-1.5 rounded-lg font-medium" style={{ background: '#2a2a2a', color: '#ECECEC', border: '1px solid #333' }}>
                    {sub}
                  </span>
                ))}
              </div>
            </div>

            {/* Performance Card */}
            <div className="lg:col-span-5 p-6 rounded-xl space-y-5" style={{ background: '#2a2a2a', border: '1px solid #333' }}>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl" style={{ background: 'rgba(240,68,36,0.15)' }}>
                  <Award size={26} style={{ color: '#F04424' }} />
                </div>
                <div>
                  <h4 className="text-base font-bold" style={{ color: '#FFFFFF' }}>{c.performance.title}</h4>
                  <p className="text-xs" style={{ color: '#777777' }}>{c.performance.subtitle}</p>
                </div>
              </div>
              <div className="space-y-3 text-sm pt-2" style={{ borderTop: '1px solid #333' }}>
                {c.performance.metrics.map((m, i) => (
                  <div key={i} className="flex justify-between items-center pt-2">
                    <span style={{ color: '#ECECEC' }}>{m.label}</span>
                    <span className="font-bold text-base" style={{ color: m.color }}>{m.value}</span>
                  </div>
                ))}
              </div>
              <button className="btn-primary w-full justify-center text-xs uppercase tracking-wider mt-2">
                <Download size={14} /> Download Detailed Syllabus (PDF)
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
