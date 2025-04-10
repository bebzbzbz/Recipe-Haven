import { useContext, useEffect } from "react";
import { mainContext } from "../context/MainProvider";
import NewRecipe from "../components/NewRecipe";
import EditRecipe from "../components/EditRecipe";

const CreateRecipe = () => {
    const {values, setValues, recipeToEdit, setRecipeToEdit, insert, setInsert} = useContext(mainContext) as any

    useEffect(() => {
        if(recipeToEdit) {
            setInsert(false)
            setValues(recipeToEdit)
        } 
        if (!recipeToEdit) {
            setValues({})
            setInsert(true)
            console.log("hallloo")
            // setValues({});
        }
    }, [recipeToEdit, insert])

    console.log(insert)

    return (  
        <>
            {insert ? <NewRecipe/> : <EditRecipe/>} 
        </>
    );
}

export default CreateRecipe;