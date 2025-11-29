"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const configuration_1 = require("./configs/configuration");
const redis_module_1 = require("./infrastructure/redis/redis.module");
const auth_module_1 = require("./modules/auth/auth.module");
const repository_module_1 = require("./infrastructure/repository/repository.module");
const orders_module_1 = require("./modules/orders/orders.module");
const users_module_1 = require("./modules/users/users.module");
const group_module_1 = require("./modules/group/group.module");
const message_module_1 = require("./modules/message/message.module");
const mysql_module_1 = require("./infrastructure/mysql/mysql.module");
const email_module_1 = require("./modules/email/email.module");
const schedule_1 = require("@nestjs/schedule");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                load: [configuration_1.default],
                isGlobal: true,
            }),
            mysql_module_1.MySqlModule,
            repository_module_1.RepositoryModule,
            redis_module_1.RedisModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            orders_module_1.OrdersModule,
            group_module_1.GroupModule,
            message_module_1.MessageModule,
            email_module_1.EmailModule,
            schedule_1.ScheduleModule.forRoot(),
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map