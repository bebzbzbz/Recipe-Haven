import { Link } from "react-router-dom";

const Nav = () => {
    return (  
        <nav className="flex justify-evenly items-center p-6">
            <Link to="/" className="flex items-center gap-3"><img src="/img/Icon.svg" className="h-6" alt="Icon of a steaming cup" />
                World of Recipes
            </Link>
            <ul className="flex gap-5">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/recipes">Recipes</Link></li>
                <li><Link to="/aboutus">About Us</Link></li>
            </ul>
            <Link to="/login">Login</Link>
        </nav>
    );
}

export default Nav;