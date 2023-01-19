import { Injectable, PipeTransform } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ExtractJwtPipe implements PipeTransform {
  constructor(private readonly jwtService: JwtService) { }

  transform(value: string) {
    return this.jwtService.decode(value);
  }
}
