/*
  Warnings:

  - You are about to drop the column `cinemaId` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `column` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `row` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `screenId` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `ticketId` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `uid` on the `Ticket` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[screenId,row,column,bookingId]` on the table `Ticket` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `totalPrice` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Made the column `cinemaId` on table `Manager` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `bookingId` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `column` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `row` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `screenId` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SeatType" AS ENUM ('REGULAR', 'PREMIUM', 'RECLINER');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('CONFIRMED', 'CANCELLED', 'REFUNDED');

-- AlterEnum
ALTER TYPE "ShowtimeStatus" ADD VALUE 'ACTIVE';

-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_cinemaId_fkey";

-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_screenId_row_column_fkey";

-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_ticketId_fkey";

-- DropForeignKey
ALTER TABLE "Manager" DROP CONSTRAINT "Manager_cinemaId_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_uid_fkey";

-- DropIndex
DROP INDEX "Booking_screenId_row_column_showtimeId_key";

-- DropIndex
DROP INDEX "seatIndex";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "cinemaId",
DROP COLUMN "column",
DROP COLUMN "row",
DROP COLUMN "screenId",
DROP COLUMN "ticketId",
ADD COLUMN     "status" "BookingStatus" NOT NULL DEFAULT 'CONFIRMED',
ADD COLUMN     "totalPrice" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Manager" ALTER COLUMN "cinemaId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Seat" ADD COLUMN     "type" "SeatType" NOT NULL DEFAULT 'REGULAR';

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "uid",
ADD COLUMN     "bookingId" TEXT NOT NULL,
ADD COLUMN     "column" INTEGER NOT NULL,
ADD COLUMN     "row" INTEGER NOT NULL,
ADD COLUMN     "screenId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Ticket_screenId_row_column_bookingId_key" ON "Ticket"("screenId", "row", "column", "bookingId");

-- AddForeignKey
ALTER TABLE "Manager" ADD CONSTRAINT "Manager_cinemaId_fkey" FOREIGN KEY ("cinemaId") REFERENCES "Cinema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_screenId_row_column_fkey" FOREIGN KEY ("screenId", "row", "column") REFERENCES "Seat"("screenId", "row", "column") ON DELETE RESTRICT ON UPDATE CASCADE;
