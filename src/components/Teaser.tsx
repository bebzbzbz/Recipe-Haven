import { Link } from "react-router-dom";
import Button from "./Button";

interface TeaserProps {
    img: string,
    name: string,
    desc: string,
    col: boolean
}

const Teaser = ({img, name, desc, col}:TeaserProps) => {
    return (  
        <article className={`flex ${col && `flex-col`} gap-5 bg-lime-200 rounded-t-full overflow-clip`}>
            <Link to={`/recipes/${name}`} className="h-90 overflow-clip flex items-center relative">
                <div className="bg-lime-700 absolute top-0 left-0 right-0 h-full opacity-30 hover:opacity-0 transition-all"></div>
                <img src={img} alt={name}/>
            </Link>
            <div className="flex flex-col pb-9 items-center px-5 gap-6">
                <h3>{name}</h3>
                <p>{desc}</p>
                <Button text={"See recipe"} linkTo={`/recipes/${name}`} title={`See recipe for ${name}`}/>
            </div>
        </article>
    );
}

export default Teaser;