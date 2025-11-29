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
exports.MessageEntity = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const tableName_enum_1 = require("./enums/tableName.enum");
const orders_entity_1 = require("./orders.entity");
const user_entity_1 = require("./user.entity");
let MessageEntity = class MessageEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, messages: { required: true, type: () => String }, created_at: { required: true, type: () => Date, nullable: true }, updated_at: { required: false, type: () => Date, nullable: true }, order: { required: true, type: () => require("./orders.entity").OrdersEntity }, manager: { required: false, type: () => require("./user.entity").UserEntity, nullable: true } };
    }
};
exports.MessageEntity = MessageEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], MessageEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], MessageEntity.prototype, "messages", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], MessageEntity.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], MessageEntity.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => orders_entity_1.OrdersEntity, (student) => student.messages),
    (0, typeorm_1.JoinColumn)({ name: 'orderId' }),
    __metadata("design:type", orders_entity_1.OrdersEntity)
], MessageEntity.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (entity) => entity.messages, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'manager_id' }),
    __metadata("design:type", user_entity_1.UserEntity)
], MessageEntity.prototype, "manager", void 0);
exports.MessageEntity = MessageEntity = __decorate([
    (0, typeorm_1.Entity)(tableName_enum_1.TableNameEnum.MESSAGE)
], MessageEntity);
//# sourceMappingURL=message.entity.js.map