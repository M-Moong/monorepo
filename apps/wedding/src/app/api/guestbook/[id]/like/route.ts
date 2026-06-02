import { NextResponse } from 'next/server';
import { eq, sql } from 'drizzle-orm';
import { db } from '@/db';
import { guestEntries } from '@/db/schema';

export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    const [updated] = await db
      .update(guestEntries)
      .set({ likes: sql`${guestEntries.likes} + 1` })
      .where(eq(guestEntries.id, id))
      .returning({ likes: guestEntries.likes });

    if (!updated) {
      return NextResponse.json({ error: '항목을 찾을 수 없습니다.' }, { status: 404 });
    }

    return NextResponse.json({ likes: updated.likes });
  } catch {
    return NextResponse.json({ error: '저장 실패' }, { status: 500 });
  }
}
