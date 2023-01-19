import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getData(userAuth: string) {
    return { message: 'Welcome to resource!', userAuth };
  }
}
