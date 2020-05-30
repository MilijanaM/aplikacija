import { Controller, Post, Param, UseInterceptors, UploadedFile, Req, Delete, Body, Patch } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Product } from "src/controllers/api/entities/product.entity";
import { ProductService } from "./product/product.service";
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import { StorageConfig } from "config/storage.config";
import { PhotoController } from "./photo.controllers";
import { PhotoService } from "src/services/photo/photo.service";
import { Photo } from "src/controllers/api/entities/photo.entity";
import { ApiResponse } from "src/misc/api.response.class";
import * as fileType from 'file-type';
import * as fs from 'fs';
import * as sharp from 'sharp';
import { EditProductDto } from "src/dtos/product/edit.product.dto";
import { AddProductDto } from "src/dtos/product/add.product.dto";
import { ProductSearchDto } from "src/dtos/product/product.search.dto";

@Controller('api/product')
@Crud({
    model: {
        type: Product
    },
    params: {
        id:{
            field: 'product_id',
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
    },
    routes: {
        exclude: [
            'updateOneBase',
            'replaceOneBase',
            'deleteOneBase',
    ],
    }

})

export class ProductController{
    constructor(
        public service: ProductService,
        public photoService: PhotoService
        ){
        
    }


    @Post('create')//POST http://localhost:3000/api/product/create/
    createProduct(@Body() data: AddProductDto) {
        console.log('A');
        return this.service.createProduct(data);
    }

  

@Post(':id/uploadPhoto/')//POST http://localhost:3000/api/product/id/uploadPhoto

@UseInterceptors(
    FileInterceptor('photo',{
        storage: diskStorage({
            destination: StorageConfig.photo.destination,
            filename: (req, file, callback)=>{
                // 'Neka slika.jpg'->
                // '20200420-1234567898-Neka-slika.jpg'
                console.log('CD');
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
                
               console.log('EF');


            }
        }),
        fileFilter: (req, file, callback)=> {

            console.log('G');
            if(!file.originalname.toLowerCase().match(/\.(jpg|png)$/)){
                req.fileFilterError= 'Bad file extension!';
                callback(null, false);
                return;
            }

            if(!(file.mimetype.includes('jpeg')|| file.mimetype.includes('png'))){
                console.log('H');
                req.fileFilterError= 'Bad file content!';
                callback(null, false);
                return;
            }
            callback(null, true);
        },
        limits:{
        
            files:1,
            fileSize: StorageConfig.photo.maxSize,


        }
    })
)
async uploadPhoto
   (@Param('id') productId: number,
    @UploadedFile() photo,
    @Req() req 
     ): Promise<ApiResponse | Photo>{
         console.log('J');
        if(req.fileFilterError){
            return new ApiResponse('error', -4002, req.fileFilterError);
        }

        if (!photo){
            console.log('K');
            return new ApiResponse('error', -4002, 'File not uploaded!');
        }

        console.log('1');
        const fileTypeResult=fileType.fromFile(photo.path);
        if(!fileTypeResult){
            console.log('L');
            fs.unlinkSync(photo.path);
            return new ApiResponse('error', -4002, 'Can not detect file type!');
        }
        console.log('2');
        const realMimeType = (await fileTypeResult).mime;
        if(!(realMimeType.includes('jpeg')|| realMimeType.includes('png'))){
            console.log('M');
            fs.unlinkSync(photo.path);
            return new ApiResponse('error', -4002, 'Can not Bad file content type!');
        }

        console.log('3');
        //TODO: Save a resized file
        await this.createResizedImage(photo, StorageConfig.photo.resize.thumb);
        console.log('4');
        await this.createResizedImage(photo, StorageConfig.photo.resize.small);

        console.log('N');
        const newPhoto: Photo = new Photo();
        newPhoto.productId = productId;
        newPhoto.imagePath = photo.filename;

        console.log('O');
        const savedPhoto = await this.photoService.add(newPhoto);
        if(!savedPhoto){
            return new ApiResponse('error', -4001, 'File upload failed');
        }
        return savedPhoto;
        console.log('P');
    }


async createResizedImage(photo, resizeSettings){
    console.log('5');
    const originalFilePath = photo.path;
    console.log('6');

    const fileName = photo.filename;
    console.log('7');

    const destinationFilePath = StorageConfig.photo.destination + '/'+ StorageConfig.photo.resize.small.directory + fileName;
    console.log('8');
    console.log('StorageConfig.photo.destination=' +StorageConfig.photo.destination);
    console.log('StorageConfig.photo.destination=' +StorageConfig.photo.destination);

    console.log('originalFilePath '+originalFilePath);
    console.log('resizeSettings.width'+resizeSettings.width);
    console.log('resizeSettings.height'+resizeSettings.height);
    console.log('StorageConfig.photo.resize.small.directory'+StorageConfig.photo.resize.small.directory);
    console.log('destinationFilePath='+ destinationFilePath);

    await sharp(originalFilePath)
       .resize ({
           fit: 'cover',
           width: resizeSettings.width,
           height: resizeSettings.height,
          
       })
       .toFile(destinationFilePath);

       console.log('9');


}

//http:localhost:3000/api/product/1/deletePhoto/45/
@Delete(':productId/deletePhoto/:photoId')
async deletePhoto(
    @Param('productId') productId: number,
    @Param('photoId') photoId: number,
){
    const photo = await this. photoService.findOne({
        productId: productId,
        photoId: photoId
    });

    if(!photo){
        return new ApiResponse('error', -4004, 'Photo not found');

    }

    try {
    fs.unlinkSync(StorageConfig.photo.destination+ photo.imagePath);
    fs.unlinkSync(StorageConfig.photo.destination+ StorageConfig.photo.resize.thumb.directory+photo.imagePath);
    fs.unlinkSync(StorageConfig.photo.destination+ StorageConfig.photo.resize.small.directory+photo.imagePath);
    } catch(e){}

    const deleteResault = await this.photoService.deleteById(photo.photoId);

    if(deleteResault.affected === 0){
        return new ApiResponse('error', -4004, 'Photo not found');

    }

    return new ApiResponse('ok', 0, 'One photo deleted!');
}

@Patch(':id') //http://localhost:3000/api/product/2
    async editById(@Param('id') id: number, @Body() data: EditProductDto) {
        console.log('Body from rq'+ data.name);
        return await this.service.editProduct(id, data);
    }



    @Post('search')
    async search(@Body() data: ProductSearchDto): Promise<Product[]>{
        return await this.service.search(data);
    }
}