import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ExtractJwtPipe implements PipeTransform {
  transform(value: string) {
    return value;
  }
}
