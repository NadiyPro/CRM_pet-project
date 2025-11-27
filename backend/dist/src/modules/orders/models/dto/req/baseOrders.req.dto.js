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
exports.BaseOrdersReqDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const transform_helper_1 = require("../../../../../common/helpers/transform.helper");
const course_enum_1 = require("../../../../../infrastructure/mysql/entities/enums/course.enum");
const courseFormat_enum_1 = require("../../../../../infrastructure/mysql/entities/enums/courseFormat.enum");
const courseType_enum_1 = require("../../../../../infrastructure/mysql/entities/enums/courseType.enum");
const status_enum_1 = require("../../../../../infrastructure/mysql/entities/enums/status.enum");
class BaseOrdersReqDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: false, type: () => String, nullable: true, minLength: 0, maxLength: 25 }, surname: { required: false, type: () => String, nullable: true, minLength: 0, maxLength: 25 }, email: { required: false, type: () => String, nullable: true, minLength: 0, maxLength: 100, pattern: "/^[^\\s@]+@([^\\s@.,]+\\.)+[^\\s@.,]{2,}$/" }, phone: { required: false, type: () => String, nullable: true, minLength: 0, maxLength: 12, pattern: "/^380\\d{9}$/" }, age: { required: false, type: () => Number, nullable: true, minimum: 12, maximum: 100 }, course: { required: false, nullable: true, enum: require("../../../../../infrastructure/mysql/entities/enums/course.enum").CourseEnum, minLength: 2, maxLength: 10 }, course_format: { required: false, nullable: true, enum: require("../../../../../infrastructure/mysql/entities/enums/courseFormat.enum").CourseFormatEnum, minLength: 5, maxLength: 15 }, course_type: { required: false, nullable: true, enum: require("../../../../../infrastructure/mysql/entities/enums/courseType.enum").CourseTypeEnum, minLength: 3, maxLength: 100 }, sum: { required: false, type: () => Number, nullable: true }, alreadyPaid: { required: false, type: () => Number, nullable: true }, status: { required: false, nullable: true, enum: require("../../../../../infrastructure/mysql/entities/enums/status.enum").StatusEnum, minLength: 3, maxLength: 15 } };
    }
}
exports.BaseOrdersReqDto = BaseOrdersReqDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(0, 25),
    (0, class_transformer_1.Transform)(({ value }) => transform_helper_1.TransformHelper.trim({ value: value })),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], BaseOrdersReqDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(0, 25),
    (0, class_transformer_1.Transform)(({ value }) => transform_helper_1.TransformHelper.trim({ value: value })),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], BaseOrdersReqDto.prototype, "surname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'admin@gmail.com' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(0, 100),
    (0, class_validator_1.Matches)(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/),
    __metadata("design:type", String)
], BaseOrdersReqDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '380123456789' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(0, 12),
    (0, class_transformer_1.Transform)(({ value }) => transform_helper_1.TransformHelper.trim({ value: value })),
    (0, class_validator_1.Matches)(/^380\d{9}$/),
    __metadata("design:type", String)
], BaseOrdersReqDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 30 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(12),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], BaseOrdersReqDto.prototype, "age", void 0);
__decorate([
    (0, class_validator_1.Length)(2, 10),
    (0, class_transformer_1.Transform)(({ value }) => transform_helper_1.TransformHelper.trim({ value: value })),
    (0, class_transformer_1.Type)(() => String),
    (0, class_validator_1.IsEnum)(course_enum_1.CourseEnum, {
        message: 'Курс повинен бути один з: FS, QACX, JCX, JSCX, FE, PCX',
    }),
    __metadata("design:type", String)
], BaseOrdersReqDto.prototype, "course", void 0);
__decorate([
    (0, class_validator_1.Length)(5, 15),
    (0, class_transformer_1.Transform)(({ value }) => transform_helper_1.TransformHelper.trim({ value: value })),
    (0, class_transformer_1.Type)(() => String),
    (0, class_validator_1.IsEnum)(courseFormat_enum_1.CourseFormatEnum, {
        message: 'course_format повинен бути один з: static, online',
    }),
    __metadata("design:type", String)
], BaseOrdersReqDto.prototype, "course_format", void 0);
__decorate([
    (0, class_validator_1.Length)(3, 100),
    (0, class_transformer_1.Transform)(({ value }) => transform_helper_1.TransformHelper.trim({ value: value })),
    (0, class_transformer_1.Type)(() => String),
    (0, class_validator_1.IsEnum)(courseType_enum_1.CourseTypeEnum, {
        message: 'course_type повинен бути один з: pro, minimal, premium, incubator, vip',
    }),
    __metadata("design:type", String)
], BaseOrdersReqDto.prototype, "course_type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 100000 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], BaseOrdersReqDto.prototype, "sum", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 100000 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], BaseOrdersReqDto.prototype, "alreadyPaid", void 0);
__decorate([
    (0, class_validator_1.Length)(3, 15),
    (0, class_transformer_1.Transform)(({ value }) => transform_helper_1.TransformHelper.trim({ value: value })),
    (0, class_transformer_1.Type)(() => String),
    (0, class_validator_1.IsEnum)(status_enum_1.StatusEnum, {
        message: 'status повинен бути один з: In_work, New, Aggre, Disaggre, Dubbing ',
    }),
    __metadata("design:type", String)
], BaseOrdersReqDto.prototype, "status", void 0);
//# sourceMappingURL=baseOrders.req.dto.js.map