import { useContext, useEffect } from "react";
import Nav from "./Nav";
import supabase from "../utils/supabase";
import { mainContext } from "../context/MainProvider";
import ICategory from "../models/ICategory";
import Button from "./Button";
import { useLocation, useNavigate } from "react-router-dom";
import BurgerNav from "./BurgerNav";
import IRecipe from "../models/IRecipe";
import IUser from "../models/IUser";

interface IContext {
    categories: ICategory[],
    setCategories: (categories: ICategory[]) => void,
    currentCategory: ICategory[],
    categoryRecipes: IRecipe[],
    user: IUser
}

const Header = () => {
    const {categories, setCategories, currentCategory, categoryRecipes, user} = useContext(mainContext) as IContext
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
            const resp = await supabase.from("categories").select("*")

            if(resp.data) {
                setCategories(resp.data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])

    const location = useLocation()

    interface HeaderContent {
        imgSrc: string,
        heading: string
    }
    let headerContent : HeaderContent = {
        imgSrc: "",
        heading: ""
    }

    switch (true) {
        case location.pathname === "/":
            headerContent.imgSrc = "/img/wine_table.jpg"
            headerContent.heading = "Life is about finding <span>friends</span> to be <span>in the kitchen with</span>."
            break;
    
        case location.pathname.includes("category") && !!categoryRecipes && !!currentCategory:
            headerContent.imgSrc = categoryRecipes[1]?.image
            headerContent.heading = `<span>${currentCategory[0]?.name}</span> Recipes`
            break;

        case location.pathname.includes("/recipes"):
            headerContent.imgSrc = "/img/outdoors.jpg"
            headerContent.heading = "All <span>recipes</span> and <span>treats</span>"
            break;
        
        case location.pathname === "/create-recipe" || location.pathname === "/edit-recipe":
            headerContent.imgSrc = "/img/cake.jpg"
            headerContent.heading = "Manage your <span>brand new</span> recipes"
            break;
        
        case location.pathname === "/aboutus" || location.pathname === "/signup" || location.pathname === "/login":
            headerContent.imgSrc = "/img/lemons.jpg"
            headerContent.heading = "Be <span>inspired</span> and experience <span>unforgettable</span> moments at the table."
            break;
        
        case location.pathname === "/profile":
            headerContent.imgSrc = "/img/coffee.jpg"
            headerContent.heading = `Welcome <span>${user?.username || ""}</span>!`
            break;

        default:
            headerContent.imgSrc = "/img/lemons.jpg"
            headerContent.heading = "Recipe <span>Haven</span>."
            break;
    }

    return (  
        <header className="border-t-15 border-t-recipe-brown lg:border-0">
            {<Nav/>}
            <BurgerNav/>
            <div 
                className={`relative flex flex-col gap-9 pt-15 h-140 justify-center overflow-clip items-center ${location.pathname === "/" && "h-screen"}`}>
                <img 
                    src={headerContent.imgSrc} 
                    className="absolute top-0 h-full w-full object-cover" />
                <div 
                    className={`w-full h-full top-0 absolute ${location.pathname === "/" ? "opacity-15 bg-background" : "opacity-35 bg-recipe-brown"}`}></div>
                <h1 className={`text-4xl md:text-5xl text-center mx-10 text-white z-10 ${location.pathname === "/" ? "xl:mx-120" : "xl:mx-100"}`} dangerouslySetInnerHTML={{ __html: headerContent.heading }}>
                </h1>

                <div className="flex flex-wrap justify-center gap-2 md:gap-3 z-10 mx-3">
                    {categories && categories.map((category : ICategory) => 
                    <Button 
                        text={category.name} 
                        action={() => navigate(`/category/${category.id}`)} 
                        title={`All ${category.name} recipes`} 
                        key={crypto.randomUUID()} 
                        buttonType="button" 
                        bgColor="bg-recipe-yellow" 
                        hoverBgColor="hover:bg-recipe-pink"/>)}
                </div>
            </div>
        </header>
    );
}

export default Header;