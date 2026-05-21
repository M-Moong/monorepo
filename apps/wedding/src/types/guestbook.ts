export interface GuestEntry {
  id: string;
  name: string;
  message: string;
  reaction: string;
  side: string; // "groom" | "bride" | "guest"
  attend: string | null; // "yes" | "maybe" | "no" | null
  createdAt: string; // ISO 8601
}

export interface GuestbookPage {
  entries: GuestEntry[];
  total: number;
  groomCount: number;
  brideCount: number;
  totalPages: number;
  page: number;
}
