import { Link } from "react-router-dom";

const Footer = () => {
    return (  
        <footer className="flex bg-lime-200 flex-col sm:flex-row justify-between sm:items-center px-10 md:px-30 py-10 gap-4">
            <Link to="/" className="flex items-center gap-3">
                <img src="/svg/ramen.svg" className="h-7" alt="Bowl of noodles" />
                World of Recipes
            </Link>
            <div>
                <p className="md:text-right">Social Media</p>
                <ul className="flex gap-5">
                    <li>
                        <Link to="/"><img src="/svg/Youtube.svg" alt="Youtube Icon" /></Link>
                    </li>
                    <li>
                        <Link to="/"><img src="/svg/Twitter.svg" alt="Twitter Icon" /></Link>
                    </li>
                    <li>
                        <Link to="/"><img src="/svg/Pinterest.svg" alt="Pinterest Icon" /></Link>
                    </li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;