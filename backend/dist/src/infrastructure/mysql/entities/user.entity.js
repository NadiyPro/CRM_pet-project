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
exports.UserEntity = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const tableName_enum_1 = require("./enums/tableName.enum");
const roleType_enum_1 = require("./enums/roleType.enum");
const refresh_token_entity_1 = require("./refresh-token.entity");
const date_model_1 = require("./models/date.model");
const orders_entity_1 = require("./orders.entity");
const message_entity_1 = require("./message.entity");
let UserEntity = class UserEntity extends date_model_1.CreateUpdateModel {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, name: { required: true, type: () => String, nullable: true }, surname: { required: true, type: () => String, nullable: true }, email: { required: true, type: () => String, nullable: true }, password: { required: true, type: () => String, nullable: true }, role: { required: true, enum: require("./enums/roleType.enum").RoleTypeEnum }, is_active: { required: true, type: () => Boolean }, deleted: { required: true, type: () => Date, nullable: true }, refreshTokens: { required: false, type: () => [require("./refresh-token.entity").RefreshTokenEntity], nullable: true }, orders: { required: false, type: () => [require("./orders.entity").OrdersEntity], nullable: true }, messages: { required: false, type: () => [require("./message.entity").MessageEntity], nullable: true } };
    }
};
exports.UserEntity = UserEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], UserEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 25, nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 25, nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "surname", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 100,
        unique: true,
        nullable: true,
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', select: false, nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', default: roleType_enum_1.RoleTypeEnum.ADMIN, enum: roleType_enum_1.RoleTypeEnum }),
    __metadata("design:type", String)
], UserEntity.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], UserEntity.prototype, "is_active", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], UserEntity.prototype, "deleted", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => refresh_token_entity_1.RefreshTokenEntity, (entity) => entity.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "refreshTokens", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => orders_entity_1.OrdersEntity, (entity) => entity.manager),
    __metadata("design:type", Array)
], UserEntity.prototype, "orders", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => message_entity_1.MessageEntity, (entity) => entity.manager),
    __metadata("design:type", Array)
], UserEntity.prototype, "messages", void 0);
exports.UserEntity = UserEntity = __decorate([
    (0, typeorm_1.Index)(['name']),
    (0, typeorm_1.Entity)(tableName_enum_1.TableNameEnum.USERS)
], UserEntity);
//# sourceMappingURL=user.entity.js.map