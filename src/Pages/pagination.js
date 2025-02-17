import React from 'react';

const Pagination = ({ postsPerPage, length, currentPage}) => {
    const paginationNumbers = [];

    for (let i = 1; i <= Math.ceil(length / postsPerPage); i++) {
        paginationNumbers.push(i);
    }

    return (
        
        <div className='pagination'>
            {paginationNumbers.map((pageNumber) => (
                <button
                    key={pageNumber}
                    className={currentPage === pageNumber? 'active' : ''}
                >
                    {pageNumber}
                </button>
            ))}
        </div>
    );
};
export default Pagination;