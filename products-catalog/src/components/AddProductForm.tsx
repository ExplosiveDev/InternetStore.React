import React, {FC, ChangeEvent , FormEvent, useState} from "react";
import '../assets/styles/bootstrap.min.css';
import ProductCreate from "../Models/ProductCreate";
import { createProduct } from "../services/products";

const initState = {
    name: '',
    price: 0,
    description:'',
    imagePath: '',
    count:0,
}

const AddProudctForm: FC = () => {

    const [newProduct,setNewProduct] = 
        useState<ProductCreate>(initState);

    const handleChanged = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setNewProduct({
            ...newProduct,
            [name]:value
        });

    }

    const handleSumbit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await createProduct(newProduct);
        console.log(newProduct);
        setNewProduct(initState);
 
    }

    return(
        <form onSubmit={handleSumbit}>

            <input name="name" className="form-control mb-3" placeholder='Name' value={newProduct.name} onChange={handleChanged}></input>
            <input name="price" className="form-control mb-3" placeholder='Price' value={newProduct.price} onChange={handleChanged}></input>
            <input name="description" className="form-control mb-3" placeholder='Description' value={newProduct.description} onChange={handleChanged}></input>
            <input name="imagePath" className="form-control mb-3" placeholder='Image' value={newProduct.imagePath} onChange={handleChanged}></input>
            <input name="count" className="form-control mb-3" placeholder='Count' value={newProduct.count} onChange={handleChanged}></input>

            <button type="submit" className="btn btn-primary mb-3">Create</button>
        
        </form>
    )
}

export default AddProudctForm;