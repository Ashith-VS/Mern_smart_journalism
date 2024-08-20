import React from "react";
import { useSelector } from "react-redux";

const Loader = () => {
  const {isLoading} = useSelector((state) => state.AuthenticationReducer);

  return (
    <>
      {isLoading && (
        <div className="loader-container">
          <div className="loader-inner" id="loaderContainer" tabIndex={0}>
            <div className="spinner"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default Loader;