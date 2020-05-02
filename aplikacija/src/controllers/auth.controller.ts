import { Controller, Post, Body, Req } from "@nestjs/common";
import { AdministratorService } from "src/services/administrator/administrator.service";
import { LoginAdministratorDto } from "dtos/auth/login.administrator.dto";
import { ApiResponse } from "src/misc/api.response.class";
import * as crypto from 'crypto';
import { LoginInformationAdministratorDto } from "dtos/auth/login.information.administrator.dto";
import * as jwt from 'jsonwebtoken';
import { JwtAdministratorDto } from "dtos/auth/jwt.administrator.dto";
import { Request } from 'express';
import { SecretKey } from "config/secret.config";

@Controller('auth') // http://localhost:3000/auth/
export class AuthController {
    constructor(public administratorService: AdministratorService) { }

    @Post('login') // POST http://localhost:3000/auth/login/
    async doLogin(@Body() data: LoginAdministratorDto, @Req() req: Request): Promise<LoginInformationAdministratorDto | ApiResponse> {
        const admin = await this.administratorService.getByUsername(data.username);
        if (!admin) {
            return new ApiResponse('error', -3001);
        }

        const passwordHash = crypto.createHash('sha512');
        passwordHash.update(data.password);
        const passwordHashString = passwordHash.digest('hex').toUpperCase();
        if (passwordHashString !== admin.passwordHash) {
            return new ApiResponse('error', -3002);
        }

        const jwtData: JwtAdministratorDto = new JwtAdministratorDto();
        jwtData.administratorId = admin.administratorId;
        jwtData.username = admin.username;
        const sada = new Date();
        sada.setDate(sada.getDate() + 14); // + dve nedelje od sada
        jwtData.exp = sada.getTime() / 1000.;
        jwtData.ip = req.ip;
        jwtData.ua = req.headers['user-agent'];

        const token = jwt.sign(jwtData.toPlainObject(), SecretKey);

        return new LoginInformationAdministratorDto(
            admin.administratorId,
            admin.username,
            token,
        );
    }
}
