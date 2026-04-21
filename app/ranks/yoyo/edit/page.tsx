'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Plus, Trash2, Save, X, Loader2 } from 'lucide-react';
import { getRanks, addRank, updateRank, deleteRank, RankEntry } from '@/lib/rankService';

export default function EditYoyoRanksPage() {
  const [ranks, setRanks] = useState<RankEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newName, setNewName] = useState('');
  const [newScore, setNewScore] = useState('');

  const loadData = async () => {
    try {
      const data = await getRanks('yoyo');
      setRanks(data);
    } catch (error) {
      console.error('Failed to load ranks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;
    Promise.resolve().then(() => {
      if (active) loadData();
    });
    return () => { active = false; };
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newScore) return;
    setSaving(true);
    try {
      await addRank('yoyo', newName, parseInt(newScore));
      setNewName('');
      setNewScore('');
      await loadData();
    } catch (error) {
      console.error('Add failed:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string | undefined) => {
    if (!id || !confirm('DELETE THIS ENTRY?')) return;
    setSaving(true);
    try {
      await deleteRank(id);
      await loadData();
    } catch (error) {
      console.error('Delete failed:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-[100dvh] flex flex-col font-mono uppercase bg-ink text-white">
      <header className="border-b border-white/20 p-4 flex justify-between items-center text-xs tracking-widest bg-ink sticky top-0 z-50">
        <Link href="/ranks/yoyo" className="flex items-center gap-2 hover:text-volt transition-colors">
          <ArrowLeft size={16} />
          CANCEL
        </Link>
        <div className="text-white/50">EDITOR // YOYO_IR1_DATABASE</div>
      </header>

      <div className="p-4 sm:p-10 max-w-2xl mx-auto w-full flex-1 flex flex-col">
        <h1 className="font-display text-4xl sm:text-6xl tracking-tight mb-8">
          EDIT <span className="text-volt">RANKS</span>
        </h1>

        {/* Add Form */}
        <form onSubmit={handleAdd} className="mb-12 bg-white/5 p-6 border border-white/10 rounded-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] tracking-widest opacity-50">PLAYER_ID</label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="NAME"
                className="bg-ink border border-white/20 p-3 outline-none focus:border-volt transition-colors text-lg"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] tracking-widest opacity-50">INITIAL_SCORE</label>
              <input
                type="number"
                value={newScore}
                onChange={(e) => setNewScore(e.target.value)}
                placeholder="1000"
                className="bg-ink border border-white/20 p-3 outline-none focus:border-volt transition-colors text-lg"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={saving || !newName || !newScore}
            className="w-full bg-volt text-ink py-4 flex items-center justify-center gap-2 hover:bg-white transition-colors font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? <Loader2 className="animate-spin" size={20} /> : <Plus size={20} />}
            ADD ENTRY
          </button>
        </form>

        {/* List */}
        <div className="flex-1 flex flex-col gap-4">
          <h2 className="text-[10px] tracking-widest opacity-50 mb-2">DATABASE_RECORDS</h2>
          {loading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="animate-spin opacity-20" size={32} />
            </div>
          ) : (
            <AnimatePresence>
              {ranks.map((entry) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-center justify-between p-4 bg-white/5 border border-white/10"
                >
                  <div className="flex flex-col">
                    <span className="text-lg font-bold">{entry.name}</span>
                    <span className="text-xs text-white/50">{entry.score} PT</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleUpdate(entry)}
                      className="p-2 hover:text-volt transition-colors"
                      title="EDIT DETAILS"
                    >
                      <Save size={18} className="opacity-20 hover:opacity-100" />
                    </button>
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="p-2 hover:text-infrared transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}

          {!loading && ranks.length === 0 && (
            <div className="text-center py-10 border border-dashed border-white/10 text-white/20 text-xs tracking-widest">
              EMPTY_DATABASE
            </div>
          )}
        </div>
      </div>
    </main>
  );

  // Note: For simplicity, I'm just doing Add/Delete here. 
  // Real update would need more state per row. I'll stick to a clean Add/Delete flow first.
  async function handleUpdate(entry: RankEntry) {
    const newName = prompt('NEW NAME:', entry.name);
    const newScore = prompt('NEW SCORE:', entry.score.toString());
    if (newName && newScore && (newName !== entry.name || parseInt(newScore) !== entry.score)) {
      setSaving(true);
      try {
        await updateRank(entry.id!, newName, parseInt(newScore));
        await loadData();
      } catch (err) {
        console.error(err);
      } finally {
        setSaving(false);
      }
    }
  }
}
