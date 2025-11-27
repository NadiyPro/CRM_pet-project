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
var CronOldRefreshToken_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CronOldRefreshToken = void 0;
const common_1 = require("@nestjs/common");
const refresh_token_entity_1 = require("../../../infrastructure/mysql/entities/refresh-token.entity");
const schedule_1 = require("@nestjs/schedule");
const typeorm_1 = require("typeorm");
let CronOldRefreshToken = CronOldRefreshToken_1 = class CronOldRefreshToken {
    constructor(dataSource) {
        this.dataSource = dataSource;
        this.logger = new common_1.Logger(CronOldRefreshToken_1.name);
    }
    async handleCron() {
        await this.dataSource
            .createQueryBuilder()
            .delete()
            .from(refresh_token_entity_1.RefreshTokenEntity)
            .where('exp <= NOW()')
            .execute();
        this.logger.log(`Deleted exp refresh tokens with cron`);
    }
};
exports.CronOldRefreshToken = CronOldRefreshToken;
__decorate([
    (0, schedule_1.Cron)('0 0 * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CronOldRefreshToken.prototype, "handleCron", null);
exports.CronOldRefreshToken = CronOldRefreshToken = CronOldRefreshToken_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], CronOldRefreshToken);
//# sourceMappingURL=remiveOldRefreshToken.js.map