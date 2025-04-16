import { useContext } from "react";
import Teaser from "../components/Teaser";
import { mainContext } from "../context/MainProvider";
import IRecipe from "../models/IRecipe";

interface IContext {
    recipes: IRecipe[]
}

const Home = () => {
    const {recipes} = useContext(mainContext) as IContext;

    const randomRecipes : IRecipe[] = []

    if(recipes) {
        for (let index = 0; randomRecipes.length < 3; index++) {
            if(recipes.length > 0) {
                const random = recipes[Math.floor(Math.random() * (recipes?.length-1))]
    
                if(!randomRecipes.includes(random)) {
                    randomRecipes.push(random)
                }
            }
        }
    }
    
    return (  
        <section  className="text-center">
            <h2 className="mb-15">A taste of what awaits...</h2>
            <div className="grid md:grid-cols-3 gap-7">
                {randomRecipes && randomRecipes.map((recipe : IRecipe) => <Teaser recipe={recipe} key={crypto.randomUUID()}/>)}
            </div>
        </section>
    );
}

export default Home;