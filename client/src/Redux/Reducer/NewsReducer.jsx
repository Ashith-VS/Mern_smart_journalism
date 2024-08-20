import { GET_ALL_MEDIA_ADMIN } from "../../common/constant";
const initialState = {
    getmediaAdmin:[],
}

export default function NewsReducer(state=initialState,action){
    switch (action.type) {
        case GET_ALL_MEDIA_ADMIN:
            return{
                ...state,
                getmediaAdmin:action.payload
            }
        default:
            return state
    }
}