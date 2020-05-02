import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AdminService } from './services/admin/admin.service';
import { Admin } from 'entities/admin.entity';

@Controller()
export class AppController {

  constructor(
    private adminService: AdminService
  ){}
  @Get() // http:localhost:3000/
  getIndex(): string{

    return 'Home page!!';
  }


  @Get('api/admin') // http:localhost:3000/api/admin
  getAllAdmins(): Promise< Admin []> {
    return this.adminService.getAll();

  }
}
