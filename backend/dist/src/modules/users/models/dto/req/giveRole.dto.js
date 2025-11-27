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
exports.GiveRoleDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const transform_helper_1 = require("../../../../../common/helpers/transform.helper");
const swagger_1 = require("@nestjs/swagger");
class GiveRoleDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String, minLength: 3, maxLength: 25 }, surname: { required: true, type: () => String, minLength: 3, maxLength: 25 }, email: { required: true, type: () => String, minLength: 6, maxLength: 100, pattern: "/^[^\\s@]+@([^\\s@.,]+\\.)+[^\\s@.,]{2,}$/" } };
    }
}
exports.GiveRoleDto = GiveRoleDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(3, 25),
    (0, class_transformer_1.Transform)(({ value }) => transform_helper_1.TransformHelper.trim({ value: value })),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], GiveRoleDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(3, 25),
    (0, class_transformer_1.Transform)(({ value }) => transform_helper_1.TransformHelper.trim({ value: value })),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], GiveRoleDto.prototype, "surname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'admin@gmail.com' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(6, 100),
    (0, class_validator_1.Matches)(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/),
    __metadata("design:type", String)
], GiveRoleDto.prototype, "email", void 0);
//# sourceMappingURL=giveRole.dto.js.map