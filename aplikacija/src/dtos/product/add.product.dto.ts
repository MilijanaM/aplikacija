import * as Validator from 'class-validator';

export class AddProductDto{

    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(0,50)
    name: string;

    categoryId: number;

    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(0,255)
    description: string;

    @Validator.IsNotEmpty()
    @Validator.IsPositive()
    @Validator.IsNumber({
      allowInfinity: false,
      allowNaN: false,
      maxDecimalPlaces: 2
    })
    price: number;
   

}