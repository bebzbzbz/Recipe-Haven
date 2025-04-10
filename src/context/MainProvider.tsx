import { createContext, useState } from "react";
import IRecipe from "../models/IRecipe";
import ICategory from "../models/ICategory";

export const mainContext = createContext({})

const MainProvider = ({children}:{children: React.ReactNode}) => {
    const [recipes, setRecipes] = useState<IRecipe[]>()
    const [categories, setCategories] = useState<ICategory[]>([])
    const [categoryRecipes, setCategoryRecipes] = useState<IRecipe[]>()
    const [currentCategory, setCurrentCategory] = useState<ICategory>()
    const [recipeToEdit, setRecipeToEdit] = useState<IRecipe>()
    const [insert, setInsert] = useState(true)
    const [values, setValues] = useState<IRecipe>({
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
            }
        ]
    })

    return (  
        <>
            <mainContext.Provider value={{recipes, setRecipes, categories, setCategories, currentCategory, setCurrentCategory, categoryRecipes, setCategoryRecipes, recipeToEdit, setRecipeToEdit, values, setValues, insert, setInsert}}>
                {children}
            </mainContext.Provider>
        </>
    );
}

export default MainProvider;