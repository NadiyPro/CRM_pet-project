"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentUser = void 0;
const common_1 = require("@nestjs/common");
exports.CurrentUser = (0, common_1.createParamDecorator)((_data, context) => {
    const response = context.switchToHttp().getResponse();
    const user = response.locals?.user;
    if (!user) {
        throw new common_1.UnauthorizedException('User not found in request context');
    }
    return user;
});
//# sourceMappingURL=current_user.decorator.js.map