import * as Validator from 'class-validator';

export class ProductSearchDto{

    @Validator.IsNotEmpty()
    @Validator.IsPositive()
    @Validator.IsNumber({
        allowInfinity: false,
        allowNaN: false,
        maxDecimalPlaces: 0,
    })
    categoryId: number;


    @Validator.IsOptional()
    @Validator.IsNotEmpty()
    @Validator.Length(2,128)
    keywords: string;

    @Validator.IsOptional()
    @Validator.IsPositive()
    @Validator.IsNumber({
        allowInfinity: false,
        allowNaN: false,
        maxDecimalPlaces: 2,
    })
    priceMin: number;

    @Validator.IsOptional()
    @Validator.IsPositive()
    @Validator.IsNumber({
        allowInfinity: false,
        allowNaN: false,
        maxDecimalPlaces: 2,
    })
    priceMax: number;


    @Validator.IsOptional()
    @Validator.IsIn(['name', 'price'])
    orderBy: 'name'| 'price';

    @Validator.IsOptional()
    @Validator.IsIn(['ASC', 'DESC'])
    orderDirection: 'ASC'| 'DESC';

    @Validator.IsOptional()
    @Validator.IsPositive()
    @Validator.IsNumber({
        allowInfinity: false,
        allowNaN: false,
        maxDecimalPlaces: 0,
    })
    page: number;


    @Validator.IsOptional()
    @Validator.IsIn([5,10])
    itemsPerPage: 5|10;

}