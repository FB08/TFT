import { Injectable } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { JWTPayload } from "src/common/dto/auth/auth.dto";
import { AuthService } from "../auth.service";
import { Request } from "express";

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
    constructor(
        private readonly configService: ConfigService,
        private readonly authService: AuthService
        ){
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([(request) => request?.cookies?.refresh]),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_REFRESH_TOKEN_SECRET')!,
            passReqToCallback: true
        });
    }
    

    async validate(request: Request, payload: JWTPayload) {

        return await this.authService.validateRefreshTokeAndGenerateAccessToken(payload.id, request.cookies.refresh);
    }
}

