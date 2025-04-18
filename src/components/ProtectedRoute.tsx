import { useContext, useEffect } from "react";
import { mainContext } from "../context/MainProvider";
import IUser from "../models/IUser";
import { Navigate } from "react-router-dom";

interface IContext {
    setUser: (user: IUser) => void,
    isLoggedIn: boolean,
    setIsLoggedIn: (isLoggedIn: boolean) => void,
    checkLoginStatus: () => void
}

const ProtectedRoute = ({children}:{children: React.ReactNode}) => {
    const {isLoggedIn, setIsLoggedIn, setUser, checkLoginStatus} = useContext(mainContext) as IContext

    useEffect(() => {
        checkLoginStatus()
    }, [setIsLoggedIn, setUser])

    return !isLoggedIn ? <Navigate to="/login" replace/> : children;
}

export default ProtectedRoute;