// src/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut, User } from 'firebase/auth';
import { getFirebaseAuth } from '../lib/firebase';
import { getGoogleProvider } from '../lib/googleProvider';
import type { AuthUser } from '../types/auth';

type AuthState = {
  user: AuthUser | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOutUser: () => Promise<void>;
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

  const actions = useMemo(() => ({
    async signInWithGoogle() {
      const auth = await getFirebaseAuth();
      const provider = getGoogleProvider();
      await signInWithPopup(auth, provider);
    },
    async signOutUser() {
      const auth = await getFirebaseAuth();
      await signOut(auth);
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