CREATE TABLE "GuestEntry" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"message" text NOT NULL,
	"reaction" text DEFAULT '🫶' NOT NULL,
	"side" text DEFAULT 'guest' NOT NULL,
	"attend" text,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
