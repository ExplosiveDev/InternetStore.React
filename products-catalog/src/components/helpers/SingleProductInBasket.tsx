import { FC, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { MouseEvent } from "react";
import ProductInBasket from "../../Models/ProductInBasket";
import "@fortawesome/fontawesome-free/css/all.css";
import { AuthContext } from "../../context/AuthContext";
import {deleteProductFromBasket} from "../../services/baskets"

interface SingleProductInBasketProps {
    product: ProductInBasket;
}

const SingleProductInBasket: FC<SingleProductInBasketProps> = ({ product }) => {

    const auth = useContext(AuthContext);
    const formatter = new Intl.NumberFormat('default', {
        style: 'currency',
        currency: 'UAH',
    });

    const [isHovered, setIsHovered] = useState(false);

    const ChangeCounteClick = async (e: MouseEvent<HTMLElement>) => {
        e.preventDefault();
        const name = (e.target as HTMLElement).getAttribute('name');
        auth.changeCount(name!, product.id)
    }
    const deleteClick = async (e: MouseEvent<HTMLElement>) => {
        e.preventDefault();

        auth.deleteProduct(product.id);
        if(auth.user?.id != null && auth.token != null){
            await deleteProductFromBasket(auth.user.id,auth.token, product.id);
        }
    }

    return (

        <div className="d-flex border rounded-3 pt-2 pb-2 col-12 align-self-center position-relative" style={{ height: "150px" }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Кнопка корзини для видалення */}
            <div className={`position-absolute top-0 start-0 ${isHovered ? 'show' : 'hide'} animated-button`}>
                <button className="btn btn-danger" onClick={deleteClick}><span className="fas fa-trash"></span></button>
            </div>

            <div className="d-flex col-3 justify-content-center">
                <Link to={`/product/${product.product.id}`} className="d-flex ps-5">
                    <img style={{ maxWidth: "200px", maxHeight: "200px", minHeight: "120px" }} src={product.product.imagePath} alt={product.product.name}></img>
                </Link>
            </div>
            <div className="d-flex col-7 flex-column">
                <div className="d-flex justify-content-center mt-4">
                    <p className="h2 d-flex">{product.product.name}</p>
                </div>
                <div className="d-flex justify-content-center">
                    <p className="h3 d-flex text-success">{formatter.format(product.product.price)}</p>
                </div>
            </div>
            <div className="d-flex flex-column col-2">
                <div className="d-flex border h-25">
                    <button className="btn btn-success w-100" name="CountPlus" onClick={ChangeCounteClick}><span className="fas fa-caret-up"></span></button>
                </div>
                <div className="d-flex border h-50">
                    <input type="number" className="form-control text-center fs-2" id="fromPriceInput"
                        min={1} value={product.count} readOnly />
                </div>
                <div className="d-flex border h-25">
                    <button className="btn btn-success w-100" name="CountMinus" onClick={ChangeCounteClick}><span className="fas fa-caret-down"></span></button>
                </div>
            </div>
        </div>
    )

}

export default SingleProductInBasket;