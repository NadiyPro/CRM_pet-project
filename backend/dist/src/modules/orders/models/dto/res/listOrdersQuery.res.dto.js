"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListOrdersResQueryDto = void 0;
const openapi = require("@nestjs/swagger");
const listOrdersQuery_req_dto_1 = require("../req/listOrdersQuery.req.dto");
class ListOrdersResQueryDto extends listOrdersQuery_req_dto_1.ListOrdersQueryReqDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { orders: { required: true, type: () => [Object] }, total: { required: true, type: () => Number } };
    }
}
exports.ListOrdersResQueryDto = ListOrdersResQueryDto;
//# sourceMappingURL=listOrdersQuery.res.dto.js.map