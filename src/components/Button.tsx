import { Link } from "react-router-dom";

interface ButtonProps {
    text: string,
    linkTo: string,
    title: string
}

const Button = ({text, linkTo, title} : ButtonProps) => {
    return (  
        <button type="button" className="bg-amber-600 text-white px-4 py-1 rounded-full transition-all hover:bg-amber-500 hover:-rotate-3 cursor-pointer">
            <Link to={linkTo} title={title}>
                {text}
            </Link>
        </button>
    );
}

export default Button;