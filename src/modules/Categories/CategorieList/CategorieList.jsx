import React, { useEffect, useState } from 'react'
import Header from '../../Shared/Header/Header'
import categoryimg from "../../../assets/images/recipes-photo.svg"
import { URL_CATEGORY } from '../../../constants/END_POINTS'
import axios from 'axios'
import { Button, Modal } from 'react-bootstrap'
import DeleteingConformation from "../../Shared/DeleteingConformation/DeleteingConformation"
import { toast } from 'react-toastify'
import { data, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import paginate from '../../../Pagination'

export default function CategorieList() {
  const [catergories,Setcatergories]=useState([])
  const [catergorieid,Setcatergorieid]=useState()
  const [show, setShow] = useState(false);
  const [showcatergory, setshowcatergory] = useState(false);
  const [arrayofpage,Setarrayofpage]=useState([])
  const [currentnumber,setcurrentnumber]=useState()

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true)
    Setcatergorieid(id)
  }
  const handelshowcategory=()=>{
    setshowcatergory(true)
  }
  const handleClosecatergory=()=>{
    setshowcatergory(false)
  }
  const navigate=useNavigate()
  const {register,handleSubmit,formState:{errors}}=useForm()
  const getallcatergries=async(namecat,pagesi,pageno)=>{
    try{
      const response=await axios.get(URL_CATEGORY.getCategories,{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`},params:{
        name:namecat,pageSize:pagesi,pageNumber:pageno
      }})
      console.log(response.data)
      Setcatergories(response.data.data)
      console.log(catergories)
      Setarrayofpage(Array(response.data.totalNumberOfPages).fill().map((_,i)=>i+1))
      setcurrentnumber(response.data.pageNumber)
      console.log(arrayofpage)
    }
    catch(error){
      console.log(error)
    }
   
  }

  const Addcategory=async(data)=>{
    try{
      const response=await axios.post(URL_CATEGORY.createCategory,data,{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}})
      console.log(response.data)
      handleClosecatergory()
      toast.success(response.data.message)
      getallcatergries()
    }
    catch(error){
      console.log(error)
    }
  }
  const deletecatergory=async()=>{
    try{
      const response =await axios.delete(URL_CATEGORY.deleteCategory(catergorieid),{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}})
      console.log(response.data)
      toast.success(response.data.message||"category is deleted successfully")
      navigate("/dashboard/categorielist")
      handleClose()
      getallcatergries()
    }
    catch(error){
      console.log(error)
    }
  }
  const paginationclick=(page)=>{
    if(page>=1 && page<=arrayofpage.length){
      getallcatergries()
    }
  }
useEffect(()=>{
  getallcatergries()
},[])
  return (
    <div className='container-fluid'>
      <div>
      <Header 
      title={"Categories"}
      person={"Item"}
      imgurl={categoryimg}
      descreption={"You can now add your items that any user can order it from the Application and you can edit"}
      />
      </div>
      
      <div className="row m-3">
        <div className="col-md-6">
          <h3>Categories Table Details</h3>
          <span>You can check all details</span>
        </div>
        <div className="col-md-6  d-flex justify-content-end ">
          <div>
          <button className='btn btn-success px-4' onClick={handelshowcategory}>Add New Category</button>

          </div>

        </div>
      </div>
      <div className="row">
      <table className="table">
  <thead>
    <tr>
      <th scope="col">id</th>
      <th scope="col">name</th>
      <th scope="col">creationDate</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
    {catergories.map((cat)=>{
      return(
        <tr key={cat.id}>
          <td>{cat.id}</td>
          <td>{cat.name}</td>
          <td>{cat.creationDate}</td>
          <td>
          <div className="dropdown">
          <i className="fa-solid fa-ellipsis" data-bs-toggle="dropdown"  aria-expanded="false"></i>

  <ul className="dropdown-menu">
    <li><button className="dropdown-item" href="#"><i className="fa-regular fa-eye px-3"></i>view</button></li>
    <li><button className="dropdown-item" href="#" ><i className="fa-regular fa-pen-to-square px-3"></i>edit</button></li>
    <li><button className="dropdown-item" href="#" onClick={()=>handleShow(cat.id)}><i className="fa-solid fa-trash px-3"></i>delete</button></li>
  </ul>
</div>
          </td>
        </tr>
      )
    })}
  </tbody>
</table>
<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <DeleteingConformation />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={deletecatergory}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showcatergory} onHide={handleClosecatergory}>
        <Modal.Header closeButton>
          <Modal.Title>Add Catergory</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(Addcategory)}>
          <input type="text" className='form-control mb-3' placeholder='catergory name' {...register("name",{required:"name is required"})} />
          {errors.name&&<span>{errors.name.message}</span>}
          <Button variant="secondary" className='mx-2' onClick={handleClosecatergory}>
            Close
          </Button>
          <Button variant="primary" type='submit'>
            Save Changes
          </Button>
          </form>
        </Modal.Body>
        
      </Modal>
      </div>
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
      <li className="page-item" key={pageno} onClick={()=>getallcatergries("",2,pageno)}>
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
