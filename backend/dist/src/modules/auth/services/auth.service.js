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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcryptjs");
const refresh_token_repository_1 = require("../../../infrastructure/repository/services/refresh-token.repository");
const user_repository_1 = require("../../../infrastructure/repository/services/user.repository");
const user_mapper_1 = require("../../users/service/user.mapper");
const auth_cache_service_1 = require("./auth-cache.service");
const token_service_1 = require("./token.service");
const roleType_enum_1 = require("../../../infrastructure/mysql/entities/enums/roleType.enum");
const email_enum_1 = require("../../enums/email.enum");
const email_service_1 = require("../../email/service/email.service");
const token_type_enum_1 = require("../../enums/token_type.enum");
const config_service_1 = require("@nestjs/config/dist/config.service");
let AuthService = class AuthService {
    constructor(authCacheService, tokenService, userRepository, refreshTokenRepository, emailService, configService) {
        this.authCacheService = authCacheService;
        this.tokenService = tokenService;
        this.userRepository = userRepository;
        this.refreshTokenRepository = refreshTokenRepository;
        this.emailService = emailService;
        this.configService = configService;
        this.jwtConfig = this.configService.get('jwt');
    }
    async login(dto) {
        let user = await this.userRepository.findOne({
            where: { email: dto.email },
            select: ['id', 'password', 'is_active'],
        });
        if (dto.email === 'admin@gmail.com' && dto.password === 'admin') {
            if (!user) {
                const password = await bcrypt.hash(dto.password, 10);
                await this.userRepository.save(this.userRepository.create({
                    ...dto,
                    password,
                    name: 'admin_name',
                    surname: 'admin_surname',
                    role: roleType_enum_1.RoleTypeEnum.ADMIN,
                    is_active: true,
                }));
            }
        }
        user = await this.userRepository.findOne({
            where: { email: dto.email },
            select: ['id', 'password', 'is_active'],
        });
        if (!user || !user.is_active) {
            throw new common_1.UnauthorizedException();
        }
        const isPasswordValid = await bcrypt.compare(dto.password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException();
        }
        const tokens = await this.tokenService.generateAuthTokens({
            userId: user.id,
            deviceId: dto.deviceId,
        });
        await Promise.all([
            this.authCacheService.saveToken(tokens.accessToken, user.id, dto.deviceId),
            this.refreshTokenRepository.save(this.refreshTokenRepository.create({
                user_id: user.id,
                deviceId: dto.deviceId,
                refreshToken: tokens.refreshToken,
                exp: new Date(Date.now() + this.jwtConfig.refreshExpiresIn * 1000),
            })),
        ]);
        const userEntity = await this.userRepository.findOneBy({ id: user.id });
        return { user: user_mapper_1.UserMapper.toResDto(userEntity), tokens };
    }
    async logOut(userData) {
        await Promise.all([
            this.authCacheService.deleteTokenUserId(userData.userId),
            this.refreshTokenRepository.delete({ user_id: userData.userId }),
        ]);
    }
    async activate(userData, managerId) {
        const user = await this.userRepository.findOneBy({ id: managerId });
        if (user.id === userData.userId) {
            throw new common_1.ForbiddenException();
        }
        const tokens = await this.tokenService.generateActiveTokens({
            userId: user.id,
        });
        await Promise.all([
            this.authCacheService.saveActiveToken(tokens.accessToken, user.id),
            this.refreshTokenRepository.save(this.refreshTokenRepository.create({
                user_id: user.id,
                refreshToken: tokens.refreshToken,
                exp: new Date(Date.now() + this.jwtConfig.refreshExpiresIn * 1000),
            })),
        ]);
        await this.emailService.sendMail(email_enum_1.EmailTypeEnum.ACTIVE, user.email, {
            surname: user.surname,
            name: user.name,
            registration_password: `http://localhost:80/auth/activate/${tokens.accessToken}`,
        });
        return { user: user_mapper_1.UserMapper.toResDto(user), tokens };
    }
    async activatePassword(token, dto) {
        const payload = await this.tokenService.verifyToken(token, token_type_enum_1.TokenType.ACCESS);
        let user = await this.userRepository.findOneBy({ id: payload.userId });
        if (dto.password !== dto.confirm_password) {
            throw new common_1.UnauthorizedException('The entered password does not match the confirmation password.');
        }
        user.password = await bcrypt.hash(dto.password, 10);
        user.is_active = true;
        user = await this.userRepository.save(user);
        const tokens = await this.tokenService.generateAuthTokens({
            userId: user.id,
            deviceId: dto.deviceId,
        });
        await Promise.all([
            this.authCacheService.saveToken(tokens.accessToken, user.id, dto.deviceId),
            this.refreshTokenRepository.save(this.refreshTokenRepository.create({
                user_id: user.id,
                deviceId: dto.deviceId,
                refreshToken: tokens.refreshToken,
                exp: new Date(Date.now() + this.jwtConfig.refreshExpiresIn * 1000),
            })),
        ]);
        return { user: user_mapper_1.UserMapper.toResDto(user), tokens };
    }
    async ban(userData, managerId) {
        let user = await this.userRepository.findOneBy({ id: managerId });
        if (user.id === userData.userId) {
            throw new common_1.ForbiddenException();
        }
        user.is_active = false;
        user = await this.userRepository.save(user);
        await this.refreshTokenRepository.delete({
            user_id: user.id,
        });
        return user;
    }
    async unban(userData, managerId) {
        let user = await this.userRepository.findOneBy({ id: managerId });
        if (user.id === userData.userId) {
            throw new common_1.ForbiddenException();
        }
        user.is_active = true;
        user = await this.userRepository.save(user);
        return user;
    }
    async refresh(userData) {
        await Promise.all([
            this.authCacheService.deleteToken(userData.userId, userData.deviceId),
            this.refreshTokenRepository.delete({
                user_id: userData.userId,
                deviceId: userData.deviceId,
            }),
        ]);
        const tokens = await this.tokenService.generateAuthTokens({
            userId: userData.userId,
            deviceId: userData.deviceId,
        });
        await Promise.all([
            this.authCacheService.saveToken(tokens.accessToken, userData.userId, userData.deviceId),
            this.refreshTokenRepository.save(this.refreshTokenRepository.create({
                user_id: userData.userId,
                deviceId: userData.deviceId,
                refreshToken: tokens.refreshToken,
                exp: new Date(Date.now() + this.jwtConfig.refreshExpiresIn * 1000),
            })),
        ]);
        return tokens;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_cache_service_1.AuthCacheService,
        token_service_1.TokenService,
        user_repository_1.UserRepository,
        refresh_token_repository_1.RefreshTokenRepository,
        email_service_1.EmailService,
        config_service_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map