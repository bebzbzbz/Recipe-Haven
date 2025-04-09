import { useContext } from "react";
import Teaser from "../components/Teaser";
import { mainContext } from "../context/MainProvider";
import IRecipe from "../models/IRecipe";

const Home = () => {
    const {recipes} = useContext(mainContext) as any

    const randomRecipes : IRecipe[] = []

    if(recipes) {
        for (let index = 0; index < 3; index++) {
            if(recipes.length > 0) {
                const random = recipes[Math.round(Math.random() * (recipes?.length -1))]
    
                if(!randomRecipes.includes(random)) {
                    randomRecipes.push(random)
                }
            }
        }
    }
    
    return (  
        <>
            <section  className="text-center">
                <h2 className="mb-15">Curious?</h2>
                <div className="grid grid-cols-3 gap-7">
                    {randomRecipes && randomRecipes.map((recipe : IRecipe) => <Teaser img={recipe.image} name={recipe.name} desc={recipe.description} col={true} id={recipe.id} key={crypto.randomUUID()}/>)}
                </div>
            </section>
        </>
    );
}

export default Home;