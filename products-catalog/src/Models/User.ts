import Product from "./Product";

interface User{
    id:string,
    userName:string,
    email:string,
    passwordHash:string,
    roles: string[],
}

export default User;