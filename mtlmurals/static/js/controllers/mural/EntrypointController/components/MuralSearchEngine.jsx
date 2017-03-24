import React, { PropTypes } from 'react';

import smoothScrollTo from '../../../../core/animations/smoothScrollTo';

import FilterForm from './FilterForm';
import ResultListItem from './ResultListItem';
import ResultListPagination from './ResultListPagination';
import ResultMap from './ResultMap';


class MuralSearchEngine extends React.Component {
  static propTypes = {
    murals: PropTypes.array,
    count: PropTypes.number,
    currentPage: PropTypes.number,
    pagesCount: PropTypes.number,
    onSubmitFetchMurals: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {fetching: false};
  }

  componentWillReceiveProps(nextProps) {
    this.setState({fetching: false, });
  }

  async onSubmit(...args) {
    let { onSubmitFetchMurals } = this.props;
    this.setState({fetching: true, });
    await smoothScrollTo(document.getElementById('id_page_search_results'));
    onSubmitFetchMurals(...args);
  }

  onFilterFormSubmit(values) {
    this.onSubmit({filters: values})
  }

  render() {
    let { murals, count, currentPage, pagesCount, } = this.props;
    let countLabel = interpolate(ngettext('%s mural found.', '%s murals found.', 11), [count, ]);
    return (
      <div className="search-wrapper">
        <div id="id_page_search">
          <div id="id_page_search_form"><FilterForm key='filterForm' onSubmit={this.onFilterFormSubmit.bind(this)} /></div>
          <div id="id_page_search_results" {...this.state.fetching ? {className: 'fetching'} : {}}>
            <div className="results-count"><p>{countLabel}</p></div>
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
          <ResultMap key="map" murals={murals} />
        </div>
      </div>
    );
  }
}

export default MuralSearchEngine;
