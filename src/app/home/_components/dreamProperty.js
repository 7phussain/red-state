"use client";

import React, { useState, useEffect, useRef } from "react";
import { LuSearch } from "react-icons/lu";
import SectionHeader from "./SectionHeader";
import { BsArrowUpRightCircle } from "react-icons/bs";
import PropertyFilters from "@/app/_components/filters";
import useApi from "@/utils/useApi";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  IoArrowBackCircleOutline,
  IoArrowForwardCircleOutline,
} from "react-icons/io5";
import { LuDot } from "react-icons/lu";
import Loader from "@/app/_components/Loader";
import formatPrice from "@/app/_functions/formatPrice";

const DreamProperty = () => {
  const [focusedImage, setFocusedImage] = useState(0);
  const [filtersApplied, setFiltersApplied] = useState({});
  const [properties, setProperties] = useState([]);
  const [propertiesFilter, setPropertiesFilter] = useState([]);
  const paginationRef = useRef(null);
  const [isLoading, setIsloading] = useState(false);
  const [pagination, setPagination] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

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
        setProperties(res?.data?.data);
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
        search: filtersApplied["listing_title"],
      },
      (res, status) => {
        if (status) {
          setPropertiesFilter(res?.data?.data);
          setPagination({ ...res?.data, data: {} || {} }); // Store pagination info
          setCurrentPage(res?.data?.current_page);
        }
      }
    );
  }, [filtersApplied]);

  return (
    <>
      <div className="py-6 my-6 px-[30px] md:px-[50px] lg:px-[70px] xl:px-[100px]">
        <div className="flex flex-col items-center gap-3 py-5 mt-5">
          <h2 className="text-primary font-medium text-2xl md:text-3xl lg:text-4xl">
            Find Your Dream Property
          </h2>
          <p className="text-secondary mx-auto md:w-[70%] text-sm lg:text-base text-center">
            We offer modern properties with the best quality that meet all your
            needs.
          </p>
        </div>
        <PropertyFilters
          filtersApplied={filtersApplied}
          setFiltersApplied={setFiltersApplied}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-5 gap-5">
          {Object.values(filtersApplied).filter((i) => i).length > 0 ? (
            isLoading ? (
              <Loader />
            ) : (
              propertiesFilter.map((item, ind) => {
                return (
                  <div key={ind}>
                    <div
                      className="relative h-[300px] rounded-2xl"
                      style={{
                        backgroundImage: `url(${item?.banner_img})`,
                        backgroundSize: "cover",
                      }}
                      onClick={() => router.push(`/properties/${item?.id}`)}
                    >
                      <button className="p-1.5 px-3 rounded-full bg-primary uppercase text-xs absolute top-3 left-3 font-semibold">
                        {item?.listing_type}
                      </button>
                    </div>
                    <div className="flex flex-col gap-1 py-4">
                      <h4 className="text-primary font-bold text-2xl">
                        {item?.currency}
                        {" "}
                        {formatPrice(item?.price)}
                      </h4>
                      <h5 className="text-primary font-semibold text-base underline">
                        {item?.listing_title}
                      </h5>
                      <div className="text-secondary flex flex-col gap-1">
                        <div className="capitalize">
                          {item?.city}, {item?.country}
                        </div>

                        <div className="flex gap-1">
                          {item?.bedrooms === "Studio" ? (
                            <span>Studio</span>
                          ) : item?.bedrooms === "1 Bedroom" ? (
                            <span>1 Bed</span>
                          ) : (
                            <span>{item?.bedrooms.slice(0, 5)}</span>
                          )}
                          <LuDot size={20} />
                          <span>{item?.bathrooms.slice(0, 6)}</span>
                          <LuDot size={20} />
                          <span>
                            {item?.size}
                            {item?.size_unit}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )
          ) : null}
        </div>
        {/* {Object.values(filtersApplied).filter((i) => i).length > 0 && (
          <div
            ref={paginationRef}
            className="flex gap-3 justify-center py-4 pb-8"
          >
            <button
              className={`text-gray-600  ${!pagination?.prev_page_url
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
                }`}
              disabled={!pagination?.prev_page_url}
              onClick={() =>
                fetchListings(currentPage - 1, filtersApplied, (res) => {
                  setPropertiesFilter(res?.data?.data);
                  setPagination(res?.data);
                  setCurrentPage(res?.data?.current_page);
                  // Delay scrolling to ensure content updates first
                  setTimeout(() => {
                    paginationRef.current?.scrollIntoView({
                      behavior: "auto",
                      block: "end",
                    });
                  }, 100);
                })
              }
            >
              <IoArrowBackCircleOutline size={44} />
            </button>
            <div className="gap-3 grid grid-cols-5 items-center">
              {Array.from({ length: pagination?.last_page || 1 }).map(
                (_, index) => (
                  <div
                    key={index}
                    className={`h-[10px] w-[10px] rounded-full ${currentPage === index + 1 ? "bg-primary" : "bg-gray-300"
                      }`}
                    onClick={() => {
                      setIsloading(true);
                      fetchListings(index + 1, filtersApplied, (res) => {
                        setPropertiesFilter(res?.data?.data);
                        setPagination(res?.data);
                        setCurrentPage(res?.data?.current_page);
                        setIsloading(false);
                        // Delay scrolling to ensure content updates first
                        setTimeout(() => {
                          paginationRef.current?.scrollIntoView({
                            behavior: "auto",
                            block: "end",
                          });
                        }, 100);
                      });
                    }}
                  />
                )
              )}
            </div>
            <button
              className={`text-gray-600  ${!pagination?.next_page_url
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
                }`}
              disabled={!pagination?.next_page_url}
              onClick={() => {
                setIsloading(true);
                fetchListings(currentPage + 1, filtersApplied, (res) => {
                  setPropertiesFilter(res?.data?.data);
                  setPagination(res?.data);
                  setCurrentPage(res?.data?.current_page);
                  setIsloading(false);
                  // Delay scrolling to ensure content updates first
                  setTimeout(() => {
                    paginationRef.current?.scrollIntoView({
                      behavior: "auto",
                      block: "end",
                    });
                  }, 100);
                });
              }}
            >
              <IoArrowForwardCircleOutline size={44} />
            </button>
          </div>
        )} */}
        <SectionHeader
          name={"About Redestate"}
          title={"Your Dream Home, Our Expertise."}
          desc={
            "Red Estate is a leading real estate brokerage and investment firm dedicated to providing exceptional service and solutions to clients worldwide"
          }
        />
        {/* lg:grid-cols-6 md:grid-cols-3 grid-cols-1 grid  */}
        <div className="gap-3 grid grid-cols-1 md:grid-cols-6 transition-all duration-300 ease-in-out">
          {properties
            ?.filter((i) => i?.banner_img)
            ?.slice(0, 4)
            .map((item, ind) => {
              return (
                <div
                  key={ind}
                  onMouseEnter={() => setFocusedImage(ind)}
                  className={`relative flex flex-col justify-end py-4 px-4 rounded-[12px] h-[150px] md:h-[400px] transition-all duration-300 ease-in-out  ${focusedImage === ind
                    ? "h-[400px] md:col-span-2"
                    : "col-span-1"
                    }`}
                // style={{
                //   background: "linear-gradient(180deg, rgba(0, 0, 0, 0) 45.43%, rgba(0, 0, 0, 0.5) 71.41%) !important",
                // }}
                >
                  <img
                    src={`${item?.banner_img}`}
                    alt="REDESTATE"
                    className="h-full w-full object-cover absolute rounded-[12px] z-0 top-0 left-0 transition-all duration-300 ease-in-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black rounded-[12px]"></div>
                  <div className="flex flex-col z-40">
                    <h4 className="text-[16px] font-semibold">
                      {item?.listing_title}
                    </h4>
                    {focusedImage === ind && (
                      <p>{item?.description.slice(0, 120) + "..."}</p>
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
    </>
  );
};

export default DreamProperty;
