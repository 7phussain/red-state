"use client";

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "80%",
  height: "400px",
};

const GoogleMaps = ({ lat, lon }) => {
  // Ensure lat and lon are numbers
  const latitude = Number(lat);
  const longitude = Number(lon);

  if (isNaN(latitude) || isNaN(longitude)) {
    return <p>Error: Invalid latitude or longitude</p>;
  }

  const center = { lat: latitude, lng: longitude };

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
      <Marker position={center} />
    </GoogleMap>
  );
};

export default GoogleMaps;
