import { useEffect } from 'react';
import { connect } from 'react-redux';
import mapboxgl from 'mapbox-gl';

const MapBox = ({ options, retr_options }) => {
  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_YOUR_MAPBOX_ACCESS_TOKEN;
    const map = new mapboxgl.Map({
      container: 'YOUR_CONTAINER_ELEMENT_ID',
      className: 'mapboxgl-ctrl',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: {lng: '-95.36527442209143', lat: '29.76066296068062'}, 
      zoom: 8,
    });
    
    const mapOptions = retr_options || options;

    if (mapOptions) {
      mapOptions.forEach(option => {
        new mapboxgl.Marker()
          .setLngLat([parseFloat(option.longitude), parseFloat(option.latitude)])
          .setPopup(new mapboxgl.Popup().setHTML(`${option.prop_name}<hr>${option.address}`))
          .addTo(map);
      });
    }

    return () => {
      map.remove();
    };
  }, [options]); 

  return (
    <div id="YOUR_CONTAINER_ELEMENT_ID" style={{ width: '100%', height: '400px' }} />
  );
};

const mapStateToProps = state => ({
  markers: state.listmaker.markers,
  error: state.auth.error,
  client_results: state.listmaker.client_results,
  options: state.listmaker.options
});

export default connect(mapStateToProps, { })(MapBox);