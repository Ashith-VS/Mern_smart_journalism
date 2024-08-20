import {GET_ALL_MEDIA_ADMIN} from "../../common/constant";
import networkRequest from "../../http/api";
import { urlEndPoint } from "../../http/apiConfig";

export const  GetMediaAdmins=()=>{
    return async(dispatch)=>{
        const url =urlEndPoint.getMediaAdmin
        try { 
           const res=await networkRequest({url},dispatch) 
            if (res) {
                dispatch({ type: GET_ALL_MEDIA_ADMIN, payload: res?.mediaAdmins });
            }
        } catch (err) {
            console.error(err.message)
        }
    }
}



