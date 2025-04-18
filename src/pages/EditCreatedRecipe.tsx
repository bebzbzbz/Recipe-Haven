import { useContext, useEffect } from "react";
import { mainContext } from "../context/MainProvider";
import EditRecipe from "../components/EditRecipe";
import IRecipe from "../models/IRecipe";
import EditIngredients from "../components/EditIngredients";

interface IContext {
    setValues: (values: IRecipe) => void,
    recipeToEdit: IRecipe,
    editIngredientsAble: boolean
}

const CreateRecipe = () => {
    const {setValues, recipeToEdit, editIngredientsAble} = useContext(mainContext) as IContext

    useEffect(() => {
        if (recipeToEdit) {
            setValues(recipeToEdit);
        }
    }, [recipeToEdit]);

    return (  
        <section className="md:w-3/4 mx-auto">
            {!editIngredientsAble ? <EditRecipe/> : <EditIngredients/>} 
        </section>
    );
}

export default CreateRecipe;