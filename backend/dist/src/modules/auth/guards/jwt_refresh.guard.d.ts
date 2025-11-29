import { CanActivate, ExecutionContext } from '@nestjs/common';
import { RefreshTokenRepository } from '../../../infrastructure/repository/services/refresh-token.repository';
import { UserRepository } from '../../../infrastructure/repository/services/user.repository';
import { TokenService } from '../services/token.service';
export declare class JwtRefreshGuard implements CanActivate {
    private readonly tokenService;
    private readonly refreshTokenRepository;
    private readonly userRepository;
    constructor(tokenService: TokenService, refreshTokenRepository: RefreshTokenRepository, userRepository: UserRepository);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
