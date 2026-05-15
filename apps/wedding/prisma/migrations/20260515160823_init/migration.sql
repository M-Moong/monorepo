-- CreateTable
CREATE TABLE "GuestEntry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "reaction" TEXT NOT NULL DEFAULT '🫶',
    "side" TEXT NOT NULL DEFAULT 'guest',
    "attend" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
