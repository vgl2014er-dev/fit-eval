import { rtdb } from './firebase';
import { 
  ref, 
  get, 
  set, 
  push, 
  update, 
  remove, 
  query, 
  orderByChild, 
  equalTo,
  onValue
} from 'firebase/database';

export interface RankEntry {
  id?: string;
  name: string;
  score: number;
  rank?: number;
  testId: string;
  createdAt: number;
}

export const getRanks = async (testId: string): Promise<RankEntry[]> => {
  const ranksRef = ref(rtdb, 'ranks');
  
  const snapshot = await get(ranksRef);
  if (!snapshot.exists()) {
    if (testId === 'yoyo') {
      return await seedInitialYoyoRanks();
    }
    return [];
  }

  const data = snapshot.val();
  const result: RankEntry[] = Object.keys(data)
    .map(key => ({
      id: key,
      ...data[key]
    } as RankEntry))
    .filter(entry => entry.testId === testId);

  if (result.length === 0 && testId === 'yoyo') {
    return await seedInitialYoyoRanks();
  }

  return result.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.createdAt - b.createdAt;
  });
};

export const updateRank = async (id: string, name: string, score: number) => {
  const rankRef = ref(rtdb, `ranks/${id}`);
  await update(rankRef, { name, score, updatedAt: Date.now() });
};

export const deleteRank = async (id: string) => {
  const rankRef = ref(rtdb, `ranks/${id}`);
  await remove(rankRef);
};

export const addRank = async (testId: string, name: string, score: number) => {
  const ranksRef = ref(rtdb, 'ranks');
  const newRankRef = push(ranksRef);
  await set(newRankRef, {
    testId,
    name,
    score,
    createdAt: Date.now()
  });
};

export const seedInitialYoyoRanks = async (): Promise<RankEntry[]> => {
  const ranksRef = ref(rtdb, 'ranks');
  // Check again to be absolute sure we don't double seed
  const snap = await get(ranksRef);
  if (snap.exists()) {
    const data = snap.val();
    const existing = Object.keys(data)
      .map(k => ({id: k, ...data[k]}))
      .filter((entry: any) => entry.testId === 'yoyo');
    if (existing.length > 0) {
      return existing.sort((a: any, b: any) => b.score - a.score);
    }
  }

  const initialData = [
    { name: "Erik", score: 1360 },
    { name: "Finley", score: 1120 },
    { name: "Arvid", score: 1120 },
    { name: "Eray", score: 1000 },
    { name: "Levi", score: 1000 },
    { name: "Jakob", score: 920 },
    { name: "Finn", score: 880 },
    { name: "Lionel", score: 880 },
    { name: "Bent", score: 800 },
    { name: "Lion", score: 760 },
    { name: "Lasse", score: 600 },
    { name: "Berat", score: 560 },
    { name: "Silas", score: 480 },
    { name: "Metin", score: 400 },
    { name: "Paul", score: 400 },
  ];

  const updates: any = {};
  const seededRanks: RankEntry[] = [];

  initialData.forEach((item, index) => {
    const newRankRef = push(ref(rtdb, 'ranks'));
    const docData = {
      ...item,
      testId: 'yoyo',
      createdAt: Date.now() + index
    };
    updates[`ranks/${newRankRef.key}`] = docData;
    seededRanks.push({ id: newRankRef.key!, ...docData });
  });

  await update(ref(rtdb), updates);
  return seededRanks.sort((a, b) => b.score - a.score);
};

export const subscribeToRanks = (testId: string, callback: (ranks: RankEntry[]) => void) => {
  const ranksRef = ref(rtdb, 'ranks');
  
  return onValue(ranksRef, (snapshot) => {
    if (!snapshot.exists()) {
      callback([]);
      return;
    }
    const data = snapshot.val();
    const result: RankEntry[] = Object.keys(data)
      .map(key => ({
        id: key,
        ...data[key]
      } as RankEntry))
      .filter(entry => entry.testId === testId);

    const sorted = result.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.createdAt - b.createdAt;
    });
    callback(sorted);
  });
};

