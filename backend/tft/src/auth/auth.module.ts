import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
    imports: [],
    providers: [AuthService],
    exports: [],
    controllers: [AuthController]
})

export class AuthModule {}