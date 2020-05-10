import { Injectable } from "@nestjs/common";
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { News } from "src/controllers/api/entities/news.entity";

@Injectable()
export class NewsService extends TypeOrmCrudService<News>{
    constructor(
        @InjectRepository(News) private readonly news: Repository<News> // !!!

       
    

    ){
           super(news);
    }


    


        
    
}

