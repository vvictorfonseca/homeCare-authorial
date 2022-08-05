/*
  Warnings:

  - You are about to drop the column `cityId` on the `addresses` table. All the data in the column will be lost.
  - Added the required column `city` to the `addresses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "addresses" DROP CONSTRAINT "addresses_cityId_fkey";

-- AlterTable
ALTER TABLE "addresses" DROP COLUMN "cityId",
ADD COLUMN     "city" TEXT NOT NULL;
