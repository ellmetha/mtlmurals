import PropTypes from 'prop-types';
import React from 'react';


const ResultListPagination = ({ currentPage, pagesCount, onPaginate }) => {
  /**
   * Returns an array of page numbers (or ellipsis items) that should be rendered.
   * @return {Array} Array of items that should be rendered in the pagination list.
   */
  const getPaginationItems = () => {
    const previousPage = currentPage - 1;
    const nextPage = currentPage + 1;
    const items = [];

    for (let i = 1; i < pagesCount + 1; i += 1) {
      if (i === 1) {
        items.push([i, i]);
        if (currentPage > 4 && pagesCount > 6) { items.push(['...', i]); }
      } else if (i === pagesCount) {
        if (currentPage < pagesCount - 3 && pagesCount > 6) { items.push(['...', i]); }
        items.push([i, i]);
      } else if (
          (currentPage < 3 && i <= 5) ||
          (currentPage > pagesCount - 2 && i >= pagesCount - 4) ||
          (i >= previousPage - 1 && i <= nextPage + 1)) {
        items.push([i, i]);
      }
    }

    console.log(items);
    return items;
  };

  const paginationItems = getPaginationItems();
  const previousPage = (currentPage > 1) ? currentPage - 1 : undefined;
  const nextPage = (currentPage < pagesCount) ? currentPage + 1 : undefined;
  return (
    <nav className="pagination is-centered">
      <a
        href="#previous"
        {...previousPage ? {
          className: 'pagination-previous',
          'data-page-number': previousPage,
          onClick: (ev) => { ev.preventDefault(); onPaginate({ pageNumber: previousPage }); },
        } : { className: 'pagination-previous', disabled: 'disabled' }}
      >
        Previous
      </a>
      <a
        href="#next"
        {...nextPage ? {
          className: 'pagination-next',
          'data-page-number': nextPage,
          onClick: (ev) => { ev.preventDefault(); onPaginate({ pageNumber: nextPage }); },
        } : { className: 'pagination-next', disabled: 'disabled' }}
      >
        Next page
      </a>
      {paginationItems.length > 0 &&
        <ul className="pagination-list">
          {paginationItems.map(pageArray => (
            <li key={`${pageArray[0]}${pageArray[1]}`}>
              {pageArray[0] === '...' &&
                <span className="pagination-ellipsis">&hellip;</span>
              }
              {pageArray[0] !== '...' &&
                <a
                  href="#{pageNumber[0]}"
                  onClick={(ev) => {
                    ev.preventDefault(); onPaginate({ pageNumber: pageArray[0] });
                  }}
                  data-page-number={pageArray[0]}
                  {...pageArray[0] === currentPage ? {
                    className: 'pagination-link is-current',
                  } : { className: 'pagination-link' }}
                >
                  {pageArray[0]}
                </a>
              }
            </li>))}
        </ul>
      }
    </nav>
  );
};

ResultListPagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  pagesCount: PropTypes.number.isRequired,
  onPaginate: PropTypes.func.isRequired,
};

export default ResultListPagination;
