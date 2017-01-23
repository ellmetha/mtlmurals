import React, { PropTypes } from 'react';


class ResultListItem extends React.Component {
  static propTypes = {
    mural: PropTypes.object
  };

  render() {
    let { mural } = this.props;
    return (
      <div className="column is-half">
        <a href="#" target="_blank">
          <span className="item-image"><img src={mural.image_url} alt=""/></span>
          <span className="item-content">
            <span className="item-title title is-4">{mural.title}</span>
            <span className="item-year has-text-right subtitle">{mural.year}</span>
          </span>
        </a>
      </div>
    );
  }
}

export default ResultListItem;
