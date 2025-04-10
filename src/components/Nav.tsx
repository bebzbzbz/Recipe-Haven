import { Link } from "react-router-dom";

const Nav = () => {
    return (  
        <nav className="flex justify-between items-center py-6 px-30">
            <Link to="/" className="flex items-center gap-3"><img src="/img/ramen.svg" className="h-8" alt="Bowl of noodles" />
                World of Recipes
            </Link>
            <ul className="flex gap-5">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/recipes">Recipes</Link></li>
                <li><Link to="/create-recipe">Create a Recipe</Link></li>
                <li><Link to="/aboutus">About Us</Link></li>
            </ul>
            <Link to="/login">Login</Link>
        </nav>
    );
}

export default Nav;