import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guard/jwt.guard";
import { exceptionDTO, toExceptionDTO } from "src/common/dto/lessons/lessons.dto";
import { ExceptionsService } from "./exceptions.service";

@Controller('exception')
export class ExceptionsController {
    constructor (
        private readonly exceptionsService: ExceptionsService
    ) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    async createException(@Body() body: exceptionDTO){
        return toExceptionDTO(await this.exceptionsService.makeExceptionByPatternId(body))
    }

    @Get(':studentId')
    @UseGuards(JwtAuthGuard)
    async getExceptions(@Param('studentId') studentId: string){
        const exceptions = await this.exceptionsService.getAllExceptionsByStudentId(studentId);
        return exceptions.map(toExceptionDTO);
    }


}