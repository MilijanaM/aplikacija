import { Injectable } from "@nestjs/common";
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Entity, Any, In } from "typeorm";
import { Product } from "src/controllers/api/entities/product.entity";
import { AddProductDto } from "src/dtos/product/add.product.dto";
import { ApiResponse } from "src/misc/api.response.class";
import { ProductPrice } from "src/controllers/api/entities/product-price.entity";
import { EditProductDto } from "src/dtos/product/edit.product.dto";
import { async } from "rxjs/internal/scheduler/async";
import { ProductSearchDto } from "src/dtos/product/product.search.dto";
import { min } from "class-validator";

@Injectable()
export class ProductService extends TypeOrmCrudService<Product>{
   

   async createProduct(data: AddProductDto): Promise <Product | ApiResponse>{
    console.log('a');
    let newProduct: Product = new Product();
     newProduct.name= data.name;
     newProduct.categoryId=data.categoryId;
     newProduct.description=data.description;
    
     let savedProduct = await this.productRepository.save(newProduct);
     console.log('b');
     let newProductPrice: ProductPrice = new ProductPrice();

     newProductPrice.productId= savedProduct.productId;
     newProductPrice.price = data.price;

     await this.productPriceRepository.save(newProductPrice);
      console.log('c');
     return await this.productRepository.findOne(savedProduct.productId,{
       relations:[
        "category",
        "productPrices",
        "photos"
      ]
      
     });

   }

   async editProduct(id: number, data: EditProductDto): Promise<Product | ApiResponse> {
        
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



 return await this.productRepository.findOne(id, {
            relations: [
              "category",
              "productPrices",
              "photos"
            ]
          });
          
    }

    async search(data: ProductSearchDto): Promise<Product[]>{
      const builder = await this.productRepository.createQueryBuilder("productRepository");
    
      builder.innerJoinAndSelect("productRepository.productPrices", "pp",
      
      "pp.createdAt=(SELECT MAX(pp.created_at) FROM product_price AS pp WHERE pp.product_id= productRepository.product_id ORDER BY created_at )");


      builder.where('productRepository.categoryId = :catId', {catId: data.categoryId});

      if(data.keywords && data.keywords.length>0){
        
        builder.andWhere(`(productRepository.name LIKE :kw
                          OR productRepository.description LIKE :kw)`,
                           {kw: '%' + data.keywords.trim() + '%'});

      
      }

      if(data.priceMin && typeof data.priceMin === 'number'){
        builder.andWhere('pp.price>= :min',{min : data.priceMin} );
      }

      if(data.priceMax && typeof data.priceMax === 'number'){
        builder.andWhere('pp.price <= :max',{max : data.priceMax} );
      }

      let orderBy = 'productRepository.name';
      let orderDirection : 'ASC'| 'DESC'= 'ASC';

      if(data.orderBy){
        orderBy = data.orderBy;

        if(orderBy === 'price'){
          orderBy= 'pp.price';
        }

        if(orderBy=== 'price'){
          orderBy= 'productRepository.name';
        }

      }

      if(data.orderDirection){
        orderDirection = data.orderDirection;
      }

      builder.orderBy(orderBy, orderDirection);

      let page = 0;
      let perPage: 5| 10 = 10;

      if(data.page && typeof data.page === 'number'){
        page = data.page;

      }

      if(data.itemsPerPage && typeof data.itemsPerPage === 'number'){
        perPage = data.itemsPerPage;
      }

      builder.skip(page*perPage);
      builder.take(perPage);

      let productIds = await (await builder.getMany()).map(productRepository=> productRepository.productId);

      return await this.productRepository.find({
        where: {productId: In(productIds)},
        relations: [
          "category",
          "productPrices",
          "photos"
        ]
      });
    } 

    constructor(
        @InjectRepository(Product) private readonly productRepository: Repository<Product>, // !!!

        @InjectRepository(ProductPrice) private readonly productPriceRepository: Repository<ProductPrice>
    ){
           super(productRepository);
    }
  
    
}

