import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';

mapboxgl.accessToken = 'pk.eyJ1IjoibHVrZWdvb2RtYW4iLCJhIjoiY2x5OXdubzV0MDF4azJpcXRpOW10YTA1ZSJ9.3J4jqnTcwQkSSZeUg_XY9w';

function Map({ setFormData, lati, lngi }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(77.216721);
  const [lat, setLat] = useState(28.644800);
  const [zoom, setZoom] = useState(5);
  const [lngLat, setLngLat] = useState({})

  const callGeofiy = async () => {
    const marker = new mapboxgl.Marker({
      color: "#FFFFFF",
    }).setLngLat([lngLat.lng, lngLat.lat]).addTo(map.current);
    const res = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${lngLat.lat}&lon=${lngLat.lng}&type=amenity&lang=en&limit=1&format=json&apiKey=${'c76be36965954e5d983f79918d66625b'}`)
    // setLocation(res.data.results[0].formatted)

    setFormData((prev) => {
      return { ...prev, location: res.data.results[0].formatted, lng: lngLat.lng, lat: lngLat.lat }
    })
  }

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: (lati && lngi ? [lngi, lati] : [lng, lat]),
      zoom: zoom
    });


    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });

    map.current.on('click', (e) => {
      setLngLat(e.lngLat)
      console.log(e.lngLat)
    });

    if (lati && lngi) {
      const marker = new mapboxgl.Marker({
        color: "#FFFFFF",
      }).setLngLat([lngi, lati]).addTo(map.current);
    }

  });

  useEffect(() => {
    callGeofiy()
  }, [lngLat])

  return (
    <div>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}

export default Map