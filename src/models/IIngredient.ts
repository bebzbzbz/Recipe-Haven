interface IIngredient {
    id: string,
    recipe_id: string,
    name: string,
    quantity: number,
    unit: string,
    additional_info: string,
    created_at?: string
}

export default IIngredient