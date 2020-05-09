import { Controller } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Category } from "entities/category.entity";
import { CategoryService } from "src/services/category/category.service";
import { Category2Service } from "src/services/category2/category2.service";

@Controller('api/category2')
@Crud({
    model: {
        type: Category
    },
    params: {
        id:{
            field: 'categoryId',
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
export class Category2Controller{
     constructor(public service: Category2Service){ }

}