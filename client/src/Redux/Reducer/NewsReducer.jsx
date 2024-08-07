import { GET_ALL_JOURNALIST, GET_ALL_MEDIA_ADMIN } from "../../common/constant";
const initialState = {
    getmediaAdmin:[],
    getjournalist:[]
}

export default function NewsReducer(state=initialState,action){
    switch (action.type) {
        case GET_ALL_MEDIA_ADMIN:
            return{
                ...state,
                getmediaAdmin:action.payload
            }
            case GET_ALL_JOURNALIST :
                return{
                   ...state,
                    getjournalist:action.payload
                }
       
        default:
            return state
    }
}