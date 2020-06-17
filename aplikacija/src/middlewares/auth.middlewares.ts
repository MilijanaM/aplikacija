import { NestMiddleware, HttpStatus, HttpException, Injectable, Header } from "@nestjs/common";
import { Request, NextFunction } from "express";
import { AdminService } from "src/services/admin/admin.service";
import * as jwt from 'jsonwebtoken';
import { JwtDataAdminDto } from "src/dtos/admin/jwt.data.admin.dto";
import { jwtSecret } from "config/jwt.secret";

@Injectable()
export class AuthMiddleware implements NestMiddleware{
    
    constructor(private readonly adminService: AdminService){}
    
    async use(req: Request, res: Response, next: NextFunction) {
   
        console.log('Bad token -1');

        if(!req.headers.authorization){
            throw new HttpException('Token not found', HttpStatus.UNAUTHORIZED);

        }

        console.log('Bad token 0');

        const token = req.headers.authorization;

        const tokenParts = token.split(' ');
        if(tokenParts.length != 2){
            throw new HttpException('Bad token found', HttpStatus.UNAUTHORIZED);
        
        }

        const tokenString = tokenParts[1];
       
        let jwtData: JwtDataAdminDto; 
        console.log('Bad token 1');
        try{
        jwtData = jwt.verify(tokenString, jwtSecret);
        } catch(e){
            throw new HttpException('Bad token found', HttpStatus.UNAUTHORIZED);
        }
        console.log('Bad token 2');

    
        if(!jwtData){
            throw new HttpException('Bad token found', HttpStatus.UNAUTHORIZED);
        }
        console.log('Bad token 3');


        const ip= req.ip.toString();
        
        if (jwtData.ip !== ip){
            throw new HttpException('Bad token found', HttpStatus.UNAUTHORIZED);

        }

        console.log('Bad token 4');

        if (jwtData.ua !== req.headers["user-agent"]){
            throw new HttpException('Bad token found', HttpStatus.UNAUTHORIZED);
            
        }
        
        console.log('Bad token 7');

        const admin = await this.adminService.getById(jwtData.adminId);
        if(!admin){
            throw new HttpException('Account not found', HttpStatus.UNAUTHORIZED);
        }
        console.log('Bad token 5');


         
        let sada = new Date();
        const trenutniTimestamp = new Date().getTime()/1000;

        if(trenutniTimestamp >= jwtData.exp){
            throw new HttpException('The token has expired', HttpStatus.UNAUTHORIZED);
        }
        console.log('Bad token 6');


                     
         next();
   }

}