import { GET_ALL_JOURNALIST, GET_ALL_MEDIA_ADMIN, NEWS_ADD_FAILURE, NEWS_ADD_SUCCESS } from "../../common/constant";
import fetchData from "../../http/api";

export const NewsAdded=(news)=>{
    return async(dispatch)=>{
        try {
            const res = await fetchData("/news","post",news)
            if (res.status === 200) {
                dispatch({ type: NEWS_ADD_SUCCESS, payload: res });
            } else {
                dispatch({ type: NEWS_ADD_FAILURE, payload: res.message });
            }
        } catch (err) {
            console.error(err.message)
        }
    }
}

export const  GetMediaAdmins=()=>{
    return async(dispatch)=>{
        try { 
           const res=await fetchData('/mediaAdmins',"get") 
            if (res) {
                dispatch({ type: GET_ALL_MEDIA_ADMIN, payload: res?.mediaAdmins });
            }
        } catch (err) {
            console.error(err.message)
        }
    }
}

export const GetJournalists =()=>{
    return async(dispatch)=>{
    try {
        const res =await fetchData('/journalist',"get")
        if (res) {
            dispatch({ type: GET_ALL_JOURNALIST, payload: res?.journalists });
        }
    } catch (error) {
        console.error(error.message)
    }
}
}

export const GetNews=()=>{
return async(dispatch)=>{
    try {
        const res = await fetchData('/news',"get")
        if (res) {
            dispatch({ type: GET_ALL_NEWS, payload: res?.news });
        }
    } catch (error) {
        console.error(error.message)
    }
}
}