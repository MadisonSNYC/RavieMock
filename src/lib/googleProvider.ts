// src/lib/googleProvider.ts
import { GoogleAuthProvider } from 'firebase/auth';

let _provider: GoogleAuthProvider | null = null;

/** Singleton Google provider so we don't re-create per call */
export function getGoogleProvider(): GoogleAuthProvider {
  if (!_provider) {
    _provider = new GoogleAuthProvider();
    // ask for profile + email; add scopes later if needed
    _provider.addScope('profile');
    _provider.addScope('email');
    // optional: force account picker even if already signed in
    // _provider.setCustomParameters({ prompt: 'select_account' });
  }
  return _provider;
}