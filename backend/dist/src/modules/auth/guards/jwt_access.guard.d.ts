import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRepository } from '../../../infrastructure/repository/services/user.repository';
import { TokenService } from '../services/token.service';
import { AuthCacheService } from '../services/auth-cache.service';
import { IUserData } from '../models/interfaces/user_data.interface';
export interface CustomResponse extends Response {
    locals: {
        user?: IUserData;
        [key: string]: any;
    };
}
export declare class JwtAccessGuard implements CanActivate {
    private readonly reflector;
    private readonly tokenService;
    private readonly authCacheService;
    private readonly userRepository;
    constructor(reflector: Reflector, tokenService: TokenService, authCacheService: AuthCacheService, userRepository: UserRepository);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
