import { NextResponse } from "next/server";
import { desc } from "drizzle-orm";
import { db } from "@/db";
import { guestEntries } from "@/db/schema";
import { createId } from "@paralleldrive/cuid2";

export async function GET() {
  try {
    const entries = await db
      .select()
      .from(guestEntries)
      .orderBy(desc(guestEntries.createdAt));
    return NextResponse.json(entries);
  } catch {
    return NextResponse.json({ error: "DB 조회 실패" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, message, reaction, side, attend } = body;

    if (!name?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "이름과 메시지는 필수입니다." },
        { status: 400 },
      );
    }

    const validSides = ["groom", "bride"];
    const [entry] = await db
      .insert(guestEntries)
      .values({
        id: createId(),
        name: name.trim().slice(0, 20),
        message: message.trim().slice(0, 300),
        reaction: reaction ?? "🫶",
        side: validSides.includes(side) ? side : "guest",
        attend: attend ?? null,
      })
      .returning();

    return NextResponse.json(entry, { status: 201 });
  } catch {
    return NextResponse.json({ error: "저장 실패" }, { status: 500 });
  }
}
