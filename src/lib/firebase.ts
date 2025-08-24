// src/lib/firebase.ts
import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
  Auth
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
};

let _app: FirebaseApp | undefined;
let _auth: Auth | undefined;

/** idempotent: returns existing app if initialized */
export function getFirebaseApp(): FirebaseApp {
  if (!getApps().length) {
    _app = initializeApp(firebaseConfig);
  } else {
    _app = getApps()[0]!;
  }
  return _app;
}

/** lazy: only creates auth once; sets durable persistence */
export async function getFirebaseAuth(): Promise<Auth> {
  if (_auth) return _auth;
  const app = getFirebaseApp();
  const auth = getAuth(app);
  await setPersistence(auth, browserLocalPersistence);
  _auth = auth;
  return auth;
}