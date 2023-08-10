/*
  Warnings:

  - You are about to drop the column `userId` on the `Activity` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Activity" DROP CONSTRAINT "Activity_userId_fkey";

-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "_ActivityToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ActivityToUser_AB_unique" ON "_ActivityToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ActivityToUser_B_index" ON "_ActivityToUser"("B");

-- AddForeignKey
ALTER TABLE "_ActivityToUser" ADD CONSTRAINT "_ActivityToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Activity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActivityToUser" ADD CONSTRAINT "_ActivityToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
