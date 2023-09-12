import {GoogleMap, Marker, useLoadScript} from "@react-google-maps/api";
import './App.css';

import { REACT_APP_GOOGLE_MAPS_KEY } from './key'
import { useEffect, useMemo ,useState} from "react";
function App() {
  
  const {isLoaded}= useLoadScript({
    googleMapsApiKey:REACT_APP_GOOGLE_MAPS_KEY,
    libraries:[],
  });

  if(!isLoaded) return <div>Loading...</div>

  return (
    <div>
      <Map />
    </div>
  );
}
function Map(){
  const [latitude,setLatitude] = useState('');
  const [longitude,setLongitude] = useState('');
  useEffect(()=>{
    navigator.geolocation.getCurrentPosition((position)=>{
      console.log(position.coords.latitude,position.coords.longitude)
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    })
  },[])
  const center = { lat: latitude, lng: longitude };
  
  const [markers, setMarkers] = useState([]);

  const handleMapClick = (mapsMouseEvent) => {
    if(markers.length == 0){
      const newMarker = {
        lat: mapsMouseEvent.latLng.lat(),
        lng: mapsMouseEvent.latLng.lng(),};
        console.log(newMarker.lat,newMarker.lng);
        setMarkers([...markers, newMarker]);
        console.log(markers.length)
      }
      else{
        return null
      }
    }
    

    const handleMarkerDragEnd = (index, event) => {
      // Log the marker's position after dragging
      console.log(event.latLng.lat(), event.latLng.lng());
    };
  

    
  return (

    
  <GoogleMap 
    zoom={15} 
    center={center} 
    mapContainerClassName="map-container" 
    
    
     
    onClick={handleMapClick}
    >
      <Marker position={center}/>
      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={marker}
          draggable={true} 
          onDragEnd={(event) => handleMarkerDragEnd(index, event)}
          
        />
        
      ))}
    
  </GoogleMap>

  );

}
export default App;
