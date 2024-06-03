import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import '../assets/styles/bootstrap.min.css'
import '../assets/styles/style.css'
import Product from "../Models/Product";
import DisplayProducts from "../components/DisplayProducts";
import { getAllCategories, getAllProducts } from "../services/products";
import Category from "../Models/Category";

const Shop: FC = () => {
    
    const priceFrom_input = document.getElementById("fromPriceInput") as HTMLInputElement;
    const priceTo_input = document.getElementById("toPriceInput") as HTMLInputElement;

    const [OriginStorageProduct, setOriginStorageProduct] = useState<Product[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const ProductData: Product[] = await getAllProducts();
            const sortedProducts = ProductData.sort((a, b) => b.price - a.price);
            setOriginStorageProduct(sortedProducts);
            setProducts(sortedProducts);
            
            const CategoryData: Category[] = await getAllCategories();
            setCategories(CategoryData);
            setLoading(false);
        }

        fetchData();
        
    }, []);


    const [selectCategory, setSelectCategory] = useState<string>("None");
    const [search, setSearch] = useState<string>("");
    const searchChanged = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearch(value);
    }
    const handleSumbit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const regex = new RegExp(search, "i");
        if(selectCategory != "None"){      
            setProducts(OriginStorageProduct.filter(
                x => regex.test(x.name) &&
                x.category.name == selectCategory));
        }
        else{
            setProducts(OriginStorageProduct.filter(
                x => regex.test(x.name)))
        }
    }


    const selectChanged = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setSelectCategory(value);
    }
    useEffect(() => {
        const regex = new RegExp(search, "i");
        if(selectCategory != "None"){
            setProducts(OriginStorageProduct.filter(
                x => x.category.name === selectCategory && 
                regex.test(x.name)));
        }
        else{
            setProducts(OriginStorageProduct.filter(
                 x => regex.test(x.name)));
        }
    }, [selectCategory]);



    const [priceFrom, setPriceFrom] = useState<number>();
    const [priceTo, setPriceTo] = useState<number>();
    useEffect(() => {
        const { maxPrice, minPrice } = products.reduce((result, product) => {
            if (product.price > result.maxPrice) result.maxPrice = product.price;
            if (product.price < result.minPrice) result.minPrice = product.price;
            return result;
        }, { maxPrice: -Infinity, minPrice: Infinity });

        setPriceFrom(minPrice);
        setPriceTo(maxPrice);

    }, [products]);
    const priceChanged = async (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        if (id === "fromPriceInput") {
            if(Number(value) > priceTo!) priceFrom_input.className = "form-control border border-danger";
            else{
                priceFrom_input.className = "form-control";
                setPriceFrom(Number(value));
            }
        }
        else {
            if(Number(value) < priceFrom!) priceTo_input.className = "form-control border border-danger";
            else{
                priceTo_input.className = "form-control";
                setPriceTo(Number(value));
            }
        }
    }
    useEffect(() => {
        if(priceFrom != null && priceTo != null)
        {
            const inputFrom = document.getElementById("fromPriceInput") as HTMLInputElement;
            const inputTo = document.getElementById("toPriceInput") as HTMLInputElement;
            inputFrom.value = priceFrom.toString();
            inputTo.value = priceTo.toString();
            const regex = new RegExp(search, "i");
            if(selectCategory != "None") {
                setProducts(OriginStorageProduct.filter(
                    x => x.category.name === selectCategory && 
                    regex.test(x.name) && 
                    x.price >= priceFrom! && x.price <= priceTo!));
                }
            else{
                setProducts(OriginStorageProduct.filter(
                    x => regex.test(x.name) && 
                    x.price >= priceFrom! && x.price <= priceTo!));
            }

        }
    }, [priceFrom, priceTo]);



    return (
        <>
            <div className="mb-2">
                <form onSubmit={handleSumbit} className="d-flex mb-1 flex-column">
                    <div className="input-group">
                        <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" onChange={searchChanged} />
                        <button type="submit" className="btn btn-success" data-mdb-ripple-init>search</button>
                    </div>
                </form>
                <div className="dropdown d-flex justify-content-center ">
                    <button className="btn btn-secondary dropdown-toggle w-100 d-flex justify-content-center" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    </button>
                    <div className="dropdown-menu w-100" aria-labelledby="dropdownMenuButton">
                        <div className="d-flex justify-content-center">
                            <h5>Filter options</h5>
                        </div>
                        <form>
                            <div className="row justify-content-center ps-2 pe-2">
                                <div className="col-4 d-flex align-items-center form-floating">
                                    <select className="form-select" aria-placeholder="category" id="categories" onChange={selectChanged}  defaultValue={"None"}>
                                        <option>None</option>
                                        {categories.map((category) => {
                                            return <option key={category.id} value={category.name}>{category.name}</option>
                                        })}
                                    </select>
                                    <label htmlFor="categories" className="ps-4">Category</label>
                                </div>
                                <div className="col-8 d-flex align-items-center form-floating">
                                    <div className="d-flex align-items-center col-6 pe-1 ">
                                        <span className="input-symbol-euro form-floating w-100">
                                            <input type="number" className="form-control" id="fromPriceInput"
                                                 min={1} onBlur={priceChanged} />
                                            <label htmlFor="fromPriceInput">From</label>
                                        </span>
                                    </div>
                                    <div className="d-flex align-items-center col-6 ps-1">
                                        <span className="input-symbol-euro form-floating w-100">
                                            <input type="number" className="form-control" id="toPriceInput"
                                                 min={1} onBlur={priceChanged}/>
                                            <label htmlFor="toPriceInput">To</label>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {
                loading
                    ? <h1>Loading....</h1>
                    :
                    (
                        <>
                            <DisplayProducts productsArray={products} />
                        </>
                    )
            }
        </>
    )
}

export default Shop