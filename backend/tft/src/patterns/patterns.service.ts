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
        return await this.prisma.lessonpattern.create({
            data: {
                ...patterns
            }
        })
    }

    async editPatternByPatternId(patternId: string, patterns:Partial<patternDTO>){
        await this.existPattern(patternId);

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