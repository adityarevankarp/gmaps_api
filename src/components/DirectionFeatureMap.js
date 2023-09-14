import { GoogleMap, Marker, useLoadScript, DirectionsService, DirectionsRenderer } from "@react-google-maps/api";



import { REACT_APP_GOOGLE_MAPS_KEY } from "../key";
import { useEffect, useState } from "react";
import "./AdminMap.css";
import exampleMapStyles from '../MapStyles'

function DirectionFeatureMap(props) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: REACT_APP_GOOGLE_MAPS_KEY,
  });
  const hospitalLocations = [
    { lat: 12.97942, lng: 77.57387 },
    { lat: 12.98051, lng: 77.56546 },

    { lat: 12.98085, lng: 77.57387 },
  ];

  const fireStationLocations = [
    { lat: 12.97803, lng: 77.58952 },
    { lat: 12.96337, lng: 77.56327 },

    { lat: 12.98096, lng: 77.5802 },
  ];

  const policeStationLocations = [
    { lat: 12.97828, lng: 77.57334 },
    { lat: 12.96214, lng: 77.56682 },
    { lat: 12.96908, lng: 77.56999 },
    { lat: 12.96542, lng: 77.57626 },
  ];

  const defaultMarker = { lat: 12.97, lng: 77.58 };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div>
      <Map
        hospitalLocations={hospitalLocations}
        fireStationLocations={fireStationLocations}
        policeStationLocations={policeStationLocations}
        defaultMarker={defaultMarker}
      />
    </div>
  );
}

function Map({
  hospitalLocations,
  fireStationLocations,
  policeStationLocations,
  defaultMarker,
}) {
  const [markers, setMarkers] = useState([]);

  const [directions, setDirections] = useState(null);
  const [showDirections, setShowDirections] = useState(false);

  const center = { lat: 12.9697, lng: 77.5771 };

 

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
      {
        ...defaultMarker,
        type: "default",
      },
    ];

    // Update markers only when the locations change
    setMarkers(allLocations);
  }, [
    hospitalLocations,
    fireStationLocations,
    policeStationLocations,
    defaultMarker,
  ]);

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
  const defaultMarkerIcon = {
    url: "https://i.ibb.co/Jtmq87g/location.png",
    size: new window.google.maps.Size(64, 64),
    scaledSize: new window.google.maps.Size(64, 64),
    origin: new window.google.maps.Point(0, 0),
    anchor: new window.google.maps.Point(16, 16),
  };

  const calculateDirections = (serviceLocation) => {
    const directionsService = new window.google.maps.DirectionsService();
  
    directionsService.route(
      {
        origin: new window.google.maps.LatLng(serviceLocation.lat, serviceLocation.lng),
        destination: new window.google.maps.LatLng(defaultMarker.lat, defaultMarker.lng),
        travelMode: 'DRIVING', // You can change the travel mode as needed
      },
      (result, status) => {
        if (status === 'OK') {
          setDirections(result);
          setShowDirections(true);
        } else {
          console.error(`Directions request failed due to ${status}`);
        }
      }
    );
  };
  
  
  return (
    <>
      <GoogleMap
        zoom={13}
        center={center}
        mapContainerClassName="map-container"
        options={{
          styles: exampleMapStyles,
        }}
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
                : marker.type === "policeStation"
                ? policeStationIcon
                : defaultMarkerIcon
            }
            onClick={() => calculateDirections(marker)}
          />
          
        ))}
         {showDirections && directions && (
    <DirectionsRenderer
      directions={directions}
      options={{
        polylineOptions: {
          strokeColor: "white", // You can customize the route color
        },
      }}
    />
  )}
       
      </GoogleMap>
     
         
      
    </>
  );
}
export default DirectionFeatureMap;
