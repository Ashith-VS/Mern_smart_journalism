import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import networkRequest from "../../http/api";
import { Link } from "react-router-dom";
import { getFirstLine } from "../../common/common";
import { useDispatch } from "react-redux";
import { urlEndPoint } from "../../http/apiConfig";

const Published = () => {
  const dispatch =useDispatch()
  const [news, setNews] = useState([]);
  const filteredNews = news.filter((item) => item?.newsStatus === "approved");

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
          <h3 className="mt-5 mb-4"></h3>
          <div className="row">
            <div className="col-md-12">
              <div className="card mb-4">
                <div className="card-header">
                  <h5 className="card-title">Published News</h5>
                </div>
                <div className="card-body">
                  <ul className="list-group">
                    {filteredNews?.map((item) => {
                      return (
                        <li className="list-group-item">
                          <h6 className="mb-1">{item?.title}</h6>
                          <p className="mb-1">{getFirstLine(item?.content)}</p>
                          <Link
                            to={`/journalist/news/${item?._id}`}
                            className="btn btn-primary btn-sm"
                          >
                            Read More
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
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

export default Published;
