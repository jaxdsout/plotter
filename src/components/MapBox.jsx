import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import { set_polygon_props, set_polygon } from '../store/actions/agent';
import concaveman from 'concaveman';
import { useMatch, useLocation } from 'react-router-dom';
import * as turf from "@turf/turf";

const MapBox = ({ options, retr_options, properties, set_polygon_props, set_polygon, userPolygon, isClientView, isListMode }) => {
  const [mapOptions, setMapOptions] = useState();
  const location = useLocation();

  const isListMatch = useMatch('/dashboard/lists');
  const isClientListMatch = useMatch('/list/:uuid');
  const isSearchMatch = useMatch('/dashboard/search');

  useEffect(() => {
    if (isListMatch) {
      setMapOptions(options);
    } else if (isClientListMatch) {
      setMapOptions(retr_options);
    } else if (isSearchMatch) {
      setMapOptions(properties);
    } else {
      setMapOptions([]);
    }
  }, [location.pathname])

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_YOUR_MAPBOX_ACCESS_TOKEN;
    
    const map = new mapboxgl.Map({
      container: 'MAPBOXBOX',
      className: 'mapboxgl-ctrl',
      style: 'mapbox://styles/mapbox/light-v11',
      center: {lng: '-95.36527442209143', lat: '29.76066296068062'}, 
      zoom: 8,
      scrollZoom: false,
      dragPan: true,
      
    });

    const Draw = new MapboxDraw({
      controls: {
        point: false,
        line_string: true,
        polygon: false,
        trash: true,
        combine_features: false,
        uncombine_features: false
      },
      
    })

    if (mapOptions && mapOptions.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();

      mapOptions.forEach(option => {
        const searchAddy = option.address.replace(/\s+/g, "+")

        const marker = new mapboxgl.Marker({ color: "#90B8F8" })
          .setLngLat([parseFloat(option.longitude), parseFloat(option.latitude)])
          .setPopup(
        //     <div class="rounded-full flex flex-col items-center justify-center">
        //     <img class="max-w-[150px]" src="${property.image}" alt="option"/>
        //     <p class="mb-1 font-bold">${property.name}</p>
        //     <hr>
        //     <a href='https://www.google.com/maps/place/${searchAddy}'>${property.address}<a>
        // </div>
          )
          .addTo(map)

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

      map.addControl(Draw, 'top-left')

      if (userPolygon) {
        Draw.add({
          id: 'saved-polygon',
          type: 'Feature',
          geometry: userPolygon,
          properties: {}
        });
      } else {
        map.on('draw.create', (e) => {
          const feature = e.features[0];
  
          if (feature.geometry.type === 'LineString') {
            const coords = feature.geometry.coordinates;
  
            if (!coords.length || coords[0].toString() !== coords[coords.length - 1].toString()) {
              coords.push(coords[0]);
            }
  
            const polygonFeature = {
              id: feature.id + '-polygon',
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'Polygon',
                coordinates: [coords]
              }
            };
        
            Draw.delete(feature.id);
            Draw.add(polygonFeature);
  
            const rawPoints = coords.map(([lng, lat]) => [lng, lat]);
            console.log(rawPoints, "points")
            const polyCoords = concaveman(rawPoints);
            const newPolygon = turf.polygon([polyCoords]);
  
            if (newPolygon) {
              set_polygon(newPolygon);
              
            }
  
            const filteredProps = properties.filter((prop) => {
              const pt = turf.point([prop.longitude, prop.latitude]);
              return turf.booleanPointInPolygon(pt, newPolygon)
            })
            
            if (filteredProps) {
              set_polygon_props(filteredProps);
            }
          }
        })
      }  
    }

    return () => {
      map.remove();
    };
  }, [mapOptions]); 

  return (
    <div 
      id="MAPBOXBOX"
      className='rounded-md shadow-md'
      style={{
          height: isClientView ? '33rem' : isListMode ? '23rem' : '36rem' ,
          width: isClientView ? '33rem' : isListMode ? '23rem' : '44rem'
      }}
    ></div>
  );
};

const mapStateToProps = state => ({
  isClientView: state.ui.isClientView,
  isListMode: state.ui.isListMode,
  userPolygon: state.agent.userPolygon
});

export default connect(mapStateToProps, { set_polygon_props, set_polygon })(MapBox);