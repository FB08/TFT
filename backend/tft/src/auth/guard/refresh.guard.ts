import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { TokenRefreshPayload } from "src/common/dto/auth/auth.dto";
import { RefreshTokenInvalidException } from "../refresh.exception";

@Injectable()
export class RefreshAuthGuard extends AuthGuard('refresh') implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const repsonse = context.switchToHttp().getResponse();

        try {
            await super.canActivate(context);
            
            const user = request.user;
            if (user && 'access' in user) { // refresh token에 의해 access token이 재발급된 경우
                const { access, ...payload } = user as TokenRefreshPayload;
                request.user = payload;
                repsonse.cookie('jwt', access.token, access.options);
            }
            return true;
        } catch (error) {
            throw new UnauthorizedException('다시 로그인 해 주세요.');
   
        }
    } 
}