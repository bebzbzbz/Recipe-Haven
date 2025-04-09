import { createContext, useState } from "react";
import IRecipe from "../models/IRecipe";
import ICategory from "../models/ICategory";

export const mainContext = createContext({})

const MainProvider = ({children}:{children: React.ReactNode}) => {
    const [recipes, setRecipes] = useState<IRecipe[]>()
    const [categories, setCategories] = useState<ICategory[]>([])
    const [categoryRecipes, setCategoryRecipes] = useState<IRecipe[]>()
    const [currentCategory, setCurrentCategory] = useState<ICategory>()

    return (  
        <>
            <mainContext.Provider value={{recipes, setRecipes, categories, setCategories, currentCategory, setCurrentCategory, categoryRecipes, setCategoryRecipes}}>
                {children}
            </mainContext.Provider>
        </>
    );
}

export default MainProvider;