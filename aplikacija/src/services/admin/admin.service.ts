import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from 'src/controllers/api/entities/admin.entity';
import { Repository } from 'typeorm';
import { AddAdminDto } from 'src/dtos/admin/add.admin.dto';
import { EditAdminDto } from 'src/dtos/admin/edit.admin.dto';
import { ApiResponse } from 'src/misc/api.response.class';
import { resolve } from 'dns';
import * as crypto from 'crypto';



@Injectable()
export class AdminService
 {

    constructor(
        @InjectRepository(Admin)
        private readonly admin: Repository<Admin>,
    ){ }
    
    getAll(): Promise<Admin[]> {
        return this.admin.find();

    }

    async getByUsername(username: string): Promise<Admin | null> {
        const admin= await this.admin.findOne({
            username:   username

        });

        if(admin){
            return admin;
        }

        return null;
    }


    getById(id:number): Promise<Admin>{
        return this.admin.findOne(id);

    }


add(data: AddAdminDto): Promise <Admin | ApiResponse>{
    //DTO -> Model
    //username -> username
    //password -[]-> passwordHash stvar izbora! SHA512
   const crypto = require('crypto');
   
   const passwordHash = crypto.createHash('sha512');
   passwordHash.update(data.password);
   const passwordHashString = passwordHash.digest('hex').toUpperCase();
   
   let newAdmin: Admin = new Admin;
   newAdmin.username = data.username;
   newAdmin.passwordHash = passwordHashString;

   return new Promise((resolve) => {
    
    this.admin.save(newAdmin)
    .then(data => resolve(data))
    .catch(error=>{
        const response: ApiResponse = new ApiResponse("error", -1001, null);
        resolve(response);


    });
   });

}

async editById(id: number, data: EditAdminDto): Promise<Admin | ApiResponse>{
    let admin: Admin= await this.admin.findOne(id);

    if(admin=== undefined){
        return new Promise((resolve)=> {
            resolve(new ApiResponse("error", -1002, null));
        });
    }
    

    const crypto = require('crypto');
   
   const passwordHash = crypto.createHash('sha512');
   passwordHash.update(data.password);

   const passwordHashString = passwordHash.digest('hex').toUpperCase();
   
    admin.passwordHash = passwordHashString;
    return this.admin.save(admin);


}
 }

