'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { WEDDING } from '@/data/wedding';

const CONFETTI_COLORS = ['#e8c87c', '#ffffff', '#f4e4c1'];

type Phase = 'hold' | 'opening' | 'done';

interface Props {
  onDone: () => void;
  onEnter?: () => void;
}

// 파티클 위치는 고정 (SSR 안전)
const PARTICLES = [
  { left: '48%', top: '30%', delay: '0s', dur: '2.2s' },
  { left: '52%', top: '45%', delay: '0.4s', dur: '1.8s' },
  { left: '49%', top: '60%', delay: '0.8s', dur: '2.5s' },
  { left: '51%', top: '25%', delay: '1.1s', dur: '2.0s' },
  { left: '47%', top: '50%', delay: '0.2s', dur: '1.9s' },
  { left: '53%', top: '38%', delay: '0.6s', dur: '2.3s' },
];

const OPEN_ANIM_MS = 1900; // 문 열리는 슬라이드 속도
const DRAG_OPEN_THRESHOLD = 0.35; // 문 너비의 35% 이상 밀면 자동으로 완전히 열림
const TAP_MOVE_PX = 10; // 이 이하로 움직이면 드래그가 아니라 탭으로 간주
const MIN_TAP_GAP_MS = 80; // 터치 기기에서 pointer 이벤트가 중복 발생하는 걸 걸러내는 최소 간격
const DOUBLE_TAP_MS = 350;
const HINT_VISIBLE_MS = 1600;
// 대기 중 누가 지나가다 살짝 건드려보는 듯한 손길 — 처음엔 조용히 있다가, 정확히 2번
// 천천히 부드럽게 밀렸다 돌아오고, 그 다음 자동으로 열림 (레이스 없게 하나의 시퀀스로 고정).
const TOUCH_PCT = 6; // 건드릴 때 살짝 벌어지는 정도 (기준값, 매번 살짝 흔듦)
const TOUCH_COUNT = 2; // 자동으로 열리기 전 들썩이는 횟수, 고정
const TOUCH_INITIAL_DELAY_MS = 1000; // 처음엔 이만큼 조용히
const TOUCH_INTERVAL_MS = 3000; // 터치 사이 간격, 고정
const TOUCH_OUT_MS = 900; // 천천히 밀리는 시간
const TOUCH_TRANSITION = 'transform 900ms cubic-bezier(0.45, 0, 0.55, 1)'; // 느리고 부드러운 곡선
const POST_TOUCH_PAUSE_MS = 0; // 마지막 들썩임 끝나고 열리기 전 여유

