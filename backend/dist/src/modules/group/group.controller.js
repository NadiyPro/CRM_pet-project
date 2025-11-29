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
exports.GroupController = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const group_service_1 = require("./service/group.service");
const approvedRole_guard_1 = require("../guards/approvedRole.guard");
const role_decorator_1 = require("../decorators/role.decorator");
const roleType_enum_1 = require("../../infrastructure/mysql/entities/enums/roleType.enum");
const tableName_enum_1 = require("../../infrastructure/mysql/entities/enums/tableName.enum");
const baseGroup_req_dto_1 = require("./models/dto/req/baseGroup.req.dto");
let GroupController = class GroupController {
    constructor(groupService) {
        this.groupService = groupService;
    }
    async findAll() {
        return await this.groupService.findAll();
    }
    async create(group_name) {
        return await this.groupService.create(group_name);
    }
    async deleteId(groupId) {
        return await this.groupService.deleteId(groupId);
    }
};
exports.GroupController = GroupController;
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Для вивантаження всіх group та пошуку по назві group  ',
        description: 'Admin / manager може вивантажити всі group та здійснити пошук по назві group',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(approvedRole_guard_1.ApprovedRoleGuard),
    (0, role_decorator_1.Role)([roleType_enum_1.RoleTypeEnum.ADMIN, roleType_enum_1.RoleTypeEnum.MANAGER]),
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: [Object] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Для створення нової group',
        description: 'Admin / manager створити нову group',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(approvedRole_guard_1.ApprovedRoleGuard),
    (0, role_decorator_1.Role)([roleType_enum_1.RoleTypeEnum.ADMIN, roleType_enum_1.RoleTypeEnum.MANAGER]),
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [baseGroup_req_dto_1.BaseGroupReqDto]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Для видалення group по id',
        description: 'Admin може видалити group по id',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(approvedRole_guard_1.ApprovedRoleGuard),
    (0, role_decorator_1.Role)([roleType_enum_1.RoleTypeEnum.ADMIN]),
    (0, common_1.Delete)(':groupId'),
    openapi.ApiResponse({ status: 200, type: String }),
    __param(0, (0, common_1.Param)('groupId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "deleteId", null);
exports.GroupController = GroupController = __decorate([
    (0, swagger_1.ApiTags)(tableName_enum_1.TableNameEnum.GROUP),
    (0, common_1.Controller)(tableName_enum_1.TableNameEnum.GROUP),
    __metadata("design:paramtypes", [group_service_1.GroupService])
], GroupController);
//# sourceMappingURL=group.controller.js.map