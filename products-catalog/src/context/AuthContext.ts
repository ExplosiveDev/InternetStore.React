// import { createContext } from "react";

// function noop() {}; 

// export const AuthContext = createContext({
//     token:null,
//     user:null,
//     login:noop(),
//     logout:noop(),
//     isAuthenticated:false,
// })

import { createContext } from "react";
import User from "../Models/User";


interface AuthContextType {
    token: string | null;
    user: User | null; 
    login: (jwtToken: string, user: User) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

function noop() {}

const defaultAuthContext: AuthContextType = {
    token: null,
    user: null,
    login: noop,
    logout: noop,
    isAuthenticated: false,
};

export const AuthContext = createContext(defaultAuthContext);