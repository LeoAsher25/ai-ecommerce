import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ResponseObject } from '../../types';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, ResponseObject<T>> {
  private readonly logger = new Logger(TransformInterceptor.name);
  intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseObject<T>> {
    const request: Request = context.switchToHttp().getRequest();
    const now = Date.now();
    return (
      next
        .handle()
        // .pipe(map(data => ({ data, message: 'success' })))
        .pipe(
          tap(data =>
            this.logger.log(
              request?.method !== 'GET'
                ? `URL: ${request?.url} ${JSON.stringify(data)} ${Date.now() - now}ms`
                : `URL: ${request?.url} ${Date.now() - now}ms`,
            ),
          ),
        )
    );
  }
}
