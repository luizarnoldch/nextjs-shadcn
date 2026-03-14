-- CreateEnum
CREATE TYPE "FileState" AS ENUM ('PENDING', 'UPLOADED', 'DELETED');

-- CreateEnum
CREATE TYPE "FileVisibility" AS ENUM ('PUBLIC', 'PRIVATE');

-- CreateEnum
CREATE TYPE "TestEnum" AS ENUM ('OPTION_A', 'OPTION_B', 'OPTION_C');

-- CreateTable
CREATE TABLE "file" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "state" "FileState" NOT NULL DEFAULT 'PENDING',
    "visibility" "FileVisibility" NOT NULL DEFAULT 'PUBLIC',
    "key" TEXT,
    "url" TEXT,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "file_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "task" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "form_test" (
    "id" TEXT NOT NULL,
    "textField" TEXT NOT NULL,
    "numberField" INTEGER NOT NULL,
    "decimalField" DECIMAL(65,30) NOT NULL,
    "floatField" DOUBLE PRECISION NOT NULL,
    "booleanField" BOOLEAN NOT NULL,
    "dateField" TIMESTAMP(3) NOT NULL,
    "longTextField" TEXT NOT NULL,
    "jsonField" JSONB NOT NULL,
    "enumField" "TestEnum" NOT NULL,
    "optionalField" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "form_test_pkey" PRIMARY KEY ("id")
);
