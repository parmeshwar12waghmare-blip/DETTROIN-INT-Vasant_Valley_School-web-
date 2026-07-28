import React, { useState } from 'react';
import { newsContent, events, announcements } from '../../content/newsContent';
import { Calendar, Bell, Clock, MapPin, AlertCircle } from 'lucide-react';

// ─── NEWS SECTION ─────────────────────────────────────────────────────────────
// All text, events, and announcements are managed in:
//   src/content/newsContent.ts
// Edit that file to add/update events, announcements, and section headings.

export const NewsSection: React.FC = () => {
  const c = newsContent;
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredEvents = selectedCategory === 'All'
    ? events
    : events.filter(e => e.category === selectedCategory);

  return (
    // ── id="news" — anchor target for Header "News & Events" nav link ─────────
    <section id="news" className="ent-section-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header — text from newsContent.sectionBadge / sectionTitle / sectionSubtitle */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="ent-badge">{c.sectionBadge}</span>
          <h2 className="ent-section-title mt-3">{c.sectionTitle}</h2>
          <p className="ent-section-subtitle">{c.sectionSubtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* ── Events Column ──────────────────────────────────────────────── */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4"
              style={{ borderBottom: '1px solid #ECECEC' }}>
              <h3 className="text-xl font-bold flex items-center gap-2" style={{ color: '#111111' }}>
                <Calendar size={22} style={{ color: '#F04424' }} /> Upcoming School Events
              </h3>

              {/* Filter Pills — categories from newsContent.filterCategories */}
              <div className="flex flex-wrap gap-1.5">
                {c.filterCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className="px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer"
                    style={{
                      background: selectedCategory === cat ? '#F04424' : '#FFFFFF',
                      color: selectedCategory === cat ? '#FFFFFF' : '#555555',
                      border: `1.5px solid ${selectedCategory === cat ? '#F04424' : '#ECECEC'}`,
                      fontWeight: selectedCategory === cat ? 700 : 500,
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Event Cards — data from newsContent.ts → events[] array */}
            <div className="space-y-4">
              {filteredEvents.map((evt) => (
                <div
                  key={evt.id}
                  className="ent-card p-6 flex flex-col sm:flex-row gap-5 items-start"
                >
                  {/* Date Box */}
                  <div
                    className="p-4 rounded-xl text-center shrink-0 w-full sm:w-28"
                    style={{ background: '#1F1F1F', border: '1px solid #2a2a2a' }}
                  >
                    <span className="text-xs font-bold uppercase block" style={{ color: '#FFD47D' }}>{evt.category}</span>
                    <span className="text-xl font-extrabold block mt-1" style={{ color: '#F04424' }}>
                      {evt.date.split(',')[0]}
                    </span>
                  </div>

                  <div className="space-y-1.5 flex-grow">
                    <div className="flex items-center gap-2">
                      {evt.featured && (
                        <span
                          className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase"
                          style={{ background: 'rgba(255,212,125,0.15)', color: '#FFD47D', border: '1px solid rgba(255,212,125,0.3)' }}
                        >
                          Featured Event
                        </span>
                      )}
                      <span className="text-xs flex items-center gap-1" style={{ color: '#777777' }}>
                        <Clock size={12} /> {evt.time}
                      </span>
                    </div>

                    <h4 className="text-base font-bold" style={{ color: '#111111' }}>{evt.title}</h4>
                    <p className="text-xs leading-relaxed" style={{ color: '#555555' }}>{evt.description}</p>

                    <div className="pt-1 text-xs font-medium flex items-center gap-1" style={{ color: '#777777' }}>
                      <MapPin size={12} style={{ color: '#F04424' }} /> {evt.location}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Notices Column ─────────────────────────────────────────────── */}
          <div className="lg:col-span-4 space-y-5">
            <h3 className="text-xl font-bold flex items-center gap-2 pb-4" style={{ color: '#111111', borderBottom: '1px solid #ECECEC' }}>
              <Bell size={22} style={{ color: '#F04424' }} /> Circulars & Bulletins
            </h3>

            {/* Announcement Cards — data from newsContent.ts → announcements[] array */}
            <div className="space-y-4">
              {announcements.map((ann) => (
                <div
                  key={ann.id}
                  className="p-5 rounded-2xl transition"
                  style={{
                    background: ann.isUrgent ? 'rgba(255,212,125,0.08)' : '#FFFFFF',
                    border: `1px solid ${ann.isUrgent ? 'rgba(255,212,125,0.3)' : '#ECECEC'}`,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                  }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span
                      className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full"
                      style={{
                        background: ann.isUrgent ? '#FFD47D' : '#FBF8F6',
                        color: ann.isUrgent ? '#111111' : '#777777',
                        border: '1px solid #ECECEC'
                      }}
                    >
                      {ann.category}
                    </span>
                    <span className="text-[11px]" style={{ color: '#777777' }}>{ann.date}</span>
                  </div>
                  <h4 className="text-sm font-bold mb-1" style={{ color: '#111111' }}>{ann.title}</h4>
                  <p className="text-xs leading-relaxed" style={{ color: '#555555' }}>{ann.content}</p>
                </div>
              ))}
            </div>

            {/* Portal CTA */}
            <div className="ent-card-dark p-6 rounded-2xl text-center space-y-3">
              <AlertCircle size={24} style={{ color: '#F04424' }} className="mx-auto" />
              <h4 className="font-bold text-sm" style={{ color: '#FFFFFF' }}>Parent Notice Center</h4>
              <p className="text-xs" style={{ color: '#777777' }}>
                Log in to the Parent Portal to download full PDF Circulars and examine student report cards.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
