import { Type } from 'class-transformer';
import { IsString, IsDate, IsOptional } from 'class-validator';

export class patternDTO { // 패턴에 대한 구체적 정보
    @IsOptional()
    @IsString()
    id?: string;

    @IsString()
    studentId: string;

    @IsString()
    startTime: string;

    @IsString()
    endTime: string;

    @Type(()=>Date)
    @IsDate()
    startRecur: Date;

    @IsOptional()
    @Type(()=>Date)
    @IsDate()
    endRecur?: Date;

    @IsString()
    rrule: string;

} // 패턴: 만들기, 조회하기, 수정하기, 삭제하기


export function toPatternDTO(pattern: any) {
    return {
        id: pattern.id,
        studentId: pattern.studentId,

        startTime: pattern.startTime,
        endTime: pattern.endTime,

        startRecur: pattern.startRecur,
        endRecur: pattern.endRecur,

        rrule: pattern.rrule
    }
}

export class exceptionDTO { // 패턴 예외에 관한 모든 정보
    @IsOptional()
    id?: string;

    patternId: string;

    @Type(()=>Date)
    originalStartAt: Date;
    isCanceled: boolean;

    @IsOptional()
    @Type(() => Date)
    newStartAt?: Date;

    @IsOptional()
    @Type(() => Date)
    newEndAt?: Date;
} // 예외: 만들기, 조회하기, 수정하기(<- 사실상 삭제 후 새로 만들기)

export function toExceptionDTO(exceptions: any) {
    return {
        id: exceptions.id,
        patterId: exceptions.patternId,

        originalStartAt: exceptions.originalStartAt,
        isCanceled: exceptions.isCanceled,

        newStartAt: exceptions.newStartAt,
        newEndAt: exceptions.newEndAt
    }
}

export class singleLessonDTO { // 단일 수업에 관한 모든 정보
    @IsOptional()
    id?: string;

    studentId: string;

    @Type(()=>Date)
    startAt: Date;

    @Type(()=>Date)
    endAt: Date;
} // 단일 수업: 만들기, 조회하기, 수정하기, 삭제하기

export function toSingleLessonDTO(single: any) {
    return {
        id: single.id,

        studentId: single.studentId,

        startAt: single.startAt,
        endAt: single.endAt
    }
}

export class lessonRecordDTO { // 수업 기록에 관한 모든 정보
    @IsOptional()
    id?: string;

    studentId: string;

    @Type(()=>Date)
    lessonStartAt: Date;

    @IsOptional()
    progress?: string;
    @IsOptional()
    homework?: homeworkDTO[];
    @IsOptional()
    feedback?: string;
    @IsOptional()
    todo?: todo[];

} // 기록: 만들기, 수정하기, 조회하기

export function toLessonRecordDTO(records: any) {
    return {
        id: records.id,
        studentId: records.studentId,
        lessonStartAt: records.lessonStartAt,

        progress: records.progress,
        homework: records.homework,
        feedback: records.feedback,
        todo: records.todo
    }
}

export class homeworkDTO { // 숙제에 관한 모든 정보
    @IsOptional()
    id?: string;

    lessonId: string; // LessonRecord id

    content: string;

    status: "ASSIGNED" | "COMPLETE" | "CARRIED_OVER" | "CANCELED";
    @Type(()=>Date)
    assignedAt?: Date;

    carriedFromId?: string; // 이전 수업에서 넘어온 숙제의 id


}

export class todo{
    @IsOptional()
    id?: string;

    userId: string;
    lessonId?: string;

    content: string;

    @Type(()=>Date)
    until?: Date;
}