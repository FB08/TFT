import { IsNotEmpty, IsString } from 'class-validator';

export class SignUpDto {
    @IsString()
    @IsNotEmpty()
    loginId!: string; // 초기값 없는걸 에러로 인식하는 것 방지

    @IsString()
    @IsNotEmpty()
    password!: string;

    @IsString()
    @IsNotEmpty()
    name!: string;
}