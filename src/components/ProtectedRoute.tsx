import { useContext, useEffect } from "react";
import { mainContext } from "../context/MainProvider";
import IUser from "../models/IUser";
import { Navigate } from "react-router-dom";
import supabase from "../utils/supabase";

interface IContext {
    setUser: (user: IUser) => void,
    isLoggedIn: boolean,
    setIsLoggedIn: (isLoggedIn: boolean) => void
}

const ProtectedRoute = ({children}:{children: React.ReactNode}) => {
    const {isLoggedIn, setIsLoggedIn, setUser} = useContext(mainContext) as IContext

    useEffect(() => {
        const checkLoginStatus = async() => {
            const {data} = await supabase.auth.getUser()
            const user = data?.user
    
            setIsLoggedIn(!!user)
            if(user) {
                setUser(user as unknown as IUser)
            }
        }
        checkLoginStatus()
    }, [setIsLoggedIn, setUser])

    return !isLoggedIn ? <Navigate to="/login" replace/> : children;
}

export default ProtectedRoute;