/*
  Warnings:

  - You are about to drop the column `date` on the `Acticity` table. All the data in the column will be lost.
  - You are about to drop the column `endTime` on the `Acticity` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `Acticity` table. All the data in the column will be lost.
  - Added the required column `endDate` to the `Acticity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Acticity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Acticity" DROP COLUMN "date",
DROP COLUMN "endTime",
DROP COLUMN "startTime",
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL;
