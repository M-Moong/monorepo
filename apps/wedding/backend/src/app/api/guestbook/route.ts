import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { emitNewEntry } from '@/lib/emitter';

export async function GET() {
  try {
    const entries = await prisma.guestEntry.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(entries);
  } catch {
    return NextResponse.json({ error: 'DB 조회 실패' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, message, reaction, side, attend } = body;

    if (!name?.trim() || !message?.trim()) {
      return NextResponse.json({ error: '이름과 메시지는 필수입니다.' }, { status: 400 });
    }

    const entry = await prisma.guestEntry.create({
      data: {
        name: name.trim().slice(0, 20),
        message: message.trim().slice(0, 300),
        reaction: reaction ?? '🫶',
        side: side === 'groom' || side === 'bride' ? side : 'guest',
        attend: attend ?? null,
      },
    });

    emitNewEntry({ ...entry, createdAt: entry.createdAt.toISOString() });
    return NextResponse.json(entry, { status: 201 });
  } catch {
    return NextResponse.json({ error: '저장 실패' }, { status: 500 });
  }
}
