// "use client";
// import React, { useEffect, useState } from "react";
// import Select from "react-select";
// import CreatableSelect from "react-select/creatable";
// import { LuSearch } from "react-icons/lu";
// import { selectStyles } from "../_components/selectStyles";
// import useApi from "@/utils/useApi";
// const PropertyFilters = ({ filtersApplied, setFiltersApplied }) => {
//   const [propertyTypes, setPropertyTypes] = useState([]);
//   const [locations, setLocations] = useState([
//     { label: "Dubai", value: "Dubai" },
//   ]);
//   const { fetchData } = useApi();
//   const [isSearchCollapsed, setIsSearchCollapsed] = useState(true);
//   useEffect(() => {
//     fetchData(`/listing-types`, { method: "GET" }, (res, status) => {
//       if (status) {
//         setPropertyTypes(
//           res?.data?.data?.map((i) => ({ label: i?.name, value: i?._id }))
//         );
//       }
//     });
//   }, []);
//   const filters = [
//     {
//       label: "Looking For",
//       options: [
//         { label: "Sell", value: "Sell" },
//         { label: "Rent", value: "Rent" },
//         { label: "Off-plan", value: "Off-plan" },
//         { label: "Secondary", value: "Secondary" },
//       ],
//       key: "listing_type",
//     },
//     {
//       label: "Location",
//       options: locations,
//       isCreatable: true,
//       key: "location",
//     },
//     {
//       label: "Property Type",
//       options: propertyTypes,
//       key: "property_type",
//     },
//     {
//       label: "Bedrooms",
//       options: [
//         { label: "Studio", value: "Studio" },
//         { label: "1 Bedroom", value: "1 Bedrooms" },
//         { label: "2 Bedroom", value: "2 Bedrooms" },
//         { label: "3 Bedroom", value: "3 Bedrooms" },
//         { label: "4 Bedroom", value: "4 Bedrooms" },
//         { label: "5 Bedroom", value: "5 Bedrooms" },
//         { label: "6 Bedroom", value: "6 Bedrooms" },
//         { label: "7 Bedroom", value: "7 Bedrooms" },
//         { label: "8 Bedroom", value: "8 Bedrooms" },
//         { label: "9 Bedroom", value: "9 Bedrooms" },
//         { label: "10 Bedroom", value: "10 Bedrooms" },
//         { label: "Retail", value: "Retail" },
//         { label: "Others", value: "Others" },
//       ],
//       key: "bedroom",
//     },
//     {
//       label: "Budget",
//       options: [
//         { label: "250,000 AED", value: "250000" },
//         { label: "500,000 AED", value: "500000" },
//         { label: "750,000 AED", value: "750000" },
//         { label: "800,000 AED", value: "800000" },
//         { label: "900,000 AED", value: "900000" },
//         { label: "1,000,000 AED", value: "1000000" },
//       ],
//       key: "max_price",
//     },
//   ];
//   const handleCreate = (inputValue) => {
//     const newOption = { label: inputValue, value: inputValue };
//     setLocations((pre) => {
//       setFiltersApplied((pre) => ({ ...pre, location: newOption }));
//       return [...pre, newOption];
//     });
//   };
//   return (
//     <div className="grid xl:grid-cols-6 md:grid-cols-3 sm:grid-cols-2 grid-col-1  gap-8 mt-6 items-center sm:w-fit w-full">
//       {filters.map((i) => {
//         return (
//           <div>
//             <label htmlFor="" className="text-secondary">
//               {i?.label}
//             </label>
//             <div className="min-w-48">
//               {!i?.isCreatable ? (
//                 <Select
//                   placeholder={i?.label}
//                   options={i?.options}
//                   value={filtersApplied[i?.key]}
//                   styles={selectStyles}
//                   onChange={(e) => {
//                     setFiltersApplied((pre) => ({ ...pre, [i?.key]: e }));
//                   }}
//                 />
//               ) : (
//                 <CreatableSelect
//                   isClearable
//                   options={i?.options}
//                   value={filtersApplied[i?.key]}
//                   onChange={(e) => {
//                     setFiltersApplied((pre) => ({ ...pre, [i?.key]: e }));
//                   }}
//                   onCreateOption={handleCreate}
//                   styles={selectStyles}
//                   placeholder={i?.label}
//                   formatCreateLabel={(inputValue) => inputValue}
//                 />
//               )}
//             </div>
//           </div>
//         );
//       })}

//       <div
//         className={`flex items-center cursor-pointer transition-all duration-500 ease-in-out border border-primary rounded-full ${
//           isSearchCollapsed ? "w-[55px] p-2" : "w-56 px-4 py-2"
//         }`}
//       >
//         {!isSearchCollapsed && (
//           <input
//             type="text"
//             placeholder="Search"
//             value={filtersApplied["title"]}
//             onChange={(e) =>
//               setFiltersApplied((pre) => ({
//                 ...pre,
//                 listing_title: e?.target?.value,
//               }))
//             }
//             className="w-full bg-transparent focus:outline-none px-2 text-primary"
//           />
//         )}
//         <button
//           onClick={() => setIsSearchCollapsed((prev) => !prev)}
//           className="p-2 bg-primary rounded-full"
//         >
//           <LuSearch size={20} className="text-white" />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PropertyFilters;
"use client";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { LuSearch } from "react-icons/lu";
import { selectStyles } from "../_components/selectStyles";
import useApi from "@/utils/useApi";

