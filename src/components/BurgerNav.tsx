import { useContext } from "react";
import { mainContext } from "../context/MainProvider";

interface IContext {
    setMobileNavToggle: (mobileNavToggle: boolean) => void
}

const BurgerNav = () => {
    const {setMobileNavToggle} = useContext(mainContext) as IContext

    return ( 
        <>
            <div
                onClick={() => {setMobileNavToggle(true)}}
                className="absolute right-3 top-7 z-10 lg:hidden cursor-pointer">
                <img src="/svg/burgermenu.svg" alt="Menu" />
            </div>
        </>
        
    );
}

export default BurgerNav;