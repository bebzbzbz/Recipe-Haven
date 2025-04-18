import { Link } from "react-router-dom";
import IRecipe from "../models/IRecipe";

interface TeaserProps {
    recipe: IRecipe
}

const Teaser = ({recipe}:TeaserProps) => {
    return (  
        <article className="flex flex-col overflow-clip rounded-sm">
            <Link to={`/recipes/${recipe?.id}`} className="h-70 overflow-clip flex items-center relative teaser">
                <div className="absolute top-0 left-0 right-0 h-full opacity-100 transition-all duration-400">
                    <div className="bg-background h-full w-full opacity-15 transition-opacity"></div>
                    <h3 className="absolute w-full h-full top-0 flex items-center justify-center text-white text-4xl font-medium transition-opacity">{recipe?.name}</h3>
                </div>
                <p className="absolute top-0 left-0 right-0 w-full h-full flex items-center justify-center text-center description transition-opacity text-xl font-medium text-recipe-brown px-10">{recipe?.description}</p>
                <img className="w-full h-full object-cover" src={recipe?.image} alt={recipe?.name}/>
            </Link>
        </article>
    );
}

export default Teaser;