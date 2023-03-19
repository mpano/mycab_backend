import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { plainToClass } from 'class-transformer';
export function Serialize(dto: any){
  return UseInterceptors(new SerializeEnterceptor(dto));
}
export class SerializeEnterceptor implements NestInterceptor{

  constructor(private dto: any) {
  }
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {

    return next.handle().pipe(
      map((data: any) => {
        return plainToClass(this.dto, data,{
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}