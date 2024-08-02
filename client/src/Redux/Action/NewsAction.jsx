import { NEWS_ADD_FAILURE, NEWS_ADD_SUCCESS } from "../../common/constant";

export const NewsAdded=(news)=>{
    console.log('news: ', news);
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