import React, { useContext, useState } from 'react'
import { Sidebar as Sideitembar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link, useNavigate } from 'react-router-dom';
import { authcontext } from '../../../Authcontext/Authcontext';

export default function Sidebar() {
  const {logindata}=useContext(authcontext)
const navigate=useNavigate()
    const [collaps,Setcollaps]=useState(false)
    const toggle=()=>{
        Setcollaps((prevstate)=>!prevstate)
    }
    const logout=()=>{
            localStorage.removeItem('token');
            navigate("/login")
        }
  return (
    <div className="sidebar-container">
        <Sideitembar collapsed={collaps}>
            <button onClick={toggle} style={{background:"none",border:"none",backgroundColor:"#1f263e"}}><img src='\src\assets\images\3.png' className={`${collaps?"w-32px":"w-24"}`}  /></button>
  <Menu
   
  >

    <MenuItem icon={<i className="fa-solid fa-house"></i>} component={<Link to="home" />}> Home</MenuItem>
    {logindata?.userGroup=="SuperAdmin"?<MenuItem icon={<i className="fa-solid fa-user"></i>} component={<Link to="user" />}> Users</MenuItem>:""}
    <MenuItem icon={<i className="fa-solid fa-receipt"></i>} component={<Link to="recipelist" />}> Recipes</MenuItem>
    {logindata?.userGroup=="SuperAdmin"?<MenuItem icon={<i className="fa-solid fa-table"></i>} component={<Link to="categorielist" />}> categories</MenuItem>:""}
    {logindata?.userGroup!=="SuperAdmin"?<MenuItem icon={<i className="fa-solid fa-unlock"></i>} component={<Link to="favorite" />}> favorite</MenuItem>:""}
    <MenuItem icon={<i className="fa-solid fa-unlock"></i>} component={<Link to="/changepassword" />}> changepassword</MenuItem>
    <MenuItem icon={<i className="fa-solid fa-arrow-right-from-bracket"></i>} onClick={()=>logout()} component={<Link to="/login" />}> logout</MenuItem>
  </Menu>
</Sideitembar>
    </div>
  )
}
