import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignUpDto } from "src/common/dto/auth/signup.dto";
import { toUserDTO, UserDTO } from "src/common/dto/users/user.dto";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @Post('signup')
    async signup(@Body() body: SignUpDto): Promise<UserDTO> {
        return toUserDTO(await this.authService.signup(body));
    }


}