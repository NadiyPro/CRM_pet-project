import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(BadRequestException)
export class CustomErrorUnauthorized implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const url = request.url;

    // якщо це login або activate/:token → міняємо 400 на 401
    if (url.startsWith('/auth/login') || url.startsWith('/auth/activate/')) {
      const status = 401;
      response.status(status).json({
        statusCode: status,
        message: 'Unauthorized',
        path: request.url,
      });
    } else {
      // інакше віддаємо як є
      const status = exception.getStatus();
      response.status(status).json(exception.getResponse());
    }
  }
}
