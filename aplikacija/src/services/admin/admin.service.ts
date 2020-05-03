import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from 'entities/admin.entity';
import { Repository } from 'typeorm';
import { AddAdminDto } from 'src/dtos/admin/add.admin.dto';
import { EditAdminDto } from 'src/dtos/admin/edit.admin.dto';



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

    getById(id:number): Promise<Admin>{
        return this.admin.findOne(id);

    }


add(data: AddAdminDto): Promise <Admin>{
    //DTO -> Model
    //username -> username
    //password -[]-> passwordHash stvar izbora! SHA512
   const crypto = require('crypto');
   
   const passwordHash = crypto.createHash('sha512');
   passwordHash.update(data.password);

   const passwordHashString = passwordHash.digest('hex').toUpperCase;
   
   let newAdmin: Admin = new Admin;
   newAdmin.username = data.username;
   newAdmin.passwordHash = passwordHashString;

   return this.admin.save(newAdmin);

}

async editById(id: number, data: EditAdminDto): Promise<Admin>{
    let admin: Admin= await this.admin.findOne(id);
    

    const crypto = require('crypto');
   
   const passwordHash = crypto.createHash('sha512');
   passwordHash.update(data.password);

   const passwordHashString = passwordHash.digest('hex').toUpperCase;
   
    admin.passwordHash = passwordHashString;
    return this.admin.save(admin);


}
 }

