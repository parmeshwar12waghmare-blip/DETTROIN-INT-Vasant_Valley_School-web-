import React, { useState } from 'react';
import {
  Sparkles,
  Award,
  ShieldCheck,
  Mail,
  X,
  ChevronRight,
  Quote,
  Users
} from 'lucide-react';
import { aboutContent } from '../../content/aboutContent';
import type { TeamMember } from '../../content/aboutContent';

interface AboutSectionProps {
  onApplyClick?: () => void;
  onExplore360?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onExplore360 }) => {
  const c = aboutContent;
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  return (
    <section id="about" className="relative w-full bg-slate-950 text-slate-100 font-sans">
      {/* ── 1. ABOUT HERO BANNER (USING FULL WINDOW COVER HERO DESIGN WITH ABOUT CONTENT) ── */}
      <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 text-white select-none">
        {/* Full Window Cover Image Auto-fit (Customized image for About section) */}
        <img
          src={c.hero.heroImage}
          alt="Vasant Valley Leadership & Campus Heritage"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none transition-transform duration-700 ease-out"
        />

        {/* Ambient Dark Overlay & Glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/65 to-slate-900/40 backdrop-brightness-95 pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-[120px] pointer-events-none" />

        {/* Floating Glass Content Container for About Hero */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 w-full flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Left Column: Glass Text & Stats */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2">
                <span className="px-4 py-2 rounded-full text-xs font-bold bg-white/10 backdrop-blur-xl border border-white/20 text-white shadow-xl shadow-black/20 flex items-center gap-2">
                  <Sparkles size={14} className="text-amber-400 animate-pulse" />
                  {c.hero.badge}
                </span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] drop-shadow-lg text-white">
                {c.hero.headingLine1}{' '}
                <span className="bg-gradient-to-r from-red-500 via-amber-400 to-red-400 bg-clip-text text-transparent">
                  {c.hero.headingAccent}
                </span>
              </h1>

              <div className="p-5 sm:p-6 rounded-2xl bg-slate-950/50 backdrop-blur-xl border border-white/10 shadow-2xl max-w-2xl mx-auto lg:mx-0">
                <p className="text-base sm:text-lg text-slate-200 leading-relaxed drop-shadow">
                  {c.hero.description}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <a
                  href="#team"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-extrabold bg-gradient-to-r from-red-600 via-red-500 to-amber-600 text-white shadow-2xl shadow-red-600/30 hover:shadow-red-600/50 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  Meet Leadership Team <Users size={18} />
                </a>

                {onExplore360 && (
                  <button
                    onClick={onExplore360}
                    className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-extrabold bg-white/10 hover:bg-white/20 text-white backdrop-blur-xl border border-white/20 shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Explore 360° Campus
                  </button>
                )}
              </div>

              {/* Stats Floating Grid */}
              <div className="grid grid-cols-3 gap-4 pt-6 max-w-lg mx-auto lg:mx-0">
                {c.hero.stats.map((s, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/15 text-center lg:text-left shadow-lg"
                  >
                    <p className="text-2xl sm:text-3xl font-black text-white drop-shadow">
                      {s.number}
                    </p>
                    <p className="text-xs font-semibold text-slate-300 mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Glass Accreditation Card */}
            <div className="lg:col-span-5 relative mt-6 lg:mt-0">
              <div className="p-6 rounded-3xl bg-slate-900/60 backdrop-blur-2xl border border-white/20 shadow-2xl space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-400">
                      <Award size={22} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{c.hero.badgeTitle}</h4>
                      <p className="text-xs text-slate-400">{c.hero.badgeSubtitle}</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                    <ShieldCheck size={12} /> Accredited
                  </span>
                </div>

                <div className="space-y-3 pt-2 text-xs">
                  <div className="p-3.5 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-between text-slate-200">
                    <span>CBSE Board Affiliation</span>
                    <strong className="text-amber-400">Code: 271004</strong>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-between text-slate-200">
                    <span>Faculty Doctorate & Master Ratio</span>
                    <strong className="text-emerald-400">85% Post-Graduates</strong>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-between text-slate-200">
                    <span>Global School Partnerships</span>
                    <strong className="text-red-400">UK & US Exchanges</strong>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── 2. MISSION, VISION & CORE VALUES ────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-900 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-500/10 text-red-400 border border-red-500/20">
              Our Core Mission
            </span>
            <h3 className="text-2xl font-extrabold text-white">{c.mission.title}</h3>
            <p className="text-sm text-slate-300 leading-relaxed">{c.mission.description}</p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
              Our Vision for 2030
            </span>
            <h3 className="text-2xl font-extrabold text-white">Global Institutional Vision</h3>
            <p className="text-sm text-slate-300 leading-relaxed">{c.mission.vision}</p>
          </div>
        </div>

        {/* Core Institutional Values */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">Pillars of Character & Excellence</h3>
            <p className="text-xs text-slate-400">The foundational values that guide our faculty and students every day.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {c.values.map((v, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-slate-700 transition space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-red-600/10 border border-red-500/20 flex items-center justify-center text-red-400">
                  <ShieldCheck size={20} />
                </div>
                <h4 className="text-base font-bold text-white">{v.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 3. LEADERSHIP TEAM MEMBERS (WITH PHOTOS & DETAILED PROFILES) ────── */}
      <div id="team" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-900 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-red-500/10 text-red-400 border border-red-500/20 inline-flex items-center gap-2">
            <Users size={14} /> School Governance & Leadership
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Meet Our Visionary Educator Leadership Team
          </h2>
          <p className="text-sm text-slate-400">
            Guided by distinguished educationists, researchers, and administrators committed to excellence.
          </p>
        </div>

        {/* Team Member Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {c.team.map((member) => (
            <div
              key={member.id}
              className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between group shadow-xl"
            >
              <div className="space-y-4">
                {/* Photo of Team Member */}
                <div className="relative h-64 rounded-2xl overflow-hidden bg-slate-800">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold bg-slate-950/80 backdrop-blur-md text-amber-400 border border-slate-700">
                    {member.experience} Experience
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition">
                    {member.name}
                  </h3>
                  <p className="text-xs font-semibold text-red-400">{member.role}</p>
                  <p className="text-[11px] text-slate-400 font-mono pt-1">{member.qualifications}</p>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                  "{member.bio}"
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={() => setSelectedMember(member)}
                  className="w-full py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  View Profile & Message <ChevronRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 4. DETAILED TEAM MEMBER MODAL INSPECTOR ────────────────────────── */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="max-w-xl w-full p-7 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl relative space-y-5">
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
            >
              <X size={16} />
            </button>

            <div className="flex items-center gap-4">
              <img
                src={selectedMember.photo}
                alt={selectedMember.name}
                className="w-20 h-20 rounded-2xl object-cover shrink-0 border border-slate-700"
              />
              <div>
                <h3 className="text-xl font-bold text-white">{selectedMember.name}</h3>
                <p className="text-xs font-bold text-red-400">{selectedMember.role}</p>
                <p className="text-[11px] text-slate-400 font-mono mt-0.5">{selectedMember.qualifications}</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-amber-400">
                <Quote size={14} /> Educational Philosophy
              </div>
              <p className="text-slate-300 italic">"{selectedMember.quote}"</p>
            </div>

            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-slate-200">Biography & Leadership Vision</h4>
              <p className="text-slate-400 leading-relaxed">{selectedMember.bio}</p>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-xs">
              <span className="text-slate-400">Contact Email:</span>
              <a
                href={`mailto:${selectedMember.email}`}
                className="font-mono text-red-400 font-bold hover:underline flex items-center gap-1"
              >
                <Mail size={13} /> {selectedMember.email}
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
