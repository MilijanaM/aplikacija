import { AdminService } from "src/services/admin/admin.service";
import { Post, Controller } from "@nestjs/common";

@Controller('auth')
export class AuthController{
    constructor(public adminService : AdminService){}

    @Post('login')// http://localhost:3000/auth/login/
    doLogin(){

    }


}