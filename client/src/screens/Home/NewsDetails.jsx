import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { useParams } from 'react-router-dom'
import fetchData from '../../http/api'
import { imagePath } from '../../common/common'

const NewsDetails = () => {
  const { id } = useParams()
  const [news, setNews] = useState([])

  const getNewsData = async () => {
    try {
      const res = await fetchData('/latestNews', 'get');
      setNews(res?.news || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getNewsData()
  }, [])

  const filteredNews = news.find((item) => item?._id === id)
  
  return (
    <div>
      <Navbar />
      <div className='container-fluid' style={{ height: '80vh' }}>
        <h3 className="mt-5 mb-4 text-center">{filteredNews?.title}</h3>
        <div className="row">
          <div className="col-md-12">
            <div className="card-body">
              <div className="news-card m-5 p-5" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img
                  src={filteredNews?.images?.[0]?.url ? `http://localhost:4000/${imagePath(filteredNews.images[0].url)}` : 'https://picsum.photos/200'}
                  alt={filteredNews?.title}
                  style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
                />
                <p className='mt-4 mb-3'><strong>Location: </strong>{filteredNews?.location}</p>
                <p className="mb-1">{filteredNews?.content}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default NewsDetails
