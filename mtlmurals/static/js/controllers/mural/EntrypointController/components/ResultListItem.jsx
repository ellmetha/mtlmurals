import React, { PropTypes } from 'react';


class ResultListItem extends React.Component {
  static propTypes = {
    mural: PropTypes.object
  };

  render() {
    let { mural } = this.props;
    return (
      <div className="column is-half">{mural.address}</div>
    );
  }
}

export default ResultListItem;
