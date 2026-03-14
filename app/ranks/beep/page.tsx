'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

const RANKS = [
  { rank: '01', name: 'ATHLETE_Z1', level: '15.8' },
  { rank: '02', name: 'ATHLETE_Y2', level: '15.4' },
  { rank: '03', name: 'ATHLETE_X3', level: '15.1' },
  { rank: '04', name: 'ATHLETE_W4', level: '14.8' },
  { rank: '05', name: 'ATHLETE_V5', level: '14.5' },
  { rank: '06', name: 'ATHLETE_U6', level: '14.2' },
  { rank: '07', name: 'ATHLETE_T7', level: '13.9' },
  { rank: '08', name: 'ATHLETE_S8', level: '13.6' },
  { rank: '09', name: 'ATHLETE_R9', level: '13.3' },
  { rank: '10', name: 'ATHLETE_Q10', level: '13.0' },
  { rank: '11', name: 'ATHLETE_P11', level: '12.7' },
  { rank: '12', name: 'ATHLETE_O12', level: '12.4' },
  { rank: '13', name: 'ATHLETE_N13', level: '12.1' },
  { rank: '14', name: 'ATHLETE_M14', level: '11.8' },
  { rank: '15', name: 'ATHLETE_L15', level: '11.5' },
  { rank: '16', name: 'ATHLETE_K16', level: '11.2' },
];

export default function BeepRanksPage() {
  return (
    <main className="min-h-[100dvh] flex flex-col font-mono uppercase bg-ink text-white">
      {/* Header */}
      <header className="border-b border-white/20 p-4 flex justify-between items-center text-xs sm:text-sm tracking-widest bg-ink sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2 hover:text-volt transition-colors">
          <ArrowLeft size={16} />
          RETURN
        </Link>
        <div className="text-white/50">SYS.FITNESS.LEADERBOARD // BEEP TEST</div>
      </header>

      <div className="p-4 sm:p-10 max-w-5xl mx-auto w-full">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-6xl sm:text-8xl tracking-tighter mb-12"
        >
          BEEP TEST<br/><span className="text-volt">RANKS</span>
        </motion.h1>

        <div className="flex flex-col gap-2 pb-20">
          {RANKS.map((player, index) => {
            const isFirst = index === 0;
            const isSecond = index === 1;
            const isThird = index === 2;
            const isTop3 = index < 3;

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
              bgClass = "bg-white/90";
              textClass = "text-ink";
              rankClass = "text-ink/50";
              heightClass = "py-6 px-6 sm:px-8 scale-[1.01] origin-left z-20";
            } else if (isThird) {
              bgClass = "bg-white/70";
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
                  <div className="text-xs sm:text-sm opacity-60 mb-1">STG</div>
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
