/*
  Warnings:

  - You are about to drop the column `adminID` on the `Chat` table. All the data in the column will be lost.
  - You are about to drop the column `data` on the `Message` table. All the data in the column will be lost.
  - Added the required column `content` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Message" DROP CONSTRAINT "Message_chatID_fkey";

-- AlterTable
ALTER TABLE "Chat" DROP COLUMN "adminID";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "data",
ADD COLUMN     "content" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_chatID_fkey" FOREIGN KEY ("chatID") REFERENCES "Chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;
