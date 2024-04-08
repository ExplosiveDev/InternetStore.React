import React, { FC } from "react";
import Product from "../../Models/Product";
import { Link } from "react-router-dom";
import styles from "../../assets/styles/Shop/Home.module.css"

interface SingleProductProps {
    product: Product;
}

const SingleProduct: FC<SingleProductProps> = ({ product }) => {

    const formatter = new Intl.NumberFormat('default', {
        style: 'currency',
        currency: 'UAH',
      });

    return (

        <div className="col-3">
            <div className="card" key={product.id}>
                <Link to={`/product/${product.id}`} className="d-flex justify-content-center">
                    <img className="card-img-top " style={{maxWidth:"250px", maxHeight:"300px", minHeight: "200px"}} src={product.imagePath}></img>
                </Link>
                <div className="card-body text-center">
                    <h5 className="card-title">{product.name}</h5>
                    <h6 className="card-subtitle text-success">{formatter.format(product.price)}</h6>
                </div>
            </div>
        </div>          
    )

}

export default SingleProduct;