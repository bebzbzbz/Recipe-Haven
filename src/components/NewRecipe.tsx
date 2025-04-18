import { ChangeEvent, useContext } from "react";
import Button from "../components/Button";
import supabase from "../utils/supabase";
import { mainContext } from "../context/MainProvider";
import IRecipe from "../models/IRecipe";

interface IContext {
    values: IRecipe,
    setValues: (values: IRecipe) => void,
    setCreatedRecipe: (createdRecipe: IRecipe) => void
}

const NewRecipe = () => {
    const {values, setValues, setCreatedRecipe} = useContext(mainContext) as IContext

    const insertRecipe = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        const {error: errorInsertRecipe} = await supabase.from("recipes").insert({
            name: values.name, 
            servings: values.servings, 
            description: values.description, 
            instructions: values.instructions, 
            category_id: values.category_id, 
            image: values.image
        })
        if(errorInsertRecipe){
            console.error("Error while saving recipe", errorInsertRecipe)
        } else {
            console.log("Recipe added successfully")

            const {data: newRecipe} = await supabase.from("recipes").select("*").eq("name", values.name)
            
            if(newRecipe) {
                setCreatedRecipe(newRecipe?.[0])
            }
        }
    }

    return (
        <div>
            <h2 className="text-center mb-5 text-4xl font-medium">Create a new Recipe</h2>
            <form onSubmit={insertRecipe} className="grid sm:grid-cols-2 items-center gap-3">
                <fieldset>
                    <label htmlFor="recipeName">Recipe name *</label>
                    <input 
                        type="text" 
                        id="recipeName" 
                        placeholder="Enter a name" 
                        value={values?.name || ""}
                        onChange={(e) => setValues({...values, name: e.target.value})}
                        required/>
                </fieldset>
                <fieldset>
                    <label htmlFor="servings">Servings *</label>
                    <input 
                        type="number" 
                        id="servings" 
                        min={1}
                        placeholder="How many servings?" 
                        value={values?.servings || ""} 
                        onChange={(e) => setValues({...values, servings: Number(e.target.value)})} 
                        required/>
                </fieldset>
                <fieldset>
                    <label htmlFor="category">Category *</label>
                    <select 
                        id="category" 
                        value={values?.category_id || ""}
                        onChange={(e) => setValues({...values, category_id: e.target.value})} 
                        required>
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
                        value={values?.image || ""}
                        onChange={(e) => setValues({...values, image: e.target.value})} 
                        required/>
                </fieldset>
                <fieldset>
                    <label htmlFor="description">Description *</label>
                    <textarea 
                        id="description" 
                        rows={5}
                        placeholder="Describe your dish" 
                        value={values?.description || ""}
                        onChange={(e) => setValues({...values, description: e.target.value})} 
                        required></textarea>
                </fieldset>    
                <fieldset>
                    <label htmlFor="instructions">Instructions *</label>
                    <textarea 
                        id="instructions" 
                        rows={5}
                        placeholder="Enter your recipe" 
                        value={values?.instructions || ""}
                        onChange={(e) => setValues({...values, instructions: e.target.value})} 
                        required></textarea>
                </fieldset>
                <fieldset className="sm:col-span-2 text-center">
                    <Button text="Save new recipe" title="Save new recipe" buttonType="submit" bgColor="bg-recipe-light-green" hoverBgColor="hover:bg-recipe-green"/>
                </fieldset>
            </form>
        </div>        
    );
}

export default NewRecipe;