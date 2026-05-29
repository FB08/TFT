import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { RecordService } from "./records.service";
import { JwtAuthGuard } from "src/auth/guard/jwt.guard";
import { lessonRecordDTO, toLessonRecordDTO } from "src/common/dto/lessons/lessons.dto";

@Controller('records')
export class RecordController {
    constructor (
        private readonly recordService: RecordService
    ) {}
    @Get(':studentId')
    @UseGuards(JwtAuthGuard)
    async getAllRecords(@Param('studentId') studentId: string){
        const records = await this.recordService.getAllRecordsByStudentId(studentId)
        return records.map(toLessonRecordDTO);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async createRecord(@Body() data: lessonRecordDTO){
        return toLessonRecordDTO(await this.recordService.createRecord(data))
    }

    @Patch()
    @UseGuards(JwtAuthGuard)
    async editRecordbyRecordId(@Body() data: lessonRecordDTO){
        return toLessonRecordDTO(await this.recordService.editRecord(data))
    }



}