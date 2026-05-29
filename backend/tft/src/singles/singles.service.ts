import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { start } from "repl";
import { singleLessonDTO } from "src/common/dto/lessons/lessons.dto";
import { PrismaService } from "src/db/prisma.service";

@Injectable()
export class SinglesService {
    constructor(
        private readonly prisma: PrismaService
    ) {}
    async createSingleLesson(lessoninfo: singleLessonDTO){
        await this.validinfo(lessoninfo);
        return await this.prisma.singlelesson.create({
            data: {
                ...lessoninfo
            }
        })
    }

    async editSingleLesson(lessoninfo: singleLessonDTO){
        await this.validinfo(lessoninfo)
        const { id, ...data } = lessoninfo;
        const lesson = await this.prisma.singlelesson.findUnique({
            where: { id }
        })

        if (!lesson){
            throw new NotFoundException('Lesson Not found');
        }

        return await this.prisma.singlelesson.update({
            where: { id },
            data
        })
    }

    async deleteSingleLessonByLessonId(lessonId: string){
        const lesson = await this.prisma.singlelesson.findUnique({
            where: {id:lessonId}
        })
        if (!lesson) throw new NotFoundException('Lesson not found')
        return this.prisma.singlelesson.delete({ where: {id: lessonId}})
    }

    async getAllSingleLessonsByStudentId(studentId: string){
        if (!await this.prisma.student.findUnique({where: {id:studentId}})){
            throw new NotFoundException('Student not found')
        }
        return await this.prisma.singlelesson.findMany({
            where: { studentId }
        })
    }

    async validinfo(lessoninfo: singleLessonDTO){
        const { studentId, startAt, endAt } = lessoninfo;
        const student = await this.prisma.student.findUnique({
            where: { id: studentId }
        })
        if (!student) throw new NotFoundException('Student not Found')
        if (!startAt || isNaN(startAt.getTime()) || !endAt || isNaN(endAt.getTime())){
            throw new BadRequestException('Invalid startAt or endAt');
        }

        if (startAt.getTime() >= endAt.getTime()){
            throw new BadRequestException('StartAt must be earlier than endAt')
        }
        return true;
    }

    
}