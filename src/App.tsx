import { useContext, useEffect } from 'react'
import './App.css'
import supabase from './utils/supabase'
import Layout from "./layout/Layout";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Recipes from './pages/Recipes';
import AboutUs from './pages/AboutUs';
import RecipeDetails from './pages/RecipeDetails';
import Login from './pages/Login';
import { mainContext } from './context/MainProvider';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path='/recipes' element={<Recipes/>}/>
        <Route path='/recipes/:recipeParam' element={<RecipeDetails/>}/>
        <Route path='/aboutus' element={<AboutUs/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Route>
    )
  )

  const {recipes,setRecipes} = useContext(mainContext) as any

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await supabase.from("recipes").select("*")
      
        if(resp) {
          setRecipes(resp.data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  },[])
  console.log(recipes)

  return (
    <RouterProvider router={router}/>
  )
}

export default App
