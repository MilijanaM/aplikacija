import { Controller } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { ProductPriceService } from "src/services/productPrice/productPrice.service";
import { ProductPrice } from "src/controllers/api/entities/product-price.entity";


@Controller('api/productPrice')
@Crud({
    model: {
        type: ProductPrice
    },
    params: {
        id:{
            field: 'product_price_id',
            type: 'number',
            primary: true
        }
    },
    query: {
        join: {
           
           
        }
    }

})
export class ProductPriceController{
    constructor(public service: ProductPriceService){ }

}
