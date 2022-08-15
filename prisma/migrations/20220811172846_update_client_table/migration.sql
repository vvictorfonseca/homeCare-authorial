/*
  Warnings:

  - You are about to drop the column `addressId` on the `clients` table. All the data in the column will be lost.
  - Added the required column `profilePhoto` to the `clients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "clients" DROP COLUMN "addressId",
ADD COLUMN     "profilePhoto" TEXT NOT NULL;
