// // src/_components/Leads/listings/ListingLocation.js
// "use client";
// import { useState, useEffect } from "react";
// import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
// import { BiCurrentLocation } from "react-icons/bi";
// import ListingAutoComplete from "./ListingAutoComplete";

// const mapContainerStyle = {
//     width: "100%",
//     height: "300px",
// };

// const ListingLocation = ({
//     listingLocation,
//     setListingLocation,
//     showOnly = false,
//     currLocByDefault,
//     city,
//     setCity,
//     country,
//     setCountry,
//     required,
// }) => {
//     console.log("listing location:", listingLocation);

//     const { isLoaded, loadError } = useJsApiLoader({
//         googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "",
//         libraries: ["places"],
//     });

//     const [map, setMap] = useState({
//         panTo() { },
//     });

//     const handleCurrentLocationClick = () => {
//         if (!window.google?.maps) {
//             console.error("Google Maps not loaded");
//             return;
//         }

//         const geocoder = new window.google.maps.Geocoder();
//         navigator.geolocation.getCurrentPosition(
//             (position) => {
//                 console.log("position:", position);
//                 geocoder.geocode(
//                     {
//                         location: {
//                             lat: Number(position.coords.latitude),
//                             lng: Number(position.coords.longitude),
//                         },
//                     },
//                     (results, status) => {
//                         if (status === "OK" && results[0]) {
//                             const addressComponents = results[0].address_components;

//                             let city = "";
//                             let country = "";

//                             addressComponents.forEach((component) => {
//                                 if (component.types.includes("locality")) {
//                                     city = component.long_name;
//                                 }
//                                 if (component.types.includes("country")) {
//                                     country = component.long_name;
//                                 }
//                             });

//                             if (showOnly) {
//                                 map.panTo({ lat: listingLocation.lat, lng: listingLocation.lng });
//                             } else {
//                                 setListingLocation({
//                                     lat: Number(position.coords.latitude) || 0,
//                                     lng: Number(position.coords.longitude) || 0,
//                                     addressText: results[0].formatted_address,
//                                     city,
//                                     country,
//                                 });
//                                 setCity(city);
//                                 setCountry(country);
//                             }
//                         } else {
//                             console.log("Getting address failed due to:", status);
//                         }
//                     }
//                 );
//             },
//             (error) => {
//                 console.error("Geolocation error:", error);
//             }
//         );
//     };

//     const onSelect = ({ latLng }) => {
//         if (!window.google?.maps) {
//             console.error("Google Maps not loaded");
//             return;
//         }

//         const geocoder = new window.google.maps.Geocoder();
//         console.log("latLng:", latLng);
//         geocoder.geocode(
//             { location: { lat: Number(latLng.lat()), lng: Number(latLng.lng()) } },
//             (results, status) => {
//                 if (status === "OK" && results[0]) {
//                     const addressComponents = results[0]?.address_components;

//                     let city = "";
//                     let country = "";

//                     addressComponents?.forEach((component) => {
//                         console.log("address components:", addressComponents);
//                         if (component.types.includes("locality")) {
//                             city = component.long_name;
//                         }
//                         if (component.types.includes("country")) {
//                             country = component.long_name;
//                         }
//                     });

//                     setListingLocation({
//                         lat: Number(latLng.lat()),
//                         lng: Number(latLng.lng()),
//                         addressText: results[0]?.formatted_address,
//                         city,
//                         country,
//                     });
//                     setCity(city);
//                     setCountry(country);
//                 } else {
//                     console.log("Google maps couldn't load");
//                 }
//             }
//         );
//     };

//     const options = {
//         disableDefaultUI: true,
//         zoomControl: true,
//         mapTypeControl: true,
//         streetViewControl: false,
//     };

//     useEffect(() => {
//         if (isLoaded && map.panTo) {
//             map.panTo({ lat: listingLocation.lat, lng: listingLocation.lng });
//         }
//     }, [listingLocation.lat, listingLocation.lng, map, isLoaded]);

//     useEffect(() => {
//         if (!isLoaded) return;

//         // Check if lat or lng is missing, undefined, null, NaN, or non-numeric
//         const isInvalidLatLng =
//             !listingLocation?.lat ||
//             !listingLocation?.lng ||
//             isNaN(Number(listingLocation.lat)) ||
//             isNaN(Number(listingLocation.lng)) ||
//             typeof listingLocation.lat !== "number" ||
//             typeof listingLocation.lng !== "number";

//         if (currLocByDefault && isInvalidLatLng) {
//             handleCurrentLocationClick();
//         }
//     }, [currLocByDefault, isLoaded, listingLocation]);

//     if (loadError) {
//         return <div>Error loading Google Maps: {loadError.message}</div>;
//     }

//     if (!isLoaded) {
//         return <div>Loading map...</div>;
//     }

