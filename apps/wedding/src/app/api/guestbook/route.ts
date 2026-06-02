import { NextResponse } from 'next/server';
import { desc, count, eq } from 'drizzle-orm';
import { db } from '@/db';
import { guestEntries } from '@/db/schema';
import { createId } from '@paralleldrive/cuid2';

const PAGE_SIZE = 5;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10));
    const offset = (page - 1) * PAGE_SIZE;

    const [entries, totalRows, groomRows, brideRows] = await Promise.all([
      db
        .select()
        .from(guestEntries)
        .orderBy(desc(guestEntries.createdAt))
        .limit(PAGE_SIZE)
        .offset(offset),
      db.select({ value: count() }).from(guestEntries),
      db.select({ value: count() }).from(guestEntries).where(eq(guestEntries.side, 'groom')),
      db.select({ value: count() }).from(guestEntries).where(eq(guestEntries.side, 'bride')),
    ]);

    const maskedEntries = entries.map((e) =>
      e.isPrivate ? { ...e, message: '🔒 비밀글입니다.' } : e
    );

    const total = totalRows[0]?.value ?? 0;
    const groomCount = groomRows[0]?.value ?? 0;
    const brideCount = brideRows[0]?.value ?? 0;
    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

    return NextResponse.json({
      entries: maskedEntries,
      total,
      groomCount,
      brideCount,
      totalPages,
      page,
    });
  } catch {
    return NextResponse.json({ error: 'DB 조회 실패' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, message, reaction, side, isPrivate } = body;

    if (!name?.trim() || !message?.trim()) {
      return NextResponse.json({ error: '이름과 메시지는 필수입니다.' }, { status: 400 });
    }

    const validSides = ['groom', 'bride'];
    const [entry] = await db
      .insert(guestEntries)
      .values({
        id: createId(),
        name: name.trim().slice(0, 20),
        message: message.trim().slice(0, 300),
        reaction: reaction ?? '🫶',
        side: validSides.includes(side) ? side : 'guest',
        isPrivate: isPrivate === true,
      })
      .returning();

    return NextResponse.json(entry, { status: 201 });
  } catch {
    return NextResponse.json({ error: '저장 실패' }, { status: 500 });
  }
}
