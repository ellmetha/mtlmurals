import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import fetchMurals from '../actions/murals';
import MuralSearchEngine from '../components/MuralSearchEngine';


class MuralSearchEngineContainer extends React.Component {
  static propTypes = {
    murals: PropTypes.array.isRequired,
    count: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    pagesCount: PropTypes.number.isRequired,
    fetching: PropTypes.bool,
    fetchMurals: PropTypes.func.isRequired,
  };

  static defaultProps = {
    fetching: false,
  };

  componentDidMount() {
    this.props.fetchMurals();
  }

  render() {
    const { count, currentPage, fetching, murals, pagesCount } = this.props;
    return (
      <MuralSearchEngine
        key="murals" murals={murals} count={count} currentPage={currentPage} pagesCount={pagesCount}
        fetching={fetching} onSubmitFetchMurals={this.props.fetchMurals}
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
  }),
  { fetchMurals },
)(MuralSearchEngineContainer);
