"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseResDto = void 0;
const openapi = require("@nestjs/swagger");
class BaseResDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, name: { required: true, type: () => String }, surname: { required: true, type: () => String }, email: { required: true, type: () => String }, is_active: { required: true, type: () => Boolean }, role: { required: true, enum: require("../../../../../infrastructure/mysql/entities/enums/roleType.enum").RoleTypeEnum }, deleted: { required: true, type: () => Date, nullable: true } };
    }
}
exports.BaseResDto = BaseResDto;
//# sourceMappingURL=baseUser.res.dto.js.map