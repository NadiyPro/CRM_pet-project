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
exports.TokenService = void 0;
const common_1 = require("@nestjs/common");
const config_service_1 = require("@nestjs/config/dist/config.service");
const jwt_1 = require("@nestjs/jwt");
const token_type_enum_1 = require("../../enums/token_type.enum");
let TokenService = class TokenService {
    constructor(jwtService, configService) {
        this.jwtService = jwtService;
        this.configService = configService;
        this.jwtConfig = configService.get('jwt');
    }
    async generateAuthTokens(payload) {
        const accessToken = await this.jwtService.signAsync(payload, {
            secret: this.jwtConfig.accessSecret,
            expiresIn: this.jwtConfig.accessExpiresIn,
        });
        const refreshToken = await this.jwtService.signAsync(payload, {
            secret: this.jwtConfig.refreshSecret,
            expiresIn: this.jwtConfig.refreshExpiresIn,
        });
        return { accessToken, refreshToken };
    }
    async generateActiveTokens(payload) {
        const accessToken = await this.jwtService.signAsync(payload, {
            secret: this.jwtConfig.accessSecret,
            expiresIn: this.jwtConfig.accessActiveExpiresIn,
        });
        const refreshToken = await this.jwtService.signAsync(payload, {
            secret: this.jwtConfig.refreshSecret,
            expiresIn: this.jwtConfig.refreshExpiresIn,
        });
        return { accessToken, refreshToken };
    }
    async verifyToken(token, type) {
        try {
            return await this.jwtService.verifyAsync(token, {
                secret: this.getSecret(type),
            });
        }
        catch {
            throw new common_1.UnauthorizedException();
        }
    }
    getSecret(type) {
        let secret;
        switch (type) {
            case token_type_enum_1.TokenType.ACCESS:
                secret = this.jwtConfig.accessSecret;
                break;
            case token_type_enum_1.TokenType.REFRESH:
                secret = this.jwtConfig.refreshSecret;
                break;
            default:
                throw new common_1.UnauthorizedException();
        }
        return secret;
    }
};
exports.TokenService = TokenService;
exports.TokenService = TokenService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_service_1.ConfigService])
], TokenService);
//# sourceMappingURL=token.service.js.map