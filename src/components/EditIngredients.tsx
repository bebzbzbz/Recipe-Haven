import { ChangeEvent, useContext } from "react";
import Button from "../components/Button";
import supabase from "../utils/supabase";
import { useNavigate } from "react-router-dom";
import { mainContext } from "../context/MainProvider";
import IIngredient from "../models/IIngredient";
import IRecipe from "../models/IRecipe";

interface IContext {
    values: IRecipe,
    setValues: (values:IRecipe) => void
    setEditIngredientsAble: (editIngredientsAble: boolean) => void
}

const EditIngredients = () => {
    const {values, setValues, setEditIngredientsAble} = useContext(mainContext) as IContext
    const navigate = useNavigate();

    const editIngredients = async() => {
        values.ingredients?.map(async (ingredient: IIngredient) => {
            const {error: errorUpdate} = await supabase.from("ingredients").update({
                name: ingredient.name, 
                quantity: ingredient.quantity, 
                unit: ingredient.unit, 
                additional_info: ingredient.additional_info, 
            }).eq("id", ingredient.id)
            if(errorUpdate){
                console.error("Error while editing Ingredient", errorUpdate)
            } else {
                console.log("Ingredient edited successfully")
            }
        })
        
    }
    const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        editIngredients();
        setEditIngredientsAble(false)
        navigate(`/recipes/${values.id}`)
    }

    return (  
        <>
            <h2 className="text-center mb-5 text-4xl font-medium">Edit Ingredients</h2>
        <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 items-center gap-3">
            <fieldset>
                <label htmlFor="ingredient-1-name">1. Ingredient</label>
                <input 
                    type="text" 
                    id="ingredient-1-name" 
                    placeholder="Name of ingredient" 
                    value={values.ingredients?.[0]?.name || ""}
                    onChange={(e) => setValues({
                        ...values, 
                        ingredients: values.ingredients?.map((ingredient: IIngredient, index: number) => 
                            index === 0 ? { ...ingredient, name: e.target.value } : ingredient
                        )
                    })}/>
            </fieldset>
            <fieldset>
                <label htmlFor="ingredient-1-info">1. Additional info</label>
                <input 
                    type="text" 
                    id="ingredient-1-info" 
                    placeholder="i.e. diced, cubed, grated..." 
                    value={values.ingredients?.[0]?.additional_info || ""}
                    onChange={(e) => setValues({
                        ...values, 
                        ingredients: values.ingredients?.map((ingredient: IIngredient, index: number) => 
                            index === 0 ? { ...ingredient, additional_info: e.target.value } : ingredient
                        )
                    })}/>
            </fieldset>
            <fieldset>
                <label htmlFor="ingredient-1-quantity">1. Quantity of ingredient</label>
                <input 
                    type="number" 
                    id="ingredient-1-quantity" 
                    value={values.ingredients?.[0]?.quantity || ""}
                    onChange={(e) => setValues({
                        ...values, 
                        ingredients: values.ingredients?.map((ingredient: IIngredient, index: number) => 
                            index === 0 ? { ...ingredient, quantity: Number(e.target.value) } : ingredient
                        )
                    })}/>
            </fieldset>
            <fieldset>
                <label htmlFor="ingredient-1-unit">1. Unit of ingredient</label>
                <input 
                    type="text" 
                    id="ingredient-1-unit" 
                    placeholder="i.e. ml" 
                    value={values.ingredients?.[0]?.unit || ""}
                    onChange={(e) => setValues({
                        ...values, 
                        ingredients: values.ingredients?.map((ingredient: IIngredient, index: number) => 
                            index === 0 ? { ...ingredient, unit: e.target.value } : ingredient
                        )
                    })}/>
            </fieldset>
            <fieldset>
                <label htmlFor="ingredient-2-name">2. Ingredient</label>
                <input 
                    type="text" 
                    id="ingredient-2-name" 
                    placeholder="Name of ingredient" 
                    value={values.ingredients?.[1]?.name || ""}
                    onChange={(e) => setValues({
                        ...values, 
                        ingredients: values.ingredients?.map((ingredient: IIngredient, index: number) => 
                            index === 1 ? { ...ingredient, name: e.target.value } : ingredient
                        )
                    })}/>
            </fieldset>
            <fieldset>
                <label htmlFor="ingredient-2-info">2. Additional info</label>
                <input 
                    type="text" 
                    id="ingredient-2-info" 
                    placeholder="i.e. diced, cubed, grated..." 
                    value={values.ingredients?.[1]?.additional_info || ""}
                    onChange={(e) => setValues({
                        ...values, 
                        ingredients: values.ingredients?.map((ingredient: IIngredient, index: number) => 
                            index === 1 ? { ...ingredient, additional_info: e.target.value } : ingredient
                        )
                    })}/>
            </fieldset>
            <fieldset>
                <label htmlFor="ingredient-2-quantity">2. Quantity of ingredient</label>
                <input 
                    type="number" 
                    id="ingredient-2-quantity" 
                    value={values.ingredients?.[1]?.quantity || ""}
                    onChange={(e) => setValues({
                        ...values, 
                        ingredients: values.ingredients?.map((ingredient: IIngredient, index: number) => 
                            index === 1 ? { ...ingredient, quantity: Number(e.target.value) } : ingredient
                        )
                    })}/>
            </fieldset>
            <fieldset>
                <label htmlFor="ingredient-2-unit">2. Unit of ingredient</label>
                <input 
                    type="text" 
                    id="ingredient-2-unit" 
                    placeholder="i.e. ml" 
                    value={values.ingredients?.[1]?.unit || ""}
                    onChange={(e) => setValues({
                        ...values, 
                        ingredients: values.ingredients?.map((ingredient: IIngredient, index: number) => 
                            index === 1 ? { ...ingredient, unit: e.target.value } : ingredient
                        )
                    })}/>
            </fieldset>
            <fieldset className="sm:col-span-2 text-center">
                <Button text="Save changes" title="Save changes" buttonType="submit" bgColor="bg-recipe-light-green" hoverBgColor="hover:bg-recipe-green"/>
            </fieldset>
        </form>
        </>
    );
}

export default EditIngredients;