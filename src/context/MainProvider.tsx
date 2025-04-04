import { createContext, useState } from "react";
import IRecipe from "../models/IRecipe";

export const mainContext = createContext({})

const MainProvider = ({children}:{children: React.ReactNode}) => {
    const [ingredients, setIngredients] = useState<IRecipe[]>([])
    const [recipes, setRecipes] = useState<[]>([])
    const [categories, setCategories] = useState<[]>([])

    return (  
        <>
            <mainContext.Provider value={{ingredients, setIngredients, recipes, setRecipes, categories, setCategories}}>
                {children}
            </mainContext.Provider>
        </>
    );
}

export default MainProvider;