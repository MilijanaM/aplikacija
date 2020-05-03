

import { Controller, Get, Param, Post, Body, Put } from "@nestjs/common";
import { AdminService } from "src/services/admin/admin.service";
import { Admin } from "entities/admin.entity";
import { EditAdminDto } from "src/dtos/admin/edit.admin.dto";
import { DatabaseConfiguration } from "config/database.configuration";
import { AddAdminDto } from "src/dtos/admin/add.admin.dto";

@Controller('api/admin')
export class AdminController{
    constructor(
        private adminService: AdminService
    ){ }

    
  
    @Get() // GET http:localhost:3000/api/admin
    getAll(): Promise< Admin []>{
      return this.adminService.getAll();
    }

    @Get(':id') // GET http:localhost:3000/api/admin/4/
    getById(@Param('id') adminId: number): Promise<Admin> {
        return this.adminService.getById(adminId);
    }
  

    @Put('') //PUT http:localhost:3000/api/admin/4/
    add(@Body() data: AddAdminDto): Promise<Admin>{
        return this.adminService.add(data);
    }
 
    //POST http:localhost:3000/api/admin/4/
    @Post(':id')
    edit(@Param('id') id: number, @Body() data: EditAdminDto): Promise<Admin>{
        return this.adminService.editById(id, data);
    }

}
