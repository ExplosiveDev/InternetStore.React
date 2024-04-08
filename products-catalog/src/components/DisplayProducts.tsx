import { FC } from "react";
import Product from "../Models/Product";
import SingleProduct from "./helpers/SingleProduct";

interface DisplayProdcutsProps {
    productsArray: Product[];
}

const DisplayProducts: FC<DisplayProdcutsProps> = ({ productsArray }) => {

    return (
        <div className="row g-2">
            {productsArray.map((product) => {
                return <SingleProduct key={product.id} product={product}/>
            })}
        </div>
    )

}

export default DisplayProducts;