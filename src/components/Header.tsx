import { useContext, useEffect } from "react";
import Nav from "./Nav";
import supabase from "../utils/supabase";
import { mainContext } from "../context/MainProvider";
import ICategory from "../models/ICategory";
import Button from "./Button";
import { useLocation, useNavigate } from "react-router-dom";
import BurgerNav from "./BurgerNav";
import IRecipe from "../models/IRecipe";

interface IContext {
    categories: ICategory[],
    setCategories: (categories: ICategory[]) => void,
    currentCategory: ICategory[],
    categoryRecipes: IRecipe[]
}

const Header = () => {
    const {categories, setCategories, currentCategory, categoryRecipes} = useContext(mainContext) as IContext
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

    if (location.pathname.includes("category") && categoryRecipes && currentCategory) {
        headerContent.imgSrc = categoryRecipes[3]?.image
        headerContent.heading = currentCategory[0]?.name + " Recipes"
    } else {
        headerContent.imgSrc = "/img/header.jfif"
        headerContent.heading = "Be inspired, cook with passion and experience unforgettable moments at the table."

        if(location.pathname === "/recipes") {
            headerContent.heading = "All Recipes"
        }
    }

    return (  
        <header className="border-t-15 border-t-lime-200">
            <Nav/>
            <BurgerNav/>
            <div 
                className={`relative h-100 flex flex-col gap-9 justify-center overflow-clip items-center`}>
                <img 
                    src={headerContent.imgSrc} 
                    className="absolute h-full w-full object-cover" />
                <div 
                    className="w-full h-full bg-lime-800 opacity-60 absolute"></div>
                <h1 className="text-2xl md:text-3xl text-center mx-10 md:mx-50 text-white z-10">
                    {headerContent.heading}
                </h1>

                <div className="flex flex-wrap justify-center gap-2 md:gap-3 z-10 mx-3">
                    {categories && categories.map((category : ICategory) => 
                    <Button 
                        text={category.name} 
                        action={() => navigate(`/category/${category.id}`)} 
                        title={`All ${category.name} recipes`} 
                        key={crypto.randomUUID()} 
                        buttonType="button" 
                        bgColor="bg-lime-600" 
                        hoverBgColor="hover:bg-lime-500"/>)}
                </div>
            </div>
        </header>
    );
}

export default Header;