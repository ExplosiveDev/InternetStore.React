import axios from "axios";
import Product from "../Models/Product";
import Brand from "../Models/Brand";
import Category from "../Models/Category";

// headers:{
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjNDI0MmM4OS1mNjczLTQwMmMtYjZjYy05MzljMjI5OTc0YzAwIiwiZXhwIjoxNzExNDYyNzg4fQ.UH9KL67gS3EuWdRQkQ2ywxxE1O33WwP7G1b5IMomUdA'
// }

export const getAllProducts = async (): Promise<Product[]> => {
    const response = await axios.get<Product[]>('https://localhost:7250/Products');
    return response.data;
}

export const getAllBrands = async (): Promise<Brand[]> => {
    const response = await axios.get<Brand[]>(`https://localhost:7250/Brands`)
    return response.data;
}

export const getProductById = async (id: string): Promise<Product> => {
    const response = await axios.get<Product>(`https://localhost:7250/Products/${id}`);
    return response.data;
}

export const getAllCategories = async (): Promise<Category[]> => {
    const response = await axios.get<Category[]>(`https://localhost:7250/Categories`)
    return response.data;
}