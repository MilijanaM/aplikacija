

import { Controller, Get, Param, Post, Body, Put, Patch } from "@nestjs/common";
import { AdminService } from "src/services/admin/admin.service";
import { Admin } from "src/controllers/api/entities/admin.entity";
import { EditAdminDto } from "src/dtos/admin/edit.admin.dto";
import { DatabaseConfiguration } from "config/database.configuration";
import { AddAdminDto } from "src/dtos/admin/add.admin.dto";
import { ApiResponse } from "src/misc/api.response.class";
import { async } from "rxjs/internal/scheduler/async";

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
    async getById(@Param('id') adminId: number): Promise<Admin| ApiResponse> {
        return new Promise(async(resolve)=> {
            let admin= await this.adminService.getById(adminId);

        if(admin === undefined){

        }

        resolve(admin);

        });
        
        
    }
  

    @Post('') //POST http:localhost:3000/api/admin/4/
    add(@Body() data: AddAdminDto): Promise<Admin | ApiResponse>{
        return this.adminService.add(data);
    }
 
    //PATCH http:localhost:3000/api/admin/4/
    @Patch(':id')
    edit(@Param('id') id: number, @Body() data: EditAdminDto): Promise<Admin | ApiResponse>{
        return this.adminService.editById(id, data);
    }

}
