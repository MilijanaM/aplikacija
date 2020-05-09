import { AdminService } from "src/services/admin/admin.service";
import { Post, Controller, Body, Req } from "@nestjs/common";
import { LoginAdminDto } from "src/dtos/admin/login.admin.dto";
import { ApiResponse } from "src/misc/api.response.class";
import * as crypto from 'crypto';
import { LoginInfoAdminDto } from "src/dtos/admin/login.info.admin.dto";
import * as jwt from 'jsonwebtoken';
import { JwtDataAdminDto } from "src/dtos/admin/jwt.data.admin.dto";
import { Request} from "express";
import { jwtSecret } from "config/jwt.secret";

@Controller('auth')
export class AuthController{
    constructor(public adminService : AdminService){}

    @Post('login')// http://localhost:3000/auth/login/
    async doLogin(@Body() data: LoginAdminDto, @Req() req: Request): Promise <LoginInfoAdminDto | ApiResponse>{
        const admin= await this.adminService.getByUsername(data.username);

        if(!admin){
         return new Promise(resolve => resolve(new ApiResponse ('error', -3001, 'Administrator nije pronadjen')));
        }

        const passwordHash = crypto.createHash('sha512');
        passwordHash.update(data.password);
        const passwordHashString = passwordHash.digest('hex').toUpperCase();
   
        if(admin.passwordHash !== passwordHashString){
            return new Promise(resolve => resolve(new ApiResponse ('error', -3002, 'Password nije ispravan')));

        }

        //adminId
        //username
        //token (JWT)
        // TAJNA SIFRA 
        // JSON = {admin, username, exp, ip, ua}
        // sifrovanje x {TAJNA SIFRA -> JSON}-> Sifra binarni -> BASE64
        // HEX STRING

        //  TOKEN = JSON {adminId, username, exp, ip, ua}
        const jwtData = new JwtDataAdminDto();

        jwtData.adminId = admin.adminId;
        jwtData.username = admin.username;
        let sada = new Date();
        sada.setDate(sada.getDate()+14);
        const istekTimestamp = sada.getTime()/1000.0;
        jwtData.exp = istekTimestamp;

        jwtData.ip = req.ip.toString();
        jwtData.ua = req.headers["user-agent"];


        let token: string = jwt.sign(jwtData.toPlainObject(),jwtSecret);//GENERISATI!!!

        const responseObject = new LoginInfoAdminDto(
            admin.adminId,
            admin.username,
        token
        );

        return new Promise (resolve => resolve(responseObject));


    }


}