import { Controller } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { NewsService } from "src/services/news/news.service";
import { News } from "entities/news.entity";

@Controller('api/news')
@Crud({
    model: {
        type: News
    },
    params: {
        id:{
            field: 'newsId',
            type: 'number',
            primary: true
        }
    },
    query: {
        join: {
           
           
        }
    }

})
export class NewsController{
    constructor(public service: NewsService){ }

}