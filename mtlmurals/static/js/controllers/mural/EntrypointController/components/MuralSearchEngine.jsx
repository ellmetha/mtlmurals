import React, { PropTypes } from 'react';

import ResultListItem from './ResultListItem';
import ResultListPagination from './ResultListPagination';

import smoothScrollTo from '../../../../core/animations/smoothScrollTo';


class MuralSearchEngine extends React.Component {
  static propTypes = {
    murals: PropTypes.array,
    count: PropTypes.number,
    currentPage: PropTypes.number,
    pagesCount: PropTypes.number,
    fetching: PropTypes.bool,
    onSubmitFetchMurals: PropTypes.func.isRequired
  };

  async onSubmit(...args) {
    let { onSubmitFetchMurals } = this.props;
    await smoothScrollTo(document.getElementById('id_page_search_results'));
    onSubmitFetchMurals(...args);
  }

  render() {
    let { murals, count, currentPage, pagesCount, fetching } = this.props;
    return (
      <div className="search-wrapper">
        <div id="id_page_search">
          <div id="id_page_search_form"></div>
          <div id="id_page_search_results" {...fetching ? {className: 'fetching'} : {}}>
            <div id="id_page_search_results_fetching"></div>
            {murals.length > 0 &&
              // A list of murals can be displayed
              <div className="columns is-multiline results-wrapper">
                {murals.map(mural => { return (<ResultListItem key={mural.id} mural={mural} />); })}
              </div>
            }
            <div id="id_page_search_pagination">
              <ResultListPagination key="pagination" count={count} currentPage={currentPage} pagesCount={pagesCount} onPaginate={this.onSubmit.bind(this)} />
            </div>
          </div>
        </div>
        <div id="id_map_search">
        </div>
      </div>
    );
  }
}

export default MuralSearchEngine;
