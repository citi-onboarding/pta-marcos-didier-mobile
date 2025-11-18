-- CreateEnum
CREATE TYPE "Especies" AS ENUM ('Bode', 'Gato', 'Porco', 'Girafa', 'Cavalo', 'Cachorro');

-- CreateEnum
CREATE TYPE "TipoConsulta" AS ENUM ('PrimeiraConsulta', 'Retorno', 'CheckUp', 'Vacinacao');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "age" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Test" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,

    CONSTRAINT "Test_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Paciente" (
    "id" SERIAL NOT NULL,
    "genero" TEXT NOT NULL,
    "idade" INTEGER NOT NULL,
    "especie" "Especies" NOT NULL,
    "nomedono" TEXT NOT NULL,
    "nomedoanimal" TEXT NOT NULL,

    CONSTRAINT "Paciente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Consulta" (
    "id" SERIAL NOT NULL,
    "medico" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "tipo" "TipoConsulta" NOT NULL,
    "dataehora" TIMESTAMP(3) NOT NULL,
    "idpaciente" INTEGER NOT NULL,

    CONSTRAINT "Consulta_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Consulta" ADD CONSTRAINT "Consulta_idpaciente_fkey" FOREIGN KEY ("idpaciente") REFERENCES "Paciente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
