'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { WEDDING } from '@/data/wedding';

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

const AUTO_OPEN_MS = 6000; // 안전장치: 아무 인터랙션 없어도 이 시간 지나면 자동으로 열림
const OPEN_ANIM_MS = 1200;
const DRAG_OPEN_THRESHOLD = 0.35; // 문 너비의 35% 이상 밀면 자동으로 완전히 열림
const TAP_MOVE_PX = 10; // 이 이하로 움직이면 드래그가 아니라 탭으로 간주
const MIN_TAP_GAP_MS = 80; // 터치 기기에서 pointer 이벤트가 중복 발생하는 걸 걸러내는 최소 간격
const DOUBLE_TAP_MS = 350;
const HINT_VISIBLE_MS = 1600;
// 대기 중 누가 지나가다 살짝 건드려보는 듯한 손길 — 처음엔 조용히 있다가, 이후 불규칙한
// 간격으로 한 번씩만 천천히 부드럽게 밀렸다 돌아옴 (여러 번 연타하면 오히려 기계적으로 보임).
const TOUCH_PCT = 6; // 건드릴 때 살짝 벌어지는 정도 (기준값, 매번 살짝 흔듦)
const TOUCH_INITIAL_DELAY_MS = 2600; // 처음엔 이만큼 조용히
const TOUCH_INTERVAL_MIN_MS = 4000; // 이후 다음 터치까지 최소 간격
const TOUCH_INTERVAL_MAX_MS = 8000; // 최대 간격 (매번 랜덤)
const TOUCH_OUT_MS = 900; // 천천히 밀리는 시간
const TOUCH_TRANSITION = 'transform 900ms cubic-bezier(0.45, 0, 0.55, 1)'; // 느리고 부드러운 곡선

// 자동타이머로(아무도 안 건드렸는데) 열릴 때만: 예비동작 + 좌우 시차.
// 더블탭/드래그로 직접 열 땐 사용자 액션 자체가 이미 예비동작이라 그대로 즉시 반응.
const ANTICIPATION_PCT = 11;
const ANTICIPATION_MS = 160;
const ANTICIPATION_TRANSITION = 'transform 160ms cubic-bezier(0.34, 1.56, 0.64, 1)';
const DOOR_STAGGER_MS = 70; // 오른쪽 문이 왼쪽보다 이만큼 늦게 출발

