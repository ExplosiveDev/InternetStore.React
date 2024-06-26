import { FC, useEffect } from "react"
import Shop from "./Shop"
import { Route, Routes } from "react-router-dom"
import Cart from "./Cart"
import ShowProduct from "./ShowProduct"
import Login from "./Login"
import Registration from "./Registration"
import Navigation from "../components/Navigation"
import User from "../Models/User"
import Profile from "./Profile"
import BecomeSellerForm from "./BecomeSellerForm"

interface MyRoutesProps {
    isAuthenticated: Boolean;
    user: User;
}
const MyRoutes: FC<MyRoutesProps> = ({ isAuthenticated, user }) => {

    if (isAuthenticated) {
        return (
            <>
                <Navigation isAuthenticated={isAuthenticated}></Navigation>
                <div className="container d-flex flex-column mt-2 justify-content-center">
                    <Routes>
                        <Route path="/" element={<Shop />}></Route>
                        <Route path="/product/:id" element={<ShowProduct />}></Route>
                        <Route path="/cart" element={<Cart />}></Route>
                        <Route path="/profile" element={<Profile/>}></Route>
                        <Route path="/saller" element={<BecomeSellerForm />}></Route>

                        {/* {
                            user.roles.indexOf("Admin") != -1 
                            ?(
                                
                            )
                            :(

                            )
                        } */}
                    </Routes>
                </div>
            </>
        )
    }
    else {
        return (
            <>
                <Navigation isAuthenticated={isAuthenticated}></Navigation>
                <div className="container d-flex flex-column mt-2 justify-content-center">
                    <Routes>
                        <Route path="/" element={<Shop />}></Route>
                        <Route path="/product/:id" element={<ShowProduct />}></Route>
                        <Route path="/cart" element={<Cart />}></Route>
                        <Route path="/login" element={<Login />}></Route>
                        <Route path="/registation" element={<Registration />}></Route>
                    </Routes>
                </div>
            </>
        )
    }

}

export default MyRoutes;