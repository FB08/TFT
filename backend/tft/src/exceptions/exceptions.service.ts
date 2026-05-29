import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { exceptionDTO } from "src/common/dto/lessons/lessons.dto";
import { PrismaService } from "src/db/prisma.service";
import { RRule } from 'rrule'
import { DateTime } from 'luxon';

@Injectable()
export class ExceptionsService {
    constructor(
        private readonly prisma: PrismaService
    ) {}
    async makeExceptionByPatternId(exceptions: exceptionDTO){
        await this.existPattern(exceptions.patternId);
        await this.validException(exceptions);
        return await this.prisma.lessonexception.upsert({
            where: { 
                lessonPatternId_originalStartAt: { 
                    patternId: exceptions.patternId,
                    originalStartAt: exceptions.originalStartAt 
                }},
            create: {
                ...exceptions
            },
            update: {
                isCanceled: exceptions.isCanceled,
                newStartAt: exceptions.newStartAt,
                newEndAt: exceptions.newEndAt
            }
        })
    }


    async getAllExceptionsByStudentId(studentId: string) {
        await this.existStudent(studentId);
        return await this.prisma.lessonexception.findMany({
            where : { 
                lessonpattern: {
                    studentId
                }
             }
        })
    }


    async existPattern(patternId: string){
        const pattern = await this.prisma.lessonpattern.findUnique({
            where: { id: patternId }
        })
        if (!pattern){
            throw new NotFoundException('Pattern Not Found')
        }

        return true;
    }

    async existStudent(studentId: string){
        const student = await this.prisma.student.findUnique({
            where: { id: studentId}
        })

        if (!studentId){
            throw new NotFoundException('Student not found')
        }

        return true;
    }
    async validException(exceptions: exceptionDTO){
        // exception이 해당 pattern의 occurence인지 확인
        const pattern = await this.prisma.lessonpattern.findUnique({
            where: { id: exceptions.patternId }
        });

        const parsed = RRule.parseString(pattern!.rrule);

        const [hour, minute] = pattern!.startTime.split(':').map(Number);
        const dtstart = DateTime.fromJSDate(pattern!.startRecur, {zone: 'Asia/Seoul'}).set({hour, minute}).toUTC().toJSDate();



        const rule = new RRule({
            ...parsed,
            dtstart,
            until: pattern!.endRecur
        })

        const prev = rule.before(exceptions.originalStartAt, true);
        if (prev?.getTime() !== exceptions.originalStartAt.getTime()){
            throw new BadRequestException('Pattern and OriginalStartAt do not match.')
        }
        if (!exceptions.isCanceled){
            // isCanceled==false인데 newStartAt/newEndAt null인지 확인
            if (!exceptions.newStartAt || isNaN(exceptions.newStartAt.getTime())|| !exceptions.newEndAt || isNaN(exceptions.newEndAt.getTime())){
                throw new BadRequestException('NewStartAt and newEndAt have to be provided.')
            }
            // newStartAt < newEndAt인지 확인
            if (exceptions.newEndAt <= exceptions.newStartAt){
                throw new BadRequestException('NewStartAt must be earlier than newEndAt')
            }
        }

        return true;

    }
}