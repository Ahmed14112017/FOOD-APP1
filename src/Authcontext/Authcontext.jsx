import { jwtDecode } from 'jwt-decode'
import React, { createContext, useEffect, useState } from 'react'

export const authcontext=createContext()

export const Authcontextprovider=({children})=>{
const [logindata,Setlogindata]=useState()

const savelogindata=()=>{
  const token=localStorage.getItem("token");

    if(token){
        const decodeddata=jwtDecode(token);
        Setlogindata(decodeddata);
    }
    else{
        Setlogindata(null);
        localStorage.removeItem("token")
    }
}

useEffect(()=>{
savelogindata()
},[])

return(
    <authcontext.Provider value={{logindata,savelogindata}} >
        {children}
    </authcontext.Provider>
)
}

