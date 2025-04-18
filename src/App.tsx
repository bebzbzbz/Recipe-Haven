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
import EditCreatedRecipe from './pages/EditCreatedRecipe';
import IRecipe from './models/IRecipe';
import IUser from './models/IUser';

interface IContext {
  setRecipes: (recipes: IRecipe[]) => void,
  setIsLoggedIn: (isLoggedIn: boolean) => void,
  setUser: (user: IUser) => void,
  checkLoginStatus: () => void
}

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
        <Route path='edit-recipe' element={
          <ProtectedRoute>
            <EditCreatedRecipe/>
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

  const {setRecipes, setIsLoggedIn, setUser, checkLoginStatus} = useContext(mainContext) as IContext

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
    checkLoginStatus()
  }, [setIsLoggedIn, setUser])

  return (
    <RouterProvider router={router}/>
  )
}

export default App