/*
  Warnings:

  - You are about to drop the column `endDate` on the `lessonpattern` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `lessonpattern` table. All the data in the column will be lost.
  - Added the required column `startRecur` to the `lessonpattern` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `curriculum` DROP FOREIGN KEY `Curriculum_userId_fkey`;

-- DropForeignKey
ALTER TABLE `curriculumlessons` DROP FOREIGN KEY `CurriculumLessons_curriculumId_fkey`;

-- DropForeignKey
ALTER TABLE `homework` DROP FOREIGN KEY `Homework_carriedFromId_fkey`;

-- DropForeignKey
ALTER TABLE `homework` DROP FOREIGN KEY `Homework_lessonId_fkey`;

-- DropForeignKey
ALTER TABLE `lessonexception` DROP FOREIGN KEY `LessonException_patternId_fkey`;

-- DropForeignKey
ALTER TABLE `lessonpattern` DROP FOREIGN KEY `LessonPattern_studentId_fkey`;

-- DropForeignKey
ALTER TABLE `lessonrecord` DROP FOREIGN KEY `LessonRecord_studentId_fkey`;

-- DropForeignKey
ALTER TABLE `singlelesson` DROP FOREIGN KEY `SingleLesson_studentId_fkey`;

-- DropForeignKey
ALTER TABLE `student` DROP FOREIGN KEY `Student_userId_fkey`;

-- DropForeignKey
ALTER TABLE `todo` DROP FOREIGN KEY `Todo_lessonId_fkey`;

-- DropForeignKey
ALTER TABLE `todo` DROP FOREIGN KEY `Todo_userId_fkey`;

-- AlterTable
ALTER TABLE `lessonpattern` DROP COLUMN `endDate`,
    DROP COLUMN `startDate`,
    ADD COLUMN `endRecur` DATETIME(3) NULL,
    ADD COLUMN `startRecur` DATETIME(3) NOT NULL;

-- AddForeignKey
ALTER TABLE `curriculum` ADD CONSTRAINT `curriculum_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `curriculumlessons` ADD CONSTRAINT `curriculumlessons_curriculumId_fkey` FOREIGN KEY (`curriculumId`) REFERENCES `curriculum`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `homework` ADD CONSTRAINT `homework_carriedFromId_fkey` FOREIGN KEY (`carriedFromId`) REFERENCES `homework`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `homework` ADD CONSTRAINT `homework_lessonId_fkey` FOREIGN KEY (`lessonId`) REFERENCES `lessonrecord`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lessonexception` ADD CONSTRAINT `lessonexception_patternId_fkey` FOREIGN KEY (`patternId`) REFERENCES `lessonpattern`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lessonpattern` ADD CONSTRAINT `lessonpattern_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lessonrecord` ADD CONSTRAINT `lessonrecord_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `singlelesson` ADD CONSTRAINT `singlelesson_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `student` ADD CONSTRAINT `student_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `todo` ADD CONSTRAINT `todo_lessonId_fkey` FOREIGN KEY (`lessonId`) REFERENCES `lessonrecord`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `todo` ADD CONSTRAINT `todo_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `user` RENAME INDEX `User_userId_key` TO `user_userId_key`;
