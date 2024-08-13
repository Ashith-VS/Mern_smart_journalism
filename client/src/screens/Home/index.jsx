import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import fetchData from '../../http/api';
import { customStyles, imagePath } from '../../common/common';
import saveIcon from "../../assets/images/save-instagram.png"
import savedIcon from "../../assets/images/bookmark.png"
import { useSelector } from 'react-redux';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { isEmpty } from 'lodash';
import Pagination from '../../components/Pagination';
import moment from 'moment';

const Home = () => {
  const token =localStorage.getItem('auth_token');
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
   // pagination
const [page, setPage] = useState(1);
const [totalPages, setTotalPages] = useState(0);
const [limit, setLimit] = useState(3); 
  
  const getNewsData = async () => {
    try {
      const res = await fetchData(`/latestNews?page=${page}&limit=${limit}&sortOrder=${sortOrder}`, 'get');
      setNewsData(res?.news || []);
      setTotalPages(res?.Pagination?.totalPages||0)
      const uniqueCategories = [...new Set(res?.news.map((item) => item.category))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching news data:', error);
    }
  };

  const getAllMedia = async () => {
    try {
      const res = await fetchData('/media', 'get');
      // const data= await fetchData('/category','get')
      // setCategories(data?.categories);
      setMedia(res?.media || []);
    } catch (error) {
      console.error('Error fetching media data:', error);
    }
  };

  useEffect(() => {
    getNewsData();
  }, [page,sortOrder]);

  useEffect(() => {
    getAllMedia();
  },[]);

  
  const handleMediaSelect = async (data) => {
    setSelectedCategory(data?.name);
    try {
      if(token){
      const res = await fetchData(`/mediaNews/${data?.id}`, 'get');
      // console.log('res: ', res);
      // setNewsData(res?.news || []);
      setFilteredNewsData(res?.news || []);
    }
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
  try {
    const res = await fetchData(`/savedNews/${currentUser?._id}`,"get")
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
    try {
        const res = await fetchData('/savednews', 'post', {userId: currentUser?._id,newsId });
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

const handleSortChange = (e)=>{
  setSortOrder(e.target.value)
}


  return (
    <div>
      <Navbar />
      <div className="home" style={{height:'100vh'}}>
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
            onChange={handleSortChange}
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
                  
                  <img src={article?.images?.[0]?.url ? `http://localhost:4000/${imagePath(article.images[0].url)}` : 'https://picsum.photos/200'} alt={article?.title} className="news-image"/>
                  <div className="news-content">
                    <h2>{article.title}</h2>
                    <p>{article?.content?.substring(0, 50)}...</p>
                    <div><span>{moment(article?.publicationDate).format('DD-MM-YYYY')}</span></div>
                    <a href={`/news/${article?._id}`} className="read-more">Read More</a>
                    {/* {(currentUser?.role === undefined || currentUser?.role === "user" || currentUser === null)&& */}
                    <button onClick={()=>handleSaveNews(article?._id)} className='btn'><img src={savedItems[article?._id]?savedIcon:saveIcon} alt='' className='img'/></button>
                    {/* // } */}
                  </div>
                </div>
              ))
            ) : (
              <p>No news available</p>
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
