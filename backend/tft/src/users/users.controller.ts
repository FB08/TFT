import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guard/jwt.guard";
import { JWTUser } from "src/common/decorators/jwtuser.decorator";
import { toUserDTO } from "src/common/dto/users/user.dto";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) {}
    @Get('me')
    @UseGuards(JwtAuthGuard)
    async getMe(@JWTUser() user) {
        return toUserDTO(await this.usersService.getById(user.id));
    }

    @Patch('me')
    @UseGuards(JwtAuthGuard)
    async updateMe(@JWTUser() user, @Body() body: { name: string }) {
        return toUserDTO(await this.usersService.updateUser(user.id, body));
    }
    
    @Delete('me')
    @UseGuards(JwtAuthGuard)
    async deleteMe(@JWTUser() user) {
        return toUserDTO(await this.usersService.updateUser(user.id, { deletedAt: new Date() }));
    }
    @Get('isAvailable/:userId')
    async checkUserIdAvailable(@Param('userId') userId: string) {
        try {
            await this.usersService.getByUserId(userId);
            return {available: false};
        } catch {
            return { available: true};
        }
    }






    
}