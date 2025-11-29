"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOrdersReqDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const baseOrders_req_dto_1 = require("./baseOrders.req.dto");
class UpdateOrdersReqDto extends (0, swagger_1.PartialType)((0, swagger_1.PickType)(baseOrders_req_dto_1.BaseOrdersReqDto, [
    'name',
    'surname',
    'email',
    'phone',
    'age',
    'course',
    'course_format',
    'course_type',
    'status',
    'sum',
    'alreadyPaid',
])) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateOrdersReqDto = UpdateOrdersReqDto;
//# sourceMappingURL=updateOrder.req.dto.js.map