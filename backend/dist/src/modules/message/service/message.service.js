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
exports.MessageService = void 0;
const common_1 = require("@nestjs/common");
const message_repository_1 = require("../../../infrastructure/repository/services/message.repository");
const orders_repository_1 = require("../../../infrastructure/repository/services/orders.repository");
const status_enum_1 = require("../../../infrastructure/mysql/entities/enums/status.enum");
const user_repository_1 = require("../../../infrastructure/repository/services/user.repository");
let MessageService = class MessageService {
    constructor(messageRepository, ordersRepository, userRepository) {
        this.messageRepository = messageRepository;
        this.ordersRepository = ordersRepository;
        this.userRepository = userRepository;
    }
    async findAll() {
        return await this.messageRepository.findAll();
    }
    async findId(orderId) {
        const messages = await this.messageRepository.findId(orderId);
        return messages.map((message) => {
            return {
                id: message.id,
                messages: message.messages,
                orderId: orderId,
                manager: message.manager?.surname ?? null,
                created_at: message.created_at,
            };
        });
    }
    async createMessage(userData, orderId, dataMessage) {
        const order = await this.ordersRepository.findOneBy({ id: orderId });
        const manager = await this.userRepository.findOneBy({
            id: userData.userId,
        });
        if (!manager)
            throw new Error('Manager not found');
        if (!order)
            throw new Error('Order not found');
        const newMessage = this.messageRepository.create({
            messages: dataMessage.messages,
            order: order,
            manager: manager,
        });
        if (order.status !== status_enum_1.StatusEnum.NEW && order.status !== null) {
            await this.ordersRepository.update(orderId, {
                manager: manager,
            });
        }
        else {
            await this.ordersRepository.update(orderId, {
                manager: manager,
                status: status_enum_1.StatusEnum.IN_WORK,
            });
        }
        const savedMessage = await this.messageRepository.save(newMessage);
        return {
            id: savedMessage.id,
            messages: savedMessage.messages,
            orderId: orderId,
            manager: savedMessage.manager?.surname ?? null,
            created_at: savedMessage.created_at,
        };
    }
    async deleteId(messageId) {
        await this.messageRepository.delete({ id: messageId });
        return 'The message in the table (db) was successfully deleted';
    }
};
exports.MessageService = MessageService;
exports.MessageService = MessageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [message_repository_1.MessageRepository,
        orders_repository_1.OrdersRepository,
        user_repository_1.UserRepository])
], MessageService);
//# sourceMappingURL=message.service.js.map