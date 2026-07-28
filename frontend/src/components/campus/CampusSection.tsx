import React, { useState } from 'react';
import { Eye } from 'lucide-react';
import { campusContent } from '../../content/campusContent';

// ─── CAMPUS SECTION ───────────────────────────────────────────────────────────
// All text, facility data, filter options, and IMAGE PATHS are managed in:
//   src/content/campusContent.ts
// Edit that file to add/remove facilities or change images.

export const CampusSection: React.FC = () => {
  const c = campusContent;
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredFacilities = activeCategory === 'all'
    ? c.facilities
    : c.facilities.filter(f => f.category === activeCategory);

  return (
    // ── id="campus" — anchor target for Header "Campus Life" nav link ────────
    <section id="campus" className="ent-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="ent-badge">{c.sectionBadge}</span>
          <h2 className="ent-section-title mt-3">{c.sectionTitle}</h2>
          <p className="ent-section-subtitle">{c.sectionSubtitle}</p>
        </div>

        {/* Filter Buttons — categories pulled from campusContent.filterOptions */}
        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {c.filterOptions.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className="px-5 py-2.5 rounded-xl font-semibold text-sm transition cursor-pointer"
              style={{
                background: activeCategory === cat.key ? '#F04424' : '#FFFFFF',
                color: activeCategory === cat.key ? '#FFFFFF' : '#555555',
                border: `1.5px solid ${activeCategory === cat.key ? '#F04424' : '#ECECEC'}`,
                boxShadow: activeCategory === cat.key ? '0 4px 14px rgba(240,68,36,0.25)' : 'none',
                fontWeight: activeCategory === cat.key ? 700 : 500,
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Facility Cards
            ── Each facility's image URL is set in campusContent.ts → facilities[n].img
            ── To swap an image, change the `img` value for the matching facility */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredFacilities.map((fac) => (
            <div
              key={fac.id}
              className="ent-card overflow-hidden flex flex-col group"
            >
              <div className="relative h-52 overflow-hidden">
                {/*
                  FACILITY IMAGE
                  ── Image source: campusContent.ts → facilities entry with id="{fac.id}" → img
                  ── Replace the URL string to use a local file (e.g. /images/stem-lab.jpg)
                     or a different online image for this facility card.
                */}
                <img
                  src={fac.img}
                  alt={fac.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <span
                  className="absolute top-4 left-4 text-xs font-bold uppercase px-3 py-1 rounded-full"
                  style={{ background: '#F04424', color: '#fff' }}
                >
                  {fac.category}
                </span>
              </div>
              <div className="p-6 space-y-2 flex-grow">
                <h3 className="text-base font-bold" style={{ color: '#111111' }}>{fac.name}</h3>
                <p className="text-xs leading-relaxed" style={{ color: '#555555' }}>{fac.description}</p>
              </div>
              <div className="px-6 pb-5">
                <button
                  className="w-full py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
                  style={{
                    background: 'rgba(240,68,36,0.06)',
                    color: '#F04424',
                    border: '1.5px solid rgba(240,68,36,0.2)'
                  }}
                >
                  <Eye size={14} /> Virtual 360° View
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
