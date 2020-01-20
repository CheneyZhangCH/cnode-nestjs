import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    console.log('get hello');
    return 'Hello World!';
  }
}
