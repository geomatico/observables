import React, {useState} from 'react';
import PropTypes from 'prop-types';

import Map from '@geomatico/geocomponents/Map';

import {INITIAL_VIEWPORT} from '../config';
import {Marker, Popup} from 'react-map-gl';

// dataset
const markers = [
  {
    lat: 40.4165,
    long: -3.7026,
    name: 'La Alpargata - Taberna Vegana',
    address: 'Calle inventada nº1'
  },
  {
    lat: 40.4093101,
    long: -3.6998817,
    name: 'La Oveja Negra - Taberna Vegana',
    address: 'Calle inventada nº2'
  },
  {
    lat: 40.4106438,
    long: -3.7081776,
    name: 'El Brote - Restaurante de setas',
    address: 'Calle inventada nº3'
  }
];

const CustomPopup = ({marker, onClose}) =>
  <Popup
    latitude={marker.lat}
    longitude={marker.long}
    onClose={onClose}
    closeButton={true}
    closeOnClick={false}
    offsetTop={-30}
  >
    <p>{marker.name}</p>
    <p>{marker.address}</p>
  </Popup>;

const CustomMarker = ({index, marker, onClick}) =>
  <Marker
    longitude={marker.long}
    latitude={marker.lat}>
    <div className="marker" onClick={() => onClick(index)}>
      <span><b>{index + 1}</b></span>
    </div>
  </Marker>;


const MainContent = ({mapStyle}) => {
  const [viewport, setViewport] = useState(INITIAL_VIEWPORT);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const setSelectedMarker = (index) => setSelectedIndex(index);

  const closePopup = () => setSelectedMarker(null);

  return <Map
    mapStyle={mapStyle}
    viewport={viewport}
    onViewportChange={setViewport}
    // mapboxAccessToken={process.env.MAPBOX_ACCESS_TOKEN} // Token necesario para ver datos de mapbox o usar mapbox-gl-js v2 (react-map-gl 6)
  >
    {
      markers.map((marker, index) => {
        return (
          <CustomMarker
            key={`marker-${index}`}
            index={index}
            marker={marker}
            openPopup={setSelectedMarker}
          />
        );
      })
    }

    {
      selectedIndex !== null &&
      <CustomPopup
        index={selectedIndex}
        marker={markers[selectedIndex]}
        onClose={closePopup}
      />
    }

  </Map>;
};

MainContent.propTypes = {
  mapStyle: PropTypes.string.isRequired
};

CustomPopup.propTypes = {
  marker: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    long: PropTypes.number.isRequired,
    name: PropTypes.string,
    address: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func,
};

CustomMarker.propTypes = {
  index: PropTypes.number,
  marker: PropTypes.shape({
    lat: PropTypes.number,
    long: PropTypes.number,
    name: PropTypes.string,
    address: PropTypes.string,
  }),
  onClick: PropTypes.func,
};

export default MainContent;
