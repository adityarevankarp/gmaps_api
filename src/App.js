import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import './App.css';

import { REACT_APP_GOOGLE_MAPS_KEY } from './key'
import { useEffect, useMemo, useState } from "react";
import AdminMap from "./AdminMap.js";
function App() {

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: REACT_APP_GOOGLE_MAPS_KEY,
    libraries: [],
  });

  if (!isLoaded) return <div>Loading...</div>

  return (
    <div>
      <Map />
    </div>
  );
}
function Map() {
  // const [curLat, setCurLat] = useState('');
  // const [curLng, setCurLng] = useState('');
  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition((position) => {
      
  //     setCurLat(position.coords.latitude);
  //     setCurLng(position.coords.longitude);
  //     console.log(curLat,curLng);
  //   })
  // }, []) 
  const [currentLocation, setCurrentLocation] = useState(null);
  useEffect(() => {
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setCurrentLocation(userLocation);
        setMarkers([userLocation]);
        console.log(userLocation)
      },
      (error) => {
        console.error("Error getting user's location:", error);
      }
    );
  }, []);
  

  const [markers, setMarkers] = useState([
   
  ]);

  const handleMapClick = (mapsMouseEvent) => {
    if (markers.length === 1) {
      const newMarker = {
        lat: mapsMouseEvent.latLng.lat(),
        lng: mapsMouseEvent.latLng.lng(),
      };
      console.log(newMarker.lat, newMarker.lng);
      setMarkers([...markers, newMarker]);
      console.log(markers.length)
    }
    else {
      return null
    }
  }
  const center = currentLocation || { lat: 12.9716, lng: 77.5946 };

  const handleMarkerDragEnd = (index, event) => {

    console.log(event.latLng.lat(), event.latLng.lng());
  };
  return (
    <div>
      <AdminMap userLocation={currentLocation}/>
    

    {/* <GoogleMap
      zoom={15}
      center={center}
      mapContainerClassName="map-container"
      onClick={handleMapClick}
    >
      


      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={marker}
          draggable={true}
          onDragEnd={(event) => handleMarkerDragEnd(index, event)}

        />

      ))}

    </GoogleMap> */}
    </div>
  );

}
export default App;