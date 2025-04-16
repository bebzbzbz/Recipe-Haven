import { useContext, useEffect } from "react";
import { mainContext } from "../context/MainProvider";
import IRecipe from "../models/IRecipe";
import Teaser from "../components/Teaser";
import supabase from "../utils/supabase";

interface IContext {
    recipes: IRecipe[],
    setRecipes: (recipes: IRecipe[]) => void
}

const Recipes = () => {
    const {recipes, setRecipes} = useContext(mainContext) as IContext;

    useEffect(() => {
        const fetchData = async () => {
        try {
            const {data: allRecipes} = await supabase.from("recipes").select("*")
        
            if(allRecipes) {
                setRecipes(allRecipes || [])
            }
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    },[])
    
    return (  
        <section  className="text-center">
            <h2 className="mb-15">All recipes</h2>
            <div className="grid md:grid-cols-3 gap-7">
                {recipes && recipes.map((recipe : IRecipe) => <Teaser recipe={recipe} key={crypto.randomUUID()}/>)}
            </div>
        </section>
    );
}

export default Recipes;