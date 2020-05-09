export class JwtDataAdminDto{
    adminId: number;
    username: string;
    exp:number; //UNIX TIMESTAMP
    ip: string;
    ua: string;


    toPlainObject(){
        return{
            adminId: this.adminId,
            username: this.username,
            exp: this.exp,
            ip: this.ip,
            ua: this.ua,
        }
    }


}