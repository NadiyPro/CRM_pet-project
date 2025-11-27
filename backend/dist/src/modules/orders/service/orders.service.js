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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const orders_repository_1 = require("../../../infrastructure/repository/services/orders.repository");
const user_repository_1 = require("../../../infrastructure/repository/services/user.repository");
const status_enum_1 = require("../../../infrastructure/mysql/entities/enums/status.enum");
const orders_mapper_1 = require("./orders.mapper");
const group_repository_1 = require("../../../infrastructure/repository/services/group.repository");
let OrdersService = class OrdersService {
    constructor(ordersRepository, userRepository, groupRepository) {
        this.ordersRepository = ordersRepository;
        this.userRepository = userRepository;
        this.groupRepository = groupRepository;
    }
    async findAll(userData, query) {
        return await this.ordersRepository.findAll(userData, query);
    }
    async findAllExport(userData, query) {
        return await this.ordersRepository.findAllExport(userData, query);
    }
    async ordersStatisticAll(userData) {
        const satistic = await this.ordersRepository.ordersStatisticAll();
        return {
            ...satistic,
            roleAuth: userData.role,
            userIdAuth: userData.userId,
        };
    }
    async ordersStatisticManager() {
        const statisticAll = await this.ordersRepository.ordersStatisticManager();
        return statisticAll.map((item) => ({
            manager: item.manager || null,
            total: Number(item.total) || null,
            In_work: Number(item.In_work) || null,
            New: Number(item.New) || null,
            Aggre: Number(item.Aggre) || null,
            Disaggre: Number(item.Disaggre) || null,
            Dubbing: Number(item.Dubbing) || null,
        }));
    }
    async createOrder(userData, createOrdersReqDto) {
        const user = await this.userRepository.findOne({
            where: { id: userData.userId },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const order = this.ordersRepository.create({
            ...createOrdersReqDto,
            manager: user,
        });
        await this.ordersRepository.save(order);
        return await this.ordersRepository.findOne({
            where: { id: order.id },
            relations: ['manager'],
        });
    }
    async addGroup(userData, orderNumber, group_idNumber) {
        const orderStatus = await this.ordersRepository.findOneBy({
            id: orderNumber,
        });
        const manager = await this.userRepository.findOneBy({
            id: userData.userId,
        });
        if (!manager)
            throw new Error('Manager not found');
        if (!orderStatus)
            throw new Error('Order not found');
        if (orderStatus.status !== status_enum_1.StatusEnum.NEW && orderStatus.status !== null) {
            await this.ordersRepository.update(orderNumber, {
                manager: manager,
            });
        }
        else {
            await this.ordersRepository.update(orderNumber, {
                manager: manager,
                status: status_enum_1.StatusEnum.IN_WORK,
            });
        }
        const order = await this.ordersRepository.findOne({
            where: { id: orderNumber },
        });
        if (!order) {
            throw new common_1.NotFoundException(`Order with id ${orderNumber} not found`);
        }
        const group = await this.groupRepository.findOne({
            where: { id: group_idNumber },
        });
        if (!group) {
            throw new common_1.NotFoundException(`Group with id ${group_idNumber} not found`);
        }
        if (order.group_id !== group.id) {
            order.group_id = group.id;
            order.group_name = group.group_name;
        }
        await this.ordersRepository.save(order);
        return await this.ordersRepository.findOne({
            where: { id: order.id },
            relations: ['manager'],
        });
    }
    async updateId(userData, orderId, updateOrdersReqDto) {
        const user = await this.userRepository.findOne({
            where: { id: userData.userId },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const order = await this.ordersRepository.findOne({
            where: { id: orderId },
            relations: ['manager'],
        });
        if (!order) {
            throw new common_1.NotFoundException('Order not found');
        }
        if (order.status !== status_enum_1.StatusEnum.NEW && order.status !== null) {
            await this.ordersRepository.update(orderId, {
                ...updateOrdersReqDto,
                manager: user,
            });
        }
        else {
            await this.ordersRepository.update(orderId, {
                ...updateOrdersReqDto,
                manager: user,
                status: status_enum_1.StatusEnum.IN_WORK,
            });
        }
        const updatedOrder = await this.ordersRepository.findOne({
            where: { id: orderId },
            relations: ['manager', 'messages'],
        });
        if (!updatedOrder) {
            throw new common_1.HttpException('Failed to update order', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return orders_mapper_1.OrdersMapper.toUpdatedOrderResDto(updatedOrder, userData);
    }
    async findOneOrder(userData, orderId) {
        const order = await this.ordersRepository.findOne({
            where: { id: orderId },
            relations: ['manager', 'messages'],
        });
        if (!order) {
            throw new common_1.NotFoundException('Order not found');
        }
        return orders_mapper_1.OrdersMapper.toResDto(order, userData);
    }
    async deleteId(orderId) {
        await this.ordersRepository.delete({ id: orderId });
        return 'The order in the table (db) was successfully deleted';
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [orders_repository_1.OrdersRepository,
        user_repository_1.UserRepository,
        group_repository_1.GroupRepository])
], OrdersService);
//# sourceMappingURL=orders.service.js.map