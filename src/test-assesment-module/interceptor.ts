import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class CommonInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const type = context.getType();
    if (type !== 'http') return next.handle();
    const before = Date.now();
    const { method, path } = context.switchToHttp().getRequest();

    return next.handle().pipe(
      tap((data) => {
        const response = context.switchToHttp().getResponse();

        fetch('http://localhost:8765/logging', {
          method: 'POST',
          body: Buffer.from(
            JSON.stringify({
              requestDuration: `${before - Date.now()} ms`,
              requestData: { method, path },
              responseData: data,
              httpStatus: response.statusCode,
            }),
          ),
        }).catch((err) => {
          console.log(err);
        });

        return data;
      }),
    );
  }
}
