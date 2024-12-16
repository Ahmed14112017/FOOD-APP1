
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import AuthLayout from './modules/Shared/AuthLayout/AuthLayout'
import Notfound from './modules/Shared/Notfound/Notfound'
import Login from './modules/authintication/Login/Login'
import Register from './modules/authintication/Register/Register'
import ForgetPassword from './modules/authintication/ForgetPassword/ForgetPassword'
import ResetPassword from './modules/authintication/ResetPassword/ResetPassword'
import VerifyAccount from './modules/authintication/VerifyAccount/VerifyAccount'
import MasterLayout from './modules/Shared/MasterLayout/MasterLayout'
import Home from './modules/Home/Home'
import RecipeList from './modules/Recipes/RecipeList/RecipeList'
import Recipedata from './modules/Recipes/Recipedata/Recipedata'
import CategorieList from './modules/Categories/CategorieList/CategorieList'
import CategorieData from './modules/Categories/CategorieData/CategorieData'
import Users from './modules/Users/Users'
import Favorties from './modules/Favorties/Favorties'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import ChangePassword from './modules/authintication/ChangePassword/ChangePassword'
import ProtectRoute from './modules/Shared/ProtectRoute/ProtectRoute'

function App() {
  const Routes= createBrowserRouter([
    {
    path:"/", element:<AuthLayout />,
    errorElement:<Notfound />,
    children:[
      {
        index:true , element:<Login />
      },
      {
        path:"login", element:<Login />
      },
      {
        path:"register", element:<Register/>
      },
      {
        path:"forget-password",element:<ForgetPassword />
      },
      {
        path:"reset-password",element:<ResetPassword />
      },
      {
        path:"verify-account", element:<VerifyAccount />
      },
      {
        path:"changepassword", element:<ChangePassword />
      }
    ]
    },
    {
      path:"dashboard",element:(
<ProtectRoute>
<MasterLayout />
</ProtectRoute>
      ),
      errorElement:<Notfound />,
      children:[
        {
          index:true , element:<Home />
        },
        {
          path:"home",element:<Home />
        },
        {
          path:"recipelist",element:<RecipeList />
        },
        {
          path:"recipedata",element:<Recipedata />
        },
        {
          path:"recipedata/:id",element:<Recipedata />
        },
        {
          path:"categorielist",element:<CategorieList />
        },
        {
          path:"categoriedata",element:<CategorieData />
        },
        {
          path:"user",element:<Users />
        },
        
        {
          path:"favorite",element:<Favorties />
        }
      ]
    }
  ])
  return(
    <>
    <ToastContainer />
    <RouterProvider router={Routes} />
    </>
  )
}

export default App
