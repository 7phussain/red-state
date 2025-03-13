"use client";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { LuSearch } from "react-icons/lu";
import { selectStyles } from "../_components/selectStyles";
import { useRouter } from "next/navigation";
import {
  IoArrowBackCircleOutline,
  IoArrowForwardCircleOutline,
} from "react-icons/io5";
import { RxDotFilled } from "react-icons/rx";
import FAQs from "../about-us/_components/FAQs";
import useApi from "@/utils/useApi";

const Properties = () => {
  const { fetchData } = useApi();
  const [properties, setProperties] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [locations, setLocations] = useState([
    { label: "Dubai", value: "Dubai" },
  ]);
  const [isSearchCollapsed, setIsSearchCollapsed] = useState(true);
  const [filtersApplied, setFiltersApplied] = useState({});
  const router = useRouter();
  const fetchListings = (page = 1) => {
    fetchData(
      `/new-listings?page=${page}`,
      {
        method: "GET",
        params: {
          ...filtersApplied,
          location: filtersApplied["location"]?.label,
          listing_type: filtersApplied["listing_type"]?.value,
          listing_attribute_type:
            filtersApplied["listing_attribute_type"]?.value,
          bedroom: filtersApplied["bedroom"]?.value,
          max_price: filtersApplied["max_price"]?.value,
        },
      },
      (res, status) => {
        if (status) {
          setProperties(res?.data);
          setPagination(res?.pagination); // Store pagination info
          setCurrentPage(res?.pagination?.current_page);
        }
      }
    );
  };

  // Fetch first page on component mount
  useEffect(() => {
    fetchListings();
  }, [filtersApplied]);
  useEffect(() => {
    fetchData(`/listing-types`, { method: "GET" }, (res, status) => {
      if (status) {
        setPropertyTypes(
          res?.data?.data?.map((i) => ({ label: i?.name, value: i?._id }))
        );
      }
    });
  }, []);

  const handleCreate = (inputValue) => {
    const newOption = { label: inputValue, value: inputValue };
    setLocations((pre) => {
      setFiltersApplied((pre) => ({ ...pre, location: newOption }));
      return [...pre, newOption];
    });
  };

  const filters = [
    {
      label: "Looking For",
      options: [
        { label: "Sell", value: "Sell" },
        { label: "Rent", value: "Rent" },
        { label: "Off-plan", value: "Off-plan" },
        { label: "Secondary", value: "Secondary" },
      ],
      key: "listing_attribute_type",
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
      key: "listing_type",
    },
    {
      label: "Bedrooms",
      options: [
        { label: "Studio", value: "Studio" },
        { label: "1 Bedroom", value: "1 Bedroom" },
        { label: "2 Bedroom", value: "2 Bedroom" },
        { label: "3 Bedroom", value: "3 Bedroom" },
        { label: "4 Bedroom", value: "4 Bedroom" },
        { label: "5 Bedroom", value: "5 Bedroom" },
        { label: "6 Bedroom", value: "6 Bedroom" },
        { label: "7 Bedroom", value: "7 Bedroom" },
        { label: "8 Bedroom", value: "8 Bedroom" },
        { label: "9 Bedroom", value: "9 Bedroom" },
        { label: "10 Bedroom", value: "10 Bedroom" },
        { label: "Retail", value: "Retail" },
        { label: "Others", value: "Others" },
      ],
      key: "bedroom",
    },
    {
      label: "Budget",
      options: [
        { label: "250,000 AED", value: "250000" },
        { label: "500,000 AED", value: "500000" },
        { label: "750,000 AED", value: "750000" },
        { label: "800,000 AED", value: "800000" },
        { label: "900,000 AED", value: "900000" },
        { label: "1,000,000 AED", value: "1000000" },
      ],
      key: "max_price",
    },
  ];

  return (
    <>
      <div className="px-[100px] pt-[60px]">
        <div className="flex flex-col items-center py-6 gap-6">
          <div className="flex flex-col items-center">
            <h2 className="text-primary font-medium text-4xl">
              Find Your Dream Property
            </h2>
            <p className="text-secondary">
              We offer modern properties with the best quality that meet all
              your needs.
            </p>
          </div>
          <div className="flex gap-8 mt-6 items-center">
            {filters.map((i) => {
              return (
                <div>
                  <label htmlFor="" className="text-secondary">
                    {i?.label}
                  </label>
                  <div className="min-w-48">
                    {!i?.isCreatable ? (
                      <Select
                        placeholder={i?.label}
                        options={i?.options}
                        value={filtersApplied[i?.key]}
                        styles={selectStyles}
                        onChange={(e) => {
                          setFiltersApplied((pre) => ({ ...pre, [i?.key]: e }));
                        }}
                      />
                    ) : (
                      <CreatableSelect
                        isClearable
                        options={i?.options}
                        value={filtersApplied[i?.key]}
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
                      title: e?.target?.value,
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
          </div>
        </div>
        <div className="grid grid-cols-3 py-[80px] gap-5">
          {properties.map((item) => {
            return (
              <div onClick={() => router.push(`/properties/${item?.id}`)}>
                <div
                  className="relative h-[300px] rounded-2xl"
                  style={{
                    backgroundImage: `url(${item?.meta_tags_for_listings?.banner})`,
                    backgroundSize: "cover",
                  }}
                >
                  {/* <img src="/hero.png" alt="" className="rounded-[100px]" /> */}
                  <button className="p-2 px-3 rounded-full bg-primary uppercase absolute top-4 left-4 text-[14px] font-semibold">
                    For {item?.listing_attribute_type?.type}
                  </button>
                </div>
                <div>
                  <h4 className="text-primary font-semibold text-3xl py-2">
                    {item?.listing_attribute_type?.price}{" "}
                    {item?.listing_attribute_type?.currency_type}
                  </h4>
                  <span className="text-primary font-medium underline py-2">
                    {item?.title}
                  </span>
                  <div className="text-secondary">
                    <div className="flex flex-col">
                      <span>{item?.listing_attribute_type?.near_by}</span>
                      <span>
                        {item?.city?.name}, {item?.country?.name}
                      </span>
                    </div>

                    <div className="flex ">
                      <span>{item?.listing_attribute?.bedroom}</span> -{" "}
                      <span>{item?.listing_attribute?.bathroom}</span> -
                      <span>{item?.listing_attribute?.area}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* <div className="flex gap-3 justify-center py-4 pb-8">
          <button className="text-gray-600">
            <IoArrowBackCircleOutline size={44} />
          </button>
          <div className="gap-3 grid grid-cols-5 items-center">
            {[1, 2, 3, 4, 5].map((dot) => {
              return (
                <div className="h-[10px] w-[10px] bg-primary rounded-full "></div>
              );
            })}
          </div>
          <button className="text-gray-600">
            <IoArrowForwardCircleOutline size={44} />
          </button>
        </div> */}
        <div className="flex gap-3 justify-center py-4 pb-8">
          {/* Previous Button */}
          <button
            className={`text-gray-600 cursor-pointer ${
              !pagination?.links?.prev && "opacity-50 cursor-not-allowed"
            }`}
            disabled={!pagination?.links?.prev}
            onClick={() => fetchListings(currentPage - 1)}
          >
            <IoArrowBackCircleOutline size={44} />
          </button>

          {/* Page Dots */}
          <div className="gap-3 grid grid-cols-5 items-center">
            {Array.from({ length: pagination?.total_pages || 1 }).map(
              (_, index) => (
                <div
                  key={index}
                  className={`h-[10px] w-[10px] rounded-full ${
                    currentPage === index + 1 ? "bg-primary" : "bg-gray-300"
                  }`}
                ></div>
              )
            )}
          </div>

          {/* Next Button */}
          <button
            className={`text-gray-600 cursor-pointer ${
              !pagination?.links?.next && "opacity-50 cursor-not-allowed "
            }`}
            disabled={!pagination?.links?.next}
            onClick={() => fetchListings(currentPage + 1)}
          >
            <IoArrowForwardCircleOutline size={44} />
          </button>
        </div>
      </div>
      <div
        style={{
          backgroundImage: "url(/circle-design.png)",
          backgroundBlendMode: "soft-light",
        }}
        className="bg-primary grid grid-cols-2   items-center  px-[100px] py-[50px]"
      >
        <div className={` flex flex-col gap-4 `}>
          <div className="">
            <span className="rounded-full pr-2   py-1 flex items-center mb-3 border w-fit text-white">
              <RxDotFilled size={30} />
              Popular Properties
            </span>
          </div>
          <h3 className="text-5xl font-semibold  ">
            Our Most Popular Properties
          </h3>
          <span className="text-secondary ">
            Browse the homes and investments that have captivated buyers and
            investors alike, offering outstanding deals and high demand.
          </span>
        </div>
      </div>
      <div className="grid grid-cols-3 py-[80px] gap-5 px-[100px]">
        {[1, 2, 3].map((item) => {
          return (
            <div>
              <div
                className="relative h-[300px] rounded-2xl"
                style={{
                  backgroundImage: "url(/hero.png)",
                  backgroundSize: "cover",
                }}
              >
                {/* <img src="/hero.png" alt="" className="rounded-[100px]" /> */}
                <button className="p-2 px-3 rounded-full bg-primary uppercase absolute top-0 left-4 text-[14px] font-semibold">
                  For Sale
                </button>
              </div>
              <div>
                <h4 className="text-primary font-semibold text-3xl py-2">
                  750,000 AED
                </h4>
                <span className="text-primary font-medium underline py-2">
                  Binghatti Skyrise
                </span>
                <div className="text-secondary">
                  <div className="flex flex-col">
                    <span>1234 Avenue</span>
                    <span>Dubai, UAE</span>
                  </div>

                  <div className="flex ">
                    <span>3 beds</span> - <span>2 bath</span> -
                    <span>900 sq/ft</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex gap-3 justify-center py-4 pb-8">
        <button className="text-gray-600">
          <IoArrowBackCircleOutline size={44} />
        </button>
        <div className="gap-3 grid grid-cols-5 items-center">
          {[1, 2, 3, 4, 5].map((dot) => {
            return (
              <div className="h-[10px] w-[10px] bg-primary rounded-full "></div>
            );
          })}
        </div>
        <button className="text-gray-600">
          <IoArrowForwardCircleOutline size={44} />
        </button>
      </div>
      <FAQs />
    </>
  );
};

export default Properties;
