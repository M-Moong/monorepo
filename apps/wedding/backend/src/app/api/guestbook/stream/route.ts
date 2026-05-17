import type { GuestEntry } from '@repo/types';
import { guestEmitter } from '@/lib/emitter';

export const dynamic = 'force-dynamic';

export async function GET() {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      const send = (data: object) => {
        try {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
        } catch {
          // 클라이언트가 이미 끊어진 경우
        }
      };

      // 연결 확인용 첫 메시지
      send({ type: 'connected' });

      const onEntry = (entry: GuestEntry) => send(entry);
      guestEmitter.on('new-entry', onEntry);

      // keepalive — 30초마다 주석 ping (Vercel/proxy 타임아웃 방지)
      const ping = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(': ping\n\n'));
        } catch {
          clearInterval(ping);
        }
      }, 30_000);

      return () => {
        clearInterval(ping);
        guestEmitter.off('new-entry', onEntry);
      };
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no',
    },
  });
}
