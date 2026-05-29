/*
  Warnings:

  - A unique constraint covering the columns `[patternId,originalStartAt]` on the table `lessonexception` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `lessonexception_patternId_originalStartAt_key` ON `lessonexception`(`patternId`, `originalStartAt`);
