/*
  Warnings:

  - Added the required column `name` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refreshTokenHash` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `name` VARCHAR(20) NOT NULL,
    ADD COLUMN `refreshTokenHash` VARCHAR(255) NOT NULL;
