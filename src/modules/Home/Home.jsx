import React, { useContext } from 'react'
import Header from '../Shared/Header/Header'
import { authcontext } from '../../Authcontext/Authcontext'
import headerpage from "../../../src/assets/images/header-logo.png"
import { useNavigate } from 'react-router-dom'



export default function Home() {
  const {logindata}=useContext(authcontext)
  const navigate = useNavigate()
  return (
    <div className='container-fluid'>
      <div> 
      <Header title={"Welcome"}
     person={`${logindata?.userName}!`}
     descreption={'This is a welcoming screen for the entry of the application , you can now see the options'}
     imgurl={headerpage}
     />
      </div>
   <div className="row p-3 justify-content-between align-items-center">
    <div className="col-md-6">
      <div className="home-content my-2">
        <h1 className='fs-2'>Fill the <span className='text-success fs-2'> Recipes ! </span></h1>
        <p>you can now fill the meals easily using the table and form , click here and sill it with the table !</p>
      </div>
    </div>
    <div className="col-md-6 d-flex justify-content-end">
      <div className="home-button-recipe">
        <button className='btn btn-success px-4' onClick={()=>navigate("/dashboard/recipelist")}>
        Fill Recipes
        <i className="fa-solid fa-arrow-right ps-3"></i>
        </button>
      </div>
    </div>
    
   </div>
    </div>
    

   
  )
}
