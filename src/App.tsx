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
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import IUser from './models/IUser';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path='recipes' element={<Recipes/>}/>
        <Route path='recipes/:recipeParam' element={<RecipeDetails/>}/>
        <Route path='category/:categoryParam' element={<Category/>}/>
        <Route path='create-recipe' element={
          <ProtectedRoute>
            <CreateRecipe/>
          </ProtectedRoute>
          }/>
        <Route path='aboutus' element={<AboutUs/>}/>
        <Route path='signup' element={<SignUp/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='profile' element={
          <ProtectedRoute>
            <Profile/>
          </ProtectedRoute>
          }/>
        <Route path='*' element={<NotFound/>}/>
      </Route>
    )
  )

  const {setRecipes, setIsLoggedIn, setUser} = useContext(mainContext) as any

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

  useEffect(() => {
    const checkLoginStatus = async() => {
        const {data} = await supabase.auth.getUser()
        const user = data?.user

        setIsLoggedIn(!!user)
        if(user) {
            setUser(user as unknown as IUser)
        }
    }
    checkLoginStatus()
}, [setIsLoggedIn, setUser])

  return (
    <RouterProvider router={router}/>
  )
}

export default App