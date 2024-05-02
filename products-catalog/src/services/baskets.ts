import axios from "axios";
import Basket from "../Models/Basket";
import ProductInBasket from "../Models/ProductInBasket";
import ConfirmCartResponse from "../components/Contracts/ConfirmCartResponse";

// headers:{
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjNDI0MmM4OS1mNjczLTQwMmMtYjZjYy05MzljMjI5OTc0YzAwIiwiZXhwIjoxNzExNDYyNzg4fQ.UH9KL67gS3EuWdRQkQ2ywxxE1O33WwP7G1b5IMomUdA'
// }


export const getBasket = async (userId: string, token: string): Promise<Basket> => {
    const response = await axios.get<Basket>(`https://localhost:7250/Baskets/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    console.log(response.data)
    return response.data;
}

export const setInBasket = async (userId: string, token: string, productId: string): Promise<ProductInBasket> => {
    const response = await axios.post(`https://localhost:7250/Baskets/AddProduct/${userId}`, { id: productId }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}

export const deleteProductFromBasket = async (userId: string, token: string, productInBasketId: string) => {
    const response = await axios.delete(`https://localhost:7250/Baskets/Delete/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: {
            productInBasketId: productInBasketId
        }
    });
}

export const confirmCart = async (userId: string, token: string, data: ConfirmCartResponse[]): Promise<number> => {
    const response = await axios.post(`https://localhost:7250/Baskets/ConfirmBasket/${userId}`, {data}, {
        headers: {
            Authorization: `Bearer ${token}`            
        }
    });
    return response.status;
}