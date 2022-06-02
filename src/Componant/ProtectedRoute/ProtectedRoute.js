import { Outlet } from "react-router-dom";
import Login from "../Login/Login";



const useAuth = () => {
    let token = localStorage.getItem("login-token");
    return token 
}

const ProtectedRoute = () => {
    const isauth = useAuth()
    return isauth ? <Outlet/> : <Login/>
}

export default ProtectedRoute