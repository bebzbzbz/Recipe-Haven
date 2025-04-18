import { useContext, useEffect } from "react"
import IRecipe from "../models/IRecipe"
import { useParams } from "react-router-dom"
import { mainContext } from "../context/MainProvider"
import supabase from "../utils/supabase"
import ICategory from "../models/ICategory"
import Teaser from "../components/Teaser"

interface IContext {
    setCategoryRecipes: (categoryRecipes: IRecipe[]) => void,
    categoryRecipes: IRecipe[],
    setCurrentCategory: (currentCategory: ICategory[]) => void
}

const Category = () => {
    const {categoryParam} = useParams()

    const {setCategoryRecipes, categoryRecipes, setCurrentCategory} = useContext(mainContext) as IContext

        useEffect(() => {
            const fetchData = async () => {
                try {
                    const {data: recipesByCategory} = await supabase.from("recipes").select("*").eq("category_id", categoryParam)
                    const {data: categoryNow} = await supabase.from("categories").select("*").eq("id", categoryParam)
                
                    if(recipesByCategory) {
                        setCategoryRecipes(recipesByCategory || [])
                    }
                    if(categoryNow) {
                        setCurrentCategory(categoryNow || null)
                    }
                } catch (error) {
                    console.log(error)
                }
                }
                fetchData()
        }, [categoryParam])


        return (  
            <section  className="text-center grid md:grid-cols-3 gap-7">
                {categoryRecipes ? categoryRecipes.map((recipe : IRecipe) => <Teaser recipe={recipe} key={crypto.randomUUID()}/>) : <p className="col-span-3">Loading...</p>}
            </section>
    );
}

export default Category;