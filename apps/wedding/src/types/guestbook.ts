export interface GuestEntry {
  id: string;
  name: string;
  message: string;
  reaction: string;
  side: string; // "groom" | "bride" | "guest"
  attend: string | null; // "yes" | "maybe" | "no" | null
  createdAt: string; // ISO 8601
}
