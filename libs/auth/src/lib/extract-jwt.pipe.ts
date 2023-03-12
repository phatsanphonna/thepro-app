import { Injectable, PipeTransform } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class ExtractJwtPipe implements PipeTransform {
  constructor(private readonly authService: AuthService) {}

  transform(value: string) {
    return this.authService.decode(value);
  }
}
