import { Outlet } from "react-router-dom";
import Login from "../Login/Login";



const useAuth = () => {
    let token = localStorage.getItem("login-token");
    return token 
}

const PublicRoute = () => {
    const isauth = useAuth()
    return isauth ? <Login/> : <Outlet/>
}

export default PublicRoute