import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { get, useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { GET_TAG, URL_CATEGORY, URL_RECIPE } from '../../../constants/END_POINTS'
import { toast } from 'react-toastify'

export default function Recipedata() {
  const{register,handleSubmit,formState:{errors},getValues,reset}=useForm()
  const location=useLocation()
  console.log(location)
  const {recipedataitem,type}=location.state?location.state:""
  console.log(recipedataitem,type)
  // const [tagid,Settagid]=useState(recipedataitem.tag.id)
  // const [categoryid,Setcategoryid]=useState(recipedataitem.category[0].id)
  const [tags,Settags]=useState()
  const [catergories,Setcatergories]=useState()
  const appinedtoform=(data)=>{
    const fromdata=new FormData()
    fromdata.append('name',data.name)
    fromdata.append('description',data.description)
    fromdata.append('price',data.price)
    fromdata.append('tagId',data.tagId)
    fromdata.append('categoriesIds',data.categoriesIds)
    fromdata.append('recipeImage',data.recipeImage[0])
    return fromdata;

  }


const onsubmit=async(data)=>{
  const addcategorydata=appinedtoform(data)
  try{
    const url=type==="edit"? URL_RECIPE.updateRecipe(recipedataitem.id):URL_RECIPE.createRecpe
    const response= await axios({
      method:type==="edit"?"put":"post",
      url:url,
      data:addcategorydata,
      headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}
    })
    console.log(response.data)
    navigate("/dashboard/recipelist")
    toast.success(response.data.message)

  }
  catch(error){
    console.log(error)
  }

}
  const getalltags=async()=>{
    try{
      const response=await axios.get(GET_TAG,{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}})
      console.log(response.data)
      Settags(response.data)
      console.log(tags)
    }
    catch(error){
      console.log(error)
    }
   
  }
  const getallcatergries=async()=>{
    try{
      const response=await axios.get(URL_CATEGORY.getCategories,{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}})
      console.log(response.data.data)
      Setcatergories(response.data.data)
      console.log(catergories)
    }
    catch(error){
      console.log(error)
    }
   
  }
  const navigate=useNavigate()

  useEffect(()=>{
    const fetch=async()=>{
      await getalltags()
      await getallcatergries()
      if (type === "edit" && recipedataitem) {
        reset({
          name: recipedataitem.name,
          description: recipedataitem.description,
          price: recipedataitem.price,
          tagId: recipedataitem?.tag?.id,
          categoriesIds: recipedataitem?.category[0]?.id
        });
      }
    }
  return fetch

},[]);
  
  return (
    <div className='container-fluid'>
      <div className="row align-items-center recipedata my-4">
        <div className="col-md-6">
        {type==="edit"? <h3> Update the <span className='text-success'>Recipes !</span> </h3>:<h3> Fill the <span className='text-success'>Recipes !</span> </h3>}
          
          <p style={{width:"80%"}}>you can now fill the meals easily using the table and form , 
            click here and sill it with the table !</p>
        </div>
        <div className="col-md-6 d-flex justify-content-end">
        <div className="home-button-recipe">
        <button className='btn btn-success px-4' onClick={()=>navigate("/dashboard/recipelist")}>
        All Recipes
        <i className="fa-solid fa-arrow-right ps-3"></i>
        </button>
      </div>
        </div>
      </div>
      <div className='row justify-content-center'>
      <form style={{width:"80%"}} onSubmit={handleSubmit(onsubmit)}>
        <input type='text' placeholder='Recipe Name' className='form-control mb-3' {...register("name",{required:"name is required"})}
        defaultValue={type==="edit"?recipedataitem?.name:""}
        />
{errors.name && <span className="text-danger">{errors.name.message}</span>}
<select className="form-select mb-3" aria-label="Default select example" {...register("tagId",{required:"tag is required"})}

  defaultValue={type === "edit" ? recipedataitem?.tag?.id : ""}
  >
  <option>Tag</option>
  {tags?(
    tags.map((tagitem)=>{
      return(
        <option key={tagitem.id} value={tagitem.id}>{tagitem.name}</option>
      )
    })
  ):""}
</select>
{errors.tagId&&<sapn className="text-danger">{errors.tagId.message}</sapn>}

<input type='number' placeholder='Price' className='form-control mb-3'{...register("price",{required:"price is required"})}
defaultValue={type==="edit"?recipedataitem?.price:""}

/>
{errors.price&&<sapn className="text-danger">{errors.price.message}</sapn>}

<select className="form-select mb-3" aria-label="Default select example" {...register("categoriesIds",{required:"category is required"})}
defaultValue={type==="edit"?recipedataitem?.category[0]?.id : ""}

>

  <option>catergories</option>
  {catergories?(
    catergories.map((catergoriesitem)=>{
      return(
        <option value={catergoriesitem.id}>{catergoriesitem.name}</option>
      )
    })
  ):""}
</select>
{errors.categoriesIds && <span className="text-danger">{errors.categoriesIds.message}</span>}

<textarea type='text' placeholder='Description' className='form-control mb-3' {...register("description",{required:"description is required"})}
defaultValue={type==="edit"?recipedataitem?.description:""}
/>
{errors.description &&<span className="text-danger">{errors.description.message}</span>}

<input type='file'  className='form-control mb-3'{...register("recipeImage",{required:"image is required"})}

/>
{errors.recipeImage && <span className="text-danger">{errors.recipeImage.message}</span>}

<div className="text-end">
<button className='btn btn-outline-success px-5 me-2'type='button' onClick={()=>navigate("/dashboard/recipelist")}>cancel</button>
<button className='btn btn-success px-5'>save</button>
</div>


      </form>
      </div>
      
      
    </div>
  )
}
