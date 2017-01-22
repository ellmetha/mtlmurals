import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchMurals } from '../actions/murals';
import MuralSearchEngine from '../components/MuralSearchEngine';


class MuralSearchEngineContainer extends React.Component {
  static propTypes = {
    params: PropTypes.object,
    murals: PropTypes.array,
    fetchMurals: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.fetchMurals();
  }

  render() {
    let { murals } = this.props;
    return (
      <MuralSearchEngine key="murals" murals={murals} />
    );
  }
}

export default connect(
  state => ({
    murals: state.murals.list.map(id => state.murals.items[id]),
  }),
  {fetchMurals, }
)(MuralSearchEngineContainer);
