import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';


export default function MasterLayout() {
  return (
    <div className='d-flex'>
      <Sidebar/>
      <div className='w-100'>
        <Navbar/>
        <Outlet />
      </div>
</div>
 


  )
}
