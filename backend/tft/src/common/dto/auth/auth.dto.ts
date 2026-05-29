import { IsNotEmpty, IsString } from 'class-validator';

export class SignUpDto {
    @IsString()
    @IsNotEmpty()
    userId!: string; // 초기값 없는걸 에러로 인식하는 것 방지

    @IsString()
    @IsNotEmpty()
    password!: string;

    @IsString()
    @IsNotEmpty()
    name!: string;
}

export type JWTPayload = {
    id: string;
    userId: string;
    name: string;
}

export type TokenAndCookieOptions = {
    token: string;
    options: {
        domain: string;
        path: string;
        httpOnly: boolean;
        maxAge: number;
    };
};

export type TokenRefreshPayload = JWTPayload & { access: TokenAndCookieOptions };
