import React, { useContext } from 'react'
import { authcontext } from '../../../Authcontext/Authcontext'
import { Navigate } from 'react-router-dom'

export default function ProtectRoute({children}) {
    const{logindata}=useContext(authcontext)
    if(localStorage.getItem("token")||logindata){
        return children
    }
    else{
        return <Navigate to="/login"/>
    }
 
}
