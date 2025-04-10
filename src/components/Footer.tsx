import { Link } from "react-router-dom";

const Footer = () => {
    return (  
        <footer className="bg-lime-200 flex justify-between px-30 py-10">
            <Link to="/" className="flex items-center gap-3"><img src="/img/ramen.svg" className="h-7" alt="Bowl of noodles" />
                World of Recipes
            </Link>
            <div>
                <p className="text-right">Social Media</p>
                <ul className="flex gap-5">
                    <li>
                        <Link to="/"><img src="/img/Youtube.svg" alt="Youtube Icon" /></Link>
                    </li>
                    <li>
                        <Link to="/"><img src="/img/Twitter.svg" alt="Twitter Icon" /></Link>
                    </li>
                    <li>
                        <Link to="/"><img src="/img/Pinterest.svg" alt="Pinterest Icon" /></Link>
                    </li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;