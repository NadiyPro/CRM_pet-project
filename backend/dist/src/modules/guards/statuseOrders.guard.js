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
exports.OrdersGuard = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("../../infrastructure/repository/services/user.repository");
const orders_repository_1 = require("../../infrastructure/repository/services/orders.repository");
const status_enum_1 = require("../../infrastructure/mysql/entities/enums/status.enum");
let OrdersGuard = class OrdersGuard {
    constructor(userRepository, ordersRepository) {
        this.userRepository = userRepository;
        this.ordersRepository = ordersRepository;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const userData = request.res.locals.user;
        const orderId = request.params.orderId;
        const user = await this.userRepository.findOne({
            where: { id: userData.userId },
        });
        if (!user) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
        const orders = await this.ordersRepository.findOne({
            where: { id: +orderId },
            relations: ['manager'],
        });
        if (!orders) {
            throw new common_1.HttpException('Student not found', common_1.HttpStatus.NOT_FOUND);
        }
        if (orders.status !== status_enum_1.StatusEnum.NEW && orders.status !== null) {
            if (orders.manager.id !== user.id) {
                throw new common_1.HttpException('The application is in the works of another manager', common_1.HttpStatus.CONFLICT);
            }
        }
        return true;
    }
};
exports.OrdersGuard = OrdersGuard;
exports.OrdersGuard = OrdersGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        orders_repository_1.OrdersRepository])
], OrdersGuard);
//# sourceMappingURL=statuseOrders.guard.js.map