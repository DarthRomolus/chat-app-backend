/*
  Warnings:

  - You are about to drop the column `admin` on the `Chat` table. All the data in the column will be lost.
  - Added the required column `adminID` to the `Chat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Chat" DROP COLUMN "admin",
ADD COLUMN     "adminID" TEXT NOT NULL;
