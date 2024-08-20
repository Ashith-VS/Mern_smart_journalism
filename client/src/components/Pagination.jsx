import React from 'react'
import ReactPaginate from "react-paginate";


const Pagination = ({currentPage,totalPages,setPage}) => {

    const handlePageClick = (data) => {
        setPage(data.selected + 1); 
      };

  return (
    <nav className="pagination-wrapper">
    <ReactPaginate
      initialPage={0}
      pageCount={totalPages}
      pageRangeDisplayed={5}
      marginPagesDisplayed={2}
      onPageChange={handlePageClick}
      previousLabel={currentPage === 1 ? "" : "< previous "}
      nextLabel={currentPage === totalPages? "": "Next >"}
      previousLinkClassName="pagination-link"
      nextLinkClassName="pagination-link"
      containerClassName="pagination-wrapper"
      pageClassName="pagination-page"
      pageLinkClassName="pagination-link"
      activeClassName="pagination-active"
      disabledClassName="pagination-disabled"
    />
  </nav>
  )
}

export default Pagination