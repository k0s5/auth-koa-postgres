/*
  Warnings:

  - Added the required column `ip` to the `sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ua` to the `sessions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sessions" ADD COLUMN     "ip" TEXT NOT NULL,
ADD COLUMN     "ua" TEXT NOT NULL;
