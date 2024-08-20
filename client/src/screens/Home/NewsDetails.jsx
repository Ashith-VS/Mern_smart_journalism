import React, { useEffect} from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { useParams } from 'react-router-dom'
import { imagePath, settings } from '../../common/common'
import { useDispatch, useSelector } from 'react-redux'
import { getAllNewsData } from '../../Redux/Action/PublicAction'
import Slider from 'react-slick'
import { isEmpty } from 'lodash'

const NewsDetails = () => {
  const {latestNews}=useSelector(state=>state.PublicReducer)
  const dispatch=useDispatch()
  const { id } = useParams()

  useEffect(() => {
    dispatch(getAllNewsData())
  }, [])
  
  const filteredNews = latestNews?.news?.find((item) => item?._id === id)
  
  return (
    <div>
      <Navbar />
      <div className='container-fluid outer-div' >
        <h3 className="mt-5 mb-4 text-center">{filteredNews?.title}</h3>
        <div className="row">
          <div className="col-md-12">
            <div className="card-body">
              <div className="news-card m-5 p-5" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    {filteredNews?.images?.length > 1 ? (
    <Slider {...settings} style={{ width: '300px', maxHeight: '300px', minHeight:'300px' ,objectFit:'cover' }}>
      {filteredNews?.images?.map((image, index) => (
        <img className='img-class'
          src={`http://localhost:4000/${imagePath(image.url)}`}
          alt={filteredNews?.title}
          key={index}
        />
      ))}
    </Slider>
  ) : ((!isEmpty(filteredNews?.images)? <img
  src={`http://localhost:4000/${imagePath(filteredNews?.images[0]?.url)}`}
  alt={filteredNews?.title}
  className='img-class'
/>:<img
      src="https://picsum.photos/200"
      alt={filteredNews?.title}
      className='img-class'
    />)
  )}
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
