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
      dragPan: true,
      
    });
    
    const mapOptions = retr_options || options;

    if (mapOptions && mapOptions.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();

      mapOptions.forEach(option => {
        const searchAddy = option.address.replace(/\s+/g, "+")

        const marker = new mapboxgl.Marker()
          .setLngLat([parseFloat(option.longitude), parseFloat(option.latitude)])
          .setPopup(new mapboxgl.Popup().setHTML(`
            <div class="rounded-full flex flex-col items-center justify-center">
                <img class="max-w-[150px]" src="${option.prop_image}" alt="option"/>
                <p class="mb-1 font-bold">${option.prop_name}</p>
                <hr>
                <a href='https://www.google.com/maps/place/${searchAddy}'>${option.address}<a>
            </div>
          `))
          .addTo(map);
  

        bounds.extend([parseFloat(option.longitude), parseFloat(option.latitude)]);

        return marker
      });

      map.fitBounds(bounds, {
        padding: 70,
        maxZoom: 15, 
        duration: 1000  
      });

      map.addControl(new mapboxgl.NavigationControl({
        showCompass: false,
        
      }))
        
    }

    return () => {
      map.remove();
    };
  }, [options, retr_options]); 

  return (
    <>
    {isClientView ? (
      <div id="MAPBOXBOX" className='rounded-md lg:h-[33rem] lg:w-[33rem] h-[23rem] w-[23rem] shadow-md' />
    ) : isListMode ? (
      <div id="MAPBOXBOX" className='rounded-md lg:h-[23rem] lg:w-[23rem] h-[19rem] w-[19rem] shadow-md' />
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