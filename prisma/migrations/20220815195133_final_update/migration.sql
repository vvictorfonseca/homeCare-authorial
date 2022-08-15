/*
  Warnings:

  - You are about to drop the `cities` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `states` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "cities" DROP CONSTRAINT "cities_stateId_fkey";

-- DropTable
DROP TABLE "cities";

-- DropTable
DROP TABLE "states";
