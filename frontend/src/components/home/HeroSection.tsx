import React, { useState } from 'react';
import { ArrowRight, Sparkles, Award, Compass, ChevronRight, ShieldCheck, Volume2, VolumeX } from 'lucide-react';
import { heroContent } from '../../content/heroContent';
import vvsVideo from '../../assets/video/vvs-video.mp4';

interface HeroProps {
  onApplyClick: () => void;
  onExploreClick: () => void;
  onOpen360Tour?: () => void;
}

export const HeroSection: React.FC<HeroProps> = ({ onApplyClick, onExploreClick, onOpen360Tour }) => {
  const c = heroContent;

  // ── CURSOR RESPONSIVENESS & MOUSE PARALLAX STATE ──────────────────────────
  const [mouseOffset, setMouseOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isMuted, setIsMuted] = useState<boolean>(true);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relativeX = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const relativeY = (e.clientY - rect.top) / rect.height - 0.5;

    setMouseOffset({ x: relativeX, y: relativeY });
    setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      className="relative w-full h-screen min-h-[680px] max-h-[1080px] flex items-center justify-center overflow-hidden bg-slate-950 text-white select-none group"
    >
      {/* ── 1. BACKGROUND VIDEO (FULL WINDOW COVER FIXED ON MIN/MAX) ── */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${mouseOffset.x * 16}px, ${mouseOffset.y * 16}px, 0) scale(1.04)`,
        }}
      >
        <video
          autoPlay
          loop
          muted={isMuted}
          playsInline
          poster={c.heroImage}
          className="w-full h-full object-cover object-center"
        >
          <source src={vvsVideo} type="video/mp4" />
          <img src={c.heroImage} alt="Vasant Valley School Campus Full View" className="w-full h-full object-cover object-center" />
        </video>
      </div>

      {/* ── 2. INTERACTIVE CURSOR RESPONSIVE SPOTLIGHT AURA ─────────────────── */}
      <div
        className="absolute w-96 h-96 bg-gradient-to-r from-red-600/25 via-amber-500/15 to-transparent rounded-full blur-3xl pointer-events-none transition-all duration-150 ease-out opacity-80"
        style={{
          left: `${cursorPos.x - 192}px`,
          top: `${cursorPos.y - 192}px`,
        }}
      />

      {/* ── 3. GLASS OVERLAY GRADIENTS & AMBIENT SHADOW ────────────────────── */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/65 to-slate-900/40 backdrop-brightness-95 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Audio Controller */}
      <button
        onClick={() => setIsMuted(!isMuted)}
        className="absolute bottom-6 left-6 z-20 p-3 rounded-full bg-slate-950/70 hover:bg-slate-900 backdrop-blur-md border border-white/20 text-white shadow-xl transition cursor-pointer flex items-center gap-2 text-xs font-bold"
        title={isMuted ? "Unmute Campus Video" : "Mute Campus Video"}
      >
        {isMuted ? <VolumeX size={16} className="text-amber-400" /> : <Volume2 size={16} className="text-emerald-400" />}
        <span className="hidden sm:inline">{isMuted ? 'Unmute Audio' : 'Audio Playing'}</span>
      </button>

      {/* ── 4. FLOATING GLASS TEXT & MATERIAL (STABLE & FIXED ON MIN/MAX RESIZE) ── */}
      <div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-0 w-full flex flex-col justify-center transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${-mouseOffset.x * 8}px, ${-mouseOffset.y * 8}px, 0)`,
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">

          {/* Left Hero Main Glass Panel */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            {/* Top Admissions Badge */}
            <div className="inline-flex items-center gap-2">
              <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-white/10 backdrop-blur-xl border border-white/20 text-white shadow-xl flex items-center gap-2">
                <Sparkles size={14} className="text-amber-400 animate-pulse" />
                {c.badge}
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] drop-shadow-lg text-white">
              {c.headingLine1}{' '}
              <span className="bg-gradient-to-r from-red-500 via-amber-400 to-red-400 bg-clip-text text-transparent">
                {c.headingAccent}
              </span>
            </h1>

            {/* Description Glass Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/60 backdrop-blur-xl border border-white/10 shadow-2xl max-w-2xl mx-auto lg:mx-0">
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed drop-shadow">
                {c.description}
              </p>
            </div>

            {/* Action Buttons Floating on Glass */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-1">
              <button
                onClick={onApplyClick}
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl text-sm sm:text-base font-extrabold bg-gradient-to-r from-red-600 via-red-500 to-amber-600 text-white shadow-2xl shadow-red-600/30 hover:shadow-red-600/50 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {c.primaryButton} <ArrowRight size={18} />
              </button>

              {onOpen360Tour && (
                <button
                  onClick={onOpen360Tour}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-2xl text-sm sm:text-base font-extrabold bg-white/10 hover:bg-white/20 text-white backdrop-blur-xl border border-white/20 shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Compass size={18} className="text-amber-400 animate-spin" /> 360° Virtual Tour
                </button>
              )}

              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto px-5 py-3.5 rounded-2xl text-sm font-semibold text-slate-300 hover:text-white transition flex items-center justify-center gap-1 cursor-pointer"
              >
                {c.secondaryButton} <ChevronRight size={18} />
              </button>
            </div>

            {/* Key Statistics Grid */}
            <div className="grid grid-cols-3 gap-3.5 pt-4 max-w-lg mx-auto lg:mx-0">
              {c.stats.map((s, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/15 text-center lg:text-left shadow-lg"
                >
                  <p className="text-xl sm:text-2xl font-black text-white drop-shadow">
                    {s.number}
                  </p>
                  <p className="text-[11px] font-semibold text-slate-300 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Hero Glass Card */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="p-5 sm:p-6 rounded-3xl bg-slate-900/60 backdrop-blur-2xl border border-white/20 shadow-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-400">
                      <Award size={22} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{c.heroBadgeTitle}</h4>
                      <p className="text-xs text-slate-400">{c.heroBadgeSubtitle}</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                    <ShieldCheck size={12} /> Ranked #1
                  </span>
                </div>

                <div className="space-y-2.5 pt-1 text-xs">
                  <div className="p-3 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-between text-slate-200">
                    <span>CBSE Board Examination Pass Rate</span>
                    <strong className="text-amber-400">100% Top Tier</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-between text-slate-200">
                    <span>Global Ivy League Admissions</span>
                    <strong className="text-emerald-400">45+ Offers</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-between text-slate-200">
                    <span>Campus Background Video</span>
                    <strong className="text-red-400">4K Interactive</strong>
                  </div>
                </div>

                {onOpen360Tour && (
                  <button
                    onClick={onOpen360Tour}
                    className="w-full py-3 rounded-xl text-xs font-bold bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-lg hover:shadow-red-600/30 transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Launch 360° Campus Experience <ArrowRight size={14} />
                  </button>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
