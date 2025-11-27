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
exports.BaseAuthReqDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const baseUser_req_dto_1 = require("../../../../users/models/dto/req/baseUser.req.dto");
const class_validator_1 = require("class-validator");
class BaseAuthReqDto extends (0, swagger_1.PickType)(baseUser_req_dto_1.BaseUserReqDto, [
    'email',
    'password',
    'name',
    'surname',
    'is_active',
    'role',
]) {
    static _OPENAPI_METADATA_FACTORY() {
        return { deviceId: { required: true, type: () => String } };
    }
}
exports.BaseAuthReqDto = BaseAuthReqDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BaseAuthReqDto.prototype, "deviceId", void 0);
//# sourceMappingURL=base_auth.req.dto.js.map