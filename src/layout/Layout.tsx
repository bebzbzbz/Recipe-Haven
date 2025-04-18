import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Layout = () => {

    return (  
        <>
            <Header/>
            <main className="py-10 px-7 md:px-20">
                <Outlet/>
            </main>
            <Footer/>
        </>
    );
}

export default Layout;