import { Link } from "react-router-dom";
import Button from "./Button";

interface TeaserProps {
    img: string,
    name: string,
    desc: string,
    col: boolean
    id: string
}

const Teaser = ({img, name, desc, col, id}:TeaserProps) => {
    return (  
        <article className={`flex ${col && `flex-col`} gap-5 bg-amber-100 rounded-4xl overflow-clip`}>
            <Link to={`/recipes/${id}`} className="h-90 overflow-clip flex items-center relative">
                <div className="bg-lime-700 absolute top-0 left-0 right-0 h-full opacity-30 hover:opacity-0 transition-all"></div>
                <img src={img} alt={name}/>
            </Link>
            <div className="flex flex-col pb-9 items-center px-5 gap-6">
                <h3>{name}</h3>
                <p>{desc}</p>
                <Button text={"See recipe"} linkTo={`/recipes/${id}`} title={`See recipe for ${name}`}/>
            </div>
        </article>
    );
}

export default Teaser;