import L from 'leaflet';
import React, { PropTypes } from 'react';


class ResultMap extends React.Component {
  static propTypes = {
    murals: PropTypes.array,
  };

  constructor(props) {
    super(props);
    this.state = {
      iconDefault: null,
      map: null,
      tileLayer: null,
    };
    this._mapNode = null;
  }

  componentDidMount() {
    this.initMap(this._mapNode);
  }

  componentDidUpdate() {
    this.updateMap();
  }

  componentWillUnmount() {
    // Destroys the Leaflet map object.
    this.state.map.remove();
  }

  /**
   * Initializes a Leaflet map that will be used to show a marker for each mural listed in the
   * search results. It should be noted that this method doesn't handle markers creation because it
   * is called after componentDidMount.
   */
  initMap(id) {
    let { murals } = this.props;

    // Creates a basic map.
    let map = L.map(id, {
      center: [45.5088400,-73.5878100],
      zoomControl: false,
      zoom: 13,
      maxZoom: 18,
      minZoom: 11,
      scrollwheel: false,
      legends: true,
      infoControl: false,
      attributionControl: true
    });

    // Sets zoom controls position and copyright information.
    L.control.zoom({ position: 'topleft'}).addTo(map);
    const tileLayer = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
      minZoom: 11,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
      id: '',
      accessToken: '',
    }).addTo(map);

    // Initializes marker icons.
    let DefaultIcon = L.Icon.extend({
      options: {
        shadowSize:   [0, 0],
        iconSize:     [29, 41],
        iconAnchor:   [14, 41],
        popupAnchor:  [0, -41]
      }
    });
    let iconDefault = new DefaultIcon({iconUrl: '/static/img/map_marker.svg', });

    // Sets our state to include the icons, the map and the tile layer.
    this.setState({iconDefault, map, tileLayer});
  }

  /**
   * Updates the Leaflet map by adding markers for each mural listed in the search results. This
   * method is called each time the component is updated.
   */
  updateMap() {
    // Fetches the mural objects and return immediately if there are no murals to consider.
    let { murals } = this.props;
    if (!murals.length) { return; }

    let { iconDefault, map } = this.state;

    // Removes previously created markers.
    map.eachLayer(function (layer) {
      if (layer.options.mural) {
        map.removeLayer(layer);
      }
    });

    // Adds a new marker for each mural.
    let bounds = new L.LatLngBounds([]);
    for (var i = 0; i < murals.length; i++) {
      let mural = murals[i];
      let marker = L.marker({
        'lat': mural.latitude,
        'lng': mural.longitude,
      }, {
        'mural': true,
        'draggable': false,
        'icon': iconDefault,
      });
      let latlng = [mural.latitude, mural.longitude];
      bounds.extend(latlng);
      map.addLayer(marker);
    }

    // Ensures all the markers are visible.
    map.fitBounds(bounds, {padding: [10, 10]});
  }

  render() {
    return (
      <div id="id_map_wrapper"><div ref={(node) => this._mapNode = node} id="map" /></div>
    );
  }
}

export default ResultMap;
