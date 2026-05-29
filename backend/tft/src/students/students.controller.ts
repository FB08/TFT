import { Body, Controller, Get, Post, UseGuards, Param, NotFoundException, Patch, Delete } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guard/jwt.guard";
import { JWTUser } from "src/common/decorators/jwtuser.decorator";
import { StudentsService } from "./students.service";
import { StudentDetailDTO, toStudentDetailDTO, toStudentMinDTO } from "src/common/dto/students/students.dto";

@Controller('students')
export class StudentsController {
    constructor(
        private studentService: StudentsService
    ) {}
    @Get()
    @UseGuards(JwtAuthGuard)
    async getAllStudents(@JWTUser() user) {
        const students = await this.studentService.getAllStudentsByUserId(user.userId);
        return students.map(s  => toStudentMinDTO(s))
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async createStudent(@JWTUser() user, @Body() body: StudentDetailDTO) {
        return await this.studentService.createStudentForUser(user.userId, body);
    }

    @Get(':studentId')
    @UseGuards(JwtAuthGuard)
    async getStudent(@JWTUser() user, @Param('studentId') studentId: string) {
        const student = await this.studentService.getStudentById(studentId);
        return toStudentDetailDTO(student);
    }

    @Patch(':studentId')
    @UseGuards(JwtAuthGuard)
    async updateStudent(@JWTUser() user, @Param('studentId') studentId: string, @Body() body: StudentDetailDTO) {
        await this.studentService.getStudentById(studentId);
        return await this.studentService.updateStudent(studentId, body);
    }

    @Delete(':studentId')
    @UseGuards(JwtAuthGuard)
    async deleteStudent(@JWTUser() user, @Param('studentId') studentId: string) {
        await this.studentService.getStudentById(studentId);
        return await this.studentService.deleteStudent(studentId);
    }
}