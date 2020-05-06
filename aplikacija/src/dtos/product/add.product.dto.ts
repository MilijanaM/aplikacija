export class AddProductDto{

    name: string;
    categoryId: number;
    description: string;
    price: number;
    features: {
        featureId: number;
        value: string; 
    }[]; 

}