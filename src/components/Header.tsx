import { useContext, useEffect } from "react";
import Nav from "./Nav";
import supabase from "../utils/supabase";
import { mainContext } from "../context/MainProvider";
import ICategory from "../models/ICategory";
import Button from "./Button";
import { useLocation } from "react-router-dom";

const Header = () => {
    const {categories, setCategories, currentCategory, categoryRecipes} = useContext(mainContext) as any

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
            <div className={`relative h-100 flex justify-center overflow-clip items-center bg-center bg-cover`}>
                <img src={headerContent.imgSrc} className="absolute w-full" />
                <div className="w-full h-full bg-lime-800 opacity-60 absolute"></div>
                <h1 className="text-5xl text-center mx-30 text-white z-10">
                    {headerContent.heading}
                </h1>

                <div className="absolute bottom-7 flex gap-3">
                    {categories && categories.map((category : ICategory) => <Button text={category.name} linkTo={`/category/${category.id}`} title={`All ${category.name} recipes`} key={crypto.randomUUID()}/>)}
                </div>
            </div>
        </header>
    );
}

export default Header;