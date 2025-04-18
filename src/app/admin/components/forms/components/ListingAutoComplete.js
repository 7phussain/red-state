"use client";
import { useEffect } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";

export default function ListingAutoComplete({
  isDisabled,
  defaultLocation,
  setListingLocation,
  size,
  city,
  setCity,
  country,
  setCountry,
}) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 300,
  });

  const ref = useOnclickOutside(() => {
    clearSuggestions();
  });

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect =
    ({ description }) =>
    () => {
      setValue(description, false);
      setListingLocation((prev) => ({ ...prev, addressText: description }));
      clearSuggestions();

      getGeocode({ address: description }).then((results) => {
        console.log("autocomplete:", results);
        const { lat, lng } = getLatLng(results[0]);
        const addressComponents = results[0]?.address_components;

        let city = "";
        let country = "";

        addressComponents?.forEach((component) => {
          console.log("autocomplete address components:", addressComponents);
          if (component.types.includes("locality")) {
            city = component.long_name;
          }
          if (component.types.includes("country")) {
            country = component.long_name;
          }
        });

        setListingLocation((prev) => ({
          ...prev,
          lat,
          lng,
          city,
          country,
        }));
        setCity(city);
        setCountry(country);
      });
    };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      console.log("suggestion:", suggestion);
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li
          key={place_id}
          onClick={handleSelect(suggestion)}
          className="px-5 py-2 cursor-pointer hover:bg-gray-100"
        >
          <strong>{main_text}</strong>{" "}
          <small className="ml-2">{secondary_text}</small>
        </li>
      );
    });

  useEffect(() => {
    setValue(defaultLocation || "");
    console.log("address suggestion changed:", value);
  }, [defaultLocation]);

  console.log("default location:", defaultLocation);

  return (
    <div ref={ref} className="relative">
      <label htmlFor="location-search">Search Location</label>
      <input
        type="text"
        className="input-filter w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
        disabled={isDisabled}
        onChange={handleInput}
        placeholder="Search Location"
        value={value || ""}
        required
      />
      {status === "OK" && !isDisabled && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-auto">
          {renderSuggestions()}
        </ul>
      )}
    </div>
  );
}

// "use client";
// import { useEffect, useState, useRef } from "react";
// import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
// import useOnclickOutside from "react-cool-onclickoutside";

// export default function ListingAutoComplete({
//     defaultLocation = "",
//     setListingLocation,
//     isDisabled = false,
//     size = "medium",
// }) {
//     const {
//         ready,
//         value,
//         suggestions: { status, data, loading },
//         setValue,
//         clearSuggestions,
//     } = usePlacesAutocomplete({
//         debounce: 300,
//         requestOptions: {
//             types: ["(regions)", "address"],
//         },
//     });

//     const ref = useOnclickOutside(() => {
//         clearSuggestions();
//     });

//     const [inputValue, setInputValue] = useState(value);

//     const handleInput = (e) => {
//         const newValue = e.target.value;
//         setInputValue(newValue);
//         setValue(newValue);
//     };

//     const handleSelect = (suggestion) => () => {
//         const description = suggestion.description;
//         setValue(description, false);
//         setInputValue(description);
//         clearSuggestions();

//         getGeocode({ address: description })
//             .then((results) => {
//                 if (!results[0]) throw new Error("No results found");
//                 const { lat, lng } = getLatLng(results[0]);
//                 const addressComponents = results[0].address_components;

//                 let city = "";
//                 let country = "";

//                 addressComponents.forEach((component) => {
//                     if (component.types.includes("locality")) {
//                         city = component.long_name;
//                     }
//                     if (component.types.includes("country")) {
//                         country = component.long_name;
//                     }
//                 });

//                 setListingLocation({
//                     lat,
//                     lng,
//                     addressText: description,
//                     city,
//                     country,
//                 });
//             })
//             .catch((error) => {
//                 console.error("Geocoding error:", error);
//             });
//     };

//     useEffect(() => {
//         setInputValue(defaultLocation || "");
//         setValue(defaultLocation || "");
//     }, [defaultLocation, setValue]);

//     const inputSizeClasses = {
//         small: "py-1 text-sm",
//         medium: "py-2 text-base",
//         large: "py-3 text-lg",
//     };

//     return (
//         <div ref={ref} className="relative">
//             <label htmlFor="location-search">
//                 Search Location
//             </label>
//             <input
//                 id="location-search"
//                 type="text"
//                 className={`input-filter w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary disabled:bg-gray-100 disabled:cursor-not-allowed ${inputSizeClasses[size] || inputSizeClasses.medium
//                     }`}
//                 disabled={isDisabled || !ready}
//                 onChange={handleInput}
//                 placeholder="Search for a location"
//                 value={inputValue}
//             />
//             {status === "OK" && !isDisabled && (
//                 <ul className="absolute z-20 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-auto shadow-lg">
//                     {loading ? (
//                         <li className="px-5 py-2 text-gray-500">Loading...</li>
//                     ) : data.length > 0 ? (
//                         data.map((suggestion) => {
//                             const {
//                                 place_id,
//                                 structured_formatting: { main_text, secondary_text },
//                             } = suggestion;

//                             return (
//                                 <li
//                                     key={place_id}
//                                     onClick={handleSelect(suggestion)}
//                                     className="px-5 py-2 cursor-pointer hover:bg-gray-100 flex justify-between items-center"
//                                 >
//                                     <span>
//                                         <strong>{main_text}</strong>
//                                         <small className="ml-2 text-gray-600">{secondary_text}</small>
//                                     </span>
//                                 </li>
//                             );
//                         })
//                     ) : (
//                         <li className="px-5 py-2 text-gray-500">No results found</li>
//                     )}
//                 </ul>
//             )}
//         </div>
//     );
// }
