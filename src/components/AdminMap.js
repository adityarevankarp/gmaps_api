import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";


import { REACT_APP_GOOGLE_MAPS_KEY } from "../key";
import { useEffect, useState } from "react";
import "./AdminMap.css"

function AdminMap(){
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: REACT_APP_GOOGLE_MAPS_KEY,
        libraries: [],
      });
    
      if (!isLoaded) return <div>Loading...</div>;
    
      return (
        <div>
          <Map />
        </div>
      );
    
}
function Map() {
  
    const [currentLocation, setCurrentLocation] = useState(null);
    const [finalLocation, setFinalLocation] = useState(null);
    const [markers, setMarkers] = useState([]);
    
  
    
    const center = { lat: 12.9716, lng: 77.5946 };
  
    
  
   
    return (
      <>
        <GoogleMap
          zoom={13}
          center={center}
          mapContainerClassName="map-container"
          
        >
          {markers.map((marker, index) => (
            <Marker
              key={index}
              position={marker}
              draggable={true}
              
            />
          ))}
        </GoogleMap>
        
        
      </>
    );
  }
export default AdminMap;