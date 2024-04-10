import React, { FC, useContext, MouseEvent, useEffect, useState } from "react";
import Product from "../Models/Product";
import { useParams } from "react-router-dom";
import styles from "../assets/Shop/Home.module.css"
import { AuthContext } from "../context/AuthContext";
import { getProductById } from "../services/products";
import { setInBasket } from "../services/baskets";



const ShowProduct: FC = () => {
    const auth = useContext(AuthContext);
    const { id } = useParams();
    const [product, setProduct] = useState<Product>();

    useEffect(() => {
        async function fetchData() {
            const ProductData: Product = await getProductById(id!);
            setProduct(ProductData);
        }

        fetchData();
    }, [id]);

    const formatter = new Intl.NumberFormat('default', {
        style: 'currency',
        currency: 'UAH',
    });

    const InCardClick = async (e: MouseEvent<HTMLElement>) => {
        e.preventDefault();

        if(auth.user?.id && auth.token && product){
            const prod = await setInBasket(auth.user?.id, auth.token, product.id);
            if(prod.id != "00000000-0000-0000-0000-000000000000")
                auth.addProductInCart(prod);
        }

    }

    return (
        <div className="row">
            <div className="col-6 d-flex justify-content-center">
                <img className={styles.img_for_single_photo} src={product?.imagePath} />
            </div>
            <div className="col-6 d-flex justify-content-center flex-column">
                {product != undefined
                    ?
                    (
                        <div className="d-flex justify-content-center flex-column">
                            <h1>{product?.name}</h1>
                            <h2 className="text-success">{formatter.format(product.price)}</h2>
                            <h5>{product?.description}</h5>
                            <form >
                                <div className="d-flex justify-content-center">
                                    {auth.isAuthenticated
                                        ?
                                        (
                                            <button type="submit" className=" btn w-50 btn-success" onClick={InCardClick}>In card</button>
                                        )
                                        :
                                        (
                                            <button type="submit" className=" btn w-50 btn-success disabled">In card</button>
                                        )
                                    }
                                </div>
                            </form>
                        </div>
                    )
                    : <h1>Product not found</h1>}

            </div>
        </div>

    )
}

export default ShowProduct