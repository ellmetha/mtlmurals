import PropTypes from 'prop-types';
import React from 'react';


class ResultListPagination extends React.Component {
  static propTypes = {
    currentPage: PropTypes.number.isRequired,
    pagesCount: PropTypes.number.isRequired,
    onPaginate: PropTypes.func.isRequired,
  };

  /**
   * Returns an array of page numbers (or ellipsis items) that should be rendered.
   * @return {Array} Array of items that should be rendered in the pagination list.
   */
  getPaginationItems() {
    const { currentPage, pagesCount } = this.props;
    const previousPage = currentPage - 1;
    const nextPage = currentPage + 1;
    const items = [];

    for (let i = 1; i < pagesCount + 1; i += 1) {
      if (i === 1) {
        items.push(i);
        if (currentPage > 4 && pagesCount > 6) { items.push('...'); }
      } else if (i === pagesCount) {
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

  paginate(ev) {
    ev.preventDefault();

    const pageNumber = ev.target.attributes.getNamedItem('data-page-number').value;
    this.props.onPaginate({ pageNumber });
  }

  render() {
    const { currentPage, pagesCount } = this.props;
    const paginationItems = this.getPaginationItems();
    const previousPage = (currentPage > 1) ? currentPage - 1 : undefined;
    const nextPage = (currentPage < pagesCount) ? currentPage + 1 : undefined;
    return (
      <nav className="pagination is-centered">
        <a
          href="#previous"
          {...previousPage ? {
            className: 'pagination-previous',
            'data-page-number': previousPage,
            onClick: this.paginate.bind(this),
          } : { className: 'pagination-previous is-disabled' }}
        >
          Previous
        </a>
        <a
          href="#next"
          {...nextPage ? {
            className: 'pagination-next',
            'data-page-number': nextPage,
            onClick: this.paginate.bind(this),
          } : { className: 'pagination-next is-disabled' }}
        >
          Next page
        </a>
        {paginationItems.length > 0 &&
          <ul className="pagination-list">
            {paginationItems.map(pageNumber =>
              <li key={pageNumber}>
                {pageNumber === '...' &&
                  <span className="pagination-ellipsis">&hellip;</span>
                }
                {pageNumber !== '...' &&
                  <a
                    href="#{pageNumber}" onClick={this.paginate.bind(this)}
                    data-page-number={pageNumber}
                    {...pageNumber === currentPage ? {
                      className: 'pagination-link is-current',
                    } : { className: 'pagination-link' }}
                  >
                    {pageNumber}
                  </a>
                }
              </li>)}
          </ul>
        }
      </nav>
    );
  }
}

export default ResultListPagination;
