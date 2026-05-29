import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { SinglesService } from "./singles.service";
import { JwtAuthGuard } from "src/auth/guard/jwt.guard";
import { singleLessonDTO, toSingleLessonDTO } from "src/common/dto/lessons/lessons.dto";

@Controller('single')
export class SinglesController{
    constructor(
        private readonly singlesService: SinglesService
    ) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    async createSingleLesson(@Body() body: singleLessonDTO){
        return toSingleLessonDTO(await this.singlesService.createSingleLesson(body))
    }

    @Patch()
    @UseGuards(JwtAuthGuard)
    async editSingleLesson(@Body() lessoninfo: singleLessonDTO){
        return toSingleLessonDTO(await this.singlesService.editSingleLesson(lessoninfo));
    }

    @Delete(':lessonId')
    @UseGuards(JwtAuthGuard)
    async deleteSingleLesson(@Param('lessonId') lessonId: string){
        return toSingleLessonDTO(await this.singlesService.deleteSingleLessonByLessonId(lessonId));
    }

    @Get(':studentId')
    @UseGuards(JwtAuthGuard)
    async getAllSingleLessons(@Param('studentId') studentId: string){
        const lessons = await this.singlesService.getAllSingleLessonsByStudentId(studentId);
        return lessons.map(toSingleLessonDTO);
    }
}