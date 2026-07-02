import { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  browserLocalPersistence,
  browserSessionPersistence,
  setPersistence,
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { auditLog } from '../services/audit.service';
import { clearAttempts } from '../utils/rateLimiter';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);   // Firebase Auth user
  const [profile, setProfile] = useState(null);   // Firestore /users/{uid}
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        await fetchProfile(firebaseUser.uid);
      } else {
        setUser(null);
        setProfile(null);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  async function fetchProfile(uid) {
    try {
      const snap = await getDoc(doc(db, 'users', uid));
      if (snap.exists()) {
        setProfile({ id: snap.id, ...snap.data() });
      } else {
        setProfile(null);
      }
    } catch (e) {
      console.error('fetchProfile:', e);
    }
  }

  async function login(email, password, remember) {
    const persistence = remember ? browserLocalPersistence : browserSessionPersistence;
    await setPersistence(auth, persistence);
    const cred = await signInWithEmailAndPassword(auth, email, password);
    clearAttempts();
    await auditLog(cred.user.uid, 'login', { email });
  }

  async function logout() {
    if (user) await auditLog(user.uid, 'logout');
    await signOut(auth);
  }

  async function resetPassword(email) {
    await sendPasswordResetEmail(auth, email);
  }

  async function refreshProfile() {
    if (user) await fetchProfile(user.uid);
  }

  const isAdmin    = profile?.role === 'admin';
  const isManager  = profile?.role === 'manager' || isAdmin;
  const isReadOnly = profile?.role === 'read_only';
  const canWrite   = !isReadOnly && !!user;

  return (
    <AuthContext.Provider value={{
      user, profile, loading,
      login, logout, resetPassword, refreshProfile,
      isAdmin, isManager, isReadOnly, canWrite,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
