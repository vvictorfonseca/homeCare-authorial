-- CreateEnum
CREATE TYPE "workType" AS ENUM ('cleaning', 'garden', 'electricalService');

-- CreateTable
CREATE TABLE "professionals" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "type" "workType" NOT NULL,
    "profilePhoto" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,

    CONSTRAINT "professionals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clients" (
    "id" SERIAL NOT NULL,
    "emai" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "addressId" INTEGER NOT NULL,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "addresses" (
    "id" SERIAL NOT NULL,
    "clientId" INTEGER NOT NULL,
    "cityId" INTEGER NOT NULL,
    "district" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "complement" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "states" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "states_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cities" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "stateId" INTEGER NOT NULL,

    CONSTRAINT "cities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jobs" (
    "id" SERIAL NOT NULL,
    "clientId" INTEGER NOT NULL,
    "professionalId" INTEGER NOT NULL,
    "date" TEXT NOT NULL,
    "isConfirmed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "jobs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "professionals_email_key" ON "professionals"("email");

-- CreateIndex
CREATE UNIQUE INDEX "professionals_password_key" ON "professionals"("password");

-- CreateIndex
CREATE UNIQUE INDEX "professionals_id_email_key" ON "professionals"("id", "email");

-- CreateIndex
CREATE UNIQUE INDEX "clients_emai_key" ON "clients"("emai");

-- CreateIndex
CREATE UNIQUE INDEX "clients_id_emai_key" ON "clients"("id", "emai");

-- CreateIndex
CREATE UNIQUE INDEX "states_name_key" ON "states"("name");

-- CreateIndex
CREATE UNIQUE INDEX "states_id_name_key" ON "states"("id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "cities_name_key" ON "cities"("name");

-- CreateIndex
CREATE UNIQUE INDEX "cities_id_name_key" ON "cities"("id", "name");

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "cities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cities" ADD CONSTRAINT "cities_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "states"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
