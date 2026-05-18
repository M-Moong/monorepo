import type { Session, User } from "@supabase/supabase-js";

export type { Session, User };

export interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
}

export type AuthProvider = "google" | "github" | "kakao";
