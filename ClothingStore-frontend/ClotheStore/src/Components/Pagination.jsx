import React from 'react'

export default function Pagination({postsPerPage,totalPosts,paginate,currentPage}) {

    const pageNumbers = []

    for(let i = 1 ; i <= Math.ceil(totalPosts/postsPerPage) ; i++ ){

        pageNumbers.push(i)
    }


    const handleNext = () => {
        if (currentPage < pageNumbers.length) {
          paginate(currentPage + 1); // Go to the next page
        }
      };
    
      const handlePrevious = () => {
        if (currentPage > 1) {
          paginate(currentPage - 1); // Go to the previous page
        }
      };



  return (
    <nav>
    <ul className="pagination">
      <button
        className="page-item"
        onClick={handlePrevious}
        disabled={currentPage === 1} // Disable if you're on the first page
      >
        Previous
      </button>

      {pageNumbers.map(number => (
        <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
          <a
            onClick={() => paginate(number)}
            className="page-link"
          >
            {number}
          </a>
        </li>
      ))}

      <button
        className="page-item"
        onClick={handleNext}
        disabled={currentPage === pageNumbers.length} // Disable if you're on the last page
      >
        Next
      </button>
    </ul>
  </nav>

  )
}
