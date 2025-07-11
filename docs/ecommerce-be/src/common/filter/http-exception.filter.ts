import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  // private readonly logger = new Logger(HttpExceptionFilter.name);
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      message = (exception.getResponse() as any)?.message;
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    // this.logger.error(
    //   resObject
    //     ? `[${req.method}] ${req.path} [RESPONSE] ${JSON.stringify(resObject)} [STACK] ${exception?.stack}`
    //     : `[STACK] ${exception.stack}`,
    // );

    res.status(statusCode).json({
      statusCode,
      message,
      timestamp: new Date().toISOString(),
    });
  }
}
