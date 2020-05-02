import { ArticleService } from "src/services/article/article.service";
import { Controller } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Article } from "entities/article.entity";

@Controller('api/article')
@Crud({
    model: { type: Article },
    params: { id: { field: 'articleId', type: 'number', primary: true } },
    query: {
        join: {
            category: { eager: true },
            articleFeatures: { eager: true },
            features: { eager: true },
            articlePrices: { eager: true },
            photos: { eager: true },
        }
    }
})
export class ApiArticleController {
    constructor(public service: ArticleService) { }
}
