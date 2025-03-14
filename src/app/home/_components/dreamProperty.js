"use client";

import React, { useState, useEffect } from "react";
import Select from "react-select";
import { LuSearch } from "react-icons/lu";
import SectionHeader from "./SectionHeader";
import { BsArrowUpRightCircle } from "react-icons/bs";
import PropertyFilters from "@/app/_components/filters";
import useApi from "@/utils/useApi";
import { useRouter } from "next/navigation";

const DreamProperty = () => {
  const [focusedImage, setFocusedImage] = useState(0);
  const [filtersApplied, setFiltersApplied] = useState({});
  const [properties, setProperties] = useState([]);
  const { fetchData } = useApi();
  const router = useRouter();
  const fetchListings = (page = 1, filters, callBack) => {
    fetchData(
      `/listings?page=${page}`,
      {
        method: "GET",
        params: filters,
      },
      (res, status) => {
        callBack(res, status);
      }
    );
  };
  useEffect(() => {
    fetchListings(
      1,
      {
        location: filtersApplied["location"]?.label,
        listing_type: filtersApplied["listing_type"]?.value,
        property_type: filtersApplied["property_type"]?.label,
        bedrooms: filtersApplied["bedroom"]?.value,
        max_price: filtersApplied["max_price"]?.value,
        listing_title: filtersApplied["listing_title"],
        is_featured: 1,
      },
      (res, status) => {
        if (status) {
          setProperties(res?.data?.data);
          setPagination({ ...res?.data, data: {} || {} }); // Store pagination info
          setCurrentPage(res?.data?.current_page);
        }
      }
    );
  }, [filtersApplied]);
  return (
    <div className="px-[30px] md:px-[50px] lg:px-[100px]">
      <div className="flex flex-col items-center py-6 gap-6">
        <div className="flex flex-col items-center">
          <h2 className="text-primary font-medium sm:text-4xl text-3xl">
            Find Your Dream Property
          </h2>
          <p className="text-secondary mx-auto w-[70%] text-center pt-3">
            We offer modern properties with the best quality that meet all your
            needs.
          </p>
        </div>
      </div>
      <PropertyFilters
        filtersApplied={filtersApplied}
        setFiltersApplied={setFiltersApplied}
      />
      <SectionHeader
        name={"About Redestate"}
        title={"Your Dream Home, Our Expertise."}
        desc={
          "Red Estate is a leading real estate brokerage and investment firm dedicated to providing exceptional service and solutions to clients worldwide"
        }
      />
      <div className="gap-3 lg:grid-cols-6 md:grid-cols-3 grid-cols-1  grid transition-all duration-300 ease-in-out">
        {properties?.slice(0, 4).map((item, ind) => {
          return (
            <div
              onMouseEnter={() => setFocusedImage(ind)}
              className={`relative flex flex-col justify-end py-4 px-4 rounded-[12px] h-[400px] transition-all duration-300 ease-in-out  ${
                focusedImage === ind ? "md:col-span-2" : "col-span-1"
              }`}
              style={{
                background:
                  "linear-gradient(180deg, rgba(0, 0, 0, 0) 45.43%, rgba(0, 0, 0, 0.5) 71.41%)",
              }}
            >
              <img
                src={`${item?.banner_img}`}
                alt=""
                className="h-full w-full object-cover absolute rounded-[12px] z-0 top-0 left-0 transition-all duration-300 ease-in-out"
              />
              <div className="flex flex-col z-40">
                <h4 className="text-[16px] font-semibold">
                  {item?.listing_title}
                </h4>
                {focusedImage === ind && (
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Id, tempora.
                  </p>
                )}
              </div>
            </div>
          );
        })}
        <div
          onClick={() => router.push("/properties")}
          className="text-primary flex items-center justify-center flex-col gap-3 cursor-pointer"
        >
          <BsArrowUpRightCircle size={54} />
          More Properties
        </div>
      </div>
      {/* <div
        className="grid gap-3 "
        style={{
          gridTemplateColumns:
            focusedImage !== null
              ? "2fr 1fr 1fr 1fr 1fr" // Expanded effect
              : "1fr 1fr 1fr 1fr 1fr", // Default state
        }}
      >
        {[1, 2, 3, 4].map((item, ind) => (
          <div
            key={ind}
            onMouseEnter={() => setFocusedImage(ind)}
            onMouseLeave={() => setFocusedImage(null)} // Reset on mouse leave
            className="relative flex flex-col justify-end py-4 px-4 rounded-[12px] h-[400px] transition-all duration-500 ease-in-out"
            style={{
              background:
                "linear-gradient(180deg, rgba(0, 0, 0, 0) 45.43%, rgba(0, 0, 0, 0.5) 71.41%)",
            }}
          >
            <img
              src="/hero.png"
              alt=""
              className="h-full w-full object-cover absolute rounded-[12px] z-0 top-0 left-0 transition-all duration-500 ease-in-out"
            />
            <div className="flex flex-col z-40">
              <h4 className="text-[16px] font-semibold">Burj Azizi</h4>
              <span>600+ units available</span>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default DreamProperty;
