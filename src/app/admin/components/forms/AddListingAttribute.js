"use client";
import {
  bathroom_options,
  enquiry_options,
  property_options,
  size_unit,
} from "@/app/_components/selectOptions";
import { selectStylesFilter } from "@/app/_components/selectStyles";
import { useRef } from "react";
import Select from "react-select";

export default function AddListingAttribute({
  data,
  setData,
  loading,
  setLoading,
  page,
  pageSize,
  total,
  setPage,
  setPageSize,
  FetchData,
  listingIds,
  setListingIDs,
  handleNext,
  listingData,
  setListingData,
  developers,
}) {
  const searchRef = useRef();

  const handleChange = (e) => {
    setListingData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <div className="flex flex-col gap-5 w-full p-5">
      <h4 className="text-primary uppercase text-center font-semibold mb-4">
        Project Details
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Left Column */}
        <div className="flex flex-col gap-6">
          <div className="relative">
            <label html="property-type">Property type</label>
            <Select
              id="property-type"
              value={
                property_options().find(
                  (option) => option.value === listingData?.property_type
                ) || { value: "", label: "Select Property Type" }
              }
              onChange={(e) =>
                setListingData({ ...listingData, property_type: e.value })
              }
              options={property_options()}
              placeholder="Select Property Type"
              className="w-full"
              // menuPortalTarget={document.body}
              styles={selectStylesFilter}
            />
          </div>

          <div className="relative">
            <label html="developer">Developer name</label>
            {/* <input
                            id="developer"
                            type="text"
                            className="input-filter w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                            placeholder="Developer Name"
                            value={listingData?.developer || ""}
                            onChange={handleChange}
                            required
                        /> */}
            <Select
              id="developer"
              value={
                developers.find(
                  (option) => option.value === listingData?.developer
                ) || { value: "", label: "Select Developer" }
              }
              onChange={(e) =>
                setListingData({ ...listingData, developer: e ? e.value : "" })
              }
              options={developers}
              placeholder="Select Developer"
              className="w-full"
              // menuPortalTarget={document.body}
              styles={selectStylesFilter}
            />
          </div>

          <div className="relative">
            <label htmlFor="project">Project name</label>
            <input
              id="project"
              type="text"
              className="input-filter w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="Project Name"
              value={listingData?.project || ""}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6">
          <div className="relative">
            <label html="bedroom">Bedrooms</label>
            <Select
              id="bedroom"
              value={
                enquiry_options().find(
                  (option) => option.value === listingData?.bedrooms
                ) || { value: "", label: "Select Bedrooms" }
              }
              onChange={(e) =>
                setListingData({ ...listingData, bedrooms: e.value })
              }
              options={enquiry_options()}
              placeholder="Number of Bedrooms"
              className="w-full"
              // menuPortalTarget={document.body}
              styles={selectStylesFilter}
              required
            />
          </div>
          <div className="relative">
            <label html="bathroom">Bathrooms</label>
            <Select
              id="bathroom"
              value={
                bathroom_options().find(
                  (option) => option.value === listingData?.bathrooms
                ) || { value: "", label: "Select Bathrooms" }
              }
              onChange={(e) =>
                setListingData({ ...listingData, bathrooms: e.value })
              }
              options={bathroom_options()}
              placeholder="Number of Bathrooms"
              className="w-full"
              // menuPortalTarget={document.body}
              styles={selectStylesFilter}
              required
            />
          </div>
          <div className="grid grid-cols-3 gap-5">
            <div className="relative col-span-2">
              <label html="size">Property size</label>
              <input
                id="size"
                type="number"
                className="input-filter w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Property Size"
                value={listingData?.size || ""}
                onChange={handleChange}
              />
            </div>
            <div className="relative">
              <label html="unit">Unit</label>
              <Select
                id="unit"
                value={
                  size_unit().find(
                    (unit) => unit.value === listingData?.size_unit
                  ) || { value: "", label: "Unit" }
                }
                onChange={(e) =>
                  setListingData({ ...listingData, size_unit: e.value })
                }
                options={size_unit()}
                placeholder="Unit"
                className="w-full"
                // menuPortalTarget={document.body}
                styles={selectStylesFilter}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Next Button */}
      {/* <div className="flex justify-end mt-5">
                <button
                    onClick={handleNext}
                    className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark"
                >
                    Next
                </button>
            </div> */}
    </div>
  );
}
