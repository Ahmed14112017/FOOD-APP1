export const BASE_URL="https://upskilling-egypt.com:3006/api/v1/";

export const BASE_USERS=`${BASE_URL}Users`;

export const URL_USERS={
    login:`${BASE_USERS}/Login`,
    register:`${BASE_USERS}/Register`,
    forgetpassword:`${BASE_USERS}/Reset/Request`,
    resetpassword:`${BASE_USERS}/Reset`,
    verifyaccount:`${BASE_USERS}/verify`,
    changepassword:`${BASE_USERS}/Changepassword`,
    getUser:`${BASE_USERS}`,
    getUserById:(id)=>`${BASE_USERS}/${id}`,
    deleteUser:(id)=>`${BASE_USERS}/${id}`
}

export const BASE_RECIPE=`${BASE_URL}Recipe/`

export const URL_RECIPE={
    getRecipe:`${BASE_RECIPE}`,
    createRecpe:`${BASE_RECIPE}`,
    getRecipeByid:(id)=>`${BASE_RECIPE}/${id}`,
    updateRecipe:(id)=>`${BASE_RECIPE}/${id}`,
    deleteRecipe:(id)=>`${BASE_RECIPE}/${id}`,
}

export const BASE_CATEGORY=`${BASE_URL}category/`
export const URL_CATEGORY={
    getCategories:`${BASE_CATEGORY}`,
    createCategory:`${BASE_CATEGORY}`,
    getCategoryById:(id)=>`${BASE_CATEGORY}/${id}`,
    updateCategory:(id)=>`${BASE_CATEGORY}/${id}`,
    deleteCategory:(id)=>`${BASE_CATEGORY}/${id}`,
}
export const BASE_FAVORITE=`${BASE_URL}userRecipe/`
export const URL_FAVORITE={
    getFavoriteRecipe:`${BASE_FAVORITE}`,
    addFavoriteRecipe:`${BASE_FAVORITE}`,
    removeFavoriteRecipe:(id)=>`${BASE_FAVORITE}/${id}`,
}


export const GET_TAG=`${BASE_URL}tag/`

export const IMG_BASE="https://upskilling-egypt.com:3006"
