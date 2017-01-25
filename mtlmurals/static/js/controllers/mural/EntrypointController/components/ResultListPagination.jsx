import React, { PropTypes } from 'react';


class ResultListPagination extends React.Component {
  static propTypes = {
    count: PropTypes.number,
    currentPage: PropTypes.number,
    pagesCount: PropTypes.number
  };

  /*
   * Returns an array of page numbers (or ellipsis items) that should be rendered.
   */
  getPaginationItems() {
    let { currentPage, pagesCount } = this.props;
    let previousPage = currentPage - 1;
    let nextPage = currentPage + 1;
    let items = [];

    for (var i = 1; i < pagesCount + 1; i++) {
      if (i == 1) {
        items.push(i);
        if (currentPage > 4 && pagesCount > 6) { items.push('...'); }
      } else if (i == pagesCount) {
        if (currentPage < pagesCount - 3 && pagesCount > 6) { items.push('...'); }
        items.push(i);
      } else if (
          (currentPage < 3 && i <= 5) ||
          (currentPage > pagesCount - 2 && i >= pagesCount - 4) ||
          (i >= previousPage - 1 && i <= nextPage + 1)) {
        items.push(i);
      }
    }

    return items;
  }

  render() {
    let { currentPage, pagesCount } = this.props;
    let paginationItems = this.getPaginationItems();
    return (
      <nav className="pagination is-centered">
        <a className="pagination-previous">Previous</a>
        <a className="pagination-next">Next page</a>
        {paginationItems.length > 0 &&
          <ul className="pagination-list">
            {paginationItems.map(pageNumber => {
              return (
              <li>
                {pageNumber == '...' &&
                  <span className="pagination-ellipsis">&hellip;</span>
                }
                {pageNumber != '...' &&
                  <a {...pageNumber == currentPage ? {className: 'pagination-link is-current'} : {className: 'pagination-link'}}>{pageNumber}</a>
                }
              </li>
              );
            })}
          </ul>
        }
      </nav>
    );
  }
}

export default ResultListPagination;
