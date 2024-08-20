import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import networkRequest from '../../http/api';
import { customStyles, imagePath, settings } from '../../common/common';
import saveIcon from "../../assets/images/save-instagram.png"
import savedIcon from "../../assets/images/bookmark.png"
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { isEmpty } from 'lodash';
import Pagination from '../../components/Pagination';
import moment from 'moment';
import { urlEndPoint } from '../../http/apiConfig';
import { getAllNewsData } from '../../Redux/Action/PublicAction';
import Slider from 'react-slick';

const Home = () => {
  const dispatch =useDispatch()
  const navigate =useNavigate()
  const {currentUser} =useSelector((state) =>state.AuthenticationReducer)
  const [newsData, setNewsData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [media, setMedia] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState('list');
  const [filteredNewsData, setFilteredNewsData] = useState([]);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [savedItems, setSavedItems] = useState({});
  const [sortOrder, setSortOrder] = useState("asc")
  const token =localStorage.getItem('auth_token');
  // pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(3); 
  
const {latestNews} =useSelector(state=>state.PublicReducer)

useEffect(()=>{
  dispatch(getAllNewsData(page, limit, sortOrder));
},[page,sortOrder])

useEffect(() => {
  if (latestNews && latestNews.news) {
    setNewsData(latestNews.news);
    setTotalPages(latestNews.page?.totalPages || 0);
    // Extract unique categories from the news data
    const uniqueCategories = [...new Set(latestNews.news.map((item) => item.category))];
    setCategories(uniqueCategories);
  }
}, [latestNews]);

  const getAllMedia = async () => {
    const url = urlEndPoint.media
    try {
      const res = await networkRequest({url},dispatch);
      setMedia(res?.media || []);
    } catch (error) {
      console.error('Error fetching media data:', error);
    }
  };

  useEffect(() => {
    getAllMedia();
  },[]);

  
  const handleMediaSelect = async (data) => {
    setSelectedCategory(data?.name);
    const url = urlEndPoint.filterNews(data?.id,page,limit)
    try {
      const res = await networkRequest({url},dispatch);
      setFilteredNewsData(res?.news || []);
      setTotalPages(res?.pagination?.totalPages)
    } catch (error) {
      console.error(error);
    }
  };
  

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredNewsData(newsData);
    } else if (categories.includes(selectedCategory)) {
      setFilteredNewsData(newsData.filter((news) => news.category === selectedCategory));
    } 
  }, [newsData,selectedCategory]);
 

  const fetchSavedNews=async()=>{
    const url =urlEndPoint.getsaved(currentUser?._id)
  try {
    const res = await networkRequest({url},dispatch)
    setSavedItems(res.savedNews.reduce((acc,curr)=>({...acc,[curr?._id]:true}),{}));
  } catch (error) {
    console.error(error);
  }
}

useEffect(() => {
 if(token && !isEmpty(currentUser)){
fetchSavedNews()
 }
}, [])


const handleSaveNews=async(newsId)=>{
  if(!isEmpty(currentUser)){
    const url =urlEndPoint.addsavedNews
    try {
        const res = await networkRequest({url, method:'post', data:{userId: currentUser?._id,newsId} },dispatch);
        if(res.status){
          setSavedItems({...savedItems,[newsId]:true});
        }else{
          setSavedItems({...savedItems,[newsId]:false});
        }
    } catch (error) {
      console.error('Error saving news:', error);
    }
  }else{
   setLoginModalOpen(true);
  }
}

  return (
    <div>
      <Navbar />
      <div className="home" >
        <div className="sidebar">
      <h3>All Medias</h3>
      {media?.map((item) => (
        <div
          key={item.id}
          className={`media-item ${selectedCategory === item?.name ? 'active' : ''}`}
          onClick={() => handleMediaSelect(item)}
        >
          {item.name}
        </div>
      ))}
    </div>
        <main className="news-container">
          
          <div className="category-buttons">
            {categories.map((category) => (
              <button
                key={category}
                className={`category-button ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="view-mode-toggle">
          <div className="sort-controls d-flex">
          <label htmlFor="sortOrder" className="form-label ">Sort By:</label>
          <select
            id="sortOrder"
            name="sortOrder"
            className="form-select"
            value={sortOrder}
            onChange={(e)=>setSortOrder(e.target.value)}
          >
            <option value="asc">Ascending by Date</option>
            <option value="desc">Descending by Date</option>
            <option value="ascTitle">Ascending by Title</option>
            <option value="descTitle">Descending by Title</option>
          </select>
        </div>
            <button onClick={() => setViewMode('list')} className={`view-mode-button ${viewMode === 'list' ? 'active' : ''}`}>
              List View
            </button>
            <button onClick={() => setViewMode('grid')} className={`view-mode-button ${viewMode === 'grid' ? 'active' : ''}`}>
              Grid View
            </button>
          </div>
         
          <h3 className='text-center m-4'>Latest News</h3>
          <div className={`news-container-${viewMode}`}>
            {filteredNewsData.length > 0 ? (
              filteredNewsData.map((article) => (
                <div className="news-card" key={article?._id}>
    {article?.images?.length > 1 ? (
    <Slider {...settings} className="news-image">
      {article?.images.map((image, index) => (
        <img
          src={`http://localhost:4000/${imagePath(image.url)}`}
          alt={article?.title}
          className="news-image"
          key={index}
        />
      ))}
    </Slider>
  ) : ( (!isEmpty(article?.images)? 
    <img
      src={`http://localhost:4000/${imagePath(article?.images[0]?.url)}`}
      alt={article?.title}
      className="news-image"
    />: <img
    src="https://picsum.photos/200"
    alt={article?.title}
    className="news-image"
  />)
  )}
                  <div className="news-content">
                    <h2>{article.title}</h2>
                    <p>{article?.content?.substring(0, 50)}...</p>
                    <div><span>{moment(article?.publicationDate).format('DD-MM-YYYY')}</span></div>
                    <a href={`/news/${article?._id}`} className="read-more">Read More</a>
                    <button onClick={()=>handleSaveNews(article?._id)} className='btn'><img src={savedItems[article?._id]?savedIcon:saveIcon} alt='' className='img'/></button>
                  </div>
                </div>
              ))
            ) : (
              
              <p className='no-data'>No news available</p>
            )}
          </div>
          <div className='pagination-container'>
           <Pagination 
            currentPage={page} 
            totalPages={totalPages} 
            setPage={setPage}
           /></div>
        </main>
      </div>

      <Footer />
      <Modal isOpen={loginModalOpen} style={customStyles} onRequestClose={() => setLoginModalOpen(false)}>
        <div className="modal-content align-items-center justify-content-center p-5">
          <div className="modal-body text-center">
            <h5 className="modal-title mb-4">Login Required</h5>
            <p>Please login to save News.</p>
            <div className="modal-footer mt-5 p-2">
              <button className="btn btn-secondary mx-2" onClick={() => setLoginModalOpen(false)}>Cancel</button>
              <button className="btn btn-primary mx-2" onClick={() => navigate('/login')}>Login</button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Home;
