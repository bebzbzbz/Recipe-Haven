import { useContext } from "react";
import { Link } from "react-router-dom";
import { mainContext } from "../context/MainProvider";
import IRecipe from "../models/IRecipe";
import supabase from "../utils/supabase";
import IUser from "../models/IUser";

interface IContext {
    setEdit: (edit: boolean) => void,
    setValues: (values: IRecipe | null) => void,
    setRecipeToEdit: (recipeToEdit: IRecipe | null) => void,
    setCreatedRecipe: (createdRecipe: IRecipe | null) => void,
    isLoggedIn: boolean,
    mobileNavToggle: boolean,
    setMobileNavToggle: (mobileNavToggle: boolean) => void,
    user: IUser
}

const Nav = () => {
    const { setValues, setCreatedRecipe, isLoggedIn, mobileNavToggle, setMobileNavToggle, user } = useContext(mainContext) as IContext

    const resetForm = () => {
        setValues(null)
        setCreatedRecipe(null)
        setMobileNavToggle(false)
    }

    const signout = async() => {
        const {error} = await supabase.auth.signOut();
        if(error) {
            console.error("Error while signing out",error)
        } else {
            location.reload()
            setMobileNavToggle(false)
        }
    }

    return (  
        <nav className={`flex flex-col absolute top-0 bottom-0 z-20 items-start justify-start gap-7 pt-10 pr-20 pl-15 bg-recipe-brown ${mobileNavToggle ? `right-0` : `-right-150`} lg:flex lg:flex-row lg:left-0 lg:right-0 lg:bottom-auto text-white lg:items-center lg:justify-between lg:py-3 lg:px-30 transition-all duration-500`}>
            <Link to="/" className="flex items-center gap-3 relative"  onClick={() => setMobileNavToggle(false)}><img src="/svg/onion.svg" className="invert h-11" alt="Onion Icon" />
                Recipe Haven
                {mobileNavToggle && <img src="/svg/close.svg" onClick={() => setMobileNavToggle(false)} className="absolute -right-10 h-4 lg:hidden invert"/>}
            </Link>
            <ul className={`flex flex-col gap-3 lg:flex-row lg:gap-5`}>
                <li><Link to="/" onClick={() => setMobileNavToggle(false)}>Home</Link></li>
                <li><Link to="/recipes" onClick={() => setMobileNavToggle(false)}>Recipes</Link></li>
                <li><Link to="/create-recipe" onClick={resetForm}>Create a Recipe</Link></li>
                <li><Link to="/aboutus" onClick={() => setMobileNavToggle(false)}>About Us</Link></li>
            </ul>
            <ul className={`flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-5`}>
                {isLoggedIn ? 
                <>
                <li><Link to="" onClick={signout}>Log Out</Link></li>
                <li><Link className="flex flex-col lg:flex-row lg:items-center gap-3" to="/profile" onClick={() => setMobileNavToggle(false)}>Profile
                <img src={user?.img_url ? user?.img_url : "/svg/onion.svg"}
                    className="rounded-full h-12 w-12 lg:h-10 lg:w-10 object-cover"/></Link></li> 
                </>
                : <>
                <li><Link to="/login" onClick={() => setMobileNavToggle(false)}>Login</Link></li>
                <li><Link to="/signup" onClick={() => setMobileNavToggle(false)}>Sign Up</Link></li>
                </>}
            </ul>
        </nav>
    );
}

export default Nav;