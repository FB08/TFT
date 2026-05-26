import { ConflictException, Injectable } from "@nestjs/common";
import { SignUpDto } from "src/common/dto/auth/signup.dto";
import { PrismaService } from "src/db/prisma.service";
import * as bcrypt from 'bcrypt';
import { toUserDTO } from "src/common/dto/users/user.dto";


@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {}

    async signup(dto: SignUpDto) {
        const { loginId, password, name } = dto;

        const existUserId = await this.prisma.user.findUnique({
            where: { id: loginId },
        })

        if (existUserId) {
            throw new ConflictException('이미 존재하는 아이디입니다.');
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const user = await this.prisma.user.create({
            data: {
                userId: loginId,
                passwordHash,
                refreshTokenHash: "",
                name
            }
        });

        return toUserDTO({id: user.id, userId: user.userId, name: user.name});
    }
}