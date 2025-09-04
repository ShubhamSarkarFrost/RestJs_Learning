import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/Hi')
  getRootRoute() {
    return 'Hi There';
  }

  @Get('/Bye')
  getByThere() {
    return 'By There';
  }
}
