import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(Error)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();

    const { message, name } = exception;

    response
        // use status when exceptions are defined
        //.status(status)
      .json({
        timestamp: new Date().toISOString(),
        message,
        name,
        path: request.url,
      });
  }
}
