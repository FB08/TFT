import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { patternDTO } from "src/common/dto/lessons/lessons.dto";
import { PrismaService } from "src/db/prisma.service"
import { StudentsService } from "src/students/students.service";

@Injectable()
export class PatternsService {
    constructor (
        private readonly prisma: PrismaService,
        private readonly studentsService: StudentsService 
    ) {}

    async getAllPatternsByStudentId(studentId: string){
        return await this.prisma.lessonpattern.findMany({
            where: { studentId }
        })
    }

    async createPatternForStudent(patterns:patternDTO){
        await this.studentsService.getStudentById(patterns.studentId);

        // const startRecur = patterns.startRecur instanceof Date ? patterns.startRecur : new Date(patterns.startRecur as any);
        // const endRecur = patterns.endRecur ? (patterns.endRecur instanceof Date ? patterns.endRecur : new Date(patterns.endRecur as any)) : undefined;

        // if (Number.isNaN(startRecur.getTime())) {
        //     throw new BadRequestException('Invalid startRecur value. YYYY-MM-DD');
        // }
        // if (patterns.endRecur && endRecur && Number.isNaN(endRecur.getTime())) {
        //     throw new BadRequestException('Invalid endRecur value. YYYY-MM-DD');
        // }

        return await this.prisma.lessonpattern.create({
            data: {
                // studentId: patterns.studentId,
                // startTime: patterns.startTime,
                // endTime: patterns.endTime,
                // startRecur,
                // endRecur,
                // rrule: patterns.rrule
                ...patterns
            }
        })
    }

    async editPatternByPatternId(patternId: string, patterns:Partial<patternDTO>){
        await this.existPattern(patternId);

        // const data: any = { ...patterns };
        // if (patterns.startRecur) {
        //     const startRecur = patterns.startRecur instanceof Date ? patterns.startRecur : new Date(patterns.startRecur as any);
        //     if (Number.isNaN(startRecur.getTime())) {
        //         throw new BadRequestException('Invalid startRecur value. Expected an ISO-8601 date string.');
        //     }
        //     data.startRecur = startRecur;
        // }
        // if (patterns.endRecur) {
        //     const endRecur = patterns.endRecur instanceof Date ? patterns.endRecur : new Date(patterns.endRecur as any);
        //     if (Number.isNaN(endRecur.getTime())) {
        //         throw new BadRequestException('Invalid endRecur value. Expected an ISO-8601 date string.');
        //     }
        //     data.endRecur = endRecur;
        // }
        return await this.prisma.lessonpattern.update({
            where: { id: patternId },
            data : { ...patterns }
        })
    }

    async deletePatternByPatternId(patternId: string){
        await this.existPattern(patternId);
        return await this.prisma.lessonpattern.delete({
            where: { id: patternId }
        })

    }

    async existPattern(patternId: string){
        const pattern = await this.prisma.lessonpattern.findFirst({
            where: { id:patternId }
        })
        if (!pattern){
            throw new NotFoundException('Pattern not found.');
        }
        return true;
    }

}