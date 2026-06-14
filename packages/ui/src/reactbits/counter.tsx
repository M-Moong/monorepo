'use client';

import { motion, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { useEffect, type CSSProperties } from 'react';

import { cn } from '@repo/ui/lib/utils';

type PlaceValue = number | '.';

interface NumberProps {
  motionValue: MotionValue<number>;
  number: number;
}

function Number({ motionValue, number }: NumberProps) {
  const y = useTransform(motionValue, (latest) => {
    const placeValue = latest % 10;
    const offset = (10 + number - placeValue) % 10;
    const position = offset > 5 ? offset - 10 : offset;

    return `${position}em`;
  });

  return (
    <motion.span className="absolute inset-0 flex items-center justify-center" style={{ y }}>
      {number}
    </motion.span>
  );
}

function normalizeNearInteger(number: number) {
  const nearest = Math.round(number);
  const tolerance = 1e-9 * Math.max(1, Math.abs(number));

  return Math.abs(number - nearest) < tolerance ? nearest : number;
}

function getValueRoundedToPlace(value: number, place: number) {
  return Math.floor(normalizeNearInteger(value / place));
}

interface DigitProps {
  digitClassName?: string;
  digitStyle?: CSSProperties;
}

function DecimalPoint({ digitClassName, digitStyle }: DigitProps) {
  return (
    <span
      className={cn('relative inline-flex h-[1em] items-center justify-center', digitClassName)}
      style={digitStyle}
    >
      .
    </span>
  );
}

interface NumberDigitProps extends DigitProps {
  place: number;
  value: number;
}

function NumberDigit({ place, value, digitClassName, digitStyle }: NumberDigitProps) {
  const valueRoundedToPlace = getValueRoundedToPlace(value, place);
  const animatedValue = useSpring(valueRoundedToPlace);

  useEffect(() => {
    animatedValue.set(valueRoundedToPlace);
  }, [animatedValue, valueRoundedToPlace]);

  return (
    <span
      className={cn(
        'relative inline-flex h-[1em] w-[1ch] overflow-hidden tabular-nums',
        digitClassName
      )}
      style={digitStyle}
    >
      {Array.from({ length: 10 }, (_, number) => (
        <Number key={number} motionValue={animatedValue} number={number} />
      ))}
    </span>
  );
}

function getPlaces(value: number): PlaceValue[] {
  const characters = value.toString().split('');
  const decimalIndex = characters.indexOf('.');

  return characters.map((character, index) => {
    if (character === '.') return '.';

    const exponent =
      decimalIndex === -1
        ? characters.length - index - 1
        : index < decimalIndex
          ? decimalIndex - index - 1
          : -(index - decimalIndex);

    return 10 ** exponent;
  });
}

export interface CounterProps {
  value: number;
  places?: PlaceValue[];
  className?: string;
  digitClassName?: string;
  digitStyle?: CSSProperties;
}

export function Counter({
  value,
  places = getPlaces(value),
  className,
  digitClassName,
  digitStyle,
}: CounterProps) {
  return (
    <span aria-label={String(value)} className={cn('relative inline-flex leading-none', className)}>
      <span aria-hidden="true" className="inline-flex">
        {places.map((place, index) =>
          place === '.' ? (
            <DecimalPoint
              key={`${place}-${index}`}
              digitClassName={digitClassName}
              digitStyle={digitStyle}
            />
          ) : (
            <NumberDigit
              key={`${place}-${index}`}
              place={place}
              value={value}
              digitClassName={digitClassName}
              digitStyle={digitStyle}
            />
          )
        )}
      </span>
    </span>
  );
}
