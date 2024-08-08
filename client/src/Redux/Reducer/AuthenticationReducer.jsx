import { AUTH_CREATE_FAILURE, AUTH_CREATE_SUCCESS, AUTH_LOGIN_FAILURE, AUTH_LOGIN_SUCCESS, GET_CURRENT_USER } from "../../common/constant";

const initialState = {
    AuthSuccess: {},
    AuthFailure: false,
    LoginSuccess:{},
    LoginFailure: false,
    currentUser:null,
    token: localStorage.getItem('auth_token')
}
// JSON.parse(localStorage.getItem('auth_token'))
export default function AuthenticationReducer(state=initialState,action){
  switch (action.type) {
    case AUTH_CREATE_SUCCESS:
        return {
            ...state,
            AuthSuccess:action.payload,
         }
    case AUTH_CREATE_FAILURE :
        return {
            ...state,
             AuthFailure:action.payload,
            }
case AUTH_LOGIN_SUCCESS:
    // localStorage.setItem('auth_token',JSON.stringify(action.payload.token))
    localStorage.setItem('auth_token',action.payload.token)
     return {
     ...state,
     LoginSuccess:action.payload,
    }
case AUTH_LOGIN_FAILURE :
    return {
        ...state,
        LoginFailure:action.payload,
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

