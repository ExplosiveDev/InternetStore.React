import React, { FC,useContext, useEffect, useState } from "react";
import Product from "../../Models/Product";
import { Link } from "react-router-dom";
import { MouseEvent } from "react";
import { AuthContext } from "../../context/AuthContext";
import { deleteProduct } from "../../services/products";

interface SingleProductProps {
    product: Product;
}


const SingleProduct: FC<SingleProductProps> = ({ product }) => {

    const auth = useContext(AuthContext);
    const [isHovered, setIsHovered] = useState(false);

    const formatter = new Intl.NumberFormat('default', {
        style: 'currency',
        currency: 'UAH',
    });

    const deleteClick = async (e: MouseEvent<HTMLElement>) => {
        e.preventDefault();

        if(auth.user?.id != null && auth.token != null){
            await deleteProduct(auth.token, product.id);
            window.location.reload();
        }
    }

    return (

        <div className="col-3">
            <div className="card" key={product.id} onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}>

                <div className={`position-absolute top-0 start-0 ${isHovered ? 'show' : 'hide'} animated-button`}>
                    <button className="btn btn-danger" onClick={deleteClick}><span className="fas fa-trash"></span></button>
                </div>
                <Link to={`/product/${product.id}`} className="d-flex justify-content-center">
                    <img className="card-img-top " style={{ maxWidth: "250px", maxHeight: "300px", minHeight: "200px" }} src={product.imagePath}></img>
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