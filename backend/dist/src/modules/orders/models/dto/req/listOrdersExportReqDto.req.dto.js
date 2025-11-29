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
exports.ListOrdersExportReqDto = void 0;
const openapi = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const transform_helper_1 = require("../../../../../common/helpers/transform.helper");
const class_validator_1 = require("class-validator");
const sortField_enum_1 = require("../../../../enums/sortField.enum");
const sortASCOrDESC_enum_1 = require("../../../../enums/sortASCOrDESC.enum");
const course_enum_1 = require("../../../../../infrastructure/mysql/entities/enums/course.enum");
const courseFormat_enum_1 = require("../../../../../infrastructure/mysql/entities/enums/courseFormat.enum");
const courseType_enum_1 = require("../../../../../infrastructure/mysql/entities/enums/courseType.enum");
const status_enum_1 = require("../../../../../infrastructure/mysql/entities/enums/status.enum");
class ListOrdersExportReqDto {
    constructor() {
        this.my = false;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: false, type: () => String, nullable: true, minLength: 0, maxLength: 25 }, surname: { required: false, type: () => String, nullable: true, minLength: 0, maxLength: 25 }, email: { required: false, type: () => String, nullable: true, minLength: 0, maxLength: 100 }, phone: { required: false, type: () => String, nullable: true, minLength: 0, maxLength: 12 }, age: { required: false, type: () => Number, nullable: true, minimum: 12, maximum: 100 }, course: { required: false, nullable: true, enum: require("../../../../../infrastructure/mysql/entities/enums/course.enum").CourseEnum, minLength: 2, maxLength: 10 }, course_format: { required: false, nullable: true, enum: require("../../../../../infrastructure/mysql/entities/enums/courseFormat.enum").CourseFormatEnum, minLength: 5, maxLength: 15 }, course_type: { required: false, nullable: true, enum: require("../../../../../infrastructure/mysql/entities/enums/courseType.enum").CourseTypeEnum, minLength: 3, maxLength: 100 }, sum: { required: false, type: () => Number, nullable: true }, alreadyPaid: { required: false, type: () => Number, nullable: true }, status: { required: false, nullable: true, enum: require("../../../../../infrastructure/mysql/entities/enums/status.enum").StatusEnum, minLength: 3, maxLength: 15 }, group_name: { required: false, type: () => String, nullable: true, minLength: 0, maxLength: 50 }, manager: { required: false, type: () => String, nullable: true, minLength: 0, maxLength: 50 }, created_at_from: { required: false, type: () => String, nullable: true }, created_at_to: { required: false, type: () => String, nullable: true }, sortField: { required: false, enum: require("../../../../enums/sortField.enum").SortFieldEnum }, sortASCOrDESC: { required: false, enum: require("../../../../enums/sortASCOrDESC.enum").SortASCOrDESCEnum }, my: { required: false, type: () => Boolean, default: false } };
    }
}
exports.ListOrdersExportReqDto = ListOrdersExportReqDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(0, 25),
    (0, class_transformer_1.Transform)(({ value }) => transform_helper_1.TransformHelper.trim({ value: value })),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], ListOrdersExportReqDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(0, 25),
    (0, class_transformer_1.Transform)(({ value }) => transform_helper_1.TransformHelper.trim({ value: value })),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], ListOrdersExportReqDto.prototype, "surname", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(0, 100),
    __metadata("design:type", String)
], ListOrdersExportReqDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(0, 12),
    (0, class_transformer_1.Transform)(({ value }) => transform_helper_1.TransformHelper.trim({ value: value })),
    __metadata("design:type", String)
], ListOrdersExportReqDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(12),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], ListOrdersExportReqDto.prototype, "age", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(2, 10),
    (0, class_transformer_1.Transform)(({ value }) => transform_helper_1.TransformHelper.trim({ value: value })),
    (0, class_transformer_1.Type)(() => String),
    (0, class_validator_1.IsEnum)(course_enum_1.CourseEnum),
    __metadata("design:type", String)
], ListOrdersExportReqDto.prototype, "course", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(5, 15),
    (0, class_transformer_1.Transform)(({ value }) => transform_helper_1.TransformHelper.trim({ value: value })),
    (0, class_transformer_1.Type)(() => String),
    (0, class_validator_1.IsEnum)(courseFormat_enum_1.CourseFormatEnum),
    __metadata("design:type", String)
], ListOrdersExportReqDto.prototype, "course_format", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(3, 100),
    (0, class_transformer_1.Transform)(({ value }) => transform_helper_1.TransformHelper.trim({ value: value })),
    (0, class_transformer_1.Type)(() => String),
    (0, class_validator_1.IsEnum)(courseType_enum_1.CourseTypeEnum),
    __metadata("design:type", String)
], ListOrdersExportReqDto.prototype, "course_type", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ListOrdersExportReqDto.prototype, "sum", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ListOrdersExportReqDto.prototype, "alreadyPaid", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(3, 15),
    (0, class_transformer_1.Transform)(({ value }) => transform_helper_1.TransformHelper.trim({ value: value })),
    (0, class_transformer_1.Type)(() => String),
    (0, class_validator_1.IsEnum)(status_enum_1.StatusEnum),
    __metadata("design:type", String)
], ListOrdersExportReqDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(0, 50),
    __metadata("design:type", String)
], ListOrdersExportReqDto.prototype, "group_name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(0, 50),
    __metadata("design:type", String)
], ListOrdersExportReqDto.prototype, "manager", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsDateString)({}, { message: 'created_at_from повинен бути в форматі YYYY-MM-DD' }),
    __metadata("design:type", String)
], ListOrdersExportReqDto.prototype, "created_at_from", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsDateString)({}, { message: 'created_at_to повинен бути в форматі YYYY-MM-DD' }),
    __metadata("design:type", String)
], ListOrdersExportReqDto.prototype, "created_at_to", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => transform_helper_1.TransformHelper.trim({ value: value })),
    (0, class_transformer_1.Type)(() => String),
    (0, class_validator_1.IsEnum)(sortField_enum_1.SortFieldEnum),
    __metadata("design:type", String)
], ListOrdersExportReqDto.prototype, "sortField", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => transform_helper_1.TransformHelper.trim({ value: value })),
    (0, class_validator_1.IsEnum)(sortASCOrDESC_enum_1.SortASCOrDESCEnum),
    __metadata("design:type", String)
], ListOrdersExportReqDto.prototype, "sortASCOrDESC", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => value === 'true' || value === true),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ListOrdersExportReqDto.prototype, "my", void 0);
//# sourceMappingURL=listOrdersExportReqDto.req.dto.js.map