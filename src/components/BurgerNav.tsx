import { useContext } from "react";
import { mainContext } from "../context/MainProvider";

interface IContext {
    setMobileNav: (mobileNav: boolean) => void
}

const BurgerNav = () => {
    const {setMobileNav} = useContext(mainContext) as IContext

    return ( 
        <>
            <div
                onClick={() => {setMobileNav(true)}}
                className="absolute right-3 top-7 z-10 lg:hidden">
                <img src="/svg/burgermenu.svg" alt="Menu" />
            </div>
        </>
        
    );
}

export default BurgerNav;