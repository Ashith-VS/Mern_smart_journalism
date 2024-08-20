import { All_LATEST_NEWS } from "../../common/constant";
import networkRequest from "../../http/api";
import { urlEndPoint } from "../../http/apiConfig";

export const getAllNewsData = (page,limit,sortOrder) => {
    return async(dispatch)=>{
    const url =urlEndPoint.allnews({page,limit,sortOrder})
      try {
        const res = await networkRequest({url}, dispatch );
        dispatch({type:All_LATEST_NEWS,payload:{news:res.news,page:res.Pagination}})
      } catch (error) {
        console.error('Error fetching news data:', error);
      }
    }
    };