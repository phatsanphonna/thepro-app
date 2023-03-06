import { Injectable, PipeTransform } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthTicket } from './auth.interface';

@Injectable()
export class ExtractJwtPipe implements PipeTransform {
  constructor(private readonly jwtService: JwtService) { }

  transform(value: string) {
    const jwt = this.jwtService.decode(value) as any;
    return jwt.ticket as AuthTicket
  }
}
