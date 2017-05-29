import PropTypes from 'prop-types';
import React from 'react';


const ResultListItem = ({ mural }) => (
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

ResultListItem.propTypes = {
  mural: PropTypes.object.isRequired,
};

export default ResultListItem;
