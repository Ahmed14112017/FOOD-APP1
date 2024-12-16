import React, { useEffect, useState } from 'react'
import Header from '../Shared/Header/Header'
import favoriteimg from "../../assets/images/recipes-photo.svg"
import axios from 'axios'
import { IMG_BASE, URL_FAVORITE } from '../../constants/END_POINTS'
import Nodata from '../Shared/Nodata/Nodata'
import { toast } from 'react-toastify'

export default function Favorties() {
  const [favorites, setFavorites] =useState([])
  const getAllFavorite=async()=>{
    try{
      const response=await axios.get(URL_FAVORITE.getFavoriteRecipe,{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}})
      console.log(response.data.data)
      setFavorites(response.data.data)
      
    }
    catch(error){
      console.log(error)
    }
  }
  const revomefromfavorite=async(id)=>{
    try{
      const response=await axios.delete(URL_FAVORITE.removeFavoriteRecipe(id),{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}})
      console.log(response.data)
      toast.success(response.data.message||"item is deleted successfully")
      getAllFavorite()
    }
    catch(error){
      console.log(error)
    }
  }

  useEffect(()=>{
    getAllFavorite()
  },[])
  return (
    <div className='container-fluid'>
      <div className="row">
        <div className="col-12">
          <Header
          title={"favorite"}
          person={"items !"}
          descreption={"You can now add your items that any user can order it from the Application and you can edit"}
          imgurl={favoriteimg}
          />
        </div>
      <div className="row">
        
        {favorites?(
          favorites.map((item)=>{
            return(
              <div className="col-lg-4 col-md-6 col-12 mt-3">
              <div className="card position-relative  text-center" style={{width: "18rem"}}>
              <button className='btn position-absolute top-0 end-0' onClick={() => revomefromfavorite(item.id)}>
  <i className="fa-solid fa-heart text-danger"></i>
</button>
  {item?.recipe.imagePath?<img src={`${IMG_BASE}/${item.recipe.imagePath}`} className="card-img-top img-favorite" alt="..."/>:<Nodata />}
  <div className="card-body">
    <h5 className="card-title">{item?.recipe.name}</h5>
    <p className="card-text">{item.recipe.descreption}</p>
    <button className='btn btn-danger' onClick={()=>revomefromfavorite(item.id)}> remove </button>
  </div>
</div>
</div>

            )
          })
        ):<Nodata/>}
      </div>
      </div>
      
    </div>
  )
}
