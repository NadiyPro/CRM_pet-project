"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMapper = void 0;
class UserMapper {
    static toResDto(user) {
        return {
            id: user.id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            role: user.role,
            is_active: user.is_active,
            deleted: user.deleted,
        };
    }
    static toIUserData(user, jwtPayload) {
        return {
            userId: user.id,
            surname: user.surname,
            name: user.name,
            deviceId: jwtPayload.deviceId,
            email: user.email,
            role: user.role,
            is_active: user.is_active,
            deleted: user.deleted,
        };
    }
    static toAllResDtoList(users, total, query) {
        return { users: users.map((user) => this.toResDto(user)), total, ...query };
    }
}
exports.UserMapper = UserMapper;
//# sourceMappingURL=user.mapper.js.map