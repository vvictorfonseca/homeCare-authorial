/*
  Warnings:

  - You are about to drop the column `emai` on the `clients` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `clients` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,email]` on the table `clients` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `clients` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "clients_emai_key";

-- DropIndex
DROP INDEX "clients_id_emai_key";

-- AlterTable
ALTER TABLE "clients" DROP COLUMN "emai",
ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "clients_email_key" ON "clients"("email");

-- CreateIndex
CREATE UNIQUE INDEX "clients_id_email_key" ON "clients"("id", "email");
