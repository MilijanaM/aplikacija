import { Injectable } from "@nestjs/common";
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "src/controllers/api/entities/product.entity";
import { AddProductDto } from "src/dtos/product/add.product.dto";
import { ApiResponse } from "src/misc/api.response.class";
import { ProductPrice } from "src/controllers/api/entities/product-price.entity";

@Injectable()
export class ProductService extends TypeOrmCrudService<Product>{
    constructor(
        @InjectRepository(Product) private readonly product: Repository<Product> // !!!

       
    

    ){
           super(product);
    }


    


        
    
}

