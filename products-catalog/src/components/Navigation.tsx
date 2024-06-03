import { MouseEvent, FC, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { HubConnectionBuilder } from "@microsoft/signalr";

interface NavigationProps {
    isAuthenticated: Boolean;
}

const Navigation: FC<NavigationProps> = ({ isAuthenticated }) => {

    const auth = useContext(AuthContext);
    const logoutHandled = (e: MouseEvent<HTMLElement>) => {
        e.preventDefault();
        auth.logout();
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary">
            <div className="container-fluid d-flex">
                <a className="navbar-brand disable" >Internet Store</a>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ">
                        <li className="nav-item">
                            <Link to={"/"} className="nav-link">Shop</Link>
                        </li>
                        <li className="nav-item ">
                            <Link to={"/cart"} className="nav-link">Cart</Link>
                        </li>
                        <li className="nav-item ">
                            <Link to={"/saller"} className="nav-link">Saller</Link>
                        </li>
                    </ul>
                </div>
                {isAuthenticated && auth.user
                    ?
                    (
                        <div className="collapse navbar-collapse flex-row-reverse" >
                            <ul className="navbar-nav ">
                                <li className="nav-item">
                                    <a className="nav-link" href="/" onClick={logoutHandled}>Log out</a>
                                </li>
                            </ul>
                            {auth.user.roles.indexOf("Admin") > -1
                                ?
                                (
                                    <ul className="navbar-nav ">
                                        <li className="nav-item">

                                            <Link to={"/profile"} className="nav-link position-relative">{auth.user?.userName}
                                                {auth.UnreadCount! > 0 &&
                                                    <span className="position-absolute top-25 start-75 translate-middle badge rounded-pill bg-danger ">
                                                        {auth.UnreadCount}
                                                    </span>
                                                }

                                            </Link>

                                        </li>
                                    </ul>
                                )
                                :
                                (
                                    <></>
                                )

                            }

                        </div>
                    )
                    :
                    (

                        <div className="collapse navbar-collapse flex-row-reverse" >
                            <ul className="navbar-nav ">
                                <li className="nav-item">
                                    <Link to={"/login"} className="nav-link">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={"/registation"} className="nav-link">Registation</Link>
                                </li>
                            </ul>
                        </div>
                    )
                }

            </div>
        </nav>
    )
}

export default Navigation