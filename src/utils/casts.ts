import { PipeTransform, Injectable } from '@nestjs/common';

@Injectable()
export class DateCastPipe implements PipeTransform {
  transform(value: string) {
    return new Date(value);
  }
}
