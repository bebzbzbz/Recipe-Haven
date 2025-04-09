import { useEffect, useState } from "react";
import supabase from "../utils/supabase";
import { useParams } from "react-router-dom";
import IRecipe from "../models/IRecipe";
import IIngredient from "../models/IIngredient";

const RecipeDetails = () => {
  const [recipeDetails, setRecipeDetails] = useState<IRecipe>()
  const {recipeParam} = useParams()

    useEffect(() => {
        const fetchData = async () => {
          try {
              const {data: singleRecipe} = await supabase.from("recipes").select("*, ingredients(*)").eq("id", recipeParam)

              if(singleRecipe) {
                setRecipeDetails(singleRecipe?.[0] || null)
              }
          } catch (error) {
              console.log(error)
          }
        }
        fetchData()
      }, [recipeParam])

      console.log(recipeDetails)

    return (  
        <section className="grid grid-cols-2 gap-10 w-3/4 mx-auto justify-between">
          <div>
            <h2>{recipeDetails?.name}</h2>

            <p>{recipeDetails?.description}</p>

            <p>Servings: {recipeDetails?.servings}</p>
            <h3>Ingredients</h3>
            <ul>
              {recipeDetails?.ingredients && recipeDetails.ingredients.map((ingredient: IIngredient) => <li>● {ingredient.name}</li>)}
            </ul>

            <p>{recipeDetails?.instructions}</p>

          </div>
          <div>
            <img src={recipeDetails?.image} alt={recipeDetails?.name} className="rounded-3xl max-h-120 w-full object-cover"/>
          </div>
        </section>
    );
}

export default RecipeDetails;