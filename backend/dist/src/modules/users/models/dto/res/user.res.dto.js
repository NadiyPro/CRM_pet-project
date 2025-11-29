"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const baseUser_res_dto_1 = require("./baseUser.res.dto");
class UserResDto extends (0, swagger_1.PickType)(baseUser_res_dto_1.BaseResDto, [
    'id',
    'name',
    'surname',
    'email',
    'role',
    'is_active',
    'deleted',
]) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UserResDto = UserResDto;
//# sourceMappingURL=user.res.dto.js.map