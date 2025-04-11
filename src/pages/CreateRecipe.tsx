import { useContext, useEffect } from "react";
import { mainContext } from "../context/MainProvider";
import NewRecipe from "../components/NewRecipe";
import EditRecipe from "../components/EditRecipe";

const CreateRecipe = () => {
    const {values, setValues, recipeToEdit, setRecipeToEdit, insert, setInsert} = useContext(mainContext) as any

    useEffect(() => {
        if (recipeToEdit) {
            setValues(recipeToEdit);
            setInsert(false);
        }

        // if (values.id !== "") {
        //     setRecipeToEdit(null);
        // }
    }, [recipeToEdit]);

    return (  
        <>
            {insert ? <NewRecipe/> : <EditRecipe/>} 
        </>
    );
}

export default CreateRecipe;