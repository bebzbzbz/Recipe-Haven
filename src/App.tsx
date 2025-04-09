import './App.css'
import Layout from "./layout/Layout";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Recipes from './pages/Recipes';
import AboutUs from './pages/AboutUs';
import RecipeDetails from './pages/RecipeDetails';
import Login from './pages/Login';
import Category from './pages/Category';
import { useContext, useEffect } from 'react';
import supabase from './utils/supabase';
import { mainContext } from './context/MainProvider';
import CreateRecipe from './pages/CreateRecipe';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path='recipes' element={<Recipes/>}/>
        <Route path='recipes/:recipeParam' element={<RecipeDetails/>}/>
        <Route path='category/:categoryParam' element={<Category/>}/>
        <Route path='create-recipe' element={<CreateRecipe/>}/>
        <Route path='aboutus' element={<AboutUs/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Route>
    )
  )

  const {setRecipes} = useContext(mainContext) as any

  useEffect(() => {
    const fetchData = async () => {
      try {
          const {data: allRecipes} = await supabase.from("recipes").select("*")
      
          if(allRecipes) {
          setRecipes(allRecipes || [])
          }
      } catch (error) {
          console.log(error)
      }
    }
    fetchData()
},[])

  return (
    <RouterProvider router={router}/>
  )
}

export default App