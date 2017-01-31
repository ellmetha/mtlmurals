import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchMurals } from '../actions/murals';
import MuralSearchEngine from '../components/MuralSearchEngine';


class MuralSearchEngineContainer extends React.Component {
  static propTypes = {
    params: PropTypes.object,
    murals: PropTypes.array,
    count: PropTypes.number,
    currentPage: PropTypes.number,
    pagesCount: PropTypes.number,
    fetching: PropTypes.bool,
    fetchMurals: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.fetchMurals();
  }

  render() {
    let { count, currentPage, fetching, fetchMurals, murals, pagesCount } = this.props;
    return (
      <MuralSearchEngine key="murals"
         murals={murals} count={count} currentPage={currentPage} pagesCount={pagesCount} fetching={fetching}
         onSubmitFetchMurals={fetchMurals}
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
    fetching: state.murals.fetching
  }),
  {fetchMurals, }
)(MuralSearchEngineContainer);
