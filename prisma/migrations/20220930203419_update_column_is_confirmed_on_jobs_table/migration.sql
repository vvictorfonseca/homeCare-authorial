/*
  Warnings:

  - The `isConfirmed` column on the `jobs` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Pending', 'Confirmed', 'Done');

-- AlterTable
ALTER TABLE "jobs" DROP COLUMN "isConfirmed",
ADD COLUMN     "isConfirmed" "Status" NOT NULL DEFAULT 'Pending';
