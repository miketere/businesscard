-- AlterTable
ALTER TABLE "CardView" ADD COLUMN "browser" TEXT;
ALTER TABLE "CardView" ADD COLUMN "city" TEXT;
ALTER TABLE "CardView" ADD COLUMN "country" TEXT;
ALTER TABLE "CardView" ADD COLUMN "device" TEXT;
ALTER TABLE "CardView" ADD COLUMN "os" TEXT;
ALTER TABLE "CardView" ADD COLUMN "utmCampaign" TEXT;
ALTER TABLE "CardView" ADD COLUMN "utmContent" TEXT;
ALTER TABLE "CardView" ADD COLUMN "utmMedium" TEXT;
ALTER TABLE "CardView" ADD COLUMN "utmSource" TEXT;
ALTER TABLE "CardView" ADD COLUMN "utmTerm" TEXT;

-- CreateTable
CREATE TABLE "CardSave" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cardId" TEXT NOT NULL,
    "savedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "method" TEXT,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    CONSTRAINT "CardSave_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
