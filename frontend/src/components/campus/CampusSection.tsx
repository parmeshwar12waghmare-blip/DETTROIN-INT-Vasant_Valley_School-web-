import React, { useState } from 'react';
import { Eye, Compass } from 'lucide-react';
import { campusContent } from '../../content/campusContent';

interface CampusProps {
  onOpen360Tour?: () => void;
}

export const CampusSection: React.FC<CampusProps> = ({ onOpen360Tour }) => {
  const c = campusContent;
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredFacilities = activeCategory === 'all'
    ? c.facilities
    : c.facilities.filter(f => f.category === activeCategory);

  return (
    <section id="campus" className="ent-section bg-slate-900 text-slate-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="ent-badge bg-red-500/10 text-red-400 border border-red-500/20">{c.sectionBadge}</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3">{c.sectionTitle}</h2>
          <p className="text-sm text-slate-400">{c.sectionSubtitle}</p>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {c.filterOptions.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition cursor-pointer ${
                activeCategory === cat.key
                  ? 'bg-red-600 text-white shadow-lg shadow-red-600/20'
                  : 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Facility Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredFacilities.map((fac) => (
            <div
              key={fac.id}
              className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden flex flex-col group hover:border-slate-700 transition shadow-xl"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={fac.img}
                  alt={fac.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <span
                  className="absolute top-4 left-4 text-xs font-bold uppercase px-3 py-1 rounded-full bg-red-600 text-white shadow"
                >
                  {fac.category}
                </span>
              </div>
              <div className="p-6 space-y-2 flex-grow">
                <h3 className="text-base font-bold text-white">{fac.name}</h3>
                <p className="text-xs leading-relaxed text-slate-400">{fac.description}</p>
              </div>
              <div className="px-6 pb-5">
                <button
                  onClick={onOpen360Tour}
                  className="w-full py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 bg-red-600/10 hover:bg-red-600/20 text-red-400 border border-red-500/30 cursor-pointer"
                >
                  <Eye size={14} /> Open Virtual 360° View Page
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
