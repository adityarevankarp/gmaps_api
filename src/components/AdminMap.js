import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

import { REACT_APP_GOOGLE_MAPS_KEY } from "../key";
import { useEffect, useState } from "react";
import "./AdminMap.css";

function AdminMap(props) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: REACT_APP_GOOGLE_MAPS_KEY,
  });
  const hospitalLocations = [
    { lat: 12.9716, lng: 77.5946 },
    { lat: 12.9725, lng: 77.593 },
  ];

  const fireStationLocations = [
    { lat: 12.97, lng: 77.595 },
    { lat: 12.973, lng: 77.596 },
  ];

  const policeStationLocations = [
    { lat: 12.969, lng: 77.592 },
    { lat: 12.974, lng: 77.598 },
  ];

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div>
      <Map
        hospitalLocations={hospitalLocations}
        fireStationLocations={fireStationLocations}
        policeStationLocations={policeStationLocations}
        finalLocation={props.userLocation}
      />
    </div>
  );
}

function Map(
  { hospitalLocations, fireStationLocations, policeStationLocations },
  props
) {
  const [markers, setMarkers] = useState([]);

  const center = { lat: 12.9716, lng: 77.5946 };
  const iconMapping = {
    hospital: {
      strokeOpacity: 1,
      scale: 4,
      fillColor: "red",
    },
    fireStation: {
      strokeOpacity: 1,
      scale: 4,
      fillColor: "orange",
    },
    policeStation: {
      strokeOpacity: 1,
      scale: 4,
      fillColor: "blue",
    },
  };

  useEffect(() => {
    // Combine all location arrays into one
    const allLocations = [
      ...hospitalLocations.map((location) => ({
        ...location,
        type: "hospital",
      })),
      ...fireStationLocations.map((location) => ({
        ...location,
        type: "fireStation",
      })),
      ...policeStationLocations.map((location) => ({
        ...location,
        type: "policeStation",
      })),
      props.userLocation && {
        lat: props.userLocation.lat,
        lng: props.userLocation.lng,
        type: "userLocation", // Add a type for the user's location
      },
    ].filter(Boolean);
      
    

    // Update markers only when the locations change
    setMarkers(allLocations);
  }, [hospitalLocations, fireStationLocations, policeStationLocations]);

  const hospitalIcon = {
    url: "https://i.ibb.co/PjDps7c/hospital.png",
    size: new window.google.maps.Size(64, 64), // Adjust size as needed
    scaledSize: new window.google.maps.Size(64, 64), // Adjust size as needed
    origin: new window.google.maps.Point(0, 0),
    anchor: new window.google.maps.Point(16, 16), // Center the icon
  };

  const fireStationIcon = {
    url: "https://i.ibb.co/KwkLshz/fire-station.png",
    size: new window.google.maps.Size(64, 64),
    scaledSize: new window.google.maps.Size(64, 64),
    origin: new window.google.maps.Point(0, 0),
    anchor: new window.google.maps.Point(16, 16),
  };

  const policeStationIcon = {
    url: "https://i.ibb.co/sFzkv2F/police-station.png",
    size: new window.google.maps.Size(64, 64),
    scaledSize: new window.google.maps.Size(64, 64),
    origin: new window.google.maps.Point(0, 0),
    anchor: new window.google.maps.Point(16, 16),
  };

  return (
    <>
      <GoogleMap
        zoom={15}
        center={center}
        mapContainerClassName="map-container"
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={marker}
            icon={
              marker.type === "hospital"
                ? hospitalIcon
                : marker.type === "fireStation"
                ? fireStationIcon
                : policeStationIcon
            }
          />
        ))}
      </GoogleMap>
    </>
  );
}
export default AdminMap;
