import { Injectable } from "@nestjs/common";
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Inbox } from "entities/inbox.entity";

@Injectable()
export class InboxService extends TypeOrmCrudService<Inbox>{
    constructor(
        @InjectRepository(Inbox) private readonly inbox: Repository<Inbox> // !!!

       
    

    ){
           super(inbox);
    }


    


        
    
}