//     return (
//         <div className="w-full">
//             <ListingAutoComplete
//                 defaultLocation={listingLocation.addressText}
//                 setListingLocation={setListingLocation}
//                 isDisabled={showOnly}
//                 size="small"
//                 city={city}
//                 setCity={setCity}
//                 country={country}
//                 setCountry={setCountry}
//             />
//             <div className="p-5 relative">
//                 <GoogleMap
//                     onLoad={(map) => setMap(map)}
//                     mapContainerStyle={mapContainerStyle}
//                     center={listingLocation}
//                     zoom={15}
//                     onClick={showOnly ? () => { } : onSelect}
//                     options={options}
//                 >
//                     <Marker position={listingLocation} />
//                     <button
//                         onClick={handleCurrentLocationClick}
//                         className="absolute top-5 right-5 bg-primary text-white p-3 rounded-xl flex items-center justify-center hover:bg-primary-dark"
//                         title="Current Location"
//                     >
//                         <BiCurrentLocation size={18} />
//                     </button>
//                 </GoogleMap>
//             </div>
//         </div>
//     );
// };

// export default ListingLocation;

"use client";
import { useState, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { BiCurrentLocation } from "react-icons/bi";
import ListingAutoComplete from "./ListingAutoComplete";

const mapContainerStyle = {
  width: "100%",
  height: "300px",
};

const ListingLocation = ({
  listingLocation,
  setListingLocation,
  showOnly = false,
  currLocByDefault = false,
  required = false,
}) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "",
    libraries: ["places"],
  });

  const [map, setMap] = useState(null);

  const handleCurrentLocationClick = () => {
    if (!isLoaded || !window.google?.maps) {
      console.error("Google Maps not loaded");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = Number(position.coords.latitude);
        const lng = Number(position.coords.longitude);

        reverseGeocode({ lat, lng }, (result) => {
          if (result) {
            updateLocation(result);
            if (map) {
              map.panTo({ lat, lng });
            }
          }
        });
      },
      (error) => {
        console.error("Geolocation error:", error);
      }
    );
  };

  const handleMapClick = (e) => {
    if (showOnly || !isLoaded || !window.google?.maps) return;

    const lat = Number(e.latLng.lat());
    const lng = Number(e.latLng.lng());

    reverseGeocode({ lat, lng }, (result) => {
      if (result) {
        updateLocation(result);
      }
    });
  };

  const handleMarkerDrag = (e) => {
    if (showOnly || !isLoaded || !window.google?.maps) return;

    const lat = Number(e.latLng.lat());
    const lng = Number(e.latLng.lng());

    reverseGeocode({ lat, lng }, (result) => {
      if (result) {
        updateLocation(result);
      }
    });
  };

  const reverseGeocode = (location, callback) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location }, (results, status) => {
      if (status === "OK" && results[0]) {
        const addressComponents = results[0].address_components;
        let city = "";
        let country = "";

        addressComponents.forEach((component) => {
          if (component.types.includes("locality")) {
            city = component.long_name;
          }
          if (component.types.includes("country")) {
            country = component.long_name;
          }
        });

        callback({
          lat: location.lat,
          lng: location.lng,
          addressText: results[0].formatted_address,
          city,
          country,
        });
      } else {
        console.error("Geocoding failed:", status);
        callback(null);
      }
    });
  };

  const updateLocation = (location) => {
    if (!showOnly) {
      setListingLocation(location);
    }
  };

  const options = {
    disableDefaultUI: true,
    zoomControl: true,
    mapTypeControl: true,
    streetViewControl: false,
  };

  useEffect(() => {
    if (isLoaded && map && listingLocation.lat && listingLocation.lng) {
      map.panTo({ lat: listingLocation.lat, lng: listingLocation.lng });
    }
  }, [listingLocation.lat, listingLocation.lng, map, isLoaded]);

  useEffect(() => {
    if (!isLoaded || !currLocByDefault) return;

    const isInvalidLatLng =
      !listingLocation?.lat ||
      !listingLocation?.lng ||
      isNaN(Number(listingLocation.lat)) ||
      isNaN(Number(listingLocation.lng)) ||
      listingLocation.lat === 0 ||
      listingLocation.lng === 0;

    if (isInvalidLatLng) {
      handleCurrentLocationClick();
    }
  }, [currLocByDefault, isLoaded, listingLocation]);

  if (loadError) {
    return (
      <div className="text-red-500">
        Error loading Google Maps: {loadError.message}
      </div>
    );
  }

  if (!isLoaded) {
    return <div className="text-gray-500">Loading map...</div>;
  }

  return (
    <div className="w-full">
      <ListingAutoComplete
        defaultLocation={listingLocation.addressText || ""}
        setListingLocation={setListingLocation}
        isDisabled={showOnly}
        size="small"
      />
      <div className="p-5 relative">
        <GoogleMap
          onLoad={(map) => setMap(map)}
          mapContainerStyle={mapContainerStyle}
          center={{
            lat: listingLocation.lat || 0,
            lng: listingLocation.lng || 0,
          }}
          zoom={15}
          onClick={handleMapClick}
          options={options}
        >
          {listingLocation.lat && listingLocation.lng && (
            <Marker
              position={{ lat: listingLocation.lat, lng: listingLocation.lng }}
              draggable={!showOnly}
              onDragEnd={handleMarkerDrag}
            />
          )}
          {!showOnly && (
            <button
              onClick={handleCurrentLocationClick}
              className="absolute top-5 right-5 bg-primary text-white p-3 rounded-xl flex items-center justify-center hover:bg-primary-dark"
              title="Current Location"
            >
              <BiCurrentLocation size={18} />
            </button>
          )}
        </GoogleMap>
      </div>
    </div>
  );
};

export default ListingLocation;
