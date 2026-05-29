import { StudentDetailDTO } from "src/common/dto/students/students.dto";
import { PrismaService } from "src/db/prisma.service";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class StudentsService {
    constructor(
        private prisma: PrismaService
    ) {}

    async getAllStudentsByUserId(userId: string) {
        return await this.prisma.student.findMany({
            where: { userId },
        });
    }

    async createStudentForUser(userId: string, body: StudentDetailDTO) {
        return await this.prisma.student.create({
            data: {
                ...body, 
                userId,
            }
        });
    }

    async getStudentById(studentId: string) {
        const student = await this.prisma.student.findUnique({
            where: { id: studentId },
        });
        if (!student) {
            throw new NotFoundException("Student not found");
        }
        return student;
    }

    async updateStudent(studentId: string, body: StudentDetailDTO) {
        return await this.prisma.student.update({
            where: { id: studentId },
            data: body
        });
    }

    async deleteStudent(studentId: string) {
        return await this.prisma.student.delete({
            where: { id: studentId },
        });
    }
}