import { ChangeEvent, useContext } from "react";
import Button from "../components/Button";
import supabase from "../utils/supabase";
import { useNavigate } from "react-router-dom";
import { mainContext } from "../context/MainProvider";
import IIngredient from "../models/IIngredient";

const EditRecipe = () => {
    const {values, setValues} = useContext(mainContext) as any
    const navigate = useNavigate();

    const editRecipe = async() => {
        const {error: errorUpdate} = await supabase.from("recipes").update({
            name: values.name, 
            servings: values.servings, 
            description: values.description, 
            instructions: values.instructions, 
            category_id: values.category_id, 
            image: values.image
        }).eq("id", values.id)
        if(errorUpdate){
            console.error("Error while editing", errorUpdate)
        } else {
            console.log("Recipe edited successfully")
            navigate(`/recipes/${values.id}`)
        }
    }
    const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        editRecipe();
    }

    return (  
        <section className="px-30">
            <form onSubmit={handleSubmit} className="grid grid-cols-2 items-center gap-3">
                <h2 className="text-center col-span-2">{values.id === "" ? "Create a new Recipe" : "Edit an existing recipe"}</h2>
                <fieldset>
                    <label htmlFor="recipeName">Recipe name *</label>
                    <input 
                        type="text" 
                        id="recipeName" 
                        placeholder="Enter a name" 
                        value={values.name}
                        onChange={(e) => setValues({...values, name: e.target.value})}
                        required 
                        className="bg-lime-200"/>
                </fieldset>
                <fieldset>
                    <label htmlFor="servings">Servings *</label>
                    <input 
                        type="number" 
                        id="servings" 
                        min={1}
                        placeholder="How many servings?" 
                        value={values.servings} 
                        onChange={(e) => setValues({...values, servings: Number(e.target.value)})} 
                        required 
                        className="bg-lime-200"/>
                </fieldset>
                <fieldset>
                    <label htmlFor="category">Category *</label>
                    <select 
                        id="category" 
                        value={values.category_id}
                        onChange={(e) => setValues({...values, category_id: e.target.value})} 
                        required 
                        className="bg-lime-200">
                        <option value="">Select a category</option>
                        <option value="e236c236-6150-42c6-bade-912863526149">African</option>
                        <option value="58999d33-83f2-47c6-9c4f-454fa14db49a">Desserts</option>
                        <option value="1b9a7e8a-7d5c-4032-9d52-e595a3da1c7b">Drinks</option>
                        <option value="60c63742-91e5-4375-92dd-c48a2334a88a">East Asian</option>
                        <option value="b8acd724-2184-42cd-a8f8-f13e1eae6beb">European</option>
                        <option value="f13ec73f-b058-481c-aa42-bce25172158b">Middle Eastern</option>
                        <option value="43e4f92f-c5fe-4fa1-8e53-e3d9f3200c0b">Salads</option>
                        <option value="20e491c0-12ea-4ee6-97bb-05745a0b019c">Slavic</option>
                    </select>
                </fieldset>
                <fieldset>
                    <label htmlFor="image">Image URL*</label>
                    <input 
                        type="url"
                        id="image" 
                        placeholder="Add a photo" 
                        value={values.image}
                        onChange={(e) => setValues({...values, image: e.target.value})} 
                        required 
                        className="bg-lime-200"/>
                </fieldset>
                <fieldset>
                    <label htmlFor="description">Description *</label>
                    <textarea 
                        id="description" 
                        placeholder="Describe your dish" 
                        value={values.description}
                        onChange={(e) => setValues({...values, description: e.target.value})} 
                        required 
                        className="bg-lime-200"></textarea>
                </fieldset>    
                <fieldset>
                    <label htmlFor="instructions">Instructions *</label>
                    <textarea 
                        id="instructions" 
                        placeholder="Enter your recipe" 
                        value={values.instructions}
                        onChange={(e) => setValues({...values, instructions: e.target.value})} 
                        required 
                        className="bg-lime-200"></textarea>
                </fieldset>
                <h3 className="text-center col-span-2">
                    Add Ingredients
                </h3>
                <fieldset>
                    <label htmlFor="ingredient-1-name">1. Ingredient</label>
                    <input 
                        type="text" 
                        id="ingredient-1-name" 
                        placeholder="Name of ingredient" 
                        value={values.ingredients?.[0]?.name}
                        onChange={(e) => setValues({
                            ...values, 
                            ingredients: values.ingredients?.map((ingredient: IIngredient, index: number) => 
                                index === 0 ? { ...ingredient, name: e.target.value } : ingredient
                            )
                        })}
                        className="bg-lime-200"/>
                </fieldset>
                <fieldset>
                    <label htmlFor="ingredient-1-info">1. Additional info</label>
                    <input 
                        type="text" 
                        id="ingredient-1-info" 
                        placeholder="i.e. diced, cubed, grated..." 
                        value={values.ingredients?.[0]?.additional_info}
                        onChange={(e) => setValues({
                            ...values, 
                            ingredients: values.ingredients?.map((ingredient: IIngredient, index: number) => 
                                index === 0 ? { ...ingredient, additional_info: e.target.value } : ingredient
                            )
                        })}
                        className="bg-lime-200"/>
                </fieldset>
                <fieldset>
                    <label htmlFor="ingredient-1-quantity">1. Quantity of ingredient</label>
                    <input 
                        type="number" 
                        id="ingredient-1-quantity" 
                        value={values.ingredients?.[0]?.quantity}
                        onChange={(e) => setValues({
                            ...values, 
                            ingredients: values.ingredients?.map((ingredient: IIngredient, index: number) => 
                                index === 0 ? { ...ingredient, quantity: Number(e.target.value) } : ingredient
                            )
                        })}
                        className="bg-lime-200"/>
                </fieldset>
                <fieldset>
                    <label htmlFor="ingredient-1-unit">1. Unit of ingredient</label>
                    <input 
                        type="text" 
                        id="ingredient-1-unit" 
                        placeholder="i.e. ml" 
                        value={values.ingredients?.[0]?.unit}
                        onChange={(e) => setValues({
                            ...values, 
                            ingredients: values.ingredients?.map((ingredient: IIngredient, index: number) => 
                                index === 0 ? { ...ingredient, unit: e.target.value } : ingredient
                            )
                        })}
                        className="bg-lime-200"/>
                </fieldset>
                {/* <fieldset>
                    <label htmlFor="ingredient-2-name">2. Ingredient</label>
                    <input 
                        type="text" 
                        id="ingredient-2-name" 
                        placeholder="Name of ingredient" 
                        value={values.ingredient_2_name}
                        onChange={(e) => setValues({...values, ingredient_2_name: e.target.value})}
                        required 
                        className="bg-lime-200"/>
                </fieldset>
                <fieldset>
                    <label htmlFor="ingredient-2-info">2. Additional info</label>
                    <input 
                        type="text" 
                        id="ingredient-2-info" 
                        placeholder="i.e. diced, cubed, grated..." 
                        value={values.ingredient_2_info}
                        onChange={(e) => setValues({...values, ingredient_2_info: e.target.value})}
                        required 
                        className="bg-lime-200"/>
                </fieldset>
                <fieldset>
                    <label htmlFor="ingredient-2-quantity">2. Quantity of ingredient</label>
                    <input 
                        type="number" 
                        id="ingredient-2-quantity" 
                        value={values.ingredient_2_quantity}
                        onChange={(e) => setValues({...values, ingredient_2_quantity: Number(e.target.value)})}
                        required 
                        className="bg-lime-200"/>
                </fieldset>
                <fieldset>
                    <label htmlFor="ingredient-2-unit">2. Unit of ingredient</label>
                    <input 
                        type="text" 
                        id="ingredient-2-unit" 
                        placeholder="i.e. ml" 
                        value={values.ingredient_2_unit}
                        onChange={(e) => setValues({...values, ingredient_2_unit: e.target.value})}
                        required 
                        className="bg-lime-200"/>
                </fieldset> */}
                <fieldset className="col-span-2 text-center">
                    <Button text="Edit recipe" title="Edit recipe" buttonType="submit" bgColor="bg-amber-600" hoverBgColor="hover:bg-amber-500"/>
                </fieldset>
            </form>
        </section>
    );
}

export default EditRecipe;