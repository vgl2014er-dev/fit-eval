'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowLeft, Edit2, Loader2 } from 'lucide-react';
import { getRanks, subscribeToRanks, RankEntry } from '@/lib/rankService';

export default function YoyoRanksPage() {
  const [ranks, setRanks] = useState<RankEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    
    // Subscribe to live updates
    const unsubscribe = subscribeToRanks('yoyo', (data) => {
      if (active) {
        setRanks(data);
        setLoading(false);
      }
    });

    // Separately trigger seeding check if necessary
    // This runs once on mount
    getRanks('yoyo').catch(err => console.error('Seed check failed:', err));

    return () => { active = false; unsubscribe(); };
  }, []);

  return (
    <main className="min-h-[100dvh] flex flex-col font-mono uppercase bg-ink text-white">
      {/* Header */}
      <header className="border-b border-white/20 p-4 flex justify-between items-center text-xs sm:text-sm tracking-widest bg-ink sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 hover:text-volt transition-colors">
            <ArrowLeft size={16} />
            RETURN
          </Link>
          <Link href="/ranks/yoyo/edit" className="flex items-center gap-2 text-white/50 hover:text-volt transition-colors">
            <Edit2 size={14} />
            EDIT RANKS
          </Link>
        </div>
        <div className="text-white/50 hidden sm:block">SYS.FITNESS.LEADERBOARD // YOYO IR1</div>
      </header>

      <div className="p-4 sm:p-10 max-w-5xl mx-auto w-full">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-4xl sm:text-8xl tracking-tighter mb-12"
        >
          YOYO IR1<br/><span className="text-infrared">RANKS</span>
        </motion.h1>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-infrared opacity-20" size={48} />
          </div>
        ) : (
          <div className="flex flex-col gap-2 pb-20">
            {ranks.map((player, index) => {
              const rankNum = (index + 1).toString().padStart(2, '0');
              const isFirst = index === 0;
              const isSecond = index === 1;
              const isThird = index === 2;
              const isTop3 = index < 3;

              let bgClass = "bg-transparent border border-white/10 hover:border-white/30";
              let textClass = "text-white";
              let rankClass = "text-white/30";
              let heightClass = "py-4 px-6";

              if (isFirst) {
                bgClass = "bg-infrared";
                textClass = "text-ink";
                rankClass = "text-ink/50";
                heightClass = "py-8 px-6 sm:px-10 scale-[1.02] origin-left z-30 shadow-[0_0_30px_rgba(255,68,68,0.2)]";
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
                  key={player.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex items-center justify-between transition-all duration-300 ${bgClass} ${textClass} ${heightClass}`}
                >
                  <div className="flex items-center gap-4 sm:gap-12">
                    <span className={`font-display text-2xl sm:text-5xl ${rankClass}`}>
                      {rankNum}
                    </span>
                    <span className={`text-base sm:text-3xl font-bold tracking-tight uppercase`}>
                      {player.name}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] sm:text-xs opacity-60 mb-1">DISTANCE</div>
                    <div className={`font-display text-xl sm:text-4xl leading-none`}>
                      {player.score}M
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {ranks.length === 0 && (
              <div className="text-center py-20 text-white/30 tracking-[0.2em]">
                NO DATA RECORDED
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
