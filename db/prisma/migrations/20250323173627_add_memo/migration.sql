/*
  Warnings:

  - You are about to drop the `Item` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Item";

-- CreateTable
CREATE TABLE "Memo" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "Memo_pkey" PRIMARY KEY ("id")
);
