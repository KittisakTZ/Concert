/*
  Warnings:

  - You are about to drop the column `user_fname` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `user_lname` on the `users` table. All the data in the column will be lost.
  - Added the required column `fname` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lname` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "user_fname",
DROP COLUMN "user_lname",
ADD COLUMN     "fname" TEXT NOT NULL,
ADD COLUMN     "lname" TEXT NOT NULL;
