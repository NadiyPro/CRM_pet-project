"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUserResDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const baseUser_res_dto_1 = require("../../../../users/models/dto/res/baseUser.res.dto");
class AuthUserResDto extends (0, swagger_1.PickType)(baseUser_res_dto_1.BaseResDto, [
    'id',
    'email',
    'name',
    'surname',
    'is_active',
    'role',
]) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.AuthUserResDto = AuthUserResDto;
//# sourceMappingURL=auth_user.res.dto.js.map