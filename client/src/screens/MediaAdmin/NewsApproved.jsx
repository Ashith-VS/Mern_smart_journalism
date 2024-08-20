import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import networkRequest from "../../http/api";
import { isEmpty} from "lodash";
import Modal from "react-modal";
import { customStyles, imagePath, settings } from "../../common/common";
import { urlEndPoint } from "../../http/apiConfig";
import { useDispatch } from "react-redux";
import Slider from "react-slick";

const NewsApproved = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("auth_token");
  const [selectedNews, setSelectedNews] = useState({});
  const [ModalOpen, setModalOpen] = useState(false);
  const [newsData, setNewsData] = useState([]);

  const getNewsData = async () => {
    try {
      const url =urlEndPoint.getMediaAdminAllNews
      if (!isEmpty(token)) {
        const res = await networkRequest({url},dispatch);
        setNewsData(res?.news);
      }
    } catch (error) {
      console.error(error);
    }
   
  };

  useEffect(() => {
    getNewsData();
  }, []);

  const filteredNewsData = newsData.filter(
    (item) => item.newsStatus === "approved"
  );

  const handleView = (id) => {
    const filteredNews = newsData.find((item) => item?._id === id);
    setSelectedNews(filteredNews);
    setModalOpen(true);
  };

  const handleReject = async (id) => {
    const url =urlEndPoint.rejectedNews(id)
    const res = await networkRequest({url, method:"post", data:{newsStatus: "rejected"}},dispatch);
    setModalOpen(false);
    await getNewsData();
  };

  return (
    <div>
      <Navbar />
      <div className="d-flex">
        <Sidebar />
        <div className="container-fluid">
          <h3 className="mt-5 mb-4">News Published</h3>
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                {!isEmpty(filteredNewsData) ? (
                  <table className="table table-striped table-bordered">
                    <thead className="table-dark">
                      <tr>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Images</th>
                        <th>Author ID</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredNewsData?.map((event) => {
                       
                         return (
                          <tr key={event?._id}>
                            <td>{event?.title}</td>
                            <td>{event?.category}</td>
                            {event.images.length >1?
                            <Slider {...settings} className="news-image">
      {event?.images?.map((image, index) => (
        <img
          src={`http://localhost:4000/${imagePath(image.url)}`}
          alt={event?.title}
          key={index}
        />
      ))}
    </Slider>:(!isEmpty(event?.images)?
    <img
      src={`http://localhost:4000/${imagePath(event?.images[0]?.url)}`}
      alt={event?.title}
      className="news-image"
    />:"no images")}
                            <td>{event?.author}</td>
                            <td>
                              <button
                                className="btn btn-primary btn-sm"
                                onClick={() => handleView(event?._id)}
                              >
                                view
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                ) : (
                  <p
                    className="d-flex mt-5"
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    No News is Published
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <Modal
        isOpen={ModalOpen}
        style={customStyles}
        onRequestClose={() => setModalOpen(false)}
      >
        <div className="modal-content align-items-center justify-content-center">
          <div className="modal-body text-center">
            <h5 className="modal-title mb-4">{selectedNews?.title}</h5>
            <div style={{display:'flex',justifyContent:'center'}}>
              {selectedNews?.images?.length >1 ?
            <Slider {...settings} className="news-image">
      {selectedNews?.images?.map((image, index) => (
        <img
          src={`http://localhost:4000/${imagePath(image.url)}`}
          alt={selectedNews?.title}
          key={index}
        />
      ))}
    </Slider>:(!isEmpty(selectedNews?.images)&&
    <img
      src={`http://localhost:4000/${imagePath(selectedNews?.images[0]?.url)}`}
      alt={selectedNews?.title}
      className="news-image"
    />)
    }</div>
            <div
              className="modal-details  d-flex mb-4 p-4"
              style={{ flexDirection: "column", alignItems: "flex-start" }}
            >
              <p>
                <strong>Category:</strong> {selectedNews?.category}
              </p>
              <p>
                <strong>Location:</strong> {selectedNews?.location}
              </p>
            </div>
            <p>{selectedNews?.content}</p>
            <div className="modal-footer mt-5">
              <button
                className="btn btn-secondary mx-2"
                onClick={() => handleReject(selectedNews?._id)}
              >
                {" "}
                Reject
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default NewsApproved;
