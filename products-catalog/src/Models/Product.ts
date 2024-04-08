import Brand from "./Brand";
import Category from "./Category"

interface Product{
    id:string,
    name:string,
    description:string,
    price:number,
    imagePath:string,
    count:number,
    category:Category,
    catagoryId:string,
    brand:Brand,
    brandId:string,
}

export default Product;