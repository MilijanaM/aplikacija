import { Controller, Post, Param, UseInterceptors, UploadedFile, Req } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Product } from "entities/product.entity";
import { ProductService } from "./product/product.service";
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import { StorageConfig } from "config/storage.config";
import { PhotoController } from "./photo.controllers";
import { PhotoService } from "src/services/photo/photo.service";
import { Photo } from "entities/photo.entity";
import { ApiResponse } from "src/misc/api.response.class";
import * as fileType from 'file-type';
import * as fs from 'fs';
import * as sharp from 'sharp';

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
    constructor(
        public service: ProductService,
        public photoService: PhotoService
        ){
        
    }

    
@Post(':id/uploadPhoto/')//POST http://localhost:3000/api/product/uploadPhoto
@UseInterceptors(
    FileInterceptor('photo',{
        storage: diskStorage({
            destination: StorageConfig.photoDestination,
            filename: (req, file, callback)=>{
                // 'Neka slika.jpg'->
                // '20200420-1234567898-Neka-slika.jpg'

                let original : string= file.originalname;

                let normalized = original.replace(/\s+/g, '-');
                normalized= normalized.replace(/[^A-z0-9\.\-]/g, '');
                let sada = new Date();
                let datePart = '';
                datePart += sada.getFullYear().toString();
                datePart += (sada.getMonth()+1).toString();
                datePart += sada.getDate().toString();


                let randomPart: string =
                new Array(10)
                .fill(0)
                .map(e => (Math.random()*9).toFixed(0).toString())
                .join('');

                let fileName = datePart+'-'+randomPart+'-'+normalized;

                fileName= fileName.toLowerCase();

                callback(null, fileName);
                



            }
        }),
        fileFilter: (req, file, callback)=> {
            if(!file.originalname.toLowerCase().match(/\.(jpg|png)$/)){
                req.fileFilterError= 'Bad file extension!';
                callback(null, false);
                return;
            }

            if(!(file.mimetype.includes('jpeg')|| file.mimetype.includes('png'))){
                req.fileFilterError= 'Bad file content!';
                callback(null, false);
                return;
            }
            callback(null, true);
        },
        limits:{
        
            files:1,
            fileSize: StorageConfig.photoMaxFileSize,


        }
    })
)
async uploadPhoto
   (@Param('id') productId: number,
    @UploadedFile() photo,
    @Req() req 
     ): Promise<ApiResponse | Photo>{
         if(req.fileFilterError){
             return new ApiResponse('error', -4002, req.fileFilterError);
         }

         if (!photo){
            return new ApiResponse('error', -4002, 'File not uploaded!');
         }

         const fileTypeResult=fileType.fromFile(photo.path);
         if(!fileTypeResult){

           fs.unlinkSync(photo.path);
           return new ApiResponse('error', -4002, 'Can not detect file type!');

         }
         const realMimeType = (await fileTypeResult).mime;
         if(!(realMimeType.includes('jpeg')|| realMimeType.includes('png'))){
            fs.unlinkSync(photo.path);
            return new ApiResponse('error', -4002, 'Can not Bad file content type!');


        

         //TODO: Save a resized file
         await this.createThumb(photo);
         await this.createSmall(photo);



  
   const newPhoto: Photo = new Photo();
   newPhoto.productId = productId;
   newPhoto.imagePath = photo.filename;

   const savedPhoto = await this.photoService.add(newPhoto);
   if(!savedPhoto){
       return new ApiResponse('error', -4001, 'File upload failed');

   }
   return savedPhoto;
}

 }
 
  async createThumb(photo){
      const originalFilePath = photo.path;
      const fileName = photo.filename;

      const destinationFilePath = StorageConfig.photoDestination+"thumb/"+ fileName;

      await sharp(originalFilePath)
         .resize ({
             fit: 'cover',
             width: StorageConfig.photoThumbSize.width,
             height: StorageConfig.photoThumbSize.height,
            
         })
         .toFile(destinationFilePath);

  }

  async createSmall(photo){
    const originalFilePath = photo.path;
    const fileName = photo.filename;

    const destinationFilePath = StorageConfig.photoDestination+"small/"+ fileName;

    await sharp(originalFilePath)
       .resize ({
           fit: 'cover',
           width: StorageConfig.photoSmallSize.width,
           height: StorageConfig.photoSmallSize.height,
          
       })
       .toFile(destinationFilePath);

}

}