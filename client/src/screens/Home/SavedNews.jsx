import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { imagePath, settings } from '../../common/common';
import saveIcon from "../../assets/images/save-instagram.png"
import savedIcon from "../../assets/images/bookmark.png"
import networkRequest from '../../http/api';
import { isEmpty } from 'lodash';
import { urlEndPoint } from '../../http/apiConfig';
import Slider from 'react-slick';

const SavedNews = () => {
    const dispatch =useDispatch()
    const {currentUser} = useSelector((state)=>state.AuthenticationReducer)
    const [savedNews, setSavedNews] = useState([]);
    const [savedItems, setSavedItems] = useState({});
    const token=localStorage.getItem('auth_token');
    
  const fetchSavedNews=async()=>{
    const url = urlEndPoint.getsaved(currentUser?._id)
    try {
      const res = await networkRequest({url},dispatch)
      setSavedNews(res?.savedNews);
      setSavedItems(res?.savedNews.reduce((acc, news) => {
        acc[news._id] = news;
        return acc;
      }, {}));
    } catch (error) {
      console.error(error);
    }
  }

    useEffect(() => {
        if(token && !isEmpty(currentUser)){
            fetchSavedNews()
        }
       }, [])

      const handleRemoveSavedNews=async(newsId)=>{
        if(currentUser){
            try {
              const url =urlEndPoint.addsavedNews
              const res = await networkRequest({url, method:'post', data:{userId: currentUser?._id,newsId }},dispatch);
              if(res.status){
            setSavedItems({...savedItems,[newsId]:true});
            fetchSavedNews();
            }else{
            setSavedItems({...savedItems,[newsId]:false});
            fetchSavedNews();
            }
            } catch (error) {
              console.error('Error saving news:', error);
            }
          }
    }
       
    return (
        <div>
            <Navbar />
            <div className="saved-news-container"style={{height:'80vh'}}>
                <h1 className="text-center m-4">Saved News</h1>
                <div className="news-list m-5">
                    {savedNews.length > 0 ? (
                        savedNews.map((news) => (
                            <div className="news-card d-flex mb-3" key={news._id}>
                              {news?.images?.length > 1 ? (
    <Slider {...settings} className="news-image">
      {news?.images.map((image, index) => (
        <img
          src={`http://localhost:4000/${imagePath(image.url)}`}
          alt={news?.title}
          className="news-image"
          key={index}
        />
      ))}
    </Slider>
  ) : ( (!isEmpty(news?.images)? 
    <img
      src={`http://localhost:4000/${imagePath(news?.images[0]?.url)}`}
      alt={news?.title}
      className="news-image"
    />: <img
    src="https://picsum.photos/200"
    alt={news?.title}
    className="news-image"
  />)
  )}
                                <div className="news-content">
                                    <h2>{news.title}</h2>
                                    <p>{news.content.substring(0, 100)}...</p>
                                    <a href={`/news/${news._id}`} className="read-more">Read More</a>
                                    <button onClick={()=>handleRemoveSavedNews(news._id)} 
                                    className='btn'><img src={savedItems[news._id]?savedIcon:saveIcon} alt='' className='img'/></button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <h6 className="m-5 p-5"style={{display:'flex',alignItems:"center",justifyContent:"center"}}>No saved news available.</h6>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default SavedNews;
