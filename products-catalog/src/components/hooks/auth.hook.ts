import { useCallback, useState, useEffect } from "react"
import User from "../../Models/User";

const storageName = 'userData';

const initState = {
    id:'',
    userName:'',
    email: '',
    passwordHash: '',
};

export const useAuth = () =>{
    
    const [token,setToken] = useState<string | null>();
    const [user,setUser] = useState<User | null>();

    const login = useCallback( (jwtToken:string, user:User) => {
        setToken(jwtToken);
        setUser(user);

        localStorage.setItem(storageName, JSON.stringify( {
            user:user, token:jwtToken
        }))
    }, [])
    
    const logout = useCallback ( () => {
        setToken("");
        setUser(initState);
        localStorage.removeItem(storageName);
    }, [])

    useEffect( () => {
        const data = JSON.parse(localStorage.getItem(storageName)!);

        if(data && data.token){
            login(data.token,data.user)
        }
    }, [login])
    return {login, logout, token, user};
}