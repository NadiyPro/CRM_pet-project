import { BaseResDto } from '../../../../users/models/dto/res/baseUser.res.dto';
declare const AuthUserResDto_base: import("@nestjs/common").Type<Pick<BaseResDto, "name" | "email" | "id" | "surname" | "role" | "is_active">>;
export declare class AuthUserResDto extends AuthUserResDto_base {
}
export {};
