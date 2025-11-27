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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const users_service_1 = require("./service/users.service");
const tableName_enum_1 = require("../../infrastructure/mysql/entities/enums/tableName.enum");
const roleType_enum_1 = require("../../infrastructure/mysql/entities/enums/roleType.enum");
const giveRole_dto_1 = require("./models/dto/req/giveRole.dto");
const user_mapper_1 = require("./service/user.mapper");
const approvedRole_guard_1 = require("../guards/approvedRole.guard");
const role_decorator_1 = require("../decorators/role.decorator");
const listUsersQuery_req_dto_1 = require("./models/dto/req/listUsersQuery.req.dto");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async giveRole(giveRoleDto) {
        const result = await this.usersService.giveRole(giveRoleDto);
        return user_mapper_1.UserMapper.toResDto(result);
    }
    async findAll(query) {
        const [entities, total] = await this.usersService.findAll(query);
        return user_mapper_1.UserMapper.toAllResDtoList(entities, total, query);
    }
    async deleteId(managerId) {
        return await this.usersService.deleteId(managerId);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Для видачі ролей',
        description: 'Користувач з ролю admin може видавати ролі',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(approvedRole_guard_1.ApprovedRoleGuard),
    (0, role_decorator_1.Role)([roleType_enum_1.RoleTypeEnum.ADMIN]),
    (0, common_1.Post)('role'),
    openapi.ApiResponse({ status: 201, type: require("./models/dto/res/user.res.dto").UserResDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [giveRole_dto_1.GiveRoleDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "giveRole", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Для отримання інформацію по всім managers',
        description: 'Admin може отримати інформацію по всім managers',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(approvedRole_guard_1.ApprovedRoleGuard),
    (0, role_decorator_1.Role)([roleType_enum_1.RoleTypeEnum.ADMIN, roleType_enum_1.RoleTypeEnum.MANAGER]),
    (0, common_1.Get)('all'),
    openapi.ApiResponse({ status: 200, type: require("./models/dto/res/listUsersQuery.res.dto").ListResQueryDto }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [listUsersQuery_req_dto_1.ListUsersQueryReqDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Для видалення облікового запису користувача (manager)',
        description: 'Admin може видалити обліковий запис іншого користувача (manager) по його id ' +
            '*в БД в стовбчику deleted буде вказано дату видалення користувача.',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(approvedRole_guard_1.ApprovedRoleGuard),
    (0, role_decorator_1.Role)([roleType_enum_1.RoleTypeEnum.ADMIN]),
    (0, common_1.Delete)(':managerId'),
    openapi.ApiResponse({ status: 200, type: String }),
    __param(0, (0, common_1.Param)('managerId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteId", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)(tableName_enum_1.TableNameEnum.USERS),
    (0, common_1.Controller)(tableName_enum_1.TableNameEnum.USERS),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map