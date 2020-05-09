import { NestMiddleware, HttpStatus, HttpException, Injectable } from "@nestjs/common";
import { Request, NextFunction } from "express";
import { AdminService } from "src/services/admin/admin.service";
import * as jwt from 'jsonwebtoken';
import { JwtDataAdminDto } from "src/dtos/admin/jwt.data.admin.dto";
import { jwtSecret } from "config/jwt.secret";

@Injectable()
export class AuthMiddleware implements NestMiddleware{
    
    constructor(private readonly adminService: AdminService){}
    
    async use(req: Request, res: Response, next: NextFunction) {
   
        if(!req.headers.authorization){
            throw new HttpException('Token not found', HttpStatus.UNAUTHORIZED);

        }

        const token = req.headers.authorization;

        const tokenParts = token.split('');
        if(tokenParts.length != 2){
            throw new HttpException('Bad token found', HttpStatus.UNAUTHORIZED);
        
        }

        const tokenString = tokenParts[1];

        const jwtData: JwtDataAdminDto = jwt.verify(tokenString, jwtSecret);

        if(!jwtData){
            throw new HttpException('Bad token found', HttpStatus.UNAUTHORIZED);
        }

        const ip= req.ip.toString();
        
        if (jwtData.ip !== ip){
            throw new HttpException('Bad token found', HttpStatus.UNAUTHORIZED);
        
        }

        if (jwtData.ua !== req.headers["user-agent"]){
            throw new HttpException('Bad token found', HttpStatus.UNAUTHORIZED);
            
        }
        
        const admin = await this.adminService.getById(jwtData.adminId);
        if(!admin){
            throw new HttpException('Account not found', HttpStatus.UNAUTHORIZED);

        }

        let sada = new Date();
        const trenutniTimestamp = new Date().getTime()/1000;

        if(trenutniTimestamp >= jwtData.exp){
            throw new HttpException('The token has expired', HttpStatus.UNAUTHORIZED);
        }
   
        next();
    }

}