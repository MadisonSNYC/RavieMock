// src/types/auth.ts
export type AuthUser = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  providerId: string | null;
};