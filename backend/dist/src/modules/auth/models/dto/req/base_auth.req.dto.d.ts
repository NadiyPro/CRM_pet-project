import { BaseUserReqDto } from '../../../../users/models/dto/req/baseUser.req.dto';
declare const BaseAuthReqDto_base: import("@nestjs/common").Type<Pick<BaseUserReqDto, "name" | "email" | "surname" | "password" | "role" | "is_active">>;
export declare class BaseAuthReqDto extends BaseAuthReqDto_base {
    readonly deviceId: string;
}
export {};
