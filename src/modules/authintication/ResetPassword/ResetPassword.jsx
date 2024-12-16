import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {  useNavigate } from 'react-router-dom'
import { emailvalidation } from '../../../constants/VALIDATION.JSX'
import axios from 'axios'
import {URL_USERS } from '../../../constants/END_POINTS'
import { toast } from 'react-toastify'
import { passwordvalidation } from '../../../constants/VALIDATION.JSX'

export default function ResetPassword() {
  const {register,handleSubmit,formState:{errors},getValues}=useForm()
const navigate=useNavigate()
    const onsubmit=async(data)=>{
      try{
        const response= await axios.post(URL_USERS.resetpassword,data)
        toast.success(response.data.message||"ResetPassword is successfully")
        navigate("/")
      }
      catch(error){
        toast.error(error.response.data.message);
      }
        
    }
const [showpassword,Setshowpassword]=useState()

  return (
    <div className='row justify-content-center'>
      <h2> Reset  Password</h2>
      <p className='text-muted'>Please Enter Your Otp  or Check Your Inbox </p>
      <form onSubmit={handleSubmit(onsubmit)}>
        {/* EMAIL form and validation */}
      <div className="input-group flex-nowrap py-2">
  <span className="input-group-text" id="addon-wrapping">
  <i className="fa-regular fa-envelope"></i>
        </span>
  <input type="email" className="form-control" placeholder="email" aria-label="email" aria-describedby="addon-wrapping"{...register("email",emailvalidation)}/>
</div>
{errors.email && <span className='text-danger'>{errors.email.message}</span>}

        {/* code form and validation */}
        <div className="input-group flex-nowrap py-2 ">
  <span className="input-group-text" id="addon-wrapping">
  <i className="fa-solid fa-key"></i>        </span>
  <input type="text" className="form-control" placeholder="code" aria-label="code" aria-describedby="addon-wrapping"{...register("seed",)}/>
  
</div>
{errors.seed && <span className='text-danger'>{errors.seed.message}</span>}

<div className="col">
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
</div>
<div className="col">
        <div className="input-group flex-nowrap py-2">
  <span className="input-group-text" id="addon-wrapping">
  <i className="fa-solid fa-lock"></i>
        </span>
  <input type={`${showpassword?"text":"password"}`} className="form-control" placeholder="confirmPassword " aria-label="confirmPassword " aria-describedby="addon-wrapping"{...register("confirmPassword",{required:"confirmPassword is requried",
    validate:(value)=>value===getValues("password")||"password is not match"
  })}/>
  <button type='button' className='input-group-text' onMouseUp={(e)=>e.preventDefault()} onMouseDown={(e)=>e.preventDefault()} onClick={()=>Setshowpassword((prevstate)=>!prevstate)}>
<i className={`${showpassword ? "fa-regular fa-eye" : "fa-regular fa-eye-slash"}`}></i>

</button>
</div>

{errors.confirmPassword  && <span className='text-danger'>{errors.confirmPassword.message}</span>}
        </div>
    <button type='submit' className='btn btn-success w-100 py-1'> Reset Password</button>
      </form>
    </div>
  )
}
