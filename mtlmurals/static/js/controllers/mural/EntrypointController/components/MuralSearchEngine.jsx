import React, { PropTypes } from 'react';

import ResultListItem from './ResultListItem';


class MuralSearchEngine extends React.Component {
  static propTypes = {
    murals: PropTypes.array
  };

  render() {
    let { murals } = this.props;
    return (
      <div className="search-wrapper">
        <div id="id_page_search">
          <div id="id_page_search_form"></div>
          <div id="id_page_search_results">
            <div className="container-fluid">
              {murals.length > 0 &&
                // A list of murals can be displayed
                <div className="columns is-multiline">
                  {murals.map(mural => { return (<ResultListItem key={mural.id} mural={mural} />); })}
                </div>
              }
            </div>
          </div>
        </div>
        <div id="id_map_search">
        </div>
      </div>
    );
  }
}

export default MuralSearchEngine;
