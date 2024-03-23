import { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

const MapBox = () => {
  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_YOUR_MAPBOX_ACCESS_TOKEN;
    const map = new mapboxgl.Map({
      container: 'YOUR_CONTAINER_ELEMENT_ID',
      style: 'mapbox://styles/mapbox/streets-v11'
    });
    return () => {
      map.remove();
    };
  }, []); 

  return (
    <div id="YOUR_CONTAINER_ELEMENT_ID" style={{ width: '100%', height: '400px' }} />
  );
};

export default MapBox;
