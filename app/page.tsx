'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, Maximize, Minimize, Download, Loader2, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

const TESTS = [
  {
    id: 'yoyo',
    title: 'YOYO',
    subtitle: 'IR1',
    description: 'INTERMITTENT RECOVERY TEST LEVEL 1',
    videoUrl: 'https://drills.fra1.cdn.digitaloceanspaces.com/yoyoir1-test00000000.mp4',
    accent: 'hover:bg-infrared hover:text-ink',
    accentText: 'text-infrared',
    borderAccent: 'group-hover:border-infrared',
    code: 'PRTCL-01',
  },
  {
    id: 'beep',
    title: 'BEEP',
    subtitle: 'TEST',
    description: '20M MULTI-STAGE FITNESS TEST',
    videoUrl: 'https://drills.fra1.cdn.digitaloceanspaces.com/fitness-beep-test00000000.mp4',
    accent: 'hover:bg-volt hover:text-ink',
    accentText: 'text-volt',
    borderAccent: 'group-hover:border-volt',
    code: 'PRTCL-02',
  }
];

export default function FitnessApp() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [showOverlay, setShowOverlay] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isCaching, setIsCaching] = useState(false);
  const [isCached, setIsCached] = useState(false);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const checkCache = async () => {
      if (typeof window !== 'undefined' && 'caches' in window) {
        try {
          const cache = await caches.open('fitness-videos');
          const keys = await cache.keys();
          const cachedUrls = new Set(keys.map(request => request.url));
          const allCached = TESTS.every(test => cachedUrls.has(new URL(test.videoUrl, window.location.origin).href));
          setIsCached(allCached);
        } catch (err) {
          console.error('Cache check failed:', err);
        }
      }
    };
    checkCache();
  }, []);

  const cacheVideos = async () => {
    if (typeof window === 'undefined' || !('caches' in window)) return;
    setIsCaching(true);
    try {
      const cache = await caches.open('fitness-videos');
      // Using addAll might fail if one fails, so we do them individually for better feedback
      await Promise.all(TESTS.map(async (test) => {
        try {
          const response = await fetch(test.videoUrl, { mode: 'cors' });
          if (response.ok) {
            await cache.put(test.videoUrl, response);
          }
        } catch (e) {
          console.warn(`Failed to cache ${test.title}:`, e);
        }
      }));
      
      // Re-verify
      const keys = await cache.keys();
      const cachedUrls = new Set(keys.map(request => request.url));
      const allCached = TESTS.every(test => cachedUrls.has(new URL(test.videoUrl, window.location.origin).href));
      setIsCached(allCached);
    } catch (error) {
      console.error('Caching process failed:', error);
    } finally {
      setIsCaching(false);
    }
  };

  const handleUserActivity = () => {
    setShowOverlay(true);
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => setShowOverlay(false), 2500);
  };

  const togglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.error('Error attempting to toggle fullscreen:', err);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  useEffect(() => {
    if (activeVideo) {
      handleUserActivity();
      setIsPlaying(false);
    }
    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [activeVideo]);

  return (
    <main className="min-h-[100dvh] flex flex-col font-mono uppercase">
      {/* Header */}
      <header className="border-b border-white/20 p-4 flex justify-between items-center text-xs sm:text-sm tracking-widest bg-ink relative z-10">
        <div>SYS.FITNESS.EVAL</div>
        <div className="flex items-center gap-6">
          <button 
            onClick={cacheVideos}
            disabled={isCaching || isCached}
            className={`flex items-center gap-2 transition-colors ${isCached ? 'text-volt' : 'text-white/70 hover:text-white'} ${isCaching ? 'cursor-wait' : ''}`}
            title={isCached ? "OFFLINE READY" : "CACHE VIDEOS FOR OFFLINE USE"}
          >
            {isCaching ? (
              <Loader2 size={16} className="animate-spin" />
            ) : isCached ? (
              <CheckCircle2 size={16} />
            ) : (
              <Download size={16} />
            )}
            <span className="hidden sm:inline text-[10px] tracking-[0.2em]">
              {isCaching ? 'CACHING...' : isCached ? 'OFFLINE READY' : 'CACHE VIDEOS'}
            </span>
          </button>
          <button 
            onClick={toggleFullscreen}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
          >
            {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
            <span className="hidden sm:inline">{isFullscreen ? 'EXIT FULLSCREEN' : 'FULLSCREEN'}</span>
          </button>
        </div>
      </header>

      {/* List */}
      <div className="flex-1 flex flex-col">
        {TESTS.map((test, index) => (
          <div
            key={test.id}
            onClick={() => setActiveVideo(test.videoUrl)}
            className={`group flex-1 flex flex-col justify-between p-6 sm:p-10 border-b border-white/20 transition-all duration-300 ${test.accent} text-left relative overflow-hidden cursor-pointer`}
          >
            <div className="flex justify-between items-start z-10 w-full">
              <span className="text-xs sm:text-sm opacity-50 group-hover:opacity-100 transition-opacity">
                [{test.code}]
              </span>
              <Link 
                href={`/ranks/${test.id}`}
                onClick={(e) => e.stopPropagation()}
                className="text-xs sm:text-sm border border-white/20 px-3 py-1 group-hover:border-current transition-colors hover:bg-white hover:text-ink"
              >
                RANKS
              </Link>
            </div>

            <div className="z-10 mt-12">
              <h2 className="font-display text-7xl sm:text-[140px] leading-[0.85] tracking-tighter mb-4">
                {test.title}<br/>
                <span className={test.accentText + " group-hover:text-current transition-colors"}>{test.subtitle}</span>
              </h2>
              <p className="text-sm sm:text-base tracking-widest opacity-70 group-hover:opacity-100 transition-opacity max-w-[300px]">
                {test.description}
              </p>
            </div>

            {/* Background graphic */}
            <div className="absolute -right-4 -bottom-10 font-display text-[250px] sm:text-[400px] leading-none opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
              0{index + 1}
            </div>
          </div>
        ))}
      </div>

      {/* Video Player Overlay */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-black z-50 overflow-hidden"
            onMouseMove={handleUserActivity}
            onTouchStart={handleUserActivity}
            onClick={handleUserActivity}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100dvw] h-[100dvh] portrait:w-[100dvh] portrait:h-[100dvw] portrait:rotate-90 transition-transform duration-300 origin-center">
              <video
                ref={videoRef}
                src={activeVideo}
                className="w-full h-full object-cover"
                controls
                playsInline
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />
              
              {/* Large Play Button Overlay */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-40">
                  <button
                    onClick={togglePlay}
                    className="w-24 h-24 sm:w-32 sm:h-32 bg-volt/90 text-ink rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-volt hover:scale-105 transition-all pointer-events-auto shadow-[0_0_30px_rgba(226,255,49,0.3)]"
                  >
                    <Play size={48} className="ml-2" fill="currentColor" />
                  </button>
                </div>
              )}
              
              {/* Fading Overlay UI */}
              <div 
                className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${showOverlay ? 'opacity-100' : 'opacity-0'}`}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveVideo(null);
                  }}
                  className="absolute top-6 left-6 z-50 p-3 bg-black/40 text-white rounded-full backdrop-blur-md hover:bg-black/60 transition-colors border border-white/10 pointer-events-auto"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
