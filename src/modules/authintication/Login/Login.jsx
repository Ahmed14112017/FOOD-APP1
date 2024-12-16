import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { emailvalidation } from '../../../constants/VALIDATION.JSX'
import { passwordvalidation } from '../../../constants/VALIDATION.JSX'
import axios from 'axios'
import {URL_USERS } from '../../../constants/END_POINTS'
import { toast } from 'react-toastify'


export default function Login() {

    const {register,handleSubmit,formState:{errors}}=useForm()
const navigate=useNavigate()
    const onsubmit=async(data)=>{
      try{
        const response= await axios.post(URL_USERS.login,data)
        toast.success("login is successfully")
        localStorage.setItem("token",response.data.token)
        navigate("/dashboard")
      }
      catch(error){
        toast.error(error.response.data.message);
      }
        
    }

    const [showpassword,Setshowpassword]=useState(false)

  return (
    <div className='row justify-content-center'>
      <h2>Log In</h2>
      <p className='text-muted'>Welcome Back! Please enter your details</p>
      <form onSubmit={handleSubmit(onsubmit)}>
        {/* EMAIL form and validation */}
      <div className="input-group flex-nowrap py-2">
  <span className="input-group-text" id="addon-wrapping">
  <i className="fa-regular fa-envelope"></i>
        </span>
  <input type="email" className="form-control" placeholder="email" aria-label="email" aria-describedby="addon-wrapping"{...register("email",emailvalidation)}/>
</div>
{errors.email && <span className='text-danger'>{errors.email.message}</span>}

        {/* password form and validation */}

<div className="input-group flex-nowrap py-2 ">
  <span className="input-group-text" id="addon-wrapping">
  <i className="fa-solid fa-lock"></i>
        </span>
  <input type={`${showpassword?"text":"password"}`} className="form-control" placeholder="password" aria-label="password" aria-describedby="addon-wrapping"{...register("password",passwordvalidation)}/>
  <button  onMouseUp={(e)=>e.preventDefault()} onMouseDown={(e)=>e.preventDefault()}className='input-group-text' type='button' onClick={()=>Setshowpassword((prevstate)=>!prevstate)}>
<span className='sr-only'>{showpassword?"showpassword":"hidepassword"}</span> 
 <i className={`${showpassword ? "fa-regular fa-eye" : "fa-regular fa-eye-slash"}`}></i>

  </button>
</div>
{errors.password && <span className='text-danger'>{errors.password.message}</span>}
    <div className='d-flex justify-content-between py-3'>
        <Link to={"/register"} className='text-decoration-none text-black'>Register Now ?</Link>
        <Link to={"/forget-password"} className='text-decoration-none text-success'>Forget Password ?</Link>
    </div>
    <button type='submit' className='btn btn-success w-100'> login</button>
      </form>
    </div>
  )
}
