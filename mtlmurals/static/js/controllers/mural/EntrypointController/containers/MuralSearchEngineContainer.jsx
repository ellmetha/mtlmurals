import queryString from 'query-string';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import fetchMurals from '../actions/murals';
import MuralSearchEngine from '../components/MuralSearchEngine';
import history from '../history';


class MuralSearchEngineContainer extends React.Component {
  static propTypes = {
    murals: PropTypes.array.isRequired,
    count: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    pagesCount: PropTypes.number.isRequired,
    fetching: PropTypes.bool.isRequired,
    fetchMurals: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.initialParameters = queryString.parse(history.location.search);
  }

  componentDidMount() {
    const pageNumber = this.initialParameters.page || 1;
    this.props.fetchMurals({ pageNumber });
  }

  render() {
    const { count, currentPage, fetching, murals, pagesCount } = this.props;
    return (
      <MuralSearchEngine
        key="murals" murals={murals} count={count} currentPage={currentPage} pagesCount={pagesCount}
        fetching={fetching} onSubmitFetchMurals={this.props.fetchMurals}
        initialFilters={this.initialParameters}
      />
    );
  }
}

export default connect(
  state => ({
    murals: state.murals.list.map(id => state.murals.items[id]),
    count: state.murals.count,
    currentPage: state.murals.currentPage,
    pagesCount: state.murals.pagesCount,
    fetching: state.murals.fetching,
  }),
  { fetchMurals },
)(MuralSearchEngineContainer);
