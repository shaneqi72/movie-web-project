import React, { useMemo, useState } from 'react';

const Pagination = ({ pages, onChangePage, currentPage, setCurrentPage }) => {

    const pageLinks = getPagination(pages, currentPage);

    const [pageNumberLimit, setPageNumberLimit] = useState(5);
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);



    const handleNextBtn = () => {
        setCurrentPage(currentPage - 1);

        if (currentPage + 1 > maxPageNumberLimit) {
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit)
        }
    };

    console.log('maxPageNumberLimit', maxPageNumberLimit)

    const handlePrevBtn = () => {
        setCurrentPage(currentPage - 1);

        if (currentPage - 1 < minPageNumberLimit) {
            setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
        }
    };


    let pageIncrementBtn = null;
    if (pageLinks.length > maxPageNumberLimit) {
        pageIncrementBtn = <li onClick={handleNextBtn}>&hellip;</li>
    };

    let pageDecrementBtn = null;
    if (pageLinks.length > maxPageNumberLimit && maxPageNumberLimit > 5) {
        pageDecrementBtn = <li onClick={handlePrevBtn} >&hellip;</li>
    }

    console.log('pagelinks', pages, currentPage, pageLinks);

    return (
        <div className='container'>
            <div className="row">
                <ul className="pagination">
                    {/* {currentPage > 1 ? <li className="page-item" onClick={handlePrevBtn}><a className='page-link' href='#'>Prev</a></li> : ''}

                    {pageDecrementBtn} */}

                    {pageLinks.map((page, index) => {
                        if (page === '...') {
                            return (
                                <li className="page-item" key={index}><p className='page-link'>...</p></li>
                            );
                        }
                        return (
                            <li className='page-item' key={index}>
                                <a onClick={() => onChangePage(page)} className='page-link'>
                                    {page}
                                </a>
                            </li>
                        );
                    })}


                    {/* {pageIncrementBtn} */}

                    {/* {currentPage < pages + 1 ? <li className="page-item" onClick={handleNextBtn}><a className='page-link' href='#' >Next</a></li> : ''} */}

                </ul>
            </div>
        </div>


    )
};

export default Pagination;

const getPagination = (totalPages, currentPage) => {
    const pages = [];

    let placeholderBefore = false; // Have I rendered the before placeholder
    let placeholderAfter = false;
    let afterCurrent = false; // Has the pointer passed the current page

    for (let i = 1; i <= totalPages; i++) {
        if (currentPage < 4) {
            if (i < 5) {
                pages.push(i);
            } else if (i > (totalPages - 2)) {
                pages.push(i);
            } else if (placeholderBefore === false) {
                pages.push('...');
                placeholderBefore = true;
            }
        } else {
            if (i < 3) {
                pages.push(i);
            } else if (i > (totalPages - 2)) {
                pages.push(i);
            } else if ((i >= currentPage - 1) && (i <= currentPage + 1)) {
                pages.push(i);
                if (i === currentPage) {
                    afterCurrent = true;
                }
            } else if (!placeholderBefore && !afterCurrent) {
                pages.push('...');
                placeholderBefore = true;
            } else if (i < totalPages - 1 && !placeholderAfter && afterCurrent) {
                pages.push('...');
                placeholderAfter = true;
            }
        }
    }
    return pages;
}









  // let indexOfLastItem = currentPage * pagelinksPerPage;
    // let indexOfFirstItem = indexOfLastItem - pagelinksPerPage;
    // let currentItems = pageLinks.slice(indexOfFirstItem, indexOfLastItem);
