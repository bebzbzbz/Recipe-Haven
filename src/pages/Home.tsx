import { useContext } from "react";
import { mainContext } from "../context/MainProvider";
import IRecipe from "../models/IRecipe";
import { Link } from "react-router-dom";
import Teaser from "../components/Teaser";

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

    if(randomRecipes.length === 0) {
        return (
            <section className="text-center">
                <h2 className="mb-15">Loading...</h2>
                <p>Loading...</p>
            </section>
        )
    }
    
    return (  
        <section>
            <h2 className="mb-15 text-5xl text-right">Whatever your heart <span>desires</span>...</h2>
            <div className="flex flex-col mx-auto mb-15 gap-10">
                {randomRecipes && randomRecipes.map((recipe : IRecipe) => <Teaser recipe={recipe} key={crypto.randomUUID()}/>)}
            </div>
            <Link to="/recipes">
            <h2 className="mb-15 text-5xl hover:text-recipe-pink transition-colors">And a <span>lot more!</span></h2>
            </Link>
        </section>
    );
}

export default Home;