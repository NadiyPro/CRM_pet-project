import { ArgumentsHost, BadRequestException, ExceptionFilter } from '@nestjs/common';
export declare class CustomErrorUnauthorized implements ExceptionFilter {
    catch(exception: BadRequestException, host: ArgumentsHost): void;
}
