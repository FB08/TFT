/*
  Warnings:

  - A unique constraint covering the columns `[studentId,startAt]` on the table `singlelesson` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `singlelesson_studentId_startAt_key` ON `singlelesson`(`studentId`, `startAt`);
