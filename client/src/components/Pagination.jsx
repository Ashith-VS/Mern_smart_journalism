// import React from 'react'

// const Pagination = () => {
//   return (
//     <nav aria-label="Page navigation example">
//       <ul className="pagination justify-content-center">
//         <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
//           <button className="page-link" onClick={handlePreviousClick} aria-label="Previous">
//             <span aria-hidden="true">&laquo;</span>        
//           </button>
//         </li>
//         {pages.map((page,i) => (
//           <li key={i} className={`page-item ${currentPage === page ? 'active' : ''}`}>
//             <button className="page-link" onClick={() => setCurrentPage(page)}>
//               {page}
//             </button>
//           </li>
//         ))}
//         <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
//           <button className="page-link" onClick={handleNextClick} aria-label="Next">
//             <span aria-hidden="true">&raquo;</span>         
//           </button>
//         </li>
//       </ul>
//     </nav>
//   )
// }

// export default Pagination