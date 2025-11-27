"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const jwt_refresh_guard_1 = require("./guards/jwt_refresh.guard");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./services/auth.service");
const auth_cache_service_1 = require("./services/auth-cache.service");
const token_service_1 = require("./services/token.service");
const redis_module_1 = require("../../infrastructure/redis/redis.module");
const jwt_1 = require("@nestjs/jwt");
const jwt_access_guard_1 = require("./guards/jwt_access.guard");
const users_module_1 = require("../users/users.module");
const orders_module_1 = require("../orders/orders.module");
const email_module_1 = require("../email/email.module");
const remiveOldRefreshToken_1 = require("./cron/remiveOldRefreshToken");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule,
            redis_module_1.RedisModule,
            (0, common_1.forwardRef)(() => users_module_1.UsersModule),
            (0, common_1.forwardRef)(() => orders_module_1.OrdersModule),
            email_module_1.EmailModule,
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: jwt_access_guard_1.JwtAccessGuard,
            },
            jwt_refresh_guard_1.JwtRefreshGuard,
            auth_service_1.AuthService,
            auth_cache_service_1.AuthCacheService,
            token_service_1.TokenService,
            remiveOldRefreshToken_1.CronOldRefreshToken,
        ],
        exports: [token_service_1.TokenService],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map