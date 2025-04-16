import { useContext } from "react";
import { Link } from "react-router-dom";
import { mainContext } from "../context/MainProvider";
import IRecipe from "../models/IRecipe";
import supabase from "../utils/supabase";

interface IContext {
    setEdit: (edit: boolean) => void,
    setValues: (values: IRecipe | null) => void,
    setRecipeToEdit: (recipeToEdit: IRecipe | null) => void,
    setCreatedRecipe: (createdRecipe: IRecipe | null) => void,
    isLoggedIn: boolean,
    mobileNav: boolean,
    setMobileNav: (mobileNav: boolean) => void
}

const Nav = () => {
    const { setEdit, setValues, setRecipeToEdit, setCreatedRecipe, isLoggedIn, mobileNav, setMobileNav } = useContext(mainContext) as IContext

    const resetForm = () => {
        setEdit(false)
        setValues(null)
        setRecipeToEdit(null)
        setCreatedRecipe(null)
        setMobileNav(false)
    }

    const signout = async() => {
        const {error} = await supabase.auth.signOut();
        if(error) {
            console.error("Error while signing out",error)
        } else {
            location.reload()
            setMobileNav(false)
        }
    }

    return (  
        <nav className={`flex flex-col absolute top-0 bottom-0 z-20 items-start justify-start gap-7 pt-10 pr-20 pl-15 ${mobileNav ? `right-0` : `-right-150`} lg:flex lg:flex-row lg:static lg:items-center lg:justify-between lg:py-6 lg:px-30 bg-white transition-all duration-500`}>
            <Link to="/" className="flex items-center gap-3 relative"  onClick={() => setMobileNav(false)}><img src="/svg/ramen.svg" className="h-8" alt="Bowl of noodles" />
                World of Recipes
                {mobileNav && <img src="/svg/close.svg" onClick={() => setMobileNav(false)} className="absolute -right-10 h-4 lg:hidden"/>}
            </Link>
            <ul className={`flex flex-col gap-3 lg:flex-row lg:gap-5`}>
                <li><Link to="/" onClick={() => setMobileNav(false)}>Home</Link></li>
                <li><Link to="/recipes" onClick={() => setMobileNav(false)}>Recipes</Link></li>
                <li><Link to="/create-recipe" onClick={resetForm}>Create a Recipe</Link></li>
                <li><Link to="/aboutus" onClick={() => setMobileNav(false)}>About Us</Link></li>
            </ul>
            <ul className={`flex flex-col gap-3 lg:flex-row lg:gap-5`}>
                {isLoggedIn ? 
                <>
                <li><Link to="/profile" onClick={() => setMobileNav(false)}>Profile</Link></li> 
                <li><Link to="" onClick={signout}>Log Out</Link></li>
                </>
                : <>
                <li><Link to="/login" onClick={() => setMobileNav(false)}>Login</Link></li>
                <li><Link to="/signup" onClick={() => setMobileNav(false)}>Sign Up</Link></li>
                </>}
            </ul>
        </nav>
    );
}

export default Nav;