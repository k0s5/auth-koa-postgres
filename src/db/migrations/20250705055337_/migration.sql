/*
  Warnings:

  - Added the required column `fingerprint` to the `sessions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sessions" ADD COLUMN     "fingerprint" TEXT NOT NULL;
