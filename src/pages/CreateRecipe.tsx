import { useEffect, useRef, useState } from "react";
import Button from "../components/Button";
import supabase from "../utils/supabase";
import { useNavigate } from "react-router-dom";
import IRecipe from "../models/IRecipe";

const CreateRecipe = () => {
    const navigate = useNavigate();

    const [values, setValues] = useState<IRecipe>({
        id: "",
        name: "",
        servings: 0,
        description: "",
        instructions: "",
        category_id: "",
        image: ""
    })

    const nameRef = useRef<HTMLInputElement>(null)
    const servingsRef = useRef<HTMLInputElement>(null)
    const descriptionRef = useRef<HTMLTextAreaElement>(null)
    const instructionsRef = useRef<HTMLTextAreaElement>(null)
    const category_idRef = useRef<HTMLSelectElement>(null)
    const imageRef = useRef<HTMLInputElement>(null)

    const [insert, setInsert] = useState(false)

    const saveRecipe = () => {
        setValues({
            id: crypto.randomUUID(),
            name: nameRef.current?.value || "",
            servings: Number(servingsRef.current?.value) || 0,
            description: descriptionRef.current?.value || "",
            instructions: instructionsRef.current?.value || "",
            category_id: category_idRef.current?.value || "",
            image: imageRef.current?.value || ""
        })
        setInsert(true)
    }
    const insertRecipe = async () => {
        const {error: insertError} = await supabase.from("recipes").insert({
            id: values.id, 
            name: values.name, 
            servings: values.servings, 
            description: values.description, 
            instructions: values.instructions, 
            category_id: values.category_id, 
            image: values.image})

            if(insertError){
                console.error("Error while saving recipe", insertError)
            } else {
                console.log("Recipe added successfully")
                navigate(`/recipes/${values.id}`)
            }
    }

    useEffect(() => {
        if (insert) {
            console.log(values);
            insertRecipe();
            setInsert(false);
        }
    }, [insert]);

    return (  
        <section>
            <form className="flex flex-col items-center">
                <div className="grid grid-cols-2">
                    <div>
                        <label htmlFor="recipeName">Recipe name</label>
                        <input type="text" name="name" id="recipeName" placeholder="" ref={nameRef} />
                    </div>
                    <div>
                        <label htmlFor="servings">Servings</label>
                        <input type="number" name="servings" id="servings" ref={servingsRef} />
                    </div>
                    <div>
                        <label htmlFor="category">Category</label>
                        <select name="category_id" id="category" ref={category_idRef}>
                            <option value=""></option>
                            <option value="e236c236-6150-42c6-bade-912863526149">African</option>
                            <option value="58999d33-83f2-47c6-9c4f-454fa14db49a">Desserts</option>
                            <option value="1b9a7e8a-7d5c-4032-9d52-e595a3da1c7b">Drinks</option>
                            <option value="60c63742-91e5-4375-92dd-c48a2334a88a">East Asian</option>
                            <option value="b8acd724-2184-42cd-a8f8-f13e1eae6beb">European</option>
                            <option value="f13ec73f-b058-481c-aa42-bce25172158b">Middle Eastern</option>
                            <option value="43e4f92f-c5fe-4fa1-8e53-e3d9f3200c0b">Salads</option>
                            <option value="20e491c0-12ea-4ee6-97bb-05745a0b019c">Slavic</option>
                        </select>
                    </div>
                        <div>
                        <label htmlFor="image">Image</label>
                        <input type="url" name="image" id="image" ref={imageRef}/>
                    </div>
                    <div>
                        <label htmlFor="description">Description</label>
                        <textarea name="description" id="description" ref={descriptionRef}></textarea>
                    </div>    
                    <div>
                        <label htmlFor="instructions">Instructions</label>
                        <textarea name="instructions" id="instructions" ref={instructionsRef}></textarea>
                    </div>
                </div>
                
                <Button text="Save recipe" title="Save a new recipe" linkTo="" action={saveRecipe}/>
            </form>
        </section>
    );
}

export default CreateRecipe;