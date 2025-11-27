import { BaseResDto } from './baseUser.res.dto';
declare const UserResDto_base: import("@nestjs/common").Type<Pick<BaseResDto, "name" | "email" | "id" | "surname" | "role" | "is_active" | "deleted">>;
export declare class UserResDto extends UserResDto_base {
}
export {};
