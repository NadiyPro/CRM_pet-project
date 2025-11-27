"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenPairResDto = void 0;
const openapi = require("@nestjs/swagger");
class TokenPairResDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { accessToken: { required: true, type: () => String }, refreshToken: { required: true, type: () => String } };
    }
}
exports.TokenPairResDto = TokenPairResDto;
//# sourceMappingURL=token_pair.res.dto.js.map