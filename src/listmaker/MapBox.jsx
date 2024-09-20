import { useEffect } from 'react';
import { connect } from 'react-redux';
import mapboxgl from 'mapbox-gl';

const MapBox = ({ options, retr_options, isClientView, isListMode }) => {
  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_YOUR_MAPBOX_ACCESS_TOKEN;
    const map = new mapboxgl.Map({
      container: 'MAPBOXBOX',
      className: 'mapboxgl-ctrl',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: {lng: '-95.36527442209143', lat: '29.76066296068062'}, 
      zoom: 8,
      scrollZoom: false,
      dragPan: false
    });
    
    const mapOptions = retr_options || options;

    if (mapOptions && mapOptions.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();

      mapOptions.forEach(option => {
        const marker = new mapboxgl.Marker()
          .setLngLat([parseFloat(option.longitude), parseFloat(option.latitude)])
          .setPopup(new mapboxgl.Popup().setHTML(`
            <div>
                <p>${option.image}</p>
                <img src="${option.image}" alt="option"/>
                <h4>${option.prop_name}</h4>
                <hr>
                <a href=''>${option.address}<a>


            </div>
          `))
          .addTo(map);

        bounds.extend([parseFloat(option.longitude), parseFloat(option.latitude)]);
      });

      map.fitBounds(bounds, {
        padding: 70,
        maxZoom: 15, 
        duration: 1000  
      });
    }

    return () => {
      map.remove();
    };
  }, [options, retr_options]); 

  return (
    <>
    {isClientView ? (
      <div id="MAPBOXBOX" style={{ height: "45rem"}} className='rounded-4' />
    ) : isListMode ? (
      <div id="MAPBOXBOX" style={{ height: "30rem", width: "30rem" }} />
    ) : (
      <></>
    )
  }
    </>
  );
};

const mapStateToProps = state => ({
  markers: state.listmaker.markers,
  error: state.auth.error,
  client_results: state.listmaker.client_results,
  options: state.listmaker.options,
  isClientView: state.ui.isClientView,
  isListMode: state.ui.isListMode
});

export default connect(mapStateToProps, { })(MapBox);