const PropertyFilters = ({ filtersApplied, setFiltersApplied }) => {
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [locations, setLocations] = useState([
    { label: "Dubai", value: "Dubai" },
  ]);
  const { fetchData } = useApi();
  const [isSearchCollapsed, setIsSearchCollapsed] = useState(true);

  useEffect(() => {
    fetchData(`/listing-types`, { method: "GET" }, (res, status) => {
      if (status) {
        setPropertyTypes(
          res?.data?.data?.map((i) => ({ label: i?.name, value: i?._id }))
        );
      }
    });
  }, []);

  const filters = [
    {
      label: "Looking For",
      options: [
        { label: "Sell", value: "Sell" },
        { label: "Rent", value: "Rent" },
        { label: "Off-plan", value: "Off-plan" },
        { label: "Secondary", value: "Secondary" },
      ],
      key: "listing_type",
    },
    {
      label: "Location",
      options: locations,
      isCreatable: true,
      key: "location",
    },
    {
      label: "Property Type",
      options: propertyTypes,
      key: "property_type",
    },
    {
      label: "Bedrooms",
      options: [
        { label: "Studio", value: "Studio" },
        { label: "1 Bedroom", value: "1 Bedrooms" },
        { label: "2 Bedroom", value: "2 Bedrooms" },
        { label: "3 Bedroom", value: "3 Bedrooms" },
        { label: "4 Bedroom", value: "4 Bedrooms" },
        { label: "5 Bedroom", value: "5 Bedrooms" },
        { label: "6 Bedroom", value: "6 Bedrooms" },
        { label: "7 Bedroom", value: "7 Bedrooms" },
        { label: "8 Bedroom", value: "8 Bedrooms" },
        { label: "9 Bedroom", value: "9 Bedrooms" },
        { label: "10 Bedroom", value: "10 Bedrooms" },
        { label: "Retail", value: "Retail" },
        { label: "Others", value: "Others" },
      ],
      key: "bedroom",
    },
    {
      label: "Budget",
      options: [
        { label: "AED 250,000", value: "250000" },
        { label: "AED 500,000", value: "500000" },
        { label: "AED 750,000", value: "750000" },
        { label: "AED 800,000", value: "800000" },
        { label: "AED 900,000", value: "900000" },
        { label: "AED 1,000,000", value: "1000000" },
      ],
      key: "max_price",
    },
  ];

  const handleCreate = (inputValue) => {
    const newOption = { label: inputValue, value: inputValue };
    setLocations((pre) => {
      setFiltersApplied((pre) => ({ ...pre, location: newOption }));
      return [...pre, newOption];
    });
  };

  const clearFilters = () => {
    setFiltersApplied({});
  };

  return (
    <div className="grid xl:grid-cols-6 md:grid-cols-3 sm:grid-cols-2 grid-col-1 gap-8 mt-6 items-center sm:w-fit w-full">
      {filters.map((i) => {
        return (
          <div key={i.key}>
            <label htmlFor={i.key} className="text-secondary">
              {i?.label}
            </label>
            <div className="min-w-48">
              {!i?.isCreatable ? (
                <Select
                  placeholder={i?.label}
                  options={i?.options}
                  value={filtersApplied[i?.key] || null}
                  styles={selectStyles}
                  onChange={(e) => {
                    setFiltersApplied((pre) => ({ ...pre, [i?.key]: e }));
                  }}
                />
              ) : (
                <CreatableSelect
                  isClearable
                  options={i?.options}
                  value={filtersApplied[i?.key] || null}
                  onChange={(e) => {
                    setFiltersApplied((pre) => ({ ...pre, [i?.key]: e }));
                  }}
                  onCreateOption={handleCreate}
                  styles={selectStyles}
                  placeholder={i?.label}
                  formatCreateLabel={(inputValue) => inputValue}
                />
              )}
            </div>
          </div>
        );
      })}

      <div
        className={`flex items-center cursor-pointer transition-all duration-500 ease-in-out border border-primary rounded-full ${
          isSearchCollapsed ? "w-[55px] p-2" : "w-56 px-4 py-2"
        }`}
      >
        {!isSearchCollapsed && (
          <input
            type="text"
            placeholder="Search"
            value={filtersApplied["title"]}
            onChange={(e) =>
              setFiltersApplied((pre) => ({
                ...pre,
                listing_title: e?.target?.value,
              }))
            }
            className="w-full bg-transparent focus:outline-none px-2 text-primary"
          />
        )}
        <button
          onClick={() => setIsSearchCollapsed((prev) => !prev)}
          className="p-2 bg-primary rounded-full"
        >
          <LuSearch size={20} className="text-white" />
        </button>
      </div>

      <button
        onClick={clearFilters}
        className="px-4 py-2 bg-primary cursor-pointer text-white rounded-full mt-4"
      >
        Clear Filters
      </button>
    </div>
  );
};

export default PropertyFilters;
