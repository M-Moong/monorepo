export interface GuestEntry {
  id: string;
  name: string;
  message: string;
  reaction: string;
  side: string; // "groom" | "bride" | "guest"
  isPrivate: boolean;
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
