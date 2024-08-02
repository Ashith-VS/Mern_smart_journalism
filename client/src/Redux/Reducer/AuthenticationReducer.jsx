import { AUTH_CREATE_FAILURE, AUTH_CREATE_SUCCESS, GET_CURRENT_USER } from "../../common/constant";

const initialState = {
    AuthSuccess: {},
    AuthFailure: false,
    token:JSON.parse(localStorage.getItem('auth_token'))||null,
    currentUser:null
}

export default function AuthenticationReducer(state=initialState,action){
  switch (action.type) {
    case AUTH_CREATE_SUCCESS:
        return {
            ...state,
            AuthSuccess:action.payload,
            token:localStorage.setItem('auth_token',JSON.stringify(action.payload.token))
         }
    case AUTH_CREATE_FAILURE :
        return {
            ...state,
             AuthFailure:action.payload,
            }
     case GET_CURRENT_USER:
        return {
            ...state,
             currentUser:action.payload,
            }
           
    default:
        return state;
  }
}

