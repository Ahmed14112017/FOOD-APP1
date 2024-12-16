import React from 'react'
import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div className='authcontainer'>
      <div className="container-fluid overlay-bg">
        <div className="row justify-content-center align-items-center vh-100">
            
            <div className="col-md-7 col-12 bg-white rounded rounded-3 py-3 px-5">
            
            <div className='mb-3 text-center'>
                <img src="\src\assets\images\login-photo.svg "  alt="login-photo"  />
            </div>
            <div>
                <Outlet />
            </div>
            </div>
           
        </div>
      </div>
    </div>
  )
}
