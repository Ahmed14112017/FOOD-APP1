import React from 'react'
import { useForm } from 'react-hook-form'
import {  useNavigate } from 'react-router-dom'
import { emailvalidation } from '../../../constants/VALIDATION.JSX'
import axios from 'axios'
import {URL_USERS } from '../../../constants/END_POINTS'
import { toast } from 'react-toastify'


export default function ForgetPassword() {

    const {register,handleSubmit,formState:{errors}}=useForm()
const navigate=useNavigate()
    const onsubmit=async(data)=>{
      try{
        const response= await axios.post(URL_USERS.forgetpassword,data)
        toast.success(response.data.message||"login is successfully")
        navigate("/reset-password")
      }
      catch(error){
        toast.error(error.response.data.message);
      }
        
    }


  return (
    <div className='row justify-content-center'>
      <h2>Forget Your Password ?</h2>
      <p className='text-muted'>No worries! Please enter your email and we will send a password reset link </p>
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


   
    <button type='submit' className='btn btn-success w-100 py-1'> submit</button>
      </form>
    </div>
  )
}
