import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { TokenRefreshPayload } from "src/common/dto/auth/auth.dto";
import {RefreshTokenInvalidException} from '../refresh.exception';
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

