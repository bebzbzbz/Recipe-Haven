import Nav from "./Nav";

const Header = () => {
    return (  
        <header className="border-t-15 border-t-lime-200">
            <Nav/>
            <div className="relative h-100 flex justify-center items-center bg-[url(/img/header.jfif)] bg-center bg-cover">
                <div className="w-full h-full bg-lime-800 opacity-60 absolute"></div>
                <h1 className="text-5xl text-center mx-30 text-white z-10">Be inspired, cook with passion and experience unforgettable moments at the table.</h1>
            </div>
        </header>
    );
}

export default Header;