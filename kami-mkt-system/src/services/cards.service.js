import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
} from 'firebase/firestore';
import { db } from '../firebase/config';

const COL = 'cards';

export function subscribeCards(callback) {
  const q = query(collection(db, COL), orderBy('createdAt', 'desc'));
  return onSnapshot(q, snap => {
    const cards = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    callback(cards);
  });
}

export async function addCard(data, userId) {
  return addDoc(collection(db, COL), {
    ...data,
    createdBy: userId,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function updateCard(id, data) {
  await updateDoc(doc(db, COL, id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteCard(id) {
  await deleteDoc(doc(db, COL, id));
}

export async function addCardsBulk(cards, userId) {
  const promises = cards.map(c => addCard(c, userId));
  await Promise.all(promises);
}
