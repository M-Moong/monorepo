import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const guestEntries = pgTable('guestbook', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  message: text('message').notNull(),
  reaction: text('reaction').notNull().default('🫶'),
  side: text('side').notNull().default('guest'),
  createdAt: timestamp('createdAt', { mode: 'date' }).notNull().defaultNow(),
});

export type GuestEntry = typeof guestEntries.$inferSelect;
