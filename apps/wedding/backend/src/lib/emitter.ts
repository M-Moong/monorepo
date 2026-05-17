import { EventEmitter } from 'events';
import type { GuestEntry } from '@repo/types';

const globalForEmitter = globalThis as unknown as { guestEmitter: EventEmitter };

export const guestEmitter = globalForEmitter.guestEmitter ?? new EventEmitter();

if (process.env.NODE_ENV !== 'production') globalForEmitter.guestEmitter = guestEmitter;

guestEmitter.setMaxListeners(100);

export function emitNewEntry(entry: GuestEntry) {
  guestEmitter.emit('new-entry', entry);
}
