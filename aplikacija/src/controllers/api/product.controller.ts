import { Controller } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Product } from "entities/product.entity";
import { ProductService } from "./product/product.service";

@Controller('api/product')
@Crud({
    model: {
        type: Product
    },
    params: {
        id:{
            field: 'productId',
            type: 'number',
            primary: true
        }
    },
    query: {
        join: {
            category: {
                eager: true
            },
            photos: {
                eager: true
            },
            productPrices: {
                eager: true
            }


           
           
        }
    }

})

export class ProductController{
    constructor(public service: ProductService){
        
    }
}

