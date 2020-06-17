import { AdminService } from "src/services/admin/admin.service";
import { Post, Controller, Body, Req, Get, HttpException, HttpStatus } from "@nestjs/common";
import { LoginAdminDto } from "src/dtos/admin/login.admin.dto";
import { ApiResponse } from "src/misc/api.response.class";
import * as crypto from 'crypto';
import { LoginInfoAdminDto } from "src/dtos/admin/login.info.admin.dto";
import * as jwt from 'jsonwebtoken';
import { JwtDataAdminDto } from "src/dtos/admin/jwt.data.admin.dto";
import { Request} from "express";
import { jwtSecret } from "config/jwt.secret";
import { JwtRefreshDataDto } from "src/dtos/auth/jwt.refresh.dto";
import { LoginInfoDto } from "src/dtos/auth/login.info.dto";
import { AdminRefreshTokenDto } from "src/dtos/auth/admin.refresh.token.dto";
import { JwtDataDto } from "src/dtos/auth/jwt.data.dto";


@Controller('auth')

export class AuthController{
     
     constructor(public adminService: AdminService){ }


     // @Get() // GET http:localhost:3000/api/admin
     // getAll(): string{
     // return "nesto";
     // }  
     // najjednostavniji GET


     
     @Post('login')// http://localhost:3000/auth/login/
    async doLogin(@Body() data: LoginAdminDto, @Req() req: Request): Promise <LoginInfoDto | ApiResponse>{
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
        jwtData.exp = this.getDatePlus(60 * 5);
        jwtData.ip = req.ip.toString();
        jwtData.ua = req.headers["user-agent"];

        let token: string = jwt.sign(jwtData.toPlainObject(),jwtSecret);

        const jwtRefreshData = new JwtRefreshDataDto();
        //jwtRefreshData.role = jwtData.role;
        jwtRefreshData.id = jwtData.id;
        jwtRefreshData.identity = jwtData.identity;
        jwtRefreshData.exp = this.getDatePlus(60 * 60 * 24 * 31);
        jwtRefreshData.ip = jwtData.ip;
        jwtRefreshData.ua = jwtData.ua;

        let refreshToken: string = jwt.sign(jwtRefreshData.toPlainObject(), jwtSecret);

        const responseObject = new LoginInfoDto(
            admin.adminId,
            admin.username,
            token,
            refreshToken,
            this.getIsoDate(jwtRefreshData.exp),
        );

        await this.adminService.addToken(
            admin.adminId,
            refreshToken,
            this.getDatabseDateFormat(this.getIsoDate(jwtRefreshData.exp))
        );

        return new Promise (resolve => resolve(responseObject));


    }

    @Post('refresh') // http://localhost:3000/auth/refresh/
    async adminTokenRefresh(@Req() req: Request, @Body() data: AdminRefreshTokenDto): Promise<LoginInfoDto | ApiResponse> {
        const adminToken = await this.adminService.getAdminToken(data.token);
        console.log(data.token);

        if (!adminToken) {
            return new ApiResponse("error", -10002, "No such refresh token!");
        }

        if (adminToken.isValid === 0) {
            return new ApiResponse("error", -10003, "The token is no longer valid!");
        }

        const sada = new Date();
        const datumIsteka = new Date(adminToken.expiresAt);

        if (datumIsteka.getTime() < sada.getTime()) {
            return new ApiResponse("error", -10004, "The token has expired!");
        }

        let jwtRefreshData: JwtRefreshDataDto;

        console.log('test1');

        try {
            jwtRefreshData = jwt.verify(data.token, jwtSecret);
        } catch (e) {
            throw new HttpException('Bad token found', HttpStatus.UNAUTHORIZED);
        }

        console.log('test2');


        if (!jwtRefreshData) {
            throw new HttpException('Bad token found', HttpStatus.UNAUTHORIZED);
        }
        console.log('test3');


        if (jwtRefreshData.ip !== req.ip.toString()) {
            throw new HttpException('Bad token found', HttpStatus.UNAUTHORIZED);
        }
        console.log('test4');


        if (jwtRefreshData.ua !== req.headers["user-agent"]) {
            throw new HttpException('Bad token found', HttpStatus.UNAUTHORIZED);
        }
        console.log('test5');


        const jwtData = new JwtDataDto();
        //jwtData.role = jwtRefreshData.role;
        jwtData.id = jwtRefreshData.id;
        jwtData.identity = jwtRefreshData.identity;
        jwtData.exp = this.getDatePlus(60 * 5);
        jwtData.ip = jwtRefreshData.ip;
        jwtData.ua = jwtRefreshData.ua;

        let token: string = jwt.sign(jwtData.toPlainObject(), jwtSecret);

        const responseObject = new LoginInfoDto(
            jwtData.id,
            jwtData.identity,
            token,
            data.token,
            this.getIsoDate(jwtRefreshData.exp),
        );

        return responseObject;
    }

    private getDatePlus(numberOfSeconds: number): number {
        return new Date().getTime() / 1000 + numberOfSeconds;
    }

    private getIsoDate(timestamp: number): string {
        const date = new Date();
        date.setTime(timestamp * 1000);
        return date.toISOString();
    }

    private getDatabseDateFormat(isoFormat: string): string {
        return isoFormat.substr(0, 19).replace('T', ' ');
    }
    


//     @Post('login2')// http://localhost:3000/auth/login2/
//      doLogin2(@Body() data: LoginAdminDto, @Req() req: Request): string{
//         //const admin= await this.adminService.getByUsername(data.username);
//        return 'Useranme je '+data.username;
//     }

   

        
    
}

