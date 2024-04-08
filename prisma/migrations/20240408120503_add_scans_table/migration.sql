-- CreateTable
CREATE TABLE "Scans" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "qrcodeId" INTEGER NOT NULL,
    "Country" TEXT,
    "Region" TEXT,
    "City" TEXT,
    "Browser" TEXT,
    "Platform" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
