import { FormEvent, useContext, useEffect } from "react"
import supabase from "../utils/supabase"
import { mainContext } from "../context/MainProvider"
import IIngredient from "../models/IIngredient"
import Button from "./Button"
import { useNavigate } from "react-router-dom"
import IRecipe from "../models/IRecipe"

interface IContext {
    values: IRecipe,
    setValues: (values: IRecipe) => void,
    createdRecipe: IRecipe
}

const NewIngredients = () => {
    const {values, setValues, createdRecipe} = useContext(mainContext) as IContext

    const navigate = useNavigate();
    
    useEffect(() => {
        if (!values.ingredients || values.ingredients.length === 0) {
            setValues({
                ...values,
                ingredients: [
                    {
                        name: "", additional_info: "", quantity: 0, unit: "",
                        id: "",
                        recipe_id: ""
                    },
                    {
                        name: "", additional_info: "", quantity: 0, unit: "",
                        id: "",
                        recipe_id: ""
                    }
                ]
            });
        }
    }, [values, setValues]);
    
    const insertIngredients = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(values.ingredients?.[0]?.name?.trim()) {
            const { error: errorInsertIngredient } = await supabase.from("ingredients").insert(
                values.ingredients.filter((ingredient: IIngredient) => ingredient.name?.trim())
                .map((ingredient: IIngredient) => ({
                    recipe_id: createdRecipe?.id,
                    name: ingredient.name,
                    additional_info: ingredient.additional_info || null,
                    quantity: ingredient.quantity || null,
                    unit: ingredient.unit || null,
                })));
            if(errorInsertIngredient){
                console.error("Error while saving ingredient", errorInsertIngredient)
            } else {
                console.log("Ingredients added successfully")
            }
        } 
        navigate(`/recipes/${createdRecipe.id}`)
    }
    return (  
        <>
            <h2 className="text-center mb-5 text-4xl font-medium">
                Add Ingredients for new Recipe "{createdRecipe.name}""
            </h2>
            <form onSubmit={insertIngredients} className="grid sm:grid-cols-2 items-center gap-3">
                <fieldset>
                    <label htmlFor="ingredient-1-name">1. Ingredient</label>
                    <input 
                        type="text" 
                        id="ingredient-1-name" 
                        placeholder="Name of ingredient" 
                        value={values.ingredients?.[0].name || ""}
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
                        value={values.ingredients?.[0].additional_info || ""}
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
                        value={values.ingredients?.[0].quantity || ""}
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
                        value={values.ingredients?.[0].unit || ""}
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
                        <Button text="Save ingredients" title="Save ingredients" buttonType="submit" bgColor="bg-recipe-light-green" hoverBgColor="hover:bg-recipe-green"/>
                    </fieldset>
            </form>
        </>

    );
}

export default NewIngredients;