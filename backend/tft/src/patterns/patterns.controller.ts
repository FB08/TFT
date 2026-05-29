import { Controller, Get, Param, UseGuards, Body, Post, Patch, Delete } from "@nestjs/common";
import { JWTUser } from "src/common/decorators/jwtuser.decorator";
import { JwtAuthGuard } from "src/auth/guard/jwt.guard";
import { PatternsService } from './patterns.service'
import { toPatternDTO, patternDTO } from 'src/common/dto/lessons/lessons.dto'

@Controller('pattern')
export class PatternsController {
    constructor(
        private readonly patternsService: PatternsService,
    ) {}

    @Get(':studentId')
    @UseGuards(JwtAuthGuard)
    async getAllPatterns(@Param('studentId') studentId: string) {
        const patterns = await this.patternsService.getAllPatternsByStudentId(studentId);
        return patterns.map(p=>toPatternDTO(p))
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async createPattern(@Body() body: patternDTO){
        return toPatternDTO(await this.patternsService.createPatternForStudent(body));
    }
    @Patch(':patternId')
    @UseGuards(JwtAuthGuard)
    async editPattern(@Param('patternId') patternId: string, @Body() body: Partial<patternDTO>){
        return toPatternDTO(await this.patternsService.editPatternByPatternId(patternId, body));
    }

    @Delete(':patternId')
    @UseGuards(JwtAuthGuard)
    async deletePattern(@Param('patternId') patternId: string){
        return toPatternDTO(await this.patternsService.deletePatternByPatternId(patternId));
    }


}