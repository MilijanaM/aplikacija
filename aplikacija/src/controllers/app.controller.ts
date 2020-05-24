import { Controller, Get } from '@nestjs/common';
import { AppService } from '../app.service';

@Controller()
export class AppController {
  getHello(): any {
    throw new Error("Method not implemented.");
  }

  
  
  @Get() // http:localhost:3000/
  getIndex(): string{

    return 'Home page1!!';
  }


  
}
