import { Body, Controller, Post, UseGuards, Req, Res, Patch } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignUpDto } from "src/common/dto/auth/auth.dto";
import { toUserDTO, User, UserDTO } from "src/common/dto/users/user.dto";
import { LocalAuthGuard } from "./guard/local.guard";
import { UsersService } from "src/users/users.service";
import { Request, Response } from "express";
import { JwtAuthGuard } from "./guard/jwt.guard";
import { RefreshAuthGuard } from "./guard/refresh.guard";
import { JWTUser } from "src/common/decorators/jwtuser.decorator";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UsersService
    ) {}

    @Post('signup')
    async signup(@Body() body: SignUpDto): Promise<UserDTO> {
        return toUserDTO(await this.authService.createUser(body));
    }

    @Post('login')
    @UseGuards(LocalAuthGuard)
    async login(@Req() req: Request & { user: User }, @Res({ passthrough: true }) res: Response){
        await this.setupTokens(req.user, res);
        return toUserDTO(req.user);
    }

    @Post('refresh')
    @UseGuards(RefreshAuthGuard)
    async refresh(@Req() req: Request & { user: User }, @Res({ passthrough: true }) res: Response){
        return await this.authService.validateRefreshTokeAndGenerateAccessToken(req.user.id, req.cookies.refresh);
    }
 
    @Patch('password')
    @UseGuards(JwtAuthGuard)
    async changePassword(@JWTUser() user, @Body() body: { currentPassword: string, newPassword: string }) {
        return toUserDTO(await this.authService.changePassword(user.id, body.currentPassword, body.newPassword));
    }

    private async setupTokens(user: User, res: Response) {
        const payload = { id: user.id };
        const access = this.authService.getAccessTokenAndOptions(payload);
        const refresh = this.authService.getRefreshTokenAndOptions(payload);

        await this.userService.updateRefreshToken(user.id, refresh.token);
        res.cookie('jwt', access.token, access.options);
        res.cookie('refresh', refresh.token, refresh.options);
    }

}