import { AUTH_CREATE_FAILURE, AUTH_CREATE_SUCCESS, AUTH_LOGIN_FAILURE, AUTH_LOGIN_SUCCESS, GET_CURRENT_USER } from "../../common/constant";
import fetchData from "../../http/api"

export const RegisterUserAuth=(user,navigate,setModalOpen)=>{
    return async(dispatch)=>{
        try {
        const res = await fetchData("/register","post", user)
        if (res.status === 200) {
            dispatch({ type: AUTH_CREATE_SUCCESS, payload: res });
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
        try {
        const res = await fetchData("/login","post",user)
       
        if (res.status === 200) {
            dispatch({ type: AUTH_LOGIN_SUCCESS, payload: res });
            const userRes = await fetchData('/currentuser','get')
            if (userRes.status === 200) {
                dispatch({ type: GET_CURRENT_USER, payload: userRes.user });
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
    try {
        const res = await fetchData('/currentuser','get')
        if (res.status === 200) {
            dispatch({type:GET_CURRENT_USER,payload:res.user});
        } 
    } catch (err) {
        console.error(err.message)
        return null
    }
}
}
