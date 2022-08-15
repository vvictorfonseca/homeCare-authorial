/*
  Warnings:

  - Added the required column `addressId` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profilePhoto` to the `clients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "clients" ADD COLUMN     "addressId" INTEGER NOT NULL,
ADD COLUMN     "profilePhoto" TEXT NOT NULL;
