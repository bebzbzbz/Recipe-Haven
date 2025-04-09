import { useContext, useEffect } from "react"
import IRecipe from "../models/IRecipe"
import { useParams } from "react-router-dom"
import { mainContext } from "../context/MainProvider"
import Teaser from "../components/Teaser"
import supabase from "../utils/supabase"

const Category = () => {
    const {categoryParam} = useParams()

    const {setCategoryRecipes, categoryRecipes, setCurrentCategory} = useContext(mainContext) as any

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
        <>
            <section  className="text-center">
                <div className="grid grid-cols-3 gap-7">
                    {categoryRecipes && categoryRecipes.map((recipe : IRecipe) => <Teaser img={recipe.image} name={recipe.name} desc={recipe.description} col={true} id={recipe.id} key={crypto.randomUUID()}/>)}
                </div>
            </section>
        </>
    );
}

export default Category;