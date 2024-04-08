/*
  Warnings:

  - You are about to drop the column `Browser` on the `Scans` table. All the data in the column will be lost.
  - You are about to drop the column `City` on the `Scans` table. All the data in the column will be lost.
  - You are about to drop the column `Country` on the `Scans` table. All the data in the column will be lost.
  - You are about to drop the column `Platform` on the `Scans` table. All the data in the column will be lost.
  - You are about to drop the column `Region` on the `Scans` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Scans" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "qrcodeId" INTEGER NOT NULL,
    "country" TEXT,
    "region" TEXT,
    "city" TEXT,
    "browser" TEXT,
    "platform" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Scans" ("createdAt", "id", "qrcodeId") SELECT "createdAt", "id", "qrcodeId" FROM "Scans";
DROP TABLE "Scans";
ALTER TABLE "new_Scans" RENAME TO "Scans";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
