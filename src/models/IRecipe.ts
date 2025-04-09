import IIngredient from "./IIngredient"

interface IRecipe {
    category_id: string,
    created_at?: string,
    description: string,
    id: string,
    image: string,
    instructions: string,
    name: string,
    servings: number
    ingredients?:
        IIngredient[]
}

export default IRecipe