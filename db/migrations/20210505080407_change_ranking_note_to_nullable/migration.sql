-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ranking" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "note" TEXT
);
INSERT INTO "new_Ranking" ("id", "createdAt", "updatedAt", "title", "description", "note") SELECT "id", "createdAt", "updatedAt", "title", "description", "note" FROM "Ranking";
DROP TABLE "Ranking";
ALTER TABLE "new_Ranking" RENAME TO "Ranking";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
