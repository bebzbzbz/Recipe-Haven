import { useContext } from "react";
import Teaser from "../components/Teaser";
import { mainContext } from "../context/MainProvider";
import IRecipe from "../models/IRecipe";

const Home = () => {
    const {recipes} = useContext(mainContext) as any

    return (  
        <>
            <section  className="text-center">
                <h2 className="mb-15">Most popular recipes</h2>
                <div className="grid grid-cols-3 gap-7">
                    {recipes && recipes.slice(-3).map((recipe : IRecipe) => <Teaser img={recipe.image} name={recipe.name} desc={recipe.description} col={true} />)}
                </div>
            </section>
        </>
    );
}

export default Home;