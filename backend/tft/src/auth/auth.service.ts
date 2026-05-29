import { UnauthorizedException, ConflictException, Injectable } from "@nestjs/common";
import { JWTPayload, SignUpDto, TokenAndCookieOptions } from "src/common/dto/auth/auth.dto";
import { PrismaService } from "src/db/prisma.service";
import * as bcrypt from 'bcrypt';
import { toUserDTO, User, UserDTO } from "src/common/dto/users/user.dto";
import { UsersService } from "src/users/users.service";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { RefreshTokenInvalidException } from "./refresh.exception";



@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly usersService: UsersService,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService
    ) {}

    async createUser(dto: SignUpDto): Promise<User> {
        const { userId, password, name } = dto;

        const existUserId = await this.prisma.user.findFirst({
            where: { userId },
        })

        if (existUserId) {
            if (existUserId.deletedAt){
                await this.prisma.user.delete({ where: { userId } });
            }else {
                throw new ConflictException('이미 존재하는 아이디입니다.');
            }
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const user = await this.prisma.user.create({
            data: {
                userId,
                passwordHash,
                refreshTokenHash: "",
                name
            }
        });

        return user;
    }

    async validateUser(userId: string, password: string): Promise<User | null> {
        const user = await this.usersService.getByUserId(userId);
        if (await bcrypt.compare(password, user.passwordHash)) {
            return user;
        }
        throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
    }

    async validateRefreshTokeAndGenerateAccessToken(id: string, refreshToken: string) {
        const user = await this.usersService.getById(id);
        if (!user || user.refreshTokenHash !== refreshToken) {
            throw new RefreshTokenInvalidException();
        }
        const payload: JWTPayload = { id: user.id, userId: user.userId, name: user.name };
        return {
            ...payload,
            access: this.getAccessTokenAndOptions(payload)
        };
    }

    async changePassword(id: string, currentPassword: string, newPassword: string) {
        const user = await this.usersService.getById(id);
        if (!await bcrypt.compare(currentPassword, user.passwordHash)) throw new UnauthorizedException('현재 비밀번호가 일치하지 않습니다.');
        const newHash = await bcrypt.hash(newPassword, 10);
        await this.prisma.user.update({
            where: { id },
            data: { passwordHash: newHash }
        });
        return user;
    }

    getAccessTokenAndOptions(payload: JWTPayload): TokenAndCookieOptions {
        const secret = this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET');
        const expiresInSec = this.configService.get<number>('JWT_ACCESS_TOKEN_EXP_SEC')!;
        const domain = this.configService.get<string>('COOKIE_DOMAIN')!;

        const token = this.jwtService.sign(payload, {
             secret, 
             expiresIn: expiresInSec*1000 });

        return { token, options: {domain, path: '/', httpOnly: true, maxAge: expiresInSec * 1000 }};
    }

    getRefreshTokenAndOptions(payload: JWTPayload): TokenAndCookieOptions {
        const secret = this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET');
        const expiresInSec = this.configService.get<number>('JWT_REFRESH_TOKEN_EXP_SEC')!;
        const domain = this.configService.get<string>('COOKIE_DOMAIN')!;

        const token = this.jwtService.sign(payload, {
            secret,
            expiresIn: expiresInSec
        });

        return { token, options: { domain, path: '/', httpOnly: true, maxAge: expiresInSec * 1000 } };
    }
}