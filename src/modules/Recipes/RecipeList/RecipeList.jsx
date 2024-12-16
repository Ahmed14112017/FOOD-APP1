import React, { useContext, useEffect, useState } from 'react'
import Header from '../../Shared/Header/Header'
import recipeimg from "../../../assets/images/recipes-photo.svg"
import axios from 'axios'
import { GET_TAG, IMG_BASE, URL_CATEGORY, URL_FAVORITE, URL_RECIPE } from '../../../constants/END_POINTS'
import { Button } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal';
import DeleteingConformation from '../../Shared/DeleteingConformation/DeleteingConformation'
import { toast } from 'react-toastify'
import { data, Link, useNavigate } from 'react-router-dom'
import Nodata from '../../Shared/Nodata/Nodata'
import paginate from '../../../Pagination'
import { authcontext } from '../../../Authcontext/Authcontext'

export default function RecipeList() {
  const{logindata}=useContext(authcontext)
  const [recipiesitem,Setrecipesitems]=useState([])
  const [recipiesitemdetails,Setrecipiesitemdetails]=useState([])
  const[tags,Settags]=useState([])
  const[catergories,Setcatergories]=useState([])
  const[recipeid,Setrecipeid]=useState(0)
  const[recipeDetailsid,SetrecipeDetailsid]=useState(0)
  const [show, setShow] = useState(false);
  const [showRecipeDetails, setShowRecipeDetails] = useState(false);
  const [arrayofpage,Setarrayofpage]=useState([])
  const [currentnumber,setcurrentnumber]=useState(0)
  const [valuename,setvaluename]=useState("")
  const [valuetag,setvaluetag]=useState("")
  const [valuecatergory,setvaluecatergory]=useState("")
  const navigate=useNavigate()
  const handleClose=()=>{
    setShow(false)
  }
  const [favorite,Setfavorite]=useState(true)
  const [favoriteid,Setfavoriteid]=useState()
  const handleShow = (id) =>{
    setShow(true)
    console.log(id)
    Setrecipeid(id)
    console.log(recipeid)
  }
  const handelshowRecipe=(id)=>{
    setShowRecipeDetails(true)
    SetrecipeDetailsid(id)

  }
  const deleteitem=async()=>{
    try{
      const response = await axios.delete(URL_RECIPE.deleteRecipe(recipeid),{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}})
      console.log(response)
      toast.success(response.data.message||"item is deleted successfully")
      handleClose()
      getrecipeitem()
    }
    catch(error){
      console.log(error)
    }
  }

  const getrecipeitem=async(nameput="",tagid="",categoryid="",pagesi=2,pagenum=1)=>{
    
    try{
      const response= await axios.get(URL_RECIPE.getRecipe,{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`},
      params:{
        pageSize:pagesi,pageNumber:pagenum,name:nameput,tagId:tagid,categoryId:categoryid
      }
    })
      Setrecipesitems(response.data.data)
      Setarrayofpage(Array(response.data.totalNumberOfPages).fill().map((_,i)=>i+1))
      console.log(arrayofpage)
      setcurrentnumber(response.data.pageNumber)
      console.log(currentnumber)
    }
    catch(error){
      console.log(error)
    }
  }
  const recipedetails=async(id)=>{
    try{
      const response =await axios.get(`${URL_RECIPE.getRecipeByid}/${id}`,{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}})
      console.log(response.data)
      Setrecipiesitemdetails(response.data)
      console.log(recipiesitemdetails)
    }
    catch(error){
      console.log(error)
    }
  }
  useEffect(()=>{
    getrecipeitem("","","",2,1)
  },[])

  // const next=()=>{
  //   if(currentnumber<arrayofpage.length){
  //     getrecipeitem(2,currentnumber+1)
  //   }else{
  //     console.log("no more pages")
  //   }
  // }
  // const Previous=()=>{
  //   if(currentnumber>1){
  //     getrecipeitem(2,currentnumber-1)
  //   }else if(
  //     currentnumber===1){
  //       console.log("no previous page")
  //     }
    
  // }
  const paginationclick=(page)=>{
    if(page>=1 && page<=arrayofpage.length){
      getrecipeitem(valuename,valuetag,valuecatergory,2,page)
    }
  }

  /**************fetch TAG*********** */
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
  /*****************fetch catergory********************* */
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
  /******************searchbyname*********************** */
  const getvaluebyname=(e)=>{
    
    const value=e.target.value
    setvaluename(value)
    getrecipeitem(value,valuetag,valuecatergory,2,1)
  }
    /******************searchbytag*********************** */

  const getvaluebytag=(e)=>{
    
    const tagvalue=e.target.value
    setvaluetag(tagvalue)
    getrecipeitem(valuename,tagvalue,valuecatergory,2,1)
  }
    /******************searchbycatergory*********************** */
  const getvaluebycatergory=(e)=>{
    const catergoryvalue=e.target.value
    setvaluecatergory(catergoryvalue)
    getrecipeitem(valuename,valuetag,catergoryvalue,2,1)

  }
  useEffect(()=>{
    getalltags()
    getallcatergries()
  },[])
  const addtofavorite= async(id)=>{
   try{
      const response= await axios.post(URL_FAVORITE.addFavoriteRecipe,{recipeId:id},{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}})
      console.log(response.data)
   }
   catch(error){
    console.log(error)
   }

  }
  return (
    <div className='container-fluid'>
 <div>
      <Header
       title={"Recipes"}
       person={"Items"}
       descreption={"You can now add your items that any user can order it from the Application and you can edit"}
      imgurl={recipeimg}
       />
    </div>
    <div className="row justify-content-between align-items-center">
      <div className="col-md-6 p-3">
        <div className='recipe-content'>
        <h3>Recipe Table Details</h3>
        <p className='fs-5'>You can check all details</p>
        </div>
      
      </div>
      <div className="col-md-6 d-flex justify-content-end">
      <div className="recipe-button">
        <button className='btn btn-success px-4' onClick={()=>navigate("/dashboard/recipedata")}>
        Add new item
        </button>
      </div>
      </div>
    </div>
    <div className="row">
      <div className="col-md-6">
      <div className="input-group flex-nowrap">
  <span className="input-group-text" id="search-icon">
  <i className="fa-solid fa-magnifying-glass"></i>
  </span>
  <input type="search" className="form-control" placeholder="search" aria-label="search" aria-describedby="search-icon"onChange={getvaluebyname}/>
</div>
      </div>
      <div className="col-md-2">
      <select className="form-select" aria-label="Default select example"onChange={getvaluebytag}>
  <option selected>tag</option>
  {tags.length>0&&(
    tags.map((tagitem)=>{
      return(
        <option value={tagitem.id} key={tagitem.id}>{tagitem.name}</option> 
      )
    })
  )}
</select>
      </div>
      <div className="col-md-2">
      <select  className="form-select" aria-label="Default select example" onChange={getvaluebycatergory}>
  <option selected>categorie</option>
  {catergories.length>0&&(
    catergories.map((catitem)=>{
      return(
        <option value={catitem.id} key={catitem.id}>{catitem.name}</option>
      )
    })
  )}
</select>
      </div>
    </div>
    <table className="table my-4">
  <thead >
    <tr>
      <th scope="col">Item Name</th>
      <th scope="col">Iamge</th>
      <th scope="col">Description</th>
      <th scope="col">tage</th>
      <th scope="col">categorie</th>
      <th scope="col">
      
      </th>
    </tr>
  </thead>
  <tbody>
    
      {/* <td scope="row">1</td> */}
      {recipiesitem?.map((item)=>{
        return(
          <tr  key={item.id}>
            <td>{item.name}</td>
            <td>{item.imagePath?(
              <img style={{width:"50px"}} src={`${IMG_BASE}/${item.imagePath}`}/>
            ):<Nodata />}</td>
            <td>{item.description}</td>
            <td>{item.tag.name}</td>
            <td>{item.category[0].name}</td>
            <td>{logindata.userGroup=="SuperAdmin"?
             <div className="dropdown">
              <i className="fa-solid fa-ellipsis" data-bs-toggle="dropdown"  aria-expanded="false"></i>
              <ul className="dropdown-menu">
                <li><Button className='btn-light' onClick={()=>recipedetails(item.id)} type='button' style={{border:"0",fontSize:"15px"}}><i className="fa-regular fa-eye"></i></Button>view</li>
                <li className='ps-2'><Link to={`/dashboard/recipedata/${item.id}`}  state={{recipedataitem:item,type:"edit"}}  style={{border:"0",fontSize:"15px",color:"black", paddingRight:"15px"}}><i className="fa-regular fa-pen-to-square"></i></Link>edit</li>
                <li><Button className='btn-light' onClick={()=>handleShow(item.id)} type='button' style={{border:"0",fontSize:"15px"}}><i className="fa-solid fa-trash"></i></Button>delete</li>
              </ul>
            </div>:<button className='btn' onClick={() => addtofavorite(item.id)}>
  <i className="fa-regular fa-heart"></i>
</button>}
             </td>
          </tr>
        )
      })}
      
  </tbody>
</table>
<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Deleteing Modal </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DeleteingConformation />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={deleteitem}>
            Delete Item
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showRecipeDetails} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>details Modal </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {recipiesitemdetails ? (
    <div>
      <p><strong>Name:</strong> {recipiesitemdetails.name}</p>
      <p><strong>Description:</strong> {recipiesitemdetails.description}</p>
      <p><strong>Price:</strong> {recipiesitemdetails.price}</p>
      {/* Add other fields as necessary */}
    </div>
  ) : (
    <p>Loading...</p>
  )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <nav aria-label="Page navigation example">
  <ul className="pagination">
    <li className="page-item"><button className={`page-link ${currentnumber=="1"?"disabled":""}`} 
    // onClick={Previous}
    onClick={()=>paginationclick(currentnumber-1)}
    >Previous</button></li>
    {/* <li className="page-item"><a className="page-link" href="#">1</a></li>
    <li className="page-item"><a className="page-link" href="#">2</a></li>
    <li className="page-item"><a className="page-link" href="#">3</a></li> */}
    {/* {arrayofpage.map((pagno)=>{
      return     <li className="page-item" key={pagno} onClick={()=>getrecipeitem(2,pagno)}><a className="page-link" href='#'>{pagno}</a></li>

    })} */}
    {paginate({pagenumber:currentnumber,totalnumberofpage:arrayofpage.length}).map((pageno)=>(
      <li className="page-item" key={pageno} onClick={()=>getrecipeitem("","","",2,pageno)}>
        <a className="page-link">{pageno}</a>
      </li>
    ))}
    <li className="page-item"><button className={`page-link ${currentnumber===arrayofpage.length?"disabled":""}`} 
    // onClick={next}
    onClick={()=>paginationclick(currentnumber+1)}
    >Next</button></li>
  </ul>
</nav>
        </div>
   
  )
}
