'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

const RANKS = [
  { rank: '01', name: 'PLAYER_X1', level: '22.4' },
  { rank: '02', name: 'PLAYER_V9', level: '21.8' },
  { rank: '03', name: 'PLAYER_K4', level: '21.1' },
  { rank: '04', name: 'PLAYER_M2', level: '20.5' },
  { rank: '05', name: 'PLAYER_T7', level: '19.8' },
  { rank: '06', name: 'PLAYER_R3', level: '19.2' },
  { rank: '07', name: 'PLAYER_J8', level: '18.5' },
  { rank: '08', name: 'PLAYER_L5', level: '17.9' },
  { rank: '09', name: 'PLAYER_Q1', level: '17.2' },
  { rank: '10', name: 'PLAYER_W6', level: '16.5' },
  { rank: '11', name: 'PLAYER_N4', level: '15.8' },
  { rank: '12', name: 'PLAYER_P9', level: '15.1' },
  { rank: '13', name: 'PLAYER_B2', level: '14.5' },
  { rank: '14', name: 'PLAYER_C7', level: '13.8' },
  { rank: '15', name: 'PLAYER_H3', level: '13.5' },
  { rank: '16', name: 'PLAYER_D8', level: '12.1' },
];

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

        <div className="flex flex-col gap-2 pb-20">
          {RANKS.map((player, index) => {
            const isTop3 = index < 3;
            const isFirst = index === 0;
            const isSecond = index === 1;
            const isThird = index === 2;

            let bgClass = "bg-transparent border border-white/10 hover:border-white/30";
            let textClass = "text-white";
            let rankClass = "text-white/30";
            let heightClass = "py-4 px-6";

            if (isFirst) {
              bgClass = "bg-volt";
              textClass = "text-ink";
              rankClass = "text-ink/50";
              heightClass = "py-8 px-6 sm:px-10 scale-[1.02] origin-left z-30 shadow-[0_0_30px_rgba(226,255,49,0.2)]";
            } else if (isSecond) {
              bgClass = "bg-infrared";
              textClass = "text-ink";
              rankClass = "text-ink/50";
              heightClass = "py-6 px-6 sm:px-8 scale-[1.01] origin-left z-20";
            } else if (isThird) {
              bgClass = "bg-white";
              textClass = "text-ink";
              rankClass = "text-ink/50";
              heightClass = "py-5 px-6 sm:px-8 z-10";
            }

            return (
              <motion.div
                key={player.rank}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`flex items-center justify-between transition-all duration-300 ${bgClass} ${textClass} ${heightClass}`}
              >
                <div className="flex items-center gap-6 sm:gap-12">
                  <span className={`font-display text-3xl sm:text-5xl ${rankClass}`}>
                    {player.rank}
                  </span>
                  <span className={`text-lg sm:text-2xl font-bold tracking-tight ${isTop3 ? 'font-display uppercase' : ''}`}>
                    {player.name}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-xs sm:text-sm opacity-60 mb-1">LVL</div>
                  <div className={`font-display text-2xl sm:text-4xl leading-none`}>
                    {player.level}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