export function Splash({ onDone, onEnter }: Props) {
  const [phase, setPhase] = useState<Phase>('hold');
  const [dragProgress, setDragProgress] = useState(0); // 0(닫힘)~1(열림), hold 단계에서만 의미 있음
  const [isDragging, setIsDragging] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [bounceNonce, setBounceNonce] = useState(0);
  const [peekPct, setPeekPct] = useState(0);

  const doneRef = useRef(false);
  const openingStartedRef = useRef(false);
  const phaseRef = useRef<Phase>('hold');
  const autoOpenTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoOpenAtRef = useRef<number | null>(null); // 자동열림 예정 시각(epoch ms) — 드래그 취소 시 재예약용
  const finishTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hintTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dragStartXRef = useRef(0);
  const dragSideRef = useRef<'left' | 'right' | null>(null);
  const lastTapAtRef = useRef(0);

  const finish = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    setPhase('done');
    document.body.style.overflow = '';
    onDone();
  }, [onDone]);

  // 더블탭/드래그완주/자동타이머 — 문을 여는 트리거는 전부 이걸 통해서만 실행
  // (예전엔 자동으로 열리기 시작한 뒤 탭해도 무반응이던 버그가 있었음 — 트리거를 하나로 합쳐서 방지)
  // 예비동작("탁!") 없이 자동/사용자 트리거 모두 그대로 스르륵 한 번에 열림.
  const beginOpening = useCallback(() => {
    if (openingStartedRef.current || phaseRef.current !== 'hold') return;
    openingStartedRef.current = true;
    if (autoOpenTimerRef.current) clearTimeout(autoOpenTimerRef.current);
    setPeekPct(0);
    setPhase('opening');
  }, []);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  useEffect(() => {
    if (phase !== 'opening') return;
    onEnter?.();
    setDragProgress(0);
    const openDoneMs = OPEN_ANIM_MS;
    // ease-out-expo 커브라 실제 트랜지션이 끝나기 전에 이미 눈으로는 다 열린 것처럼 보임 —
    // 그 체감 타이밍에 맞춰 confetti는 조금 더 일찍 터트림 (언마운트 타이밍은 그대로 둠)
    const confettiDelayMs = Math.max(0, openDoneMs - 350);

    // 문이 다 열린 직후, 양쪽 끝에서 가운데를 향해 confetti 캐논 터짐
    const confettiTimer = setTimeout(() => {
      confetti({
        particleCount: 90,
        angle: 60,
        spread: 55,
        startVelocity: 55,
        origin: { x: 0, y: 0.6 },
        colors: CONFETTI_COLORS,
      });
      confetti({
        particleCount: 90,
        angle: 120,
        spread: 55,
        startVelocity: 55,
        origin: { x: 1, y: 0.6 },
        colors: CONFETTI_COLORS,
      });
    }, confettiDelayMs);

    finishTimerRef.current = setTimeout(finish, openDoneMs + 200);
    return () => {
      clearTimeout(confettiTimer);
      if (finishTimerRef.current) clearTimeout(finishTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      if (finishTimerRef.current) clearTimeout(finishTimerRef.current);
      if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
      document.body.style.overflow = '';
    };
  }, []);

  // 대기 중 누가 살짝 건드려보는 듯한 손길, 정확히 TOUCH_COUNT번, 그 다음 자동으로 열림.
  // 들썩임과 자동열림을 하나의 시퀀스로 미리 다 스케줄링해서 서로 끼어드는 레이스가 안 생기게 함.
  // CSS animation이 아니라 JS로 직접 트랜지션 값을 흔드는 이유: 열기 애니메이션(transform
  // transition)이랑 같은 속성을 animation으로 따로 걸면 전환 시 충돌해서 뚝 끊기는 버그가 있었음.
  useEffect(() => {
    if (phase !== 'hold') return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    let cursor = TOUCH_INITIAL_DELAY_MS;

    for (let i = 0; i < TOUCH_COUNT; i++) {
      const amp = TOUCH_PCT + (Math.random() - 0.5) * 2;
      const outMs = TOUCH_OUT_MS + (Math.random() - 0.5) * 200;
      const onAt = cursor;
      timers.push(setTimeout(() => setPeekPct(amp), onAt));
      timers.push(setTimeout(() => setPeekPct(0), onAt + outMs));
      cursor = onAt + outMs + TOUCH_INTERVAL_MS;
    }

    const autoOpenDelay = cursor + POST_TOUCH_PAUSE_MS;
    autoOpenAtRef.current = Date.now() + autoOpenDelay;
    autoOpenTimerRef.current = setTimeout(beginOpening, autoOpenDelay);
    timers.push(autoOpenTimerRef.current);

    return () => timers.forEach(clearTimeout);
  }, [phase, beginOpening]);

  const triggerHint = () => {
    setShowHint(true);
    setBounceNonce((n) => n + 1);
    if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
    hintTimerRef.current = setTimeout(() => setShowHint(false), HINT_VISIBLE_MS);
  };

  const handleTap = () => {
    const now = Date.now();
    const sinceLastTap = now - lastTapAtRef.current;
    // 같은 탭이 pointer 이벤트로 중복 발생한 경우(터치+마우스 호환 이벤트 등) 무시
    if (sinceLastTap < MIN_TAP_GAP_MS) return;
    if (sinceLastTap < DOUBLE_TAP_MS) {
      lastTapAtRef.current = 0;
      beginOpening();
      return;
    }
    lastTapAtRef.current = now;
    triggerHint();
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (phase !== 'hold' || !e.isPrimary) return;
    dragStartXRef.current = e.clientX;
    dragSideRef.current = e.clientX < window.innerWidth / 2 ? 'left' : 'right';
    setIsDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || phase !== 'hold' || !dragSideRef.current || !e.isPrimary) return;
    // 사용자가 실제로 문을 슬라이드하기 시작하면 자동 안전장치 타이머는 완전히 취소 —
    // 자동타이머는 "아무 행동도 안 했을 때"만을 위한 것
    if (autoOpenTimerRef.current) {
      clearTimeout(autoOpenTimerRef.current);
      autoOpenTimerRef.current = null;
    }
    const doorWidth = window.innerWidth / 2;
    const delta =
      dragSideRef.current === 'left'
        ? dragStartXRef.current - e.clientX
        : e.clientX - dragStartXRef.current;
    setDragProgress(Math.min(1, Math.max(0, delta / doorWidth)));
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !e.isPrimary) return;
    setIsDragging(false);
    const moved = Math.abs(e.clientX - dragStartXRef.current);
    if (moved < TAP_MOVE_PX) {
      setDragProgress(0);
      handleTap();
      return;
    }
    if (dragProgress >= DRAG_OPEN_THRESHOLD) {
      beginOpening();
    } else {
      setDragProgress(0); // 드래그 중이 아니게 됐으니 transition 붙어서 원위치로 스냅백
      // 드래그를 문턱 못 넘고 취소한 경우 — handlePointerMove에서 지워버린 자동열림 안전장치를
      // 원래 예정 시각 기준으로 재예약 (안 그러면 이후 아무 행동 안 해도 영영 안 열림)
      if (phase === 'hold' && !autoOpenTimerRef.current && autoOpenAtRef.current !== null) {
        const remaining = Math.max(300, autoOpenAtRef.current - Date.now());
        autoOpenTimerRef.current = setTimeout(beginOpening, remaining);
      }
    }
  };

  if (phase === 'done') return null;

  const isOpening = phase === 'opening';
  const showAffordance = phase === 'hold' && !isDragging;
  const idleTransition = isDragging ? 'none' : TOUCH_TRANSITION;
  const openTransition = isOpening
    ? `transform ${OPEN_ANIM_MS}ms cubic-bezier(0.65, 0, 0.35, 1)` // 자연스럽게 가속했다 감속하는 ease-in-out
    : idleTransition;

  const idlePeekPct = showAffordance ? peekPct : 0;
  const leftTransform = isOpening
    ? 'translateX(-100%)'
    : `translateX(-${dragProgress * 100 + idlePeekPct}%)`;
  const rightTransform = isOpening
    ? 'translateX(100%)'
    : `translateX(${dragProgress * 100 + idlePeekPct}%)`;

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className="fixed inset-0 z-100 overflow-hidden"
      style={{ opacity: 1, touchAction: 'none' }}
    >
      {/* 뒤에서 퍼지는 골드 bloom (문 열릴 때) */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, color-mix(in srgb, #e8c87c 18%, transparent) 0%, transparent 70%)',
          opacity: isOpening ? 1 : 0,
          transition: 'opacity 800ms ease 200ms',
        }}
      />

      {/* 왼쪽 문 */}
      <div
        className="absolute top-0 left-0 z-10 flex h-full w-1/2 flex-col items-end justify-center"
        style={{
          background: 'var(--color-bg)',
          transform: leftTransform,
          transition: openTransition,
        }}
      >
        {/* 장식 수직선 */}
        <div
          className="absolute top-[15%] right-7 h-[30%] w-px"
          style={{
            background: 'color-mix(in srgb, var(--color-gold) 30%, transparent)',
          }}
        />
        <div
          className="absolute right-7 bottom-[15%] h-[30%] w-px"
          style={{
            background: 'color-mix(in srgb, var(--color-gold) 30%, transparent)',
          }}
        />

        <div className="flex flex-col items-end pr-4">
          <div
            className="font-serif-en text-[5.5rem] leading-none italic"
            style={{
              color: 'var(--color-gold)',
              textShadow: '0 0 40px color-mix(in srgb, var(--color-gold) 50%, transparent)',
              animation: !isOpening ? 'glow 2.5s ease-in-out infinite' : 'none',
            }}
          >
            {WEDDING.groom.initial}
          </div>
          <div
            className="mt-3 text-right text-2xs tracking-[0.4rem]"
            style={{
              color: 'color-mix(in srgb, var(--color-fg) 55%, transparent)',
            }}
          >
            {WEDDING.groom.name}
          </div>
          <div
            className="mt-1 text-right font-sans-en text-4xs tracking-[0.25rem]"
            style={{
              color: 'color-mix(in srgb, var(--color-gold) 50%, transparent)',
            }}
          >
            GROOM
          </div>
        </div>

        {/* 바깥쪽(왼쪽) 방향 화살표 힌트 */}
        {showAffordance && (
          <div
            key={`arrow-left-${bounceNonce}`}
            className="absolute bottom-28 left-6 flex h-14 w-14 items-center justify-center rounded-full text-3xl"
            style={{
              color: 'var(--color-gold)',
              background: 'color-mix(in srgb, var(--color-gold) 12%, transparent)',
              boxShadow: '0 0 18px color-mix(in srgb, var(--color-gold) 25%, transparent)',
              animation: showHint
                ? 'arrow-bounce-left 0.6s ease-in-out'
                : 'arrow-nudge-left 1.8s ease-in-out infinite',
            }}
          >
            ←
          </div>
        )}

        {/* seam — 오른쪽 edge */}
        <div
          className="absolute top-0 right-0 h-full w-px"
          style={{
            background: 'var(--color-gold)',
            animation: !isOpening ? 'splash-seam-glow 2s ease-in-out infinite' : 'none',
          }}
        />
      </div>

      {/* 오른쪽 문 */}
      <div
        className="absolute top-0 right-0 z-10 flex h-full w-1/2 flex-col items-start justify-center"
        style={{
          background: 'var(--color-bg)',
          transform: rightTransform,
          transition: openTransition,
        }}
      >
        {/* 장식 수직선 */}
        <div
          className="absolute top-[15%] left-7 h-[30%] w-px"
          style={{
            background: 'color-mix(in srgb, var(--color-gold) 30%, transparent)',
          }}
        />
        <div
          className="absolute bottom-[15%] left-7 h-[30%] w-px"
          style={{
            background: 'color-mix(in srgb, var(--color-gold) 30%, transparent)',
          }}
        />

        <div className="flex flex-col items-start pl-4">
          <div
            className="font-serif-en text-[5.5rem] leading-none italic"
            style={{
              color: 'var(--color-gold)',
              textShadow: '0 0 40px color-mix(in srgb, var(--color-gold) 50%, transparent)',
              animation: !isOpening ? 'glow 2.5s ease-in-out infinite 0.4s' : 'none',
            }}
          >
            {WEDDING.bride.initial}
          </div>
          <div
            className="mt-3 text-2xs tracking-[0.4rem]"
            style={{
              color: 'color-mix(in srgb, var(--color-fg) 55%, transparent)',
            }}
          >
            {WEDDING.bride.name}
          </div>
          <div
            className="mt-1 font-sans-en text-4xs tracking-[0.25rem]"
            style={{
              color: 'color-mix(in srgb, var(--color-gold) 50%, transparent)',
            }}
          >
            BRIDE
          </div>
        </div>

        {/* 바깥쪽(오른쪽) 방향 화살표 힌트 */}
        {showAffordance && (
          <div
            key={`arrow-right-${bounceNonce}`}
            className="absolute right-6 bottom-28 flex h-14 w-14 items-center justify-center rounded-full text-3xl"
            style={{
              color: 'var(--color-gold)',
              background: 'color-mix(in srgb, var(--color-gold) 12%, transparent)',
              boxShadow: '0 0 18px color-mix(in srgb, var(--color-gold) 25%, transparent)',
              animation: showHint
                ? 'arrow-bounce-right 0.6s ease-in-out'
                : 'arrow-nudge-right 1.8s ease-in-out infinite',
            }}
          >
            →
          </div>
        )}

        {/* seam — 왼쪽 edge */}
        <div
          className="absolute top-0 left-0 h-full w-px"
          style={{
            background: 'var(--color-gold)',
            animation: !isOpening ? 'splash-seam-glow 2s ease-in-out infinite 0.2s' : 'none',
          }}
        />
      </div>

      {/* 안내 문구 — 처음부터 계속 노출 */}
      {showAffordance && (
        <div
          className="pointer-events-none absolute inset-x-0 bottom-16 z-20 flex justify-center text-xs tracking-[0.3rem]"
          style={{ color: 'color-mix(in srgb, var(--color-gold) 85%, transparent)' }}
        >
          더블 탭하면 열려요
        </div>
      )}

      {/* 중앙 이니셜 오버레이 — 번잡해서 숨김 */}
      {/* <div ... /> */}

      {/* 파티클 (seam 근처) */}
      {!isOpening &&
        PARTICLES.map((p, i) => (
          <div
            key={i}
            className="pointer-events-none absolute z-20 size-1 rounded-full"
            style={{
              left: p.left,
              top: p.top,
              background: 'var(--color-gold)',
              animation: `splash-particle ${p.dur} ${p.delay} ease-out infinite`,
              opacity: 0,
            }}
          />
        ))}
    </div>
  );
}
