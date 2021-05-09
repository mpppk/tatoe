/*
  Warnings:

  - You are about to drop the column `name` on the `RankingItem` table. All the data in the column will be lost.
  - Added the required column `title` to the `RankingItem` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_RankingItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "description" TEXT,
    "rank" INTEGER NOT NULL,
    "rankingId" INTEGER NOT NULL,
    FOREIGN KEY ("rankingId") REFERENCES "Ranking" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_RankingItem" ("id", "createdAt", "updatedAt", "rank", "rankingId", "description") SELECT "id", "createdAt", "updatedAt", "rank", "rankingId", "description" FROM "RankingItem";
DROP TABLE "RankingItem";
ALTER TABLE "new_RankingItem" RENAME TO "RankingItem";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
