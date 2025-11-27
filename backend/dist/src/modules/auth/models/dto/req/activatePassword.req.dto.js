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
exports.ActivatePasswordReqDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class ActivatePasswordReqDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { password: { required: true, type: () => String, minLength: 5, maxLength: 300, pattern: "/^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%_*#?&])[A-Za-z\\d@$!%*#?&]{8,}$/" }, confirm_password: { required: true, type: () => String, minLength: 5, maxLength: 300, pattern: "/^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%_*#?&])[A-Za-z\\d@$!%*#?&]{8,}$/" }, deviceId: { required: true, type: () => String } };
    }
}
exports.ActivatePasswordReqDto = ActivatePasswordReqDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Password100425#' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(5, 300),
    (0, class_validator_1.ValidateIf)((dto) => dto.password !== 'admin'),
    (0, class_validator_1.Matches)(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%_*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
        message: 'Bad Request',
    }),
    __metadata("design:type", String)
], ActivatePasswordReqDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Password100425#' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(5, 300),
    (0, class_validator_1.ValidateIf)((dto) => dto.password !== 'admin'),
    (0, class_validator_1.Matches)(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%_*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
        message: 'Bad Request',
    }),
    __metadata("design:type", String)
], ActivatePasswordReqDto.prototype, "confirm_password", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ActivatePasswordReqDto.prototype, "deviceId", void 0);
//# sourceMappingURL=activatePassword.req.dto.js.map