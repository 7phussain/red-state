// "use client";

// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// const containerStyle = {
//   width: "80%",
//   height: "400px",
// };

// const GoogleMaps = ({ lat, lon }) => {
//   // Ensure lat and lon are numbers
//   const latitude = Number(lat);
//   const longitude = Number(lon);

//   if (isNaN(latitude) || isNaN(longitude)) {
//     return <p>Error: Invalid latitude or longitude</p>;
//   }

//   const center = { lat: latitude, lng: longitude };

//   return (
//     <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
//       <Marker position={center} />
//     </GoogleMap>
//   );
// };

// export default GoogleMaps;
"use client";

import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  minHeight: "300px",
};

const GoogleMaps = ({ lat, lon }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) return <p>Loading map...</p>;

  // Ensure lat and lon are numbers
  const latitude = Number(lat);
  const longitude = Number(lon);

  if (isNaN(latitude) || isNaN(longitude)) {
    return <p>Error: Invalid latitude or longitude</p>;
  }

  const center = { lat: latitude, lng: longitude };

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
      <Marker position={center} />
    </GoogleMap>
  );
};

export default GoogleMaps;
