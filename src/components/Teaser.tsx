import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";

interface TeaserProps {
    img: string,
    name: string,
    desc: string,
    id: string
}

const Teaser = ({img, name, desc, id}:TeaserProps) => {
    const navigate = useNavigate();

    return (  
        <article className="flex flex-col gap-5 bg-amber-100 rounded-xl overflow-clip">
            <Link to={`/recipes/${id}`} className="h-90 overflow-clip flex items-center relative">
                <div className="bg-lime-700 absolute top-0 left-0 right-0 h-full opacity-30 hover:opacity-0 transition-all"></div>
                <img className="w-full h-full object-cover" src={img} alt={name}/>
            </Link>
            <div className="flex flex-col pb-9 items-center px-5 justify-between h-45">
                <h3>{name}</h3>
                <p>{desc}</p>
                <Button text={"See recipe"} action={() => navigate(`/recipes/${id}`)} title={`See recipe for ${name}`} buttonType="button" bgColor="bg-amber-600" hoverBgColor="hover:bg-amber-500"/>
            </div>
        </article>
    );
}

export default Teaser;