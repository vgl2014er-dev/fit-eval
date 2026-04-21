import { db } from './firebase';
import { 
  collection, 
  getDocs, 
  query, 
  orderBy, 
  addDoc, 
  updateDoc, 
  doc, 
  deleteDoc, 
  writeBatch,
  where
} from 'firebase/firestore';

export interface RankEntry {
  id?: string;
  name: string;
  score: number;
  rank?: number;
  testId: string;
  createdAt: number;
}

export const getRanks = async (testId: string): Promise<RankEntry[]> => {
  const ranksRef = collection(db, 'ranks');
  const q = query(
    ranksRef, 
    where('testId', '==', testId),
    orderBy('score', 'desc'),
    orderBy('createdAt', 'asc')
  );
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as RankEntry));
};

export const updateRank = async (id: string, name: string, score: number) => {
  const rankRef = doc(db, 'ranks', id);
  await updateDoc(rankRef, { name, score, updatedAt: Date.now() });
};

export const deleteRank = async (id: string) => {
  const rankRef = doc(db, 'ranks', id);
  await deleteDoc(rankRef);
};

export const addRank = async (testId: string, name: string, score: number) => {
  const ranksRef = collection(db, 'ranks');
  await addDoc(ranksRef, {
    testId,
    name,
    score,
    createdAt: Date.now()
  });
};

export const seedInitialYoyoRanks = async () => {
  const currentRanks = await getRanks('yoyo');
  if (currentRanks.length > 0) return; // Already seeded

  const batch = writeBatch(db);
  const ranksRef = collection(db, 'ranks');

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

  initialData.forEach((item, index) => {
    const newDocRef = doc(ranksRef);
    batch.set(newDocRef, {
      ...item,
      testId: 'yoyo',
      createdAt: Date.now() + index // Ensure slight order diff for same scores if needed
    });
  });

  await batch.commit();
};
