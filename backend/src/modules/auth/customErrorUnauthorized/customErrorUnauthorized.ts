import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  UnauthorizedException,
  ValidationPipe,
} from '@nestjs/common';

@Injectable()
export class CustomErrorUnauthorized extends ValidationPipe {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    try {
      return await super.transform(value, metadata);
    } catch (error) {
      if (error instanceof BadRequestException) {
        // замінюємо 400 на 401
        throw new UnauthorizedException('Unauthorized');
      }
      throw error;
    }
  }
}
