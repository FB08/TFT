import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PrismaModule } from "src/db/prisma.module";
import { UsersModule } from "src/users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { LocalStrategy } from "./strategy/local.strategy";
import { RefreshStrategy } from "./strategy/refresh.strategy";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { PassportModule } from "@nestjs/passport";

@Module({
    imports: [PrismaModule, UsersModule, JwtModule, PassportModule],
    providers: [AuthService, LocalStrategy, JwtStrategy, RefreshStrategy],
    exports: [],
    controllers: [AuthController]
})

export class AuthModule {}