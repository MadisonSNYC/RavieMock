import React, { useState } from 'react';
import { useAuth } from '../../context';

export default function AuthPlayground() {
  // Guard if provider isn't mounted or flag disabled
  const enabled = import.meta.env.VITE_AUTH_ENABLED === 'true';
  if (!enabled) return <div style={{padding:16}}>Auth disabled (VITE_AUTH_ENABLED is not true).</div>;

  // If AuthProvider not mounted, this will throw—catch and message cleanly
  let auth;
  try { auth = useAuth(); }
  catch {
    return <div style={{padding:16}}>AuthProvider not mounted. Ensure feature flag wrapper is active.</div>;
  }

  const { user, loading, signInWithGoogle, signOutUser, signInWithEmail, registerWithEmail, resetPassword } = auth;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function run<T>(fn: () => Promise<T>) {
    setMsg(null); setErr(null);
    try {
      await fn();
      setMsg('Success');
    } catch (e: any) {
      setErr(e?.message || String(e));
    }
  }

  return (
    <div style={{ padding: 24, maxWidth: 640, margin: '0 auto', fontFamily: 'ui-sans-serif, system-ui' }}>
      <h1 style={{ fontSize: 24, marginBottom: 8 }}>Auth Playground (dev-only)</h1>
      <p style={{ color: '#888', marginBottom: 16 }}>
        This page exists only for manual verification. No production UI is modified.
      </p>

      <section style={{ padding: 16, border: '1px solid #222', borderRadius: 8, marginBottom: 16 }}>
        <div style={{ marginBottom: 8 }}>
          <strong>Status:</strong>{' '}
          {loading ? 'Loading…' : user ? `Signed in as ${user.email ?? user.displayName ?? user.uid}` : 'Signed out'}
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button onClick={() => run(signInWithGoogle)} style={{ padding: '8px 12px', border: '1px solid #333', borderRadius: 6 }}>
            Sign in with Google
          </button>
          <button onClick={() => run(signOutUser)} style={{ padding: '8px 12px', border: '1px solid #333', borderRadius: 6 }}>
            Sign out
          </button>
        </div>
      </section>

      <section style={{ padding: 16, border: '1px solid #222', borderRadius: 8 }}>
        <div style={{ display: 'grid', gap: 8, marginBottom: 8 }}>
          <input placeholder="email" value={email} onChange={e => setEmail(e.target.value)} style={{ padding: 8, borderRadius: 6, border: '1px solid #333' }} />
          <input placeholder="password" type="password" value={password} onChange={e => setPassword(e.target.value)} style={{ padding: 8, borderRadius: 6, border: '1px solid #333' }} />
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button onClick={() => run(() => signInWithEmail(email, password))} style={{ padding: '8px 12px', border: '1px solid #333', borderRadius: 6 }}>
            Email Sign In
          </button>
          <button onClick={() => run(() => registerWithEmail(email, password))} style={{ padding: '8px 12px', border: '1px solid #333', borderRadius: 6 }}>
            Register Email
          </button>
          <button onClick={() => run(() => resetPassword(email))} style={{ padding: '8px 12px', border: '1px solid #333', borderRadius: 6 }}>
            Reset Password
          </button>
        </div>
      </section>

      {(msg || err) && (
        <div style={{ marginTop: 12, color: err ? '#ff6b6b' : '#16a34a' }}>
          {err ?? msg}
        </div>
      )}
    </div>
  );
}