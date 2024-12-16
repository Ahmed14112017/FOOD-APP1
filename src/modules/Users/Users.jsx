import React, { useEffect, useState } from 'react'
import Header from '../Shared/Header/Header'
import userimg from "../../../src/assets/images/recipes-photo.svg"
import axios from 'axios'
import { IMG_BASE, URL_USERS } from '../../constants/END_POINTS'
import Nodata from '../Shared/Nodata/Nodata'
import { Button, Modal } from 'react-bootstrap'
import DeleteingConformation from '../Shared/DeleteingConformation/DeleteingConformation'
import { toast } from 'react-toastify'
import paginate from '../../Pagination'

export default function Users() {
  const [users, setUsers] =useState([])
  const [userid,Setuserid]=useState()
  const [show, setShow] = useState(false);
const [arrayofpage,Setarrayofpage]=useState([])
const[currentpage,Setcurrentpage]=useState([])
  const handleClose = () => setShow(false);
  const handleShow = (id) =>{
    setShow(true);
    Setuserid(id)
  } 
  console.log(arrayofpage)
  const getAlluser=async(pagesiz,pageno,nameinput,useremail,countryuser,kindofuser)=>{
    try{
      const response=await axios.get(URL_USERS.getUser,{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`},
      params:{pageSize:pagesiz,pageNumber:pageno,userName:nameinput,email:useremail,country:countryuser,groups:kindofuser}

    })
      console.log(response.data)
      setUsers(response.data.data)
      console.log(arrayofpage)
      Setarrayofpage(Array(response.data.totalNumberOfPages).fill().map((_,i)=>i+1))
      Setcurrentpage(response.data.pageNumber)
      

    }
    catch(error){
      console.log(error)
    }
  }
  const userdetailes=async()=>{
    try{
      const response=await axios.get(URL_USERS.getUserById(userid),{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}})
      console.log(response.data)
    }
    catch(error){
      console.log(error)
    }
  }

  const Deleteuser=async()=>{
    try{
      const response = await axios.delete(URL_USERS.deleteUser(userid),{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}})
      console.log(response.data)
      toast.success(response.data.message)
      Setuserid()
      handleClose()
      getAlluser(3,1)

    }
    catch(error){
      console.log(error)
    }
  }
  useEffect(()=>{
  getAlluser(3,1)
  },[])
  const handelpagination=(page)=>{
    if(page>=1 && page<arrayofpage.length){
      getAlluser(3,page)
    }
  }
  return (
    <div className='conainer-fluid p-2'>
      <Header 
      title={"User"}
      person={"List"}
      descreption={"You can now add your items that any user can order it from the Application and you can edit"}
      imgurl={userimg}
      />
      <div className='mt-2 col-md-6 col-12'>
      <h3>Users Table Details</h3>
      <p>You can check all details</p>
      </div>
      <table className="table col-12">
  <thead>
    <tr>
      <th scope="col">userName</th>
      <th scope="col">image</th>
      <th scope="col">country</th>
      <th scope="col">email</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    {users.length>0&&(
      users.map((useritem)=>{
        return(
          <tr key={useritem.id}>
            <th scope="row">{useritem.userName}</th>
            <th scope="row">{useritem.imagePath?<img style={{width:"50px"}} src={`${IMG_BASE}/${useritem.imagePath}`} />:<Nodata/>}</th>
            <th scope="row">{useritem.country}</th>
            <th scope="row">{useritem.email}</th>
            <th>
            <div className="dropdown">
   <i className="fa-solid fa-ellipsis" data-bs-toggle="dropdown"  aria-expanded="false"></i>
  <ul className="dropdown-menu">
    <li><button className="dropdown-item" type="button" onClick={()=>userdetailes(useritem.id)}><i className="fa-regular fa-eye px-2"></i>veiw</button></li>
    <li><button className="dropdown-item" type="button" onClick={()=>handleShow(useritem.id)}><i className="fa-solid fa-trash px-2"></i>delete</button></li>
  </ul>
</div>
            </th>
            </tr>
        )
      })
    )}
  </tbody>
</table>

<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Deleteing Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DeleteingConformation />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={Deleteuser}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <nav aria-label="Page navigation example">
  <ul className="pagination">
    <li className="page-item"><button className={`page-link ${currentpage=="1"?"disabled":""}`} onClick={()=>handelpagination(currentpage-1)}>Previous</button></li>
    {paginate({pagenumber:currentpage,totalnumberofpage:arrayofpage.length}).map((pagon)=>{
      return(
        <li className="page-item"onClick={()=>getAlluser(3,pagon)}><button className="page-link">{pagon}</button></li>

      )
    })}
<li className={`page-item ${currentpage == arrayofpage.length ? "disabled" : ""}`}>
  <button
    className="page-link"
    onClick={() => handelpagination(currentpage + 1)}
    disabled={currentpage == arrayofpage.length}
  >
    Next
  </button>
</li>  </ul>
</nav>
    </div>
  )
}
