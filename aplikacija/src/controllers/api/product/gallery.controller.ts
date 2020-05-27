import { Controller } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Gallery } from "src/controllers/api/entities/gallery.entity";
import { GalleryService } from "src/services/gallery/gallery.service";

@Controller('api/gallery')
@Crud({
    model: {
        type: Gallery
    },
    params: {
        id:{
            field: 'gallery_id',
            type: 'number',
            primary: true
        }
    },
    query: {
        join: {
           
           
        }
    }

})
export class GalleryController{
    constructor(public service: GalleryService){ }

}