import { desc } from 'drizzle-orm';
import { db } from '@/db';
import { guestEntries } from '@/db/schema';

interface AdminPageProps {
  searchParams: Promise<{ secret?: string }>;
}

function formatDate(date: Date) {
  return date.toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

const SIDE_LABEL: Record<string, string> = {
  groom: '신랑측',
  bride: '신부측',
  guest: '하객',
};

export default async function GuestbookAdminPage({ searchParams }: AdminPageProps) {
  const { secret } = await searchParams;
  const adminSecret = process.env.GUESTBOOK_ADMIN_SECRET;

  if (!adminSecret || secret !== adminSecret) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-950 text-gray-400">
        <div className="text-center">
          <p className="mb-2 text-4xl">🔒</p>
          <p className="text-sm tracking-widest">접근 권한이 없습니다.</p>
        </div>
      </div>
    );
  }

  const entries = await db.select().from(guestEntries).orderBy(desc(guestEntries.createdAt));

  const total = entries.length;
  const privateCount = entries.filter((e) => e.isPrivate).length;
  const groomCount = entries.filter((e) => e.side === 'groom').length;
  const brideCount = entries.filter((e) => e.side === 'bride').length;

  return (
    <div className="min-h-screen bg-gray-950 px-4 py-10 text-gray-100">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <h1 className="mb-1 text-xl font-bold tracking-widest text-amber-400">GUESTBOOK ADMIN</h1>
          <p className="text-xs text-gray-500">비밀글 포함 전체 방명록</p>
        </div>

        {/* 요약 통계 */}
        <div className="mb-8 grid grid-cols-4 gap-3">
          {[
            { label: '전체', value: total },
            { label: '비밀글', value: privateCount },
            { label: '신랑측', value: groomCount },
            { label: '신부측', value: brideCount },
          ].map(({ label, value }) => (
            <div key={label} className="rounded-lg bg-gray-900 p-3 text-center">
              <div className="text-xl font-bold text-amber-400">{value}</div>
              <div className="mt-0.5 text-xs text-gray-500">{label}</div>
            </div>
          ))}
        </div>

        {/* 방명록 목록 */}
        <div className="flex flex-col gap-3">
          {entries.map((e) => (
            <div
              key={e.id}
              className={`rounded-lg border p-4 ${
                e.isPrivate ? 'border-amber-900/50 bg-amber-950/20' : 'border-gray-800 bg-gray-900'
              }`}
            >
              <div className="mb-2 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{e.reaction}</span>
                  <span className="font-medium text-amber-400">{e.name}</span>
                  {e.isPrivate && (
                    <span className="rounded bg-amber-900/40 px-1.5 py-0.5 text-xs text-amber-500">
                      🔒 비밀글
                    </span>
                  )}
                  <span className="rounded bg-gray-800 px-1.5 py-0.5 text-xs text-gray-400">
                    {SIDE_LABEL[e.side] ?? e.side}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  {e.likes > 0 && <span>❤️ {e.likes}</span>}
                  <span>{formatDate(e.createdAt)}</span>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-gray-300">{e.message}</p>
            </div>
          ))}
        </div>

        {entries.length === 0 && (
          <div className="py-16 text-center text-sm text-gray-600">
            아직 작성된 방명록이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
