import { Injectable } from "@nestjs/common";
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Entity } from "typeorm";
import { Product } from "src/controllers/api/entities/product.entity";
import { AddProductDto } from "src/dtos/product/add.product.dto";
import { ApiResponse } from "src/misc/api.response.class";
import { ProductPrice } from "src/controllers/api/entities/product-price.entity";
import { EditProductDto } from "src/dtos/product/edit.product.dto";

@Injectable()
export class ProductService extends TypeOrmCrudService<Product>{
   
   async editProduct(id: number, data: EditProductDto) {
        
        console.log("Fetching product");

        let loadedProduct = (await this.productRepository.findOne(id));

        if(!loadedProduct) {
            return new ApiResponse('error', -5001, 'Product not found')
          }


        loadedProduct.name= data.name;
        loadedProduct.description= data.description;
        loadedProduct.categoryId= data.categoryId;
    

        let snimljeniProduct = await this.productRepository.save(loadedProduct);

        
        console.log("new product name = " + snimljeniProduct.name);
        console.log(loadedProduct.description);
        console.log(loadedProduct.name);

        let listaSvihCenaProductaKogaApdejtujem= await this.productPriceRepository.find({productId: id});
        
        let latestPrice = listaSvihCenaProductaKogaApdejtujem[0];
        listaSvihCenaProductaKogaApdejtujem.forEach(red => {
            
            if(latestPrice.createdAt < red.createdAt){

                latestPrice = red;
            }
        });

        let sadasnjaCena = latestPrice.price;
      

        let cenaSePromenila = sadasnjaCena != data.price;

        console.log('sadasnja cena je='+ sadasnjaCena);

        console.log("Creating product price with value: " + data.price);
        let priceEntity = new ProductPrice();
        priceEntity.price = data.price;
        priceEntity.productId= loadedProduct.productId;
        //entity.createdAt= Date.(); //Popravi

        if(cenaSePromenila){
            console.log("updating product price");
           let x = await this.productPriceRepository.save(priceEntity);
        }

        console.log("editing product done");

        //ret
    }

    constructor(
        @InjectRepository(Product) private readonly productRepository: Repository<Product>, // !!!

        @InjectRepository(ProductPrice) private readonly productPriceRepository: Repository<ProductPrice>
    ){
           super(productRepository);
    }
  
    
}

