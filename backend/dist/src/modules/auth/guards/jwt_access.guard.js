"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAccessGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const typeorm_1 = require("typeorm");
const user_repository_1 = require("../../../infrastructure/repository/services/user.repository");
const user_mapper_1 = require("../../users/service/user.mapper");
const skip_auth_decorator_1 = require("../../decorators/skip_auth.decorator");
const token_type_enum_1 = require("../../enums/token_type.enum");
const token_service_1 = require("../services/token.service");
const auth_cache_service_1 = require("../services/auth-cache.service");
let JwtAccessGuard = class JwtAccessGuard {
    constructor(reflector, tokenService, authCacheService, userRepository) {
        this.reflector = reflector;
        this.tokenService = tokenService;
        this.authCacheService = authCacheService;
        this.userRepository = userRepository;
    }
    async canActivate(context) {
        const skipAuth = this.reflector.getAllAndOverride(skip_auth_decorator_1.SKIP_AUTH, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (skipAuth)
            return true;
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        const authHeader = request.get('Authorization');
        if (!authHeader) {
            throw new common_1.UnauthorizedException();
        }
        const accessToken = authHeader.startsWith('Bearer ')
            ? authHeader.split('Bearer ')[1]
            : null;
        if (!accessToken) {
            throw new common_1.UnauthorizedException();
        }
        const payload = await this.tokenService.verifyToken(accessToken, token_type_enum_1.TokenType.ACCESS);
        if (!payload) {
            throw new common_1.UnauthorizedException();
        }
        const isAccessTokenExist = await this.authCacheService.isAccessTokenExist(payload.userId, payload.deviceId, accessToken);
        if (!isAccessTokenExist) {
            throw new common_1.UnauthorizedException();
        }
        const user = await this.userRepository.findOneBy({
            id: payload.userId,
            deleted: (0, typeorm_1.IsNull)(),
        });
        if (!user) {
            throw new common_1.UnauthorizedException();
        }
        response.locals.user = user_mapper_1.UserMapper.toIUserData(user, payload);
        return true;
    }
};
exports.JwtAccessGuard = JwtAccessGuard;
exports.JwtAccessGuard = JwtAccessGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        token_service_1.TokenService,
        auth_cache_service_1.AuthCacheService,
        user_repository_1.UserRepository])
], JwtAccessGuard);
//# sourceMappingURL=jwt_access.guard.js.map