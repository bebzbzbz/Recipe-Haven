import { useContext, useEffect } from "react";
import { mainContext } from "../context/MainProvider";
import IRecipe from "../models/IRecipe";
import supabase from "../utils/supabase";
import Teaser from "../components/Teaser";

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
            <div className="grid md:grid-cols-3 gap-7">
                {recipes ? recipes.map((recipe : IRecipe) => <Teaser recipe={recipe} key={crypto.randomUUID()}/>) : <p className="col-span-3">Loading...</p>}
            </div>
        </section>
    );
}

export default Recipes;