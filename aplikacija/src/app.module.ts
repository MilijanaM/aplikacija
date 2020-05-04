import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {DatabaseConfiguration} from 'config/database.configuration';
import { Admin } from 'entities/admin.entity';
import { AdminService } from './services/admin/admin.service';
import { Category } from 'entities/category.entity';
import { Gallery } from 'entities/gallery.entity';
import { Photo } from 'entities/photo.entity';
import { Product } from 'entities/product.entity';
import { Inbox } from 'entities/inbox.entity';
import { News } from 'entities/news.entity';
import { ProductPrice } from 'entities/product-price.entity';
import { AdminController } from './controllers/api/admin.controller';




@Module({
  imports: [

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: DatabaseConfiguration.hostname,
      port: 3306,
      username: DatabaseConfiguration.username,
      password: DatabaseConfiguration.password,
      database: DatabaseConfiguration.database,
      entities: [
        Admin,
        Category,
        Gallery,
        Inbox,
        Photo,


        
        News,
        ProductPrice,
        Product
      
      ]
    }),

    TypeOrmModule.forFeature([Admin])
  ],
  controllers: [AppController, AdminController],
  providers: [AppService, AdminService],
})
export class AppModule {}
