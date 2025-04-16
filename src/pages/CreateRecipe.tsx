import { useContext, useEffect } from "react";
import { mainContext } from "../context/MainProvider";
import NewRecipe from "../components/NewRecipe";
import EditRecipe from "../components/EditRecipe";
import NewIngredients from "../components/NewIngredients";
import IRecipe from "../models/IRecipe";

interface IContext {
    setValues: (values: IRecipe) => void,
    recipeToEdit: IRecipe,
    edit: boolean,
    createdRecipe: IRecipe
}

const CreateRecipe = () => {
    const {setValues, recipeToEdit, edit, createdRecipe} = useContext(mainContext) as IContext

    useEffect(() => {
        if (recipeToEdit) {
            setValues(recipeToEdit);
        }
    }, [edit, recipeToEdit]);

    return (  
        <section className="md:px-30">
            {!createdRecipe && (edit ? <EditRecipe/> : <NewRecipe/>)} 
            {createdRecipe && <NewIngredients/>}
        </section>
    );
}

export default CreateRecipe;