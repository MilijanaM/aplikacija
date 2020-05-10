import { Injectable } from "@nestjs/common";
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Gallery } from "src/controllers/api/entities/gallery.entity";

@Injectable()
export class GalleryService extends TypeOrmCrudService<Gallery>{
    constructor(
        @InjectRepository(Gallery) private readonly gallery: Repository<Gallery> // !!!

       
    

    ){
           super(gallery);
    }


    


        
    
}

