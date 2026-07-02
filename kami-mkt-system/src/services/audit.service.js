import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';

async function getClientIp() {
  try {
    const res = await fetch('https://api.ipify.org?format=json');
    const data = await res.json();
    return data.ip || 'unknown';
  } catch {
    return 'unknown';
  }
}

/**
 * Grava evento de auditoria no Firestore.
 * @param {string} userId
 * @param {string} action  — ex: 'login', 'logout', 'card.create', 'user.delete'
 * @param {object} [meta]  — dados adicionais (target_id, changes, etc.)
 */
export async function auditLog(userId, action, meta = {}) {
  try {
    const ip = await getClientIp();
    await addDoc(collection(db, 'audit_logs'), {
      user_id: userId || 'anonymous',
      action,
      timestamp: serverTimestamp(),
      ip,
      ...meta,
    });
  } catch (e) {
    // Falha silenciosa — nunca bloquear o fluxo principal por causa de log
    console.warn('auditLog failed:', e);
  }
}
