'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';


export default function RanksPage() {
  return (
    <main className="min-h-[100dvh] flex flex-col font-mono uppercase bg-ink text-white">
      {/* Header */}
      <header className="border-b border-white/20 p-4 flex justify-between items-center text-xs sm:text-sm tracking-widest bg-ink sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2 hover:text-volt transition-colors">
          <ArrowLeft size={16} />
          RETURN
        </Link>
        <div className="text-white/50">SYS.FITNESS.LEADERBOARD</div>
      </header>

      <div className="p-4 sm:p-10 max-w-5xl mx-auto w-full">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-6xl sm:text-8xl tracking-tighter mb-12"
        >
          GLOBAL<br/><span className="text-volt">RANKS</span>
        </motion.h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Link href="/ranks/yoyo" className="group border border-white/20 p-8 hover:bg-infrared hover:text-ink transition-all duration-300">
            <div className="text-xs opacity-50 mb-4">[PRTCL-01]</div>
            <h2 className="font-display text-4xl sm:text-6xl leading-none mb-2">YOYO<br/>IR1</h2>
            <div className="mt-8 flex items-center gap-2 text-xs tracking-widest group-hover:translate-x-2 transition-transform">
              VIEW LEADERBOARD →
            </div>
          </Link>

          <Link href="/ranks/beep" className="group border border-white/20 p-8 hover:bg-volt hover:text-ink transition-all duration-300">
            <div className="text-xs opacity-50 mb-4">[PRTCL-02]</div>
            <h2 className="font-display text-4xl sm:text-6xl leading-none mb-2">BEEP<br/>TEST</h2>
            <div className="mt-8 flex items-center gap-2 text-xs tracking-widest group-hover:translate-x-2 transition-transform">
              VIEW LEADERBOARD →
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
