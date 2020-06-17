import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from 'src/controllers/api/entities/admin.entity';
import { Repository } from 'typeorm';
import { AddAdminDto } from 'src/dtos/admin/add.admin.dto';
import { EditAdminDto } from 'src/dtos/admin/edit.admin.dto';
import { ApiResponse } from 'src/misc/api.response.class';
import { resolve } from 'dns';
import * as crypto from 'crypto';
import { AdminToken } from 'src/controllers/api/entities/admin-token.entity';



@Injectable()
export class AdminService
 {
    //adminToken: any;

    constructor(
        @InjectRepository(Admin)
        private readonly admin: Repository<Admin>,

        @InjectRepository(AdminToken)
        private readonly adminToken: Repository<AdminToken>,
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
async addToken(adminId: number, token: string, expiresAt: string) {
    const adminToken = new AdminToken();
    adminToken.adminId = adminId;
    adminToken.token = token;
    adminToken.expiresAt = expiresAt;

    return await this.adminToken.save(adminToken);
}

async getAdminToken(token: string): Promise<AdminToken> {
    return await this.adminToken.findOne({
        token: token,
    });
}

async invalidateToken(token: string): Promise<AdminToken | ApiResponse> {
    const adminToken = await this.adminToken.findOne({
        token: token,
    });

    if (!adminToken) {
        return new ApiResponse("error", -10001, "No such refresh token!");
    }

    adminToken.isValid = 0;

    await this.adminToken.save(adminToken);

    return await this.getAdminToken(token);
}

async invalidateAdminTokens(adminId: number): Promise<(AdminToken | ApiResponse)[]> {
    const adminTokens = await this.adminToken.find({
        adminId: adminId,
    });

    const results = [];

    for (const adminToken of adminTokens) {

        results.push(this.invalidateToken(adminToken.token));
    }

    return results;
}
}


