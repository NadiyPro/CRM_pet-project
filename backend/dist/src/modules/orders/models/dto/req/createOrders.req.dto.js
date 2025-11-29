"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrdersReqDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const baseOrders_req_dto_1 = require("./baseOrders.req.dto");
class CreateOrdersReqDto extends (0, swagger_1.PickType)(baseOrders_req_dto_1.BaseOrdersReqDto, [
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
]) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.CreateOrdersReqDto = CreateOrdersReqDto;
//# sourceMappingURL=createOrders.req.dto.js.map