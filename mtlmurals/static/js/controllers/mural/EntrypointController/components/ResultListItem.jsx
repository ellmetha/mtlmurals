import React, { PropTypes } from 'react';


class ResultListItem extends React.Component {
  static propTypes = {
    mural: PropTypes.object.isRequired,
  };

  render() {
    const { mural } = this.props;
    return (
      <div className="column is-half">
        <a href="#todo" target="_blank" rel="noopener noreferrer">
          <span className="item-image"><img src={mural.image_url} alt="" /></span>
          <span className="item-content">
            <span className="item-title title is-4">{mural.title}</span>
            <span className="item-year subtitle">{mural.year}</span>
          </span>
        </a>
      </div>
    );
  }
}

export default ResultListItem;
