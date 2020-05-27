import { Controller } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { News } from "src/controllers/api/entities/news.entity";
import { PhotoService } from "src/services/photo/photo.service";

@Controller('api/photo')
@Crud({
    model: {
        type: News
    },
    params: {
        id:{
            field: 'photo_id',
            type: 'number',
            primary: true
        }
    },
    query: {
        join: {
           
           
        }
    }

})
export class PhotoController{
    constructor(public service: PhotoService){ }

}