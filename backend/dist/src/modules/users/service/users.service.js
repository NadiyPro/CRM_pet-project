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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("../../../infrastructure/repository/services/user.repository");
const refresh_token_repository_1 = require("../../../infrastructure/repository/services/refresh-token.repository");
const roleType_enum_1 = require("../../../infrastructure/mysql/entities/enums/roleType.enum");
let UsersService = class UsersService {
    constructor(userRepository, refreshTokenRepository) {
        this.userRepository = userRepository;
        this.refreshTokenRepository = refreshTokenRepository;
    }
    async giveRole(giveRoleDto) {
        const user = this.userRepository.create({
            ...giveRoleDto,
            role: roleType_enum_1.RoleTypeEnum.MANAGER,
            is_active: false,
        });
        return await this.userRepository.save(user);
    }
    async findAll(query) {
        return await this.userRepository.findAll(query);
    }
    async deleteId(managerId) {
        await this.userRepository.update({ id: managerId }, { deleted: new Date() });
        await this.refreshTokenRepository.delete({ user_id: managerId });
        return 'The user in the table (db) has been successfully marked as deleted';
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        refresh_token_repository_1.RefreshTokenRepository])
], UsersService);
//# sourceMappingURL=users.service.js.map