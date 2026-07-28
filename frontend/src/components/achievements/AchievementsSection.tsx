import React, { useState } from 'react';
import {
  Trophy,
  Award,
  GraduationCap,
  Search,
  Medal,
  ShieldCheck,
} from 'lucide-react';
import { achievementsContent } from '../../content/achievementsContent';
import type { StudentAchievement, SchoolAchievement, UniversityAcceptance } from '../../content/achievementsContent';

export const AchievementsSection: React.FC = () => {
  const c = achievementsContent;
  const [activeTab, setActiveTab] = useState<'students' | 'school' | 'universities'>('students');
  const [studentCategory, setStudentCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const studentCategories = ['All', 'Olympiad', 'University Placement', 'Sports', 'STEM & Innovation', 'Arts & Literature'];

  const filteredStudents = c.students.filter((s) => {
    const matchesCategory = studentCategory === 'All' || s.category === studentCategory;
    const matchesSearch =
      s.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.award.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="achievements" className="ent-section bg-slate-950 text-slate-100 py-24 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">

        {/* ── Section Header ──────────────────────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 inline-flex items-center gap-2">
            <Trophy size={14} className="text-amber-400 animate-bounce" /> {c.badge}
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {c.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            {c.subtitle}
          </p>

          {/* Main Tab Switcher */}
          <div className="flex justify-center p-1.5 rounded-2xl bg-slate-900/80 border border-slate-800 max-w-xl mx-auto mt-6">
            {[
              { id: 'students', label: 'Student Achievements', icon: Medal },
              { id: 'school', label: 'School Accolades', icon: Trophy },
              { id: 'universities', label: 'University Placements', icon: GraduationCap },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-lg shadow-red-600/20'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── TAB 1: STUDENT ACHIEVEMENTS ─────────────────────────────────── */}
        {activeTab === 'students' && (
          <div className="space-y-8">
            {/* Category Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 scrollbar-none">
                {studentCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setStudentCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                      studentCategory === cat
                        ? 'bg-red-600 text-white shadow-md'
                        : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-72">
                <Search size={15} className="absolute left-3.5 top-3 text-slate-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search student or award..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                />
              </div>
            </div>

            {/* Student Achievement Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredStudents.map((st) => (
                <div
                  key={st.id}
                  className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition flex flex-col sm:flex-row gap-6 group shadow-xl"
                >
                  <img
                    src={st.image}
                    alt={st.studentName}
                    className="w-full sm:w-44 h-48 sm:h-auto rounded-2xl object-cover shrink-0 group-hover:scale-105 transition duration-500"
                  />
                  <div className="flex-1 space-y-3 flex flex-col justify-between">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          {st.badge}
                        </span>
                        <span className="text-slate-500 font-mono">{st.year}</span>
                      </div>
                      <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition">
                        {st.title}
                      </h3>
                      <p className="text-xs font-semibold text-red-400">
                        {st.studentName} • <span className="text-slate-400 font-normal">{st.grade}</span>
                      </p>
                      <p className="text-xs text-slate-400 leading-relaxed pt-1">
                        {st.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs">
                      <span className="font-bold text-emerald-400 flex items-center gap-1">
                        <Trophy size={13} /> {st.award}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB 2: INSTITUTIONAL SCHOOL ACCOLADES ───────────────────────── */}
        {activeTab === 'school' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {c.school.map((sch) => (
              <div
                key={sch.id}
                className="p-7 rounded-3xl bg-slate-900/80 border border-slate-800/90 space-y-4 shadow-2xl relative overflow-hidden group hover:border-red-500/40 transition"
              >
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-red-600 to-amber-500 flex items-center justify-center text-white font-bold shadow-lg shadow-red-500/20">
                    <Award size={24} />
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-800 text-slate-300 border border-slate-700">
                    {sch.category}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-extrabold text-white group-hover:text-amber-400 transition">
                    {sch.title}
                  </h3>
                  <p className="text-xs font-semibold text-red-400">{sch.issuingBody}</p>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">{sch.description}</p>

                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs font-bold text-emerald-400 flex items-center gap-2">
                  <ShieldCheck size={16} className="text-emerald-400" />
                  {sch.stats}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── TAB 3: UNIVERSITY PLACEMENTS ─────────────────────────────────── */}
        {activeTab === 'universities' && (
          <div className="space-y-8">
            <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-950 to-red-950/50 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-bold text-red-400 uppercase tracking-wider">Class of 2026 Admissions</span>
                <h3 className="text-2xl font-bold text-white">Global University Acceptance Board</h3>
                <p className="text-xs text-slate-400">Our graduates secure admissions into prestigious Ivies and global institutions.</p>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-3xl font-black text-white">100%</p>
                  <p className="text-xs text-slate-400">College Placement</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-black text-amber-400">$2.4M+</p>
                  <p className="text-xs text-slate-400">Scholarships Awarded</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {c.universities.map((uni, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{uni.logo}</span>
                    <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-red-500/10 text-red-400 border border-red-500/20">
                      {uni.admitCount} Admits
                    </span>
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">{uni.university}</h4>
                    <p className="text-xs text-slate-400">{uni.location}</p>
                  </div>
                  <div className="pt-2 border-t border-slate-800/60 text-[11px] text-slate-300">
                    <span className="text-slate-500 block">Featured Majors:</span>
                    <strong className="text-amber-400">{uni.featuredCourse}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
