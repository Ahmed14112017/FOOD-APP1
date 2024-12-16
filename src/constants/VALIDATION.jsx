export const emailvalidation={
required:"Email is require",
pattren:{
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message:"Invalid email",
}
}

export const passwordvalidation={
    required:"Password is require",
    pattren:{
        value: "^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$",
          message:"The password must include at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 6 characters long.",

    }
    


}

