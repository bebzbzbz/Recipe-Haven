import { useContext, useEffect, useState } from "react";
import supabase from "../utils/supabase";
import { useNavigate, useParams } from "react-router-dom";
import IIngredient from "../models/IIngredient";
import Button from "../components/Button";
import IRecipe from "../models/IRecipe";
import { mainContext } from "../context/MainProvider";

interface IContext {
  setRecipeToEdit: (recipeToEdit: IRecipe) => void,
  setEdit: (edit: boolean) => void,
  setCreatedRecipe: (createdRecipe: IRecipe | null) => void,
  isLoggedIn: boolean
}

const RecipeDetails = () => {
  const [sureDelete, setSureDelete] = useState<boolean>(false)
  const [recipeDetails, setRecipeDetails] = useState<IRecipe>()

  const {setRecipeToEdit, setEdit, setCreatedRecipe, isLoggedIn} = useContext(mainContext) as IContext;

  const {recipeParam} = useParams()

  const navigate = useNavigate();

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

  const handleDelete = async () => {
    setSureDelete(false)
    const {error: errorDelete} = await supabase.from("recipes").delete().eq("id", recipeParam)

    if(errorDelete){
        console.error("Error while saving recipe", errorDelete)
    } else {
        console.log("Recipe deleted successfully")
        navigate("/recipes")
    }
  }

  const handleEdit = () => {
    if (recipeDetails) {
      setRecipeToEdit(recipeDetails);
    }
    setEdit(true)
    setCreatedRecipe(null)
    navigate("/create-recipe")
  }

  return (  
      <section className="flex flex-col-reverse lg:flex-row gap-10 w-3/4 mx-auto justify-between">
        <div className="flex flex-col gap-5 lg:w-1/2">
          <div>
            <h2>{recipeDetails?.name}</h2>
            <p>{recipeDetails?.description}</p>
          </div>
          
          <div>
            <h3>Ingredients</h3>
            <h4 className="mb-2">For {recipeDetails?.servings} Servings</h4>

            <ul className="list-disc ml-5">
              {recipeDetails?.ingredients && recipeDetails.ingredients.map((ingredient: IIngredient) => 
                <li className="mb-1" key={crypto.randomUUID()}>{ingredient.name}
                  <ul>
                    <li>{ingredient.quantity} {ingredient.unit}{ingredient.additional_info && `, ${ingredient.additional_info}`}</li>
                  </ul>
                </li>
                )}
            </ul>
          </div>
    
          <div>
            <h3>Instructions</h3>
            <ol className="list-decimal ml-5">
              {recipeDetails?.instructions.split(". ").map((instruction : string) => <li key={crypto.randomUUID()}>{instruction}</li>)}
            </ol>
          </div>
          {isLoggedIn && 
            <div className="flex gap-2">
            <Button 
              text="Edit Recipe" 
              action={handleEdit} 
              title="Edit recipe" 
              buttonType="button" 
              bgColor="bg-amber-600" 
              hoverBgColor="hover:bg-amber-500"
            />

            {!sureDelete ? 
              <Button 
                text="Delete Recipe" 
                title="Delete recipe" 
                action={() => setSureDelete(true)} 
                buttonType="button" 
                bgColor="bg-red-600" 
                hoverBgColor="hover:bg-red-500"
              />
              : 
              <Button 
                text="Are you sure?" 
                title="Delete recipe" 
                action={handleDelete} 
                buttonType="button" 
                bgColor="bg-red-600" 
                hoverBgColor="hover:bg-red-500"
              />
            } 
          </div>}
        </div>
        <img src={recipeDetails?.image} alt={recipeDetails?.name} className="rounded-xl max-h-120 lg:w-1/2 object-cover"/>
      </section>
  );
}

export default RecipeDetails;