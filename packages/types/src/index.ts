// 방명록 항목 — apps/api Route Handler와 apps/web 컴포넌트에서 공유
export interface GuestEntry {
  id: string;
  name: string;
  message: string;
  reaction: string;
  side: string; // "groom" | "bride" | "guest"
  attend: string | null; // "yes" | "maybe" | "no" | null
  createdAt: string; // ISO 8601
}
