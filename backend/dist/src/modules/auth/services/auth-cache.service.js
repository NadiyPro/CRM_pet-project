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
exports.AuthCacheService = void 0;
const common_1 = require("@nestjs/common");
const config_service_1 = require("@nestjs/config/dist/config.service");
const redis_service_1 = require("../../../infrastructure/redis/services/redis.service");
let AuthCacheService = class AuthCacheService {
    constructor(redisService, configService) {
        this.redisService = redisService;
        this.configService = configService;
        this.jwtConfig = this.configService.get('jwt');
    }
    async saveToken(token, userId, deviceId) {
        const key = `ACCESS_TOKEN:${userId}:${deviceId}`;
        await this.redisService.deleteByKey(key);
        await this.redisService.addOneToSet(key, token);
        await this.redisService.expire(key, this.jwtConfig.accessExpiresIn);
    }
    async saveActiveToken(token, userId) {
        const key = `ACCESS_TOKEN:${userId}:*`;
        await this.redisService.deleteByKey(key);
        await this.redisService.addOneToSet(key, token);
        await this.redisService.expire(key, this.jwtConfig.accessExpiresIn);
    }
    async isAccessTokenExist(userId, deviceId, token) {
        const key = this.getKey(userId, deviceId);
        const set = await this.redisService.sMembers(key);
        return set.includes(token);
    }
    async deleteToken(userId, deviceId) {
        const key = this.getKey(userId, deviceId);
        await this.redisService.deleteByKey(key);
    }
    getKey(userId, deviceId) {
        return `ACCESS_TOKEN:${userId}:${deviceId}`;
    }
    async deleteTokenUserId(userId) {
        const pattern = `ACCESS_TOKEN:${userId}:*`;
        const keys = await this.redisService.getKeys(pattern);
        if (keys.length > 0) {
            await this.redisService.deleteMultipleKeys(keys);
        }
    }
};
exports.AuthCacheService = AuthCacheService;
exports.AuthCacheService = AuthCacheService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [redis_service_1.RedisService,
        config_service_1.ConfigService])
], AuthCacheService);
//# sourceMappingURL=auth-cache.service.js.map