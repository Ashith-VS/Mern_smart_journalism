import { All_LATEST_NEWS } from "../../common/constant";

const initialState={
    latestNews:[]
}

export default function PublicReducer(state=initialState,action){
    switch (action.type) {
        case All_LATEST_NEWS:
            return {
                ...state,
                latestNews: action.payload
            }
        default:
            return state
    }
}