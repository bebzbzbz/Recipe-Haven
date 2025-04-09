import { Link } from "react-router-dom";

interface ButtonProps {
    text: string,
    linkTo: string,
    title: string,
    action?: () => void;
}

const Button = ({text, linkTo, title, action} : ButtonProps) => {
    return (  
        <Link to={linkTo} onClick={action} title={title} className={`bg-amber-600 text-white px-4 py-1 rounded-full transition-all hover:bg-amber-500 hover:-rotate-3 cursor-pointer`}>
            {text}
        </Link>
    );
}

export default Button;