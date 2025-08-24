// src/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import {
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { getFirebaseAuth } from '../lib/firebase';
import { getGoogleProvider } from '../lib/googleProvider';
import type { AuthUser } from '../types/auth';

type AuthState = {
  user: AuthUser | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOutUser: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  registerWithEmail: (email: string, password: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
};

const AuthContext = createContext<AuthState | undefined>(undefined);

/** map Firebase.User -> AuthUser (kept small and explicit) */
function toAuthUser(u: User | null): AuthUser | null {
  if (!u) return null;
  return {
    uid: u.uid,
    email: u.email ?? null,
    displayName: u.displayName ?? null,
    photoURL: u.photoURL ?? null,
    providerId: (u.providerData[0]?.providerId as string | undefined) ?? null,
  };
}

/**
 * Provider is inert until mounted by the app.
 * DO NOT import this in App yet to avoid behavior changes.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const unsubRef = useRef<() => void>();

  useEffect(() => {
    let isActive = true;
    (async () => {
      const auth = await getFirebaseAuth();
      unsubRef.current = onAuthStateChanged(auth, (u) => {
        if (!isActive) return;
        setUser(toAuthUser(u));
        setLoading(false);
      });
    })();
    return () => {
      isActive = false;
      if (unsubRef.current) unsubRef.current();
    };
  }, []);

  // Consume Google redirect result once after mount
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const auth = await getFirebaseAuth();
        // If we arrived via redirect, this resolves with user credential once.
        const cred = await getRedirectResult(auth);
        // No-op needed on success; onAuthStateChanged will set user.
        // We keep this to catch and surface redirect-specific errors.
        if (!cancelled && cred) {
          // optional: you could set a success message here if desired
        }
      } catch (e) {
        // optional: console.debug('[auth] redirect result error', e);
        // We intentionally don't throw; the playground will show errors on action.
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const actions = useMemo(() => ({
    async signInWithGoogle() {
      const auth = await getFirebaseAuth();
      const provider = getGoogleProvider();
      const useRedirect = import.meta.env.VITE_AUTH_GOOGLE_FLOW === 'redirect';
      if (useRedirect) {
        await signInWithRedirect(auth, provider);
      } else {
        await signInWithPopup(auth, provider);
      }
    },
    async signOutUser() {
      const auth = await getFirebaseAuth();
      await signOut(auth);
    },
    async signInWithEmail(email: string, password: string) {
      if (!email || !password) throw new Error('Email and password are required');
      const auth = await getFirebaseAuth();
      await signInWithEmailAndPassword(auth, email, password);
    },
    async registerWithEmail(email: string, password: string) {
      if (!email || !password) throw new Error('Email and password are required');
      const auth = await getFirebaseAuth();
      await createUserWithEmailAndPassword(auth, email, password);
    },
    async resetPassword(email: string) {
      if (!email) throw new Error('Email is required');
      const auth = await getFirebaseAuth();
      await sendPasswordResetEmail(auth, email);
    }
  }), []);

  const value: AuthState = useMemo(() => ({
    user, loading, ...actions
  }), [user, loading, actions]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/** Safe hook */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within <AuthProvider>');
  }
  return ctx;
}