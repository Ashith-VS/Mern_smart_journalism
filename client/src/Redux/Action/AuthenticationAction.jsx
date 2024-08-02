import { AUTH_CREATE_FAILURE, AUTH_CREATE_SUCCESS, GET_CURRENT_USER } from "../../common/constant";
import fetchData from "../../http/api"

export const RegisterUserAuth=(user,navigate)=>{
    return async(dispatch)=>{
        try {
        const res = await fetchData("/register","post",user)
        if (res.status === 200) {
            dispatch({ type: AUTH_CREATE_SUCCESS, payload: res });
            navigate("/login"); 
          } else {
            dispatch({ type:AUTH_CREATE_FAILURE, payload: res.message });
          }
        } catch (err) {
            console.error(err.message)
            dispatch({ type: AUTH_CREATE_FAILURE, payload: err.message });
        }
    }
}

export const LoggedUserAuth=(user,navigate)=>{
    return async(dispatch)=>{
        try {
        const res = await fetchData("/login","post",user)
        if (res.status === 200) {
            dispatch({ type: AUTH_CREATE_SUCCESS, payload: res });
            navigate("/"); 
          } else {
            dispatch({ type: AUTH_CREATE_FAILURE, payload: res.message });
          }
        } catch (err) {
            console.error(err.message)
            dispatch({ type: AUTH_CREATE_FAILURE, payload: err.message });
        }
    }
}

export const currentUserAuth =(res)=>{
    // console.log('res: ', res);
    return{
        type: GET_CURRENT_USER,
        payload: res
    }
}
