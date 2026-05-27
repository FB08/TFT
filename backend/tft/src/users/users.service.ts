import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/db/prisma.service";

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async getByUserId(userId: string) {
        const user = await this.prisma.user.findUnique({
            where: { userId },
        });
        if (!user) throw new NotFoundException('User not found');
        return user;
    }

    async getById(id: string) {
        const user = await this.prisma.user.findUnique({
            where: { id },
        });
        if (!user) throw new NotFoundException('User not found');
        return user;
    }

    async updateRefreshToken(id: string, refreshToken: string) {
        return await this.prisma.user.update({
            where: { id },
            data: { refreshTokenHash: refreshToken }
        });
    }
}