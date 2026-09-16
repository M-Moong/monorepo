import { desc } from 'drizzle-orm';
import { cookies } from 'next/headers';
import { db } from '@/db';
import { guestEntries } from '@/db/schema';
import { AdminOtpLogin } from './AdminOtpLogin';

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

const SIDE_BADGE: Record<string, string> = {
  groom: 'border-sky-400/40 bg-sky-400/10 text-sky-300',
  bride: 'border-rose-400/40 bg-rose-400/10 text-rose-300',
  guest: 'border-fg/15 text-fg/50',
};

const PRIVATE_BADGE = 'border-violet-400/40 bg-violet-400/10 text-violet-300';

const SIDE_ACCENT: Record<string, string> = {
  groom: 'border-sky-400/80',
  bride: 'border-rose-400/80',
  guest: 'border-fg/40',
};

// 비밀글은 side(신랑/신부/하객)와 별개 값이라 동시에 참일 수 있음 — 왼쪽 바는 하나뿐이라 비밀글을 최우선으로 표시
function getAccent(e: { isPrivate: boolean; side: string }) {
  if (e.isPrivate) return 'border-violet-400/80';
  return SIDE_ACCENT[e.side] ?? SIDE_ACCENT.guest;
}

export default async function GuestbookAdminPage() {
  const adminSecret = process.env.GUESTBOOK_ADMIN_SECRET;
  const cookieStore = await cookies();
  const session = cookieStore.get('gb_admin')?.value;

  if (!adminSecret || session !== adminSecret) {
    return <AdminOtpLogin />;
  }

  const entries = await db.select().from(guestEntries).orderBy(desc(guestEntries.createdAt));

  const total = entries.length;
  const privateCount = entries.filter((e) => e.isPrivate).length;
  const groomCount = entries.filter((e) => e.side === 'groom').length;
  const brideCount = entries.filter((e) => e.side === 'bride').length;

  return (
    <div className="min-h-screen bg-bg px-5 py-16 font-sans text-fg">
      <div className="mx-auto max-w-md">
        <div className="mb-6">
          <div className="font-sans-en text-3xs tracking-[0.4rem] text-gold">
            · GUESTBOOK ADMIN ·
          </div>
          <h1 className="mt-2 font-serif-en text-3xl font-light text-fg italic">All messages</h1>
          <p className="mt-1 text-2xs tracking-[0.1rem] text-fg/40">비밀글 포함 전체 방명록</p>
        </div>

        {/* 요약 통계 */}
        <div className="mb-6 grid grid-cols-4 border border-fg/8 bg-warm">
          {[
            { label: '전체', value: total },
            { label: '비밀글', value: privateCount },
            { label: '신랑측', value: groomCount },
            { label: '신부측', value: brideCount },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-0.5 border-r border-fg/6 py-3 last:border-r-0"
            >
              <span className="text-lg font-bold text-gold tabular-nums">{value}</span>
              <span className="text-3xs tracking-[0.15rem] text-fg/55">{label}</span>
            </div>
          ))}
        </div>

        {/* 방명록 목록 */}
        <div className="flex flex-col gap-2.5">
          {entries.map((e) => (
            <div key={e.id} className={`rounded-l-lg border-l-8 bg-warm p-3.5 ${getAccent(e)}`}>
              <div className="mb-1.5 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{e.reaction}</span>
                  <span className="text-2sm tracking-[0.05rem] text-gold">{e.name}</span>
                  {e.isPrivate && (
                    <span
                      className={`rounded-full border px-2 py-0.5 text-3xs tracking-[0.05rem] ${PRIVATE_BADGE}`}
                    >
                      🔒 비밀글
                    </span>
                  )}
                  <span
                    className={`rounded-full border px-2 py-0.5 text-3xs tracking-[0.05rem] ${SIDE_BADGE[e.side] ?? SIDE_BADGE.guest}`}
                  >
                    {SIDE_LABEL[e.side] ?? e.side}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-3xs text-fg/35">
                  {e.likes > 0 && <span>❤️ {e.likes}</span>}
                  <span>{formatDate(e.createdAt)}</span>
                </div>
              </div>
              <p className="text-2sm leading-[1.6] text-fg/80">{e.message}</p>
            </div>
          ))}
        </div>

        {entries.length === 0 && (
          <div className="py-16 text-center text-2xs tracking-[0.15rem] text-fg/40">
            아직 작성된 방명록이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
