import { Module , NestModule, MiddlewareConsumer, Logger} from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {DatabaseConfiguration} from 'config/database.configuration';
import { Admin } from 'src/controllers/api/entities/admin.entity';
import { AdminService } from './services/admin/admin.service';
import { Category } from 'src/controllers/api/entities/category.entity';
import { Gallery } from 'src/controllers/api/entities/gallery.entity';
import { Photo } from 'src/controllers/api/entities/photo.entity';
import { Product } from 'src/controllers/api/entities/product.entity';
import { Inbox } from 'src/controllers/api/entities/inbox.entity';
import { News } from 'src/controllers/api/entities/news.entity';
import { ProductPrice } from 'src/controllers/api/entities/product-price.entity';
import { AdminController } from './controllers/api/admin.controller';
import { CategoryController } from './controllers/api/category.controller';
import { CategoryService } from './services/category/category.service';
import { ProductService } from './controllers/api/product/product.service';
import { ProductController } from './controllers/api/product.controller';
import { GalleryService } from './services/gallery/gallery.service';
import { GalleryController } from './controllers/api/product/gallery.controller';
import { InboxController } from './controllers/api/inbox.controller';
import { InboxService } from './services/inbox/inbox.service';
import { NewsController } from './controllers/api/news.controller';
import { NewsService } from './services/news/news.service';
import { PhotoController } from './controllers/api/photo.controllers';
import { PhotoService } from './services/photo/photo.service';
import { ProductPriceController } from './controllers/api/productPrice.controller';
import { ProductPriceService } from './services/productPrice/productPrice.service';
import { AuthController } from './controllers/api/auth.controller';
import { AuthMiddleware } from './middlewares/auth.middlewares';
import { AdminToken } from './controllers/api/entities/admin-token.entity';





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
        Product,
        AdminToken
      
      ],
      //logging: true,
    }),

    TypeOrmModule.forFeature([
      Admin,
      Category,
      Product,
      ProductPrice,
      Gallery,
      Inbox,
      News,
      Photo,
      ProductPrice,
      AdminToken

    ])
  ],
  controllers: [AppController, AdminController, CategoryController,ProductController,GalleryController,InboxController, NewsController,PhotoController,ProductPriceController, AuthController ],
  providers: [AppService, AdminService, CategoryService,ProductService,GalleryService,InboxService,NewsService,PhotoService,ProductPriceService ],

  exports: [
    AdminService,
  ],

})

export class AppModule implements NestModule {
  configure(consumer:MiddlewareConsumer) {
    consumer
    .apply(AuthMiddleware)
    .exclude('auth/*')
    .exclude('api/category/', 'api/news/')
    .forRoutes('api/*');
  }
}
