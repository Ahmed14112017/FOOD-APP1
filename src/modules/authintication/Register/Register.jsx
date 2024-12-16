import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { emailvalidation } from '../../../constants/VALIDATION.JSX'
import { passwordvalidation } from '../../../constants/VALIDATION.JSX'
import axios from 'axios'
import {URL_USERS } from '../../../constants/END_POINTS'
import { toast } from 'react-toastify'


export default function Register() {

    const {register,handleSubmit,formState:{errors},getValues}=useForm()
const navigate=useNavigate()
    const onsubmit=async(data)=>{
      const registerdata=appendtoformdata(data)
      try{
        const response= await axios.post(URL_USERS.register,registerdata)
        toast.success("account is created successfully")
        navigate("/verify-account")
      }
      catch(error){
        toast.error(error.response.data.message);
      }
        
    }

    const appendtoformdata=(data)=>{
      const fromdata=new FormData()
      fromdata.append("userName",data.userName)
      fromdata.append("email",data.email )
      fromdata.append("country",data.country )
      fromdata.append("phoneNumber",data.phoneNumber )
      fromdata.append("password",data.password)
      fromdata.append("confirmPassword",data.confirmPassword)
      fromdata.append("profileImage",data.profileImage[0])
    }
    const [showpassword,Setshowpassword]=useState(false)

  return (
    <div className='row justify-content-center'>
      <h2>Register</h2>
      <p className='text-muted'>Welcome Back! Please enter your details</p>
      <form onSubmit={handleSubmit(onsubmit)}>
        <div className="row">
        <div className="col col-6">
        <div className="input-group flex-nowrap py-2">
  <span className="input-group-text" id="addon-wrapping">
  <i class="fa-regular fa-user"></i>    
      </span>
  <input type="text" className="form-control" placeholder="username" aria-label="username" aria-describedby="addon-wrapping"{...register("userName",{required:"name is required"})}/>
</div>
{errors.userName && <span className='text-danger'>{errors.userName.message}</span>}
        </div>
        <div className="col col-6">
        <div className="input-group flex-nowrap py-2">
  <span className="input-group-text" id="addon-wrapping">
  <i className="fa-regular fa-envelope"></i>
        </span>
  <input type="email" className="form-control" placeholder="email" aria-label="email" aria-describedby="addon-wrapping"{...register("email",emailvalidation)}/>
</div>
{errors.email && <span className='text-danger'>{errors.email.message}</span>}
        </div>
        </div>
        <div className="row">
        <div className="col col-6">
        <div className="input-group flex-nowrap py-2">
  <span className="input-group-text" id="addon-wrapping">
  <i class="fa-regular fa-flag"></i>
          </span>
  <input type="text" className="form-control" placeholder="country " aria-label="country " aria-describedby="addon-wrapping"{...register("country",{required:"country is required"})}/>
</div>
{errors.country && <span className='text-danger'>{errors.country.message}</span>}
        </div>
        <div className="col col-6">
        <div className="input-group flex-nowrap py-2">
  <span className="input-group-text" id="addon-wrapping">
  <i class="fa-solid fa-phone"></i>
          </span>
  <input type="number" className="form-control" placeholder="phone number" aria-label="number" aria-describedby="addon-wrapping"{...register("phoneNumber",{required:"phone number is requried"})}/>
</div>
{errors.phoneNumber && <span className='text-danger'>{errors.phoneNumber.message}</span>}
        </div>
        </div>
        <div className="row">
<div className="col col-6">
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
<div className="col col-6">
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

        </div>
        <div className="col-12 col-m-6 py-1">
        <input type='file' alt='profileimage' {...register("profileImage",{required:"profileImage is required"})}/>
        </div>
        {errors.profileImage && <span className="text-danger">{errors.profileImage.message}</span>}

       
    <div className='text-end py-3'>
        <Link to={"/"} className='text-decoration-none text-success fs-5'>log in now ?</Link>
    </div>
    <button type='submit' className='btn btn-success w-100'> register</button>
      </form>
    </div>
  )
}
