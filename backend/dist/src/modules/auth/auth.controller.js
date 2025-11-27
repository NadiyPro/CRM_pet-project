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
exports.AuthController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const skip_auth_decorator_1 = require("../decorators/skip_auth.decorator");
const login_req_dto_1 = require("./models/dto/req/login.req.dto");
const auth_service_1 = require("./services/auth.service");
const tableName_enum_1 = require("../../infrastructure/mysql/entities/enums/tableName.enum");
const approvedRole_guard_1 = require("../guards/approvedRole.guard");
const role_decorator_1 = require("../decorators/role.decorator");
const roleType_enum_1 = require("../../infrastructure/mysql/entities/enums/roleType.enum");
const current_user_decorator_1 = require("../decorators/current_user.decorator");
const activatePassword_req_dto_1 = require("./models/dto/req/activatePassword.req.dto");
const jwt_refresh_guard_1 = require("./guards/jwt_refresh.guard");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(dto) {
        return await this.authService.login(dto);
    }
    async logOut(userData) {
        await this.authService.logOut(userData);
        return 'Tokens deleted successfully';
    }
    async activate(userData, managerId) {
        return await this.authService.activate(userData, managerId);
    }
    async activatePassword(token, dto) {
        return await this.authService.activatePassword(token, dto);
    }
    async ban(userData, managerId) {
        return await this.authService.ban(userData, managerId);
    }
    async unban(userData, managerId) {
        return await this.authService.unban(userData, managerId);
    }
    async refresh(userData) {
        return await this.authService.refresh(userData);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Для логінації на платформі',
        description: 'Користувач виконує логінацію для входу на платформу (користувач вже зареєстрований).' +
            '*за замовченням для логінації: email === admin@gmail.com, password === admin' +
            '*якщо email === admin@gmail.com, password === admin, ' +
            'то is_active: false автоматично замінюється на is_active === true, ' +
            'але якщо вказано інший email/password, ' +
            'то залогінитися можна лише при умові, що передається is_active === true',
    }),
    (0, skip_auth_decorator_1.SkipAuth)(),
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(200),
    openapi.ApiResponse({ status: 200, type: require("./models/dto/res/auth.res.dto").AuthResDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_req_dto_1.LoginReqDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Для виходу з акаунту та видалення токенів користувача',
        description: 'Для виходу з акаунта та видалення токенів користувача',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(approvedRole_guard_1.ApprovedRoleGuard),
    (0, role_decorator_1.Role)([roleType_enum_1.RoleTypeEnum.ADMIN, roleType_enum_1.RoleTypeEnum.MANAGER]),
    (0, common_1.Post)('logOut'),
    openapi.ApiResponse({ status: 201, type: String }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logOut", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Для видачі токена user (manager) для активації',
        description: 'Admin активує (is_active: true) роль для нового manager ' +
            '/ натискає на кнопку для відновлення паролю manager, ' +
            'після чого на його email надходить лист з токеном, який діє 30 хв ' +
            '*Після переходу по даному посиланню, новий user (manager) виконує активацію нового паролю',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(approvedRole_guard_1.ApprovedRoleGuard),
    (0, role_decorator_1.Role)([roleType_enum_1.RoleTypeEnum.ADMIN]),
    (0, common_1.Get)('activate/:managerId'),
    openapi.ApiResponse({ status: 200, type: require("./models/dto/res/auth.res.dto").AuthResDto }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('managerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "activate", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Для активації паролю manager',
        description: 'Manager переходить за посиланням отриманим на email при активації ролі ' +
            'або відновлені паролю та вводить новий пароль, підтверджує його',
    }),
    (0, skip_auth_decorator_1.SkipAuth)(),
    (0, common_1.Post)('activate/:token'),
    openapi.ApiResponse({ status: 201, type: require("./models/dto/res/auth.res.dto").AuthResDto }),
    __param(0, (0, common_1.Param)('token')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, activatePassword_req_dto_1.ActivatePasswordReqDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "activatePassword", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Для блокування user (manager) (is_active = false) та видалення його токенів',
        description: 'Для блокування user (manager) (is_active = false) та видалення його токенів',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(approvedRole_guard_1.ApprovedRoleGuard),
    (0, role_decorator_1.Role)([roleType_enum_1.RoleTypeEnum.ADMIN]),
    (0, common_1.Put)('ban/:managerId'),
    openapi.ApiResponse({ status: 200, type: require("./models/dto/res/auth_user.res.dto").AuthUserResDto }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('managerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "ban", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Для розблокування user (manager) (is_active = true)',
        description: 'Для розблокування user (manager) (is_active = true)',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(approvedRole_guard_1.ApprovedRoleGuard),
    (0, role_decorator_1.Role)([roleType_enum_1.RoleTypeEnum.ADMIN]),
    (0, common_1.Put)('unban/:managerId'),
    openapi.ApiResponse({ status: 200, type: require("./models/dto/res/auth_user.res.dto").AuthUserResDto }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('managerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "unban", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Для отримання нової пари токенів',
        description: 'Для отримання нової пари токенів.',
    }),
    (0, skip_auth_decorator_1.SkipAuth)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_refresh_guard_1.JwtRefreshGuard),
    (0, common_1.Post)('refresh'),
    openapi.ApiResponse({ status: 201, type: require("./models/dto/res/token_pair.res.dto").TokenPairResDto }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)(tableName_enum_1.TableNameEnum.AUTH),
    (0, common_1.Controller)(tableName_enum_1.TableNameEnum.AUTH),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map