import { AUTH_CREATE_FAILURE, AUTH_CREATE_SUCCESS, AUTH_LOGIN_FAILURE, AUTH_LOGIN_SUCCESS, GET_CURRENT_USER, LOADER_ACTION } from "../../common/constant";
import networkRequest from "../../http/api";
import { urlEndPoint } from "../../http/apiConfig";

export const RegisterUserAuth=(user,navigate,setModalOpen)=>{
    return async(dispatch)=>{
        const url =urlEndPoint.register
        try {
        const res = await networkRequest({url,method:"post", data:{user}},dispatch)
        if (res.status === 200) {
            dispatch({ type: AUTH_CREATE_SUCCESS, payload: res });

             // Call API to send email with credentials
             if (["mediaAdmin", "Journalist"].includes(user?.role)) {
              const url = urlEndPoint.verifyEmail
             
                const emailPayload = {
                    email: user.email,
                    username: user.name,
                    password: user.password
                };
                await networkRequest({ url, method: "post", data: emailPayload }, dispatch);
            }

            switch (user?.role) {
                case "superAdmin":
                    setModalOpen(true);
                    break;
            case "mediaAdmin":
                   setModalOpen(true);
                    break;
                case "Journalist":
                    setModalOpen(true);
                    break;
                default:
                    navigate("/login");
            }
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
        const url = urlEndPoint.login
        try {
        const res = await networkRequest({url,method:"post",data:user},dispatch)
        if (res.status === 200) {
            dispatch({ type: AUTH_LOGIN_SUCCESS, payload: res });
            const url=urlEndPoint.currentUser
            const userRes = await networkRequest({url},dispatch)
            if (userRes.status === 200) {
                dispatch({ type: GET_CURRENT_USER, payload: userRes.user });
                if(userRes?.user?.mustResetPassword){
                     navigate('/profile')
                }else{
                  switch(userRes.user?.role) {
                        case 'superAdmin':
                            navigate("/admin");
                            break;
                        case 'mediaAdmin':
                            navigate("/mediaAdmin");
                            break;
                        case 'Journalist':
                            navigate("/journalist");
                            break;
                        default:
                            navigate("/"); 
                            break;
                    }
                }
              }
          }else {
            dispatch({ type: AUTH_LOGIN_FAILURE, payload: res.message });
        }
    } catch (err) {
        console.error(err.message)
            dispatch({ type: AUTH_LOGIN_FAILURE, payload: err.message });
        }
    }
}

export const currentUserAuth =()=>{
return async (dispatch)=>{
    const url = urlEndPoint.currentUser
    try {
        const res = await networkRequest({url},dispatch)
        if (res.status === 200) {
            dispatch({type:GET_CURRENT_USER,payload:res.user});
        } 
    } catch (err) {
        console.error(err.message)
        return null
    }
}
}

export const LogOutUserAuth=(navigate)=>{
    return async(dispatch)=>{
    const url =urlEndPoint.logout
    try {
        await networkRequest({url},dispatch)
        localStorage.removeItem('auth_token');
        localStorage.clear();
        dispatch({type:GET_CURRENT_USER, payload:null})
       navigate('/')
      } catch (error) {
        console.error(error)
      }
    }
}

export const showLoader = (status) => ({
    type: LOADER_ACTION,
    payload: status,
});
  