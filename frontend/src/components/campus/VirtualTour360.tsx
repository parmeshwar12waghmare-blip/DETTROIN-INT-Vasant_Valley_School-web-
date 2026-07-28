import React, { useState, useRef } from 'react';
import {
  Compass,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  Info,
  Layers,
  MapPin,
  X,
  Eye
} from 'lucide-react';
import { VIEW_3D_PATHS } from '../../assets/3d_view/paths';
import type { ViewPage360, Hotspot3D } from '../../assets/3d_view/paths';

interface VirtualTour360Props {
  isOpen?: boolean;
  onClose?: () => void;
  initialPath?: string;
}

export const VirtualTour360: React.FC<VirtualTour360Props> = ({
  isOpen: _isOpen = true,
  onClose,
  initialPath = '/3d-view/main-campus'
}) => {
  const [selectedScene, setSelectedScene] = useState<ViewPage360>(
    VIEW_3D_PATHS.find((p) => p.path === initialPath) || VIEW_3D_PATHS[0]
  );
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeHotspot, setActiveHotspot] = useState<Hotspot3D | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [rotationX, setRotationX] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const startXRef = useRef<number>(0);

  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse Drag to rotate panorama effect
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    startXRef.current = e.clientX;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const delta = e.clientX - startXRef.current;
    setRotationX((prev) => (prev + delta * 0.15) % 100);
    startXRef.current = e.clientX;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const categories = ['All', 'Campus', 'STEM & Labs', 'Sports & Fitness', 'Arts & Culture', 'Library & Innovation'];

  const filteredScenes =
    activeCategory === 'All'
      ? VIEW_3D_PATHS
      : VIEW_3D_PATHS.filter((s) => s.category === activeCategory);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => console.log(err));
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch((err) => console.log(err));
      setIsFullscreen(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`bg-slate-950 text-slate-100 flex flex-col font-sans transition-all duration-300 ${
        isFullscreen ? 'fixed inset-0 z-50 overflow-hidden' : 'relative w-full py-8'
      }`}
    >
      {/* ── Top Bar Header ────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/20 mb-2">
            <Compass size={13} className="animate-spin" /> Interactive 360° Virtual Campus Tour
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            {selectedScene.title}
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">{selectedScene.description}</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleFullscreen}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition cursor-pointer"
          >
            {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
            {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen 360°'}
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition cursor-pointer"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      {/* ── Category Filter Buttons ────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mb-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                activeCategory === cat
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                  : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── 360 Panoramic Main Stage ──────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex-1 flex flex-col lg:flex-row gap-6">
        {/* Main Interactive Viewport */}
        <div className="flex-1 relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl min-h-[480px] lg:min-h-[560px] group">
          {/* Panoramic Image Canvas Container */}
          <div
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className="w-full h-full cursor-grab active:cursor-grabbing select-none relative overflow-hidden"
            style={{
              backgroundImage: `url(${selectedScene.virtualTourUrl})`,
              backgroundSize: `${140 * zoomLevel}% auto`,
              backgroundPosition: `${50 + rotationX}% center`,
              transition: isDragging ? 'none' : 'background-position 0.2s ease-out, background-size 0.3s ease'
            }}
          >
            {/* Dark vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40 pointer-events-none" />

            {/* Interactive Hotspot Markers */}
            {selectedScene.hotspots.map((h) => (
              <div
                key={h.id}
                style={{ left: `${h.x}%`, top: `${h.y}%` }}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveHotspot(h);
                }}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group/spot z-20"
              >
                <div className="relative flex items-center justify-center">
                  <span className="w-8 h-8 rounded-full bg-red-600/80 border-2 border-white flex items-center justify-center shadow-xl animate-pulse group-hover/spot:scale-125 transition">
                    <Info size={16} className="text-white" />
                  </span>
                  <span className="absolute -top-8 px-2 py-0.5 rounded text-[10px] font-bold bg-slate-950/90 text-white border border-slate-700 whitespace-nowrap opacity-0 group-hover/spot:opacity-100 transition pointer-events-none">
                    {h.title}
                  </span>
                </div>
              </div>
            ))}

            {/* Drag instruction overlay */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-800 text-[11px] text-slate-300 pointer-events-none">
              <Eye size={14} className="text-red-400" /> Click & Drag to explore 360° panorama
            </div>

            {/* Zoom Controls */}
            <div className="absolute bottom-4 right-4 flex items-center gap-1 p-1 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-800">
              <button
                onClick={() => setZoomLevel((z) => Math.min(z + 0.2, 2))}
                className="p-2 rounded-lg hover:bg-slate-800 text-slate-300 transition cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn size={16} />
              </button>
              <button
                onClick={() => setZoomLevel((z) => Math.max(z - 0.2, 0.8))}
                className="p-2 rounded-lg hover:bg-slate-800 text-slate-300 transition cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut size={16} />
              </button>
            </div>
          </div>

          {/* Active Hotspot Modal Popover */}
          {activeHotspot && (
            <div className="absolute top-6 left-6 max-w-sm p-5 rounded-2xl bg-slate-950/95 backdrop-blur-xl border border-slate-800 text-slate-100 shadow-2xl space-y-2 z-30 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-red-400 flex items-center gap-1">
                  <MapPin size={12} /> Hotspot Highlight
                </span>
                <button
                  onClick={() => setActiveHotspot(null)}
                  className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
                >
                  <X size={14} />
                </button>
              </div>
              <h4 className="text-sm font-bold text-white">{activeHotspot.title}</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{activeHotspot.description}</p>
            </div>
          )}
        </div>

        {/* Right Sidebar: Scene Selector & Specifications */}
        <div className="w-full lg:w-80 space-y-4">
          <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Layers size={16} className="text-red-400" /> Select 3D View Scene
            </h3>

            <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
              {filteredScenes.map((scene) => (
                <button
                  key={scene.id}
                  onClick={() => {
                    setSelectedScene(scene);
                    setActiveHotspot(null);
                    setRotationX(0);
                  }}
                  className={`w-full text-left p-2.5 rounded-2xl border transition flex items-center gap-3 cursor-pointer ${
                    selectedScene.id === scene.id
                      ? 'bg-gradient-to-r from-red-600/90 to-red-700/80 border-red-500/40 text-white shadow-lg shadow-red-600/10'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <img
                    src={scene.thumbnailUrl}
                    alt={scene.title}
                    className="w-14 h-14 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold truncate">{scene.title}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5 truncate">{scene.category}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Facility Specs Box */}
          <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Facility Specifications</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">Total Area</span>
                <span className="font-bold text-slate-200">{selectedScene.specs.area}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">Capacity</span>
                <span className="font-bold text-slate-200">{selectedScene.specs.capacity}</span>
              </div>
              <div className="py-1.5">
                <span className="text-slate-400 block mb-1">Key Infrastructure</span>
                <p className="text-[11px] text-slate-300 leading-relaxed font-mono">
                  {selectedScene.specs.features}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
