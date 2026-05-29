import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { NotFoundError } from "rxjs";
import { lessonRecordDTO } from "src/common/dto/lessons/lessons.dto";
import { PrismaService } from "src/db/prisma.service";

@Injectable()
export class RecordService {
    constructor(
        private readonly prisma: PrismaService
    ) {}

    async getAllRecordsByStudentId(studentId: string){
        const student = await this.prisma.student.findUnique({
            where: {id:studentId}
        })
        if (!student) {
            throw new NotFoundException('Student not found')
        }
        return await this.prisma.lessonrecord.findMany({
            where: { studentId }
        })
    }

    async createRecord(data: lessonRecordDTO){
        await this.isValid(data.studentId, data.lessonStartAt)
        const recorded = await this.prisma.lessonrecord.findUnique({
            where: { studentId_lessonStartAt:{ studentId:data.studentId, lessonStartAt:data.lessonStartAt }}
        })

        if (recorded) throw new BadRequestException('Record already exist.')
        const record = await this.prisma.lessonrecord.create({
            data: {
                studentId: data.studentId,
                lessonStartAt: data.lessonStartAt,
                progress: data.progress,
                feedback: data.feedback
            }
        });
        
        if (data.homework?.length) {
            await this.prisma.homework.createMany({
                data: data.homework.map(hw => ({
                    lessonId: record.id,
                    content: hw.content,
                    status: hw.status,
                    assignedAt: hw.assignedAt,
                    carriedFromId: hw.carriedFromId
                }))
            });
        }
        
        return record;
    }

    async editRecord(data: lessonRecordDTO){
        const {id, studentId, lessonStartAt, progress, feedback, homework, todo} = data;
        await this.isValid(studentId, lessonStartAt);
        if (homework?.length){
            for (const hw of homework){
                await this.prisma.homework.upsert({
                    where: { id: hw.id },
                    create: {
                        id: hw.id,
                        lessonId: id!,
                        content: hw.content,
                        status: hw.status,
                        assignedAt: hw.assignedAt,
                        carriedFromId: hw.carriedFromId
                        },
                    update: {
                        content: hw.content,
                        status: hw.status,
                        assignedAt: hw.assignedAt
                    }
                })
            }
        }
        return await this.prisma.lessonrecord.update({
            where: { studentId_lessonStartAt: { studentId, lessonStartAt }},
            data: {
                progress,
                feedback
            }
        })
    }

    async isValid(studentId: string, lessonStartAt: Date){
        if (!await this.prisma.student.findUnique({ where: { id: studentId }})){
            throw new NotFoundException('Student not found')
        }

        if (isNaN(lessonStartAt.getTime())){
            throw new BadRequestException('Invalid lessonTime')
        }

        // pattern에 의한 수업 존재 메커니즘 확인


        const lesson = await this.prisma.singlelesson.findUnique({
            where: {studentId_startAt: {studentId, startAt:lessonStartAt}}
        })

        if (!lesson) throw new NotFoundException('Lesson not found')
        return true;
    }
}