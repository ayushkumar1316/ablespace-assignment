import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getRoot() {
    return {
      name: 'AbleSpace API',
      status: 'ok',
    };
  }
}
