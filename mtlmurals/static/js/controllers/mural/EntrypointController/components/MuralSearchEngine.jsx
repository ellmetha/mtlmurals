import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import smoothScrollTo from '../../../../core/animations/smoothScrollTo';

import FilterForm from './FilterForm';
import ResultListItem from './ResultListItem';
import ResultListPagination from './ResultListPagination';
import ResultMap from './ResultMap';


class MuralSearchEngine extends React.Component {
  static propTypes = {
    murals: PropTypes.array.isRequired,
    count: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    pagesCount: PropTypes.number.isRequired,
    onSubmitFetchMurals: PropTypes.func.isRequired,
    initialFilters: PropTypes.object.isRequired,
    fetching: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    // The local component state is used to toggle some classes when filters are submitted or when
    // the results are paginated. This is done by using the value of the 'submitting' attribute.
    this.state = { submitting: false };
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // The submitting state attributed is set to true when the filters are submitted or when the
    // results are paginated. The global state associated with the app also maintains a 'fetching'
    // property whenever murals are requested to the server. The value of this property is used to
    // mutate the state and its 'submitting' attribute. This is necessary because the value of the
    // 'submitting' should be set to false when the murals have been successfully fetched from the
    // server (or if an error occurs).
    if (this.props.fetching !== nextProps.fetching &&
        this.state.submitting !== nextProps.fetching) {
      this.setState({ submitting: nextProps.fetching });
    }
  }

  async onSubmit(...args) {
    const { onSubmitFetchMurals } = this.props;
    this.setState({ submitting: true });
    await smoothScrollTo(document.getElementById('id_page_search_results'));
    onSubmitFetchMurals(...args);
  }

  render() {
    const { murals, count, currentPage, pagesCount, initialFilters } = this.props;
    return (
      <div className="search-wrapper">
        <div id="id_page_search">
          <div id="id_page_search_form">
            <FilterForm
              key="filterForm" initialValues={initialFilters}
              onSubmit={this.onSubmit}
            />
          </div>
          <div
            id="id_page_search_results"
            {...this.state.submitting ? { className: 'fetching' } : {}}
          >
            <div className="results-count">
              <p>
                <FormattedMessage
                  id="resultsCount"
                  defaultMessage={
                    '{count, number} {count, plural, one {mural found} other {murals found}}'}
                  values={{ count }}
                />
              </p>
            </div>
            <div id="id_page_search_results_fetching" />
            {murals.length > 0 &&
              // A list of murals can be displayed
              <div className="columns is-multiline results-wrapper">
                {murals.map(mural => <ResultListItem key={mural.id} mural={mural} />) }
              </div>
            }
            <div id="id_page_search_pagination">
              <ResultListPagination
                key="pagination" currentPage={currentPage} pagesCount={pagesCount}
                onPaginate={this.onSubmit}
              />
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
