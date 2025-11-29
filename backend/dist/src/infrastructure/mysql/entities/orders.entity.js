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
exports.OrdersEntity = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const tableName_enum_1 = require("./enums/tableName.enum");
const course_enum_1 = require("./enums/course.enum");
const courseFormat_enum_1 = require("./enums/courseFormat.enum");
const courseType_enum_1 = require("./enums/courseType.enum");
const status_enum_1 = require("./enums/status.enum");
const user_entity_1 = require("./user.entity");
const message_entity_1 = require("./message.entity");
let OrdersEntity = class OrdersEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, name: { required: true, type: () => String, nullable: true }, surname: { required: true, type: () => String, nullable: true }, email: { required: true, type: () => String, nullable: true }, phone: { required: true, type: () => String, nullable: true }, age: { required: true, type: () => Number, nullable: true }, course: { required: true, nullable: true, enum: require("./enums/course.enum").CourseEnum }, course_format: { required: true, nullable: true, enum: require("./enums/courseFormat.enum").CourseFormatEnum }, course_type: { required: true, nullable: true, enum: require("./enums/courseType.enum").CourseTypeEnum }, sum: { required: true, type: () => Number, nullable: true }, alreadyPaid: { required: true, type: () => Number, nullable: true }, created_at: { required: true, type: () => Date, nullable: true }, updated_at: { required: false, type: () => Date, nullable: true }, utm: { required: true, type: () => String, nullable: true }, msg: { required: true, type: () => String, nullable: true }, status: { required: true, nullable: true, enum: require("./enums/status.enum").StatusEnum }, group_id: { required: true, type: () => Number, nullable: true }, group_name: { required: true, type: () => String, nullable: true }, manager: { required: true, type: () => require("./user.entity").UserEntity, nullable: true }, messages: { required: false, type: () => [require("./message.entity").MessageEntity], nullable: true } };
    }
};
exports.OrdersEntity = OrdersEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], OrdersEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 25, nullable: true }),
    __metadata("design:type", String)
], OrdersEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 25, nullable: true }),
    __metadata("design:type", String)
], OrdersEntity.prototype, "surname", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 100,
        nullable: true,
        default: 'student@gmail.com',
    }),
    __metadata("design:type", String)
], OrdersEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 12, nullable: true }),
    __metadata("design:type", String)
], OrdersEntity.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', nullable: true }),
    __metadata("design:type", Number)
], OrdersEntity.prototype, "age", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: course_enum_1.CourseEnum, nullable: true }),
    __metadata("design:type", String)
], OrdersEntity.prototype, "course", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: courseFormat_enum_1.CourseFormatEnum,
        nullable: true,
    }),
    __metadata("design:type", String)
], OrdersEntity.prototype, "course_format", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: courseType_enum_1.CourseTypeEnum, nullable: true }),
    __metadata("design:type", String)
], OrdersEntity.prototype, "course_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', nullable: true }),
    __metadata("design:type", Number)
], OrdersEntity.prototype, "sum", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', nullable: true }),
    __metadata("design:type", Number)
], OrdersEntity.prototype, "alreadyPaid", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], OrdersEntity.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], OrdersEntity.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], OrdersEntity.prototype, "utm", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], OrdersEntity.prototype, "msg", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: status_enum_1.StatusEnum, nullable: true }),
    __metadata("design:type", String)
], OrdersEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', nullable: true }),
    __metadata("design:type", Number)
], OrdersEntity.prototype, "group_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], OrdersEntity.prototype, "group_name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (entity) => entity.orders, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'manager_id' }),
    __metadata("design:type", user_entity_1.UserEntity)
], OrdersEntity.prototype, "manager", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => message_entity_1.MessageEntity, (message) => message.order, {
        nullable: true,
    }),
    __metadata("design:type", Array)
], OrdersEntity.prototype, "messages", void 0);
exports.OrdersEntity = OrdersEntity = __decorate([
    (0, typeorm_1.Index)(['name']),
    (0, typeorm_1.Entity)(tableName_enum_1.TableNameEnum.ORDERS)
], OrdersEntity);
//# sourceMappingURL=orders.entity.js.map