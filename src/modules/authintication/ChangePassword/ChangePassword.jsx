import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {  URL_USERS } from '../../../constants/END_POINTS'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'


export default function ChangePassword() {
    const {register,handleSubmit,formState:{errors},getValues}=useForm()
    const navigate=useNavigate()
    const [showpassword,setshowpassword]=useState(false)
    const onsubmit=async(data)=>{
        try{
            const response=await axios.post(URL_USERS.changepassword,data,{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}})
            console.log(response.data)
            toast.success(response.data.message)
            navigate("/login")
        }
        catch(error){
            console.log(error)
        }
    }
  return (
    <div className='row justify-content-center'>
      <h2>Change Your Password ?</h2>
      <p className='text-muted'>No worries! Please enter your new password and we will send a password reset link </p>
      <form onSubmit={handleSubmit(onsubmit)}>
        {/* change password form and validation */}
      <div className="input-group flex-nowrap py-2">
  <span className="input-group-text" id="addon-wrapping">
  <i className="fa-solid fa-lock"></i>
        </span>
  <input type={`${showpassword?"text":"password"}`} className="form-control" placeholder="oldPassword" aria-label="oldPassword" aria-describedby="addon-wrapping"{...register("oldPassword",{required:"oldpassword isrequired"})}/>
  <button type='button' className='input-group-text'  onClick={()=>setshowpassword((prevstate)=>!prevstate)}>
<i className={`${showpassword ? "fa-regular fa-eye" : "fa-regular fa-eye-slash"}`}></i>

</button>
</div>
{errors.password && <span className='text-danger'>{errors.password.message}</span>}
<div className="input-group flex-nowrap py-2">
  <span className="input-group-text" id="addon-wrapping">
  <i className="fa-solid fa-lock"></i>
        </span>
  <input type={`${showpassword?"text":"password"}`} className="form-control" placeholder="newpassword" aria-label="newpassword" aria-describedby="addon-wrapping"{...register("newPassword",{required:"newPassword isrequired"})}/>
  <button type='button' className='input-group-text' onClick={()=>setshowpassword((prevstate)=>!prevstate)}>
<i className={`${showpassword ? "fa-regular fa-eye" : "fa-regular fa-eye-slash"}`}></i>

</button>
</div>
{errors.newpassword && <span className='text-danger'>{errors.newpassword.message}</span>}

<div className="input-group flex-nowrap py-2">
  <span className="input-group-text" id="addon-wrapping">
  <i className="fa-solid fa-lock"></i>
        </span>
  <input type={`${showpassword?"text":"password"}`} className="form-control" placeholder="confirmNewPassword" aria-label="confirmNewPassword" aria-describedby="addon-wrapping"{...register("confirmNewPassword",{required:"confirmNewPassword isrequired",
  validate:(value)=>value===getValues("newpassword")||"password in not match"
  })}/>
  <button type='button' className='input-group-text'  onClick={()=>setshowpassword((prevstate)=>!prevstate)}>
<i className={`${showpassword ? "fa-regular fa-eye" : "fa-regular fa-eye-slash"}`}></i>

</button>
</div>
{errors.confirmNewPassword && <span className='text-danger'>{errors.confirmNewPassword.message}</span>}

        {/* code form and validation */}


   
    <button type='submit' className='btn btn-success w-100 py-1'> submit</button>
      </form>
    </div>
  )
}





