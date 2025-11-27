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
exports.MessageController = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const message_service_1 = require("./service/message.service");
const tableName_enum_1 = require("../../infrastructure/mysql/entities/enums/tableName.enum");
const approvedRole_guard_1 = require("../guards/approvedRole.guard");
const statuseOrders_guard_1 = require("../guards/statuseOrders.guard");
const roleType_enum_1 = require("../../infrastructure/mysql/entities/enums/roleType.enum");
const role_decorator_1 = require("../decorators/role.decorator");
const current_user_decorator_1 = require("../decorators/current_user.decorator");
const baseMessage_req_dto_1 = require("./models/dto/req/baseMessage.req.dto");
let MessageController = class MessageController {
    constructor(messageService) {
        this.messageService = messageService;
    }
    async findAll() {
        return await this.messageService.findAll();
    }
    async findId(orderId) {
        return await this.messageService.findId(orderId);
    }
    async createMessage(userData, orderId, dataMessage) {
        return await this.messageService.createMessage(userData, orderId, dataMessage);
    }
    async deleteId(messageId) {
        return await this.messageService.deleteId(messageId);
    }
};
exports.MessageController = MessageController;
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Для вивантаження всіх messages',
        description: 'Для вивантаження всіх messages',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(approvedRole_guard_1.ApprovedRoleGuard),
    (0, role_decorator_1.Role)([roleType_enum_1.RoleTypeEnum.ADMIN, roleType_enum_1.RoleTypeEnum.MANAGER]),
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: [Object] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Admin | manager може переглядати всі коментарі, ' +
            'які відносяться до коректного order за його orderId',
        description: 'Admin | manager може переглядати всі коментарі, ' +
            'які відносяться до коректного order за його orderId',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(approvedRole_guard_1.ApprovedRoleGuard),
    (0, role_decorator_1.Role)([roleType_enum_1.RoleTypeEnum.ADMIN, roleType_enum_1.RoleTypeEnum.MANAGER]),
    (0, common_1.Get)(':orderId'),
    openapi.ApiResponse({ status: 200, type: [Object] }),
    __param(0, (0, common_1.Param)('orderId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "findId", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Admin | manager може створити коментар.',
        description: 'Admin | manager може створити коментар, ' +
            'якщо до цього status === New, або status === null,' +
            'то буде автоматично змінено status на In_Work та підтягнеться Призвіще менеджера.' +
            '(якщо заявка status ==== New або null або знаходиться в роботі у даного admin | manager)',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(approvedRole_guard_1.ApprovedRoleGuard, statuseOrders_guard_1.OrdersGuard),
    (0, role_decorator_1.Role)([roleType_enum_1.RoleTypeEnum.ADMIN, roleType_enum_1.RoleTypeEnum.MANAGER]),
    (0, common_1.Post)(':orderId'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('orderId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, baseMessage_req_dto_1.BaseMessageReqDto]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "createMessage", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Для видалення запису про message за його messageId',
        description: 'Admin може видалити запис про message по його messageId ',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(approvedRole_guard_1.ApprovedRoleGuard),
    (0, role_decorator_1.Role)([roleType_enum_1.RoleTypeEnum.ADMIN]),
    (0, common_1.Delete)(':messageId'),
    openapi.ApiResponse({ status: 200, type: String }),
    __param(0, (0, common_1.Param)('messageId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "deleteId", null);
exports.MessageController = MessageController = __decorate([
    (0, swagger_1.ApiTags)(tableName_enum_1.TableNameEnum.MESSAGE),
    (0, common_1.Controller)(tableName_enum_1.TableNameEnum.MESSAGE),
    __metadata("design:paramtypes", [message_service_1.MessageService])
], MessageController);
//# sourceMappingURL=message.controller.js.map