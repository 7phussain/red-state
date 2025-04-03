"use client";
import React, { useEffect, useState, useRef } from "react";

import { useRouter } from "next/navigation";
import {
  IoArrowBackCircleOutline,
  IoArrowForwardCircleOutline,
} from "react-icons/io5";
import { RxDotFilled } from "react-icons/rx";
import { LuDot } from "react-icons/lu";
import FAQs from "../about-us/_components/FAQs";
import useApi from "@/utils/useApi";
import PropertyFilters from "../_components/filters";
import Loader from "../_components/Loader";
import SectionHeader from "../home/_components/SectionHeader";
import formatPrice from "../_functions/formatPrice";

const Properties = () => {
  const { fetchData } = useApi();
  const [properties, setProperties] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsloading] = useState(false);
  const [isFeaturedLoaidng, setIsFeaturedLoading] = useState(false);
  const [propertiesFeatured, setPropertiesFeatured] = useState([]);
  const [paginationFeatured, setPaginationFeatured] = useState(null);
  const [currentPageFeatured, setCurrentPageFeatured] = useState(1);

  const [filtersApplied, setFiltersApplied] = useState({});
  const paginationRef = useRef(null);
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

  // Fetch first page on component mount
  useEffect(() => {
    setIsloading(true);

    fetchListings(
      1,
      {
        location: filtersApplied["location"]?.label,
        listing_type: filtersApplied["listing_type"]?.value,
        property_type: filtersApplied["property_type"]?.label,
        bedrooms: filtersApplied["bedroom"]?.value,
        max_price: filtersApplied["max_price"]?.value,
        listing_title: filtersApplied["listing_title"],
      },
      (res, status) => {
        if (status) {
          setProperties(res?.data?.data);
          setPagination({ ...res?.data, data: {} || {} }); // Store pagination info
          setCurrentPage(res?.data?.current_page);
          setIsloading(false);
        }
      }
    );
  }, [filtersApplied]);
  useEffect(() => {
    setIsFeaturedLoading(true);

    fetchListings(
      1,
      {
        is_featured: 1,
      },
      (res, status) => {
        if (status) {
          setPropertiesFeatured(res?.data?.data);
          setPaginationFeatured({ ...res?.data, data: {} || {} }); // Store pagination info
          setCurrentPageFeatured(res?.data?.current_page);
          setIsFeaturedLoading(false);
        }
      }
    );
  }, []);

  return (
    <>
      <div className="px-[30px] md:px-[50px] lg:px-[70px] xl:px-[100px] py-5 my-5">
        <div className="h-[30px]"></div>
        <SectionHeader
          // name={"About Redestate"}
          title={"Find Your Dream Property"}
          subtitle={
            "We offer modern properties with the best quality that meet all your needs."
          }
        />
        {/* <div className="flex flex-col items-center py-6 gap-6">
          <div className="flex flex-col items-center">
            <h2 className="text-primary font-medium text-4xl">
              Find Your Dream Property
            </h2>
            <p className="text-secondary">
              We offer modern properties with the best quality that meet all
              your needs.
            </p>
          </div>
        </div> */}
        <PropertyFilters
          filtersApplied={filtersApplied}
          setFiltersApplied={setFiltersApplied}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-5 gap-5">
          {isLoading ? (
            <Loader />
          ) : (
            properties.map((item, ind) => {
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
                    {/* <img src="/hero.png" alt="" className="rounded-[100px]" /> */}
                    <button className="p-1.5 px-3 rounded-full bg-primary uppercase text-xs absolute top-3 left-3 font-semibold">
                      {item?.listing_type}
                    </button>
                  </div>
                  <div className="flex flex-col gap-1 py-4">
                    {item?.price && (
                      <h4 className="text-primary font-bold text-2xl">
                        {item?.currency}
                        {" "}
                        {formatPrice(item?.price)}
                      </h4>
                    )}
                    <h5 className="text-primary font-semibold text-base underline">
                      {item?.listing_title}
                    </h5>
                    <div className="text-secondary flex flex-col gap-1">
                      {/* <div className="flex flex-col"> */}
                      {/* <span>{item?.near_by}</span> */}
                      <div className="capitalize">
                        {item?.city}, {item?.country}
                      </div>
                      {/* </div> */}

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
          )}
        </div>

        {/* <div className="md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 flex no-scrollbar overflow-x-auto  py-[80px] gap-5 ">
          {isLoading ? (
            <Loader />
          ) : (
            properties.map((item, ind) => {
              return (
                <div
                  key={ind}
                  className="min-w-72 cursor-pointer "
                  onClick={() => router.push(`/properties/${item?.id}`)}
                >
                  <div
                    className="relative h-[300px] rounded-2xl"
                    style={{
                      backgroundImage: `url(${item?.banner_img})`,
                      backgroundSize: "cover",
                    }}
                  >
                    <button className="p-2 px-3 rounded-full bg-primary uppercase absolute top-4 left-4 text-[14px] font-semibold">
                      For {item?.listing_type}
                    </button>
                  </div>
                  <div>
                    <h4 className="text-primary font-semibold text-3xl py-2">
                      {item?.currency} {item?.price}
                    </h4>
                    <span className="text-primary font-medium underline py-2">
                      {item?.listing_title}
                    </span>
                    <div className="text-secondary">
                      <div className="flex flex-col">
                        <span>{item?.near_by}</span>
                        <span>
                          {item?.city}, {item?.country}
                        </span>
                      </div>

                      <div className="flex ">
                        <span>{item?.bedrooms}</span> -{" "}
                        <span>{item?.bathrooms}</span> -
                        <span>{item?.size_unit}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div> */}

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
        <div
          ref={paginationRef}
          className="flex gap-3 justify-center py-4 pb-8"
        >
          {/* Previous Button */}
          <button
            className={`text-gray-600  ${!pagination?.prev_page_url
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
              }`}
            disabled={!pagination?.prev_page_url}
            onClick={() =>
              fetchListings(currentPage - 1, filtersApplied, (res) => {
                setProperties(res?.data?.data);
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

          {/* Page Dots */}
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
                      setProperties(res?.data?.data);
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

          {/* Next Button */}
          <button
            className={`text-gray-600  ${!pagination?.next_page_url
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
              }`}
            disabled={!pagination?.next_page_url}
            onClick={() => {
              setIsloading(true);
              fetchListings(currentPage + 1, filtersApplied, (res) => {
                setProperties(res?.data?.data);
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
      </div>
      <div
        style={{
          backgroundImage: "url(/circle-design.png)",
          backgroundBlendMode: "soft-light",
        }}
        className="bg-primary px-[30px] md:px-[50px] lg:px-[70px] xl:px-[100px] py-6"
      >
        <div className="flex flex-col lg:w-[50%] gap-5 py-5 my-5">
          <div className="flex justify-start w-fit">
            <span className="border border-white p-1.5 text-sm text-white flex items-center gap-1 rounded-full">
              <RxDotFilled size={26} />
              <span className="pr-2">Popular Properties</span>
            </span>
          </div>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white">
            Our Most Popular Properties
          </h3>
          <span className="text-white md:text-lg lg:text-xl">
            Browse the homes and investments that have captivated buyers and
            investors alike, offering outstanding deals and high demand.
          </span>
        </div>
      </div>
      <div className="flex no-scrollbar overflow-x-auto py-5 my-5 gap-5 px-[30px] md:px-[50px] lg:px-[70px] xl:px-[100px]">
        {isFeaturedLoaidng ? (
          <Loader />
        ) : (
          propertiesFeatured.map((item, ind) => {
            return (
              <div key={ind}>
                <div
                  className="relative h-[300px] w-[300px] rounded-2xl"
                  style={{
                    backgroundImage: `url(${item?.banner_img})`,
                    backgroundSize: "cover",
                  }}
                  onClick={() => router.push(`/properties/${item?.id}`)}
                >
                  {/* <img src="/hero.png" alt="" className="rounded-[100px]" /> */}
                  <button className="p-1.5 px-3 rounded-full bg-primary uppercase text-xs absolute top-3 left-3 font-semibold">
                    {item?.listing_type}
                  </button>
                </div>
                <div className="flex flex-col gap-1 py-4">
                  <h4 className="text-primary font-bold text-2xl">
                    {item?.currency} {item?.price}
                  </h4>
                  <h5 className="text-primary font-semibold text-base underline">
                    {item?.listing_title}
                  </h5>
                  <div className="text-secondary flex flex-col gap-1">
                    {/* <div className="flex flex-col"> */}
                    {/* <span>{item?.near_by}</span> */}
                    <div className="capitalize">
                      {item?.city}, {item?.country}
                    </div>
                    {/* </div> */}

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
            return (
              <div key={ind} className="min-w-72 ">
                <div
                  className="relative h-[300px] rounded-2xl"
                  style={{
                    backgroundImage: `url(${item?.banner_img})`,
                    backgroundSize: "cover",
                  }}
                >
                  {/* <img src="/hero.png" alt="" className="rounded-[100px]" /> */}
                  <button className="p-2 px-3 rounded-full bg-primary uppercase absolute top-4 left-4 text-[14px] font-semibold">
                    For {item?.listing_type}
                  </button>
                </div>
                <div>
                  <h4 className="text-primary font-semibold text-3xl py-2">
                    {item?.currency} {item?.price}
                  </h4>
                  <span className="text-primary font-medium underline py-2">
                    {item?.listing_title}
                  </span>
                  <div className="text-secondary">
                    <div className="flex flex-col">
                      <span>{item?.near_by}</span>
                      <span>
                        {item?.city}, {item?.country}
                      </span>
                    </div>

                    <div className="flex ">
                      <span>{item?.bedrooms}</span> -{" "}
                      <span>{item?.bathrooms}</span> -
                      <span>{item?.size_unit}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      <div className="flex gap-3 justify-center py-4 pb-8">
        {/* Previous Button */}
        <button
          className={`text-gray-600  ${!paginationFeatured?.prev_page_url
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer"
            }`}
          disabled={!paginationFeatured?.prev_page_url}
          onClick={() => {
            setIsFeaturedLoading(true);
            fetchListings(
              currentPageFeatured - 1,
              { is_featured: 1 },
              (res) => {
                setPropertiesFeatured(res?.data?.data);
                setPaginationFeatured(res?.data);
                setCurrentPageFeatured(res?.data?.current_page);
                setIsFeaturedLoading(false);
              }
            );
          }}
        >
          <IoArrowBackCircleOutline size={44} />
        </button>

        {/* Page Dots */}
        <div className="gap-3 grid grid-cols-5 items-center">
          {Array.from({ length: paginationFeatured?.last_page || 1 }).map(
            (_, index) => (
              <div
                key={index}
                className={`h-[10px] w-[10px] rounded-full ${currentPageFeatured === index + 1
                    ? "bg-primary"
                    : "bg-gray-300"
                  }`}
                onClick={() =>
                  fetchListings(index + 1, { is_featured: 1 }, (res) => {
                    setPropertiesFeatured(res?.data?.data);
                    setPaginationFeatured(res?.data);
                    setCurrentPageFeatured(res?.data?.current_page);
                  })
                }
              />
            )
          )}
        </div>

        {/* Next Button */}
        <button
          className={`text-gray-600 ${!paginationFeatured?.next_page_url
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer"
            }`}
          disabled={!paginationFeatured?.next_page_url}
          onClick={() => {
            setIsFeaturedLoading(true);
            fetchListings(
              currentPageFeatured + 1,
              { is_featured: 1 },
              (res) => {
                setPropertiesFeatured(res?.data?.data);
                setPaginationFeatured(res?.data);
                setCurrentPageFeatured(res?.data?.current_page);
                setIsFeaturedLoading(false);
              }
            );
          }}
        >
          <IoArrowForwardCircleOutline size={44} />
        </button>
      </div>
      <FAQs />
    </>
  );
};

export default Properties;
