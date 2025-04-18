import { createContext, useState } from "react";
import IRecipe from "../models/IRecipe";
import ICategory from "../models/ICategory";
import IUser from "../models/IUser";
import supabase from "../utils/supabase";

export const mainContext = createContext({})

const MainProvider = ({children}:{children: React.ReactNode}) => {
    const [recipes, setRecipes] = useState<IRecipe[]>()
    const [categories, setCategories] = useState<ICategory[]>([])
    const [categoryRecipes, setCategoryRecipes] = useState<IRecipe[]>()
    const [currentCategory, setCurrentCategory] = useState<ICategory>()
    const [recipeToEdit, setRecipeToEdit] = useState<IRecipe | null>(null)
    const [values, setValues] = useState<IRecipe | null>({
        id: "",
        name: "",
        servings: 0,
        description: "",
        instructions: "",
        category_id: "",
        image: "",
        ingredients: [
            {
                id: "",
                recipe_id: "",
                name: "",
                additional_info: "",
                quantity: 0, 
                unit: ""
            },
            {
                id: "",
                recipe_id: "",
                name: "",
                additional_info: "",
                quantity: 0, 
                unit: ""
            }
        ]
    })
    const [createdRecipe, setCreatedRecipe] = useState<IRecipe | null>(null)
    const [editIngredientsAble, setEditIngredientsAble] = useState<boolean>(false)
    const [user, setUser] = useState<IUser | null>(null)
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const [mobileNavToggle, setMobileNavToggle] = useState<boolean>(false)
    const [newUserData, setNewUserData] = useState<IUser | null>(null)

    const checkLoginStatus = async() => {
        const {data} = await supabase.auth.getUser()
        const loggedInUser = data?.user

        setIsLoggedIn(!!loggedInUser)

        if(loggedInUser) {
            const {data: currentUser, error} = await supabase.from("users").select("*").eq("id", loggedInUser?.id)
    
            if(error) {
                console.error("User fetch failed", error)
            } else {
                setUser(currentUser?.[0] || null)
            }
        }
    }

    return (  
        <>
            <mainContext.Provider value={{recipes, setRecipes, categories, setCategories, currentCategory, setCurrentCategory, categoryRecipes, setCategoryRecipes, recipeToEdit, setRecipeToEdit, values, setValues, createdRecipe, setCreatedRecipe, user, setUser, isLoggedIn, setIsLoggedIn, mobileNavToggle, setMobileNavToggle, newUserData, setNewUserData, checkLoginStatus, editIngredientsAble, setEditIngredientsAble}}>
                {children}
            </mainContext.Provider>
        </>
    );
}

export default MainProvider;