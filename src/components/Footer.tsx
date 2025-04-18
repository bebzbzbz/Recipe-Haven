import { Link } from "react-router-dom";

const Footer = () => {
    return (  
        <footer className="flex bg-recipe-brown text-white flex-col sm:flex-row justify-between sm:items-center px-10 md:px-30 py-10 gap-4">
            <Link to="/" className="flex items-center gap-3">
                <img src="/svg/onion.svg" className="h-12 invert" alt="Onion Icon" />
                Recipe Haven
            </Link>
            <div>
                <p className="sm:text-right">Social Media</p>
                <ul className="flex gap-3 sm:justify-end">
                    <li>
                        <Link to="/"><img src="/svg/Youtube.svg" alt="Youtube Icon" className="invert h-5" /></Link>
                    </li>
                    <li>
                        <Link to="/"><img src="/svg/Twitter.svg" alt="Twitter Icon" className="invert h-5" /></Link>
                    </li>
                    <li>
                        <Link to="/"><img src="/svg/Pinterest.svg" alt="Pinterest Icon" className="invert h-5" /></Link>
                    </li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;