import { z } from "zod";

export const idSchema = z.string().min(1);
export const emailSchema = z.string().email();
export const urlSchema = z.string().url();
export const dateSchema = z.coerce.date();

export const paginationSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(20),
});

export type Pagination = z.infer<typeof paginationSchema>;
