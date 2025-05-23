import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import networkRequest from "../../http/api";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { urlEndPoint } from "../../http/apiConfig";
import Slider from "react-slick";
import { imagePath, settings } from "../../common/common";
import { isEmpty } from "lodash";

const NewsDetail = () => {
  const dispatch =useDispatch()
  const navigate = useNavigate()
  const [news, setNews] = useState([]);
  const { id } = useParams();
  const filteredNews = news.find((item) => item?._id === id);

  const getNews = async () => {
    try {
      const url =urlEndPoint.getnewsbyJournalist
      const res = await networkRequest({url},dispatch);
      setNews(res?.news);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="d-flex">
        <Sidebar />
        <div className="container-fluid">
          <h3 className="mt-5 mb-4">{filteredNews?.title}</h3>
          <div style={{display:'flex',justifyContent:'center'}}>
              {filteredNews?.images?.length >1 ?
            <Slider {...settings} className="news-image">
      {filteredNews?.images?.map((image, index) => (
        <img
          src={`http://localhost:4000/${imagePath(image.url)}`}
          alt={filteredNews?.title}
          key={index}
        />
      ))}
    </Slider>:(!isEmpty(filteredNews?.images)&&
    <img
      src={`http://localhost:4000/${imagePath(filteredNews?.images[0]?.url)}`}
      alt={filteredNews?.title}
      className="news-image"
    />)
    }</div>
          <div className="row">
            <div className="col-md-12">
              <div className="card-body">
                <div className="mb-4">
                  <p>
                    <strong>Category : </strong>
                    {filteredNews?.category}
                  </p>
                  <p>
                    <strong>Location : </strong>
                    {filteredNews?.location}
                  </p>
                </div>
                <p className="mb-1">{filteredNews?.content}</p>
                <div className="mt-5">
                  <span className="badge bg-secondary p-3 ">
                    Status: {filteredNews?.newsStatus || "Pending"}
                  </span>
                  {filteredNews?.newsStatus==="pending" || filteredNews?.newsStatus=== "rejected"?  <button className="btn btn-primary m-3" onClick={()=>{navigate(`/journalist/${id}`)}}>Edit</button>:""}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NewsDetail;
