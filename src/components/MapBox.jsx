import { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import { set_polygon_props, set_polygon } from '../store/actions/agent';
import concaveman from 'concaveman';
import { useMatch, useLocation } from 'react-router-dom';
import * as turf from "@turf/turf";

const MapBox = ({ options, retr_options, properties, set_polygon_props, set_polygon, userPolygon, isClientView, isListMode, handleOpenModal }) => {
  const [mapOptions, setMapOptions] = useState();
  const mapContainerRef = useRef();
  const mapRef = useRef();
  const drawRef = useRef();

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
  }, [location.pathname]);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapboxgl.accessToken = process.env.REACT_APP_YOUR_MAPBOX_ACCESS_TOKEN;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: { lng: -95.36527442209143, lat: 29.76066296068062 },
      zoom: 8,
      scrollZoom: false,
      dragPan: true,
    });

    mapRef.current = map;

    const draw = new MapboxDraw({
      controls: {
        point: false,
        line_string: true,
        polygon: false,
        trash: true,
        combine_features: false,
        uncombine_features: false
      },
    });

    drawRef.current = draw;

    if ((isSearchMatch || isListMatch) && draw) {
      map.addControl(draw, 'top-right');
    }

    map.on('load', () => {
      if (mapOptions && mapOptions.length > 0) {
        const bounds = new mapboxgl.LngLatBounds();

        mapOptions.forEach(option => {
          if (!option.longitude || !option.latitude) return;

          const popupContent = document.createElement('div');
          const button = document.createElement('button');
          button.textContent = option.name;
          button.className = 'text-black px-3 py-2 text-blue-600'
          button.onclick = () => handleOpenModal(option);
          popupContent.appendChild(button);

          const popup = new mapboxgl.Popup({ offset: 25 }).setDOMContent(popupContent);

          const marker = new mapboxgl.Marker({ color: "#90B8F8" })
            .setLngLat([parseFloat(option.longitude), parseFloat(option.latitude)])
            .setPopup(popup)
            .addTo(map);

          bounds.extend([parseFloat(option.longitude), parseFloat(option.latitude)]);
        });

        if (!bounds.isEmpty()) {
          map.fitBounds(bounds, {
            padding: 70,
            maxZoom: 15,
            duration: 1000,
          });
        }
      }
    });

    map.on('draw.create', (e) => {
      const feature = e.features[0];

      if (feature.geometry.type === 'LineString') {
        const coords = feature.geometry.coordinates;

        if (coords.length && coords[0].toString() !== coords[coords.length - 1].toString()) {
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

        draw.delete(feature.id);
        draw.add(polygonFeature);

        const rawPoints = coords.map(([lng, lat]) => [lng, lat]);
        const polyCoords = concaveman(rawPoints);
        const newPolygon = turf.polygon([polyCoords]);

        if (newPolygon) {
          set_polygon(newPolygon);
        }

        const filteredProps = properties.filter((prop) => {
          const pt = turf.point([prop.longitude, prop.latitude]);
          return turf.booleanPointInPolygon(pt, newPolygon);
        });

        if (filteredProps) {
          set_polygon_props(filteredProps);
        }
      }
    });

    return () => {
      if (drawRef.current && mapRef.current) {
        map.removeControl(drawRef.current);
      }
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, [mapOptions, isListMatch, isSearchMatch]);

  return (
    <div 
      ref={mapContainerRef}
      className='rounded-md shadow-md'
      style={{
          height: isClientView ? '33rem' : isListMode ? '23rem' : '100%' ,
          width: isClientView ? '33rem' : isListMode ? '23rem' : '100%'
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