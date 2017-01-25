import React, { PropTypes } from 'react';

import ResultListItem from './ResultListItem';
import ResultListPagination from './ResultListPagination';


class MuralSearchEngine extends React.Component {
  static propTypes = {
    murals: PropTypes.array,
    count: PropTypes.number,
    currentPage: PropTypes.number,
    pagesCount: PropTypes.number,
    fetching: PropTypes.bool
  };

  render() {
    let { murals, count, currentPage, pagesCount } = this.props;
    return (
      <div className="search-wrapper">
        <div id="id_page_search">
          <div id="id_page_search_form"></div>
          <div id="id_page_search_results">
            {murals.length > 0 &&
              // A list of murals can be displayed
              <div className="columns is-multiline results-wrapper">
                {murals.map(mural => { return (<ResultListItem key={mural.id} mural={mural} />); })}
              </div>
            }
            <div id="id_page_search_pagination"><ResultListPagination key="pagination" count={count} currentPage={currentPage} pagesCount={pagesCount} /></div>
          </div>
        </div>
        <div id="id_map_search">
        </div>
      </div>
    );
  }
}

export default MuralSearchEngine;
