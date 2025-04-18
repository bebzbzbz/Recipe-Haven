import { useContext } from "react";
import { mainContext } from "../context/MainProvider";
import NewRecipe from "../components/NewRecipe";
import NewIngredients from "../components/NewIngredients";
import IRecipe from "../models/IRecipe";

interface IContext {
    setValues: (values: IRecipe) => void,
    createdRecipe: IRecipe
}

const CreateRecipe = () => {
    const {createdRecipe} = useContext(mainContext) as IContext

    return (  
        <section className="md:w-3/4 mx-auto">
            {!createdRecipe && <NewRecipe/>} 
            {createdRecipe && <NewIngredients/>}
        </section>
    );
}

export default CreateRecipe;