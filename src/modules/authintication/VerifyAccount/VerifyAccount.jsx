import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { emailvalidation } from '../../../constants/VALIDATION.JSX'
import axios from 'axios'
import {URL_USERS } from '../../../constants/END_POINTS'
import { toast } from 'react-toastify'


export default function VerifyAccount() {

    const {register,handleSubmit,formState:{errors}}=useForm()
const navigate=useNavigate()
    const onsubmit=async(data)=>{
      try{
        const response= await axios.put(URL_USERS.verifyaccount,data)
        toast.success(response.data.message||"login is successfully")
        navigate("/")
      }
      catch(error){
        toast.error(error.response.data.message);
      }
        
    }


  return (
    <div className='row justify-content-center'>
      <h2>Verify account</h2>
      <p className='text-muted'>Please in your otp or check your email</p>
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
  <i class="fa-solid fa-key"></i>        </span>
  <input type="text" className="form-control" placeholder="code" aria-label="code" aria-describedby="addon-wrapping"{...register("code",)}/>
  
</div>
{errors.code && <span className='text-danger'>{errors.code.message}</span>}
   
    <button type='submit' className='btn btn-success w-100 py-1'> send</button>
      </form>
    </div>
  )
}
