import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

import { Link } from "react-router-dom";
import { REACT_APP_GOOGLE_MAPS_KEY } from "../key";
import { useEffect, useState } from "react";
import AdminMap from "./AdminMap";
import "./LocMap.css";

export default function LocMap() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: REACT_APP_GOOGLE_MAPS_KEY,
        
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
    
  
    
  
    useEffect(() => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCurrentLocation(userLocation);
          setMarkers([userLocation]);
          setFinalLocation(userLocation);
          console.log(userLocation);
        },
        (error) => {
          console.error("Error getting user's location:", error);
        }
      );
    }, []);
  
    const handleMapClick = (mapsMouseEvent) => {
      if (markers.length === 0) {
        const newMarker = {
          lat: mapsMouseEvent.latLng.lat(),
          lng: mapsMouseEvent.latLng.lng(),
        };
        console.log(newMarker.lat, newMarker.lng);
        setMarkers([...markers, newMarker]);
        console.log(markers.length);
      } else {
        return null;
      }
    };
    const center = currentLocation || { lat: 12.9716, lng: 77.5946 };
  
    const handleMarkerDragEnd = (index, event) => {
      const newLocation = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      console.log("New Location:", newLocation);
      setFinalLocation(newLocation);
    };
  
    function handleLogFinalLocation () {
      
      console.log("Final Location:", finalLocation);
      
      
      
    };
    return (
      <>
        <GoogleMap
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
        </GoogleMap>
        <button onClick={handleLogFinalLocation}>getfinallocation</button>
        <Link to="/admin-map" onClick={handleLogFinalLocation}>GoToAdminMap</Link> {/* Use Link to navigate */}
        <Link to="/final-map" >GoToFinalMap</Link>
        
         
          
      </>
    );
  }