export function Splash({ onDone, onEnter }: Props) {
  const [phase, setPhase] = useState<Phase>('hold');
  const [dragProgress, setDragProgress] = useState(0); // 0(닫힘)~1(열림), hold 단계에서만 의미 있음
  const [isDragging, setIsDragging] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [bounceNonce, setBounceNonce] = useState(0);
  const [peekPct, setPeekPct] = useState(0);
  const [openedVia, setOpenedVia] = useState<'auto' | 'user' | null>(null);
  const [anticipating, setAnticipating] = useState(false);

  const doneRef = useRef(false);
  const openingStartedRef = useRef(false);
  const phaseRef = useRef<Phase>('hold');
  const autoOpenTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
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
  // source가 'auto'면(아무도 안 건드렸는데 열리는 경우) 바로 열지 않고 예비동작을 한 번 거침.
  const beginOpening = useCallback((source: 'auto' | 'user' = 'user') => {
    if (openingStartedRef.current || phaseRef.current !== 'hold') return;
    openingStartedRef.current = true;
    if (autoOpenTimerRef.current) clearTimeout(autoOpenTimerRef.current);
    setOpenedVia(source);

    if (source === 'auto') {
      setAnticipating(true);
      setPeekPct(ANTICIPATION_PCT);
      setTimeout(() => {
        setPeekPct(0);
        setPhase('opening');
      }, ANTICIPATION_MS);
    } else {
      setPhase('opening');
    }
  }, []);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  useEffect(() => {
    if (phase !== 'opening') return;
    onEnter?.();
    setDragProgress(0);
    const staggerBuffer = openedVia === 'auto' ? DOOR_STAGGER_MS : 0;
    finishTimerRef.current = setTimeout(finish, OPEN_ANIM_MS + staggerBuffer + 200);
    return () => {
      if (finishTimerRef.current) clearTimeout(finishTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    autoOpenTimerRef.current = setTimeout(() => beginOpening('auto'), AUTO_OPEN_MS);

    return () => {
      if (autoOpenTimerRef.current) clearTimeout(autoOpenTimerRef.current);
      if (finishTimerRef.current) clearTimeout(finishTimerRef.current);
      if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
      document.body.style.overflow = '';
    };
  }, [beginOpening]);

  // 대기 중 누가 살짝 건드려보는 듯한 손길. CSS animation이 아니라 JS로 직접 트랜지션 값을
  // 흔드는 이유: 열기 애니메이션(transform transition)이랑 같은 속성을 animation으로 따로
  // 걸면 전환 시 충돌해서 뚝 끊기는 버그가 있었음.
  useEffect(() => {
    if (phase !== 'hold') return;
    let outTimer: ReturnType<typeof setTimeout>;
    let cycleTimer: ReturnType<typeof setTimeout>;

    const runTouch = () => {
      const amp = TOUCH_PCT + (Math.random() - 0.5) * 2;
      const outMs = TOUCH_OUT_MS + (Math.random() - 0.5) * 200;
      setPeekPct(amp);
      outTimer = setTimeout(() => setPeekPct(0), outMs);
      // 다음 터치까지도 매번 불규칙한 간격으로 — 일정한 리듬이면 스크립트처럼 보임
      const nextDelay =
        TOUCH_INTERVAL_MIN_MS + Math.random() * (TOUCH_INTERVAL_MAX_MS - TOUCH_INTERVAL_MIN_MS);
      cycleTimer = setTimeout(runTouch, nextDelay);
    };

    cycleTimer = setTimeout(runTouch, TOUCH_INITIAL_DELAY_MS);
    return () => {
      clearTimeout(outTimer);
      clearTimeout(cycleTimer);
    };
  }, [phase]);

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
    }
  };

  if (phase === 'done') return null;

  const isOpening = phase === 'opening';
  const showAffordance = phase === 'hold' && !isDragging;
  const idleTransition = isDragging
    ? 'none'
    : anticipating
      ? ANTICIPATION_TRANSITION
      : TOUCH_TRANSITION;
  // 자동으로 열릴 때만 오른쪽 문을 살짝 늦게 출발시켜서(시차) 완전 대칭이 아니게 함
  const rightOpenDelayMs = openedVia === 'auto' ? DOOR_STAGGER_MS : 0;
  const leftPanelTransition = isOpening
    ? `transform ${OPEN_ANIM_MS}ms cubic-bezier(0.16, 1, 0.3, 1)` // 자연스럽게 감속하는 ease-out
    : idleTransition;
  const rightPanelTransition = isOpening
    ? `transform ${OPEN_ANIM_MS}ms cubic-bezier(0.16, 1, 0.3, 1) ${rightOpenDelayMs}ms`
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
      className="fixed inset-0 z-[100] overflow-hidden"
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
          transition: leftPanelTransition,
        }}
      >
        {/* 장식 수직선 */}
        <div
          className="absolute top-[15%] right-[28px] h-[30%] w-px"
          style={{
            background: 'color-mix(in srgb, var(--color-gold) 30%, transparent)',
          }}
        />
        <div
          className="absolute right-[28px] bottom-[15%] h-[30%] w-px"
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
          transition: rightPanelTransition,
        }}
      >
        {/* 장식 수직선 */}
        <div
          className="absolute top-[15%] left-[28px] h-[30%] w-px"
          style={{
            background: 'color-mix(in srgb, var(--color-gold) 30%, transparent)',
          }}
        />
        <div
          className="absolute bottom-[15%] left-[28px] h-[30%] w-px"
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
          className="pointer-events-none absolute inset-x-0 bottom-16 z-20 flex justify-center text-3xs tracking-[0.3rem]"
          style={{ color: 'color-mix(in srgb, var(--color-gold) 85%, transparent)' }}
        >
          더블탭하면 열려요
        </div>
      )}

      {/* 중앙 이니셜 오버레이 — 번잡해서 숨김 */}
      {/* <div ... /> */}

      {/* 파티클 (seam 근처) */}
      {!isOpening &&
        PARTICLES.map((p, i) => (
          <div
            key={i}
            className="pointer-events-none absolute z-20 h-[3px] w-[3px] rounded-full"
            style={{
              left: p.left,
              top: p.top,
              background: 'var(--color-gold)',
              animation: `splash-particle ${p.dur} ${p.delay} ease-out infinite`,
              opacity: 0,
            }}
          />
        ))}

      {/* 하단 날짜 + 장소 — 디자인 검토 중 */}
      {/* <div
        className="pointer-events-none absolute bottom-14 left-0 right-0 z-20 flex flex-col items-center gap-1.5"
        style={{
          opacity: isOpening ? 0 : isVisible ? 1 : 0,
          transition: isOpening ? 'opacity 250ms ease' : 'opacity 700ms ease 500ms',
        }}
      >
        <div className="text-4xs tracking-[0.6rem]">· {WEDDING.dateShort} ·</div>
        <div className="text-3xs tracking-[0.35rem]">{WEDDING.venue.short}</div>
        <div className="mt-1 text-5xs tracking-[0.5rem]">{WEDDING.timeText}</div>
      </div> */}
    </div>
  );
}
