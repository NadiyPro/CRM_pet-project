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
exports.BaseUserReqDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const roleType_enum_1 = require("../../../../../infrastructure/mysql/entities/enums/roleType.enum");
const transform_helper_1 = require("../../../../../common/helpers/transform.helper");
class BaseUserReqDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String, minLength: 3, maxLength: 50 }, surname: { required: true, type: () => String, minLength: 3, maxLength: 50 }, email: { required: true, type: () => String, minLength: 0, maxLength: 300, pattern: "/^[^\\s@]+@([^\\s@.,]+\\.)+[^\\s@.,]{2,}$/" }, password: { required: true, type: () => String, minLength: 5, maxLength: 300, pattern: "/^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%_*#?&])[A-Za-z\\d@$!%*#?&]{8,}$/" }, role: { required: true, enum: require("../../../../../infrastructure/mysql/entities/enums/roleType.enum").RoleTypeEnum, minLength: 3, maxLength: 50 }, is_active: { required: true, type: () => Boolean } };
    }
}
exports.BaseUserReqDto = BaseUserReqDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(3, 50),
    (0, class_transformer_1.Transform)(({ value }) => transform_helper_1.TransformHelper.trim({ value: value })),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], BaseUserReqDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(3, 50),
    (0, class_transformer_1.Transform)(({ value }) => transform_helper_1.TransformHelper.trim({ value: value })),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], BaseUserReqDto.prototype, "surname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'admin@gmail.com' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(0, 300),
    (0, class_validator_1.Matches)(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/),
    __metadata("design:type", String)
], BaseUserReqDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'admin' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(5, 300),
    (0, class_validator_1.ValidateIf)((dto) => dto.password !== 'admin'),
    (0, class_validator_1.Matches)(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%_*#?&])[A-Za-z\d@$!%*#?&]{8,}$/),
    __metadata("design:type", String)
], BaseUserReqDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'admin' }),
    (0, class_validator_1.IsEnum)(roleType_enum_1.RoleTypeEnum, { message: 'role must be one of: admin, manager' }),
    (0, class_validator_1.Length)(3, 50),
    __metadata("design:type", String)
], BaseUserReqDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], BaseUserReqDto.prototype, "is_active", void 0);
//# sourceMappingURL=baseUser.req.dto.js.map