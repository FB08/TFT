export type StudentMinDTO = {
    id: string;
    name: string;
}

export function toStudentMinDTO(student: any): StudentMinDTO {
    return {
        id: student.id,
        name: student.name,
    }
}

export type StudentDetailDTO = {
    name: string;
    age?: number;
    sex?: "Male" | "Female";
    address?: string;
    phone?: string;
    parentPhone?: string;
    book?: string;
    memo?: string;
    payRate?: number;
    patterns?: string[];
    singleLessons?: string[];
    lessonRecords?: string[];
}


export function toStudentDetailDTO(student: any): StudentDetailDTO {
    return {
        name: student.name,
        age: student.age,
        sex: student.sex,
        address: student.address,
        phone: student.phone,
        parentPhone: student.parentPhone,
        book: student.book,
        memo: student.memo,
        payRate: student.payRate,
        patterns: student.patterns,
        singleLessons: student.singleLessons,
        lessonRecords: student.lessonRecords,
    }}

