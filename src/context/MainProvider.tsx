import { createContext, useState } from "react";
import IRecipe from "../models/IRecipe";
import ICategory from "../models/ICategory";
import IUser from "../models/IUser";

export const mainContext = createContext({})

const MainProvider = ({children}:{children: React.ReactNode}) => {
    const [recipes, setRecipes] = useState<IRecipe[]>()
    const [categories, setCategories] = useState<ICategory[]>([])
    const [categoryRecipes, setCategoryRecipes] = useState<IRecipe[]>()
    const [currentCategory, setCurrentCategory] = useState<ICategory>()
    const [recipeToEdit, setRecipeToEdit] = useState<IRecipe | null>(null)
    const [edit, setEdit] = useState<boolean>(false)
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
    const [user, setUser] = useState<IUser | null>(null)
    const [profile, setProfile] = useState<IUser | null>(null)
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const [mobileNav, setMobileNav] = useState<boolean>(false)

    return (  
        <>
            <mainContext.Provider value={{recipes, setRecipes, categories, setCategories, currentCategory, setCurrentCategory, categoryRecipes, setCategoryRecipes, recipeToEdit, setRecipeToEdit, values, setValues, edit, setEdit, createdRecipe, setCreatedRecipe, user, setUser, profile, setProfile, isLoggedIn, setIsLoggedIn, mobileNav, setMobileNav}}>
                {children}
            </mainContext.Provider>
        </>
    );
}

export default MainProvider;