import { Controller } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Category } from "src/controllers/api/entities/category.entity";
import { CategoryService } from "src/services/category/category.service";

@Controller('api/category')
@Crud({
    model: {
        type: Category
    },
    params: {
        id:{
            field: 'category_id',
            type: 'number',
            primary: true
        }
    },
    query: {
        join: {
            categories: {
                eager: true
            },
            parentCategory: {
                eager: false
            },
            products: {
                eager: true
            },
           
        }
    }

})
export class CategoryController{
     constructor(public service: CategoryService){ }

}