"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListResQueryDto = void 0;
const openapi = require("@nestjs/swagger");
const listUsersQuery_req_dto_1 = require("../req/listUsersQuery.req.dto");
class ListResQueryDto extends listUsersQuery_req_dto_1.ListUsersQueryReqDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { users: { required: true, type: () => [require("./user.res.dto").UserResDto] }, total: { required: true, type: () => Number } };
    }
}
exports.ListResQueryDto = ListResQueryDto;
//# sourceMappingURL=listUsersQuery.res.dto.js.map