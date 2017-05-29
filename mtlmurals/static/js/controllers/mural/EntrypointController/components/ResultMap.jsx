import L from 'leaflet';
import PropTypes from 'prop-types';
import React from 'react';


class ResultMap extends React.Component {
  static propTypes = {
    murals: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      iconDefault: null,
      iconViewed: null,
      map: null,
      tileLayer: null,
    };
    this._mapNode = null;
  }

  componentDidMount() {
    this.initMap(this._mapNode);
  }

  shouldComponentUpdate(nextProps, _nextState) {
    const oldMuralIds = this.props.murals.map(item => item.id);
    const newMuralIds = nextProps.murals.map(item => item.id);
    if (oldMuralIds.length === newMuralIds.length &&
        oldMuralIds.every((v, i) => v === newMuralIds[i])) {
      return false;
    }
    return true;
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
    // Creates a basic map.
    const map = L.map(id, {
      center: [45.5088400, -73.5878100],
      zoomControl: false,
      zoom: 13,
      maxZoom: 18,
      minZoom: 11,
      scrollwheel: false,
      legends: true,
      infoControl: false,
      attributionControl: true,
    });

    // Sets zoom controls position and copyright information.
    L.control.zoom({ position: 'topleft' }).addTo(map);
    const tileLayer = L.tileLayer(
      'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
        minZoom: 11,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, ' +
          '&copy; <a href="https://carto.com/attribution">CARTO</a>',
        id: '',
        accessToken: '',
      }).addTo(map);

    // Initializes marker icons.
    const DefaultIcon = L.Icon.extend({
      options: {
        shadowSize: [0, 0],
        iconSize: [29, 41],
        iconAnchor: [14, 41],
        popupAnchor: [0, -41],
      },
    });
    const iconDefault = new DefaultIcon({ iconUrl: '/static/img/map_marker.svg' });
    const iconViewed = new DefaultIcon({ iconUrl: '/static/img/map_marker_viewed.svg' });

    // Sets our state to include the icons, the map and the tile layer.
    this.setState({ iconDefault, iconViewed, map, tileLayer });
  }

  /**
   * Updates the Leaflet map by adding markers for each mural listed in the search results. This
   * method is called each time the component is updated.
   */
  updateMap() {
    // Fetches the mural objects and return immediately if there are no murals to consider.
    const { murals } = this.props;
    if (!murals.length) { return; }

    const { iconDefault, iconViewed, map } = this.state;

    // Removes previously created markers.
    map.eachLayer((layer) => {
      if (layer.options.mural) {
        map.removeLayer(layer);
      }
    });

    // Adds a new marker for each mural.
    const bounds = new L.LatLngBounds([]);
    for (let i = 0; i < murals.length; i += 1) {
      const mural = murals[i];
      const marker = L.marker({
        lat: mural.latitude,
        lng: mural.longitude,
      }, {
        mural: true,
        draggable: false,
        icon: iconDefault,
        viewedIcon: iconViewed,
      });

      // Assemble the HTML for the marker's popup because Leaflet's bindPopup cannot use JSX.
      const popupContent = `<div>
          <a href="#" target="_blank">
            <span class="item-image"><img src=${mural.image_url} alt="" /></span>
            <span class="item-content">
              <span class="item-title title is-4">${mural.title}</span>
              <span class="item-year subtitle">${mural.year}</span>
            </span>
          </a>
        </div>`;
      marker.bindPopup(popupContent);
      marker.on('click', (ev) => {
        // Updates the icon of the marker because it has been viewed.
        ev.target.setIcon(ev.target.options.viewedIcon);
      });

      const latlng = [mural.latitude, mural.longitude];
      bounds.extend(latlng);
      map.addLayer(marker);
    }

    // Ensures all the markers are visible.
    map.fitBounds(bounds, { padding: [10, 10] });
  }

  render() {
    return (
      <div id="id_map_wrapper"><div ref={(node) => { this._mapNode = node; }} id="map" /></div>
    );
  }
}

export default ResultMap;
