"use client";
import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import {
  IoArrowBackCircleOutline,
  IoArrowForwardCircleOutline,
} from "react-icons/io5";
import { RxDotFilled } from "react-icons/rx";
import FAQs from "../about-us/_components/FAQs";
import useApi from "@/utils/useApi";
import PropertyFilters from "../_components/filters";

const Properties = () => {
  const { fetchData } = useApi();
  const [properties, setProperties] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [propertiesFeatured, setPropertiesFeatured] = useState([]);
  const [paginationFeatured, setPaginationFeatured] = useState(null);
  const [currentPageFeatured, setCurrentPageFeatured] = useState(1);

  const [filtersApplied, setFiltersApplied] = useState({});
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
        }
      }
    );
  }, [filtersApplied]);
  useEffect(() => {
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
        }
      }
    );
  }, []);

  return (
    <>
      <div className="px-[30px] md:px-[50px] lg:px-[100px] pt-[60px]">
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
        </div>
        <PropertyFilters
          filtersApplied={filtersApplied}
          setFiltersApplied={setFiltersApplied}
        />
        <div className="md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 flex no-scrollbar overflow-x-auto  py-[80px] gap-5 ">
          {properties.map((item) => {
            return (
              <div
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
            className={`text-gray-600  ${
              !pagination?.prev_page_url
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
            }`}
            disabled={!pagination?.prev_page_url}
            onClick={() =>
              fetchListings(currentPage - 1, filtersApplied, (res) => {
                setProperties(res?.data?.data);
                setPagination(res?.data);
                setCurrentPage(res?.data?.current_page);
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
                  className={`h-[10px] w-[10px] rounded-full ${
                    currentPage === index + 1 ? "bg-primary" : "bg-gray-300"
                  }`}
                  onClick={() =>
                    fetchListings(index + 1, filtersApplied, (res) => {
                      setProperties(res?.data?.data);
                      setPagination(res?.data);
                      setCurrentPage(res?.data?.current_page);
                    })
                  }
                />
              )
            )}
          </div>

          {/* Next Button */}
          <button
            className={`text-gray-600  ${
              !pagination?.next_page_url
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
            }`}
            disabled={!pagination?.next_page_url}
            onClick={() =>
              fetchListings(currentPage + 1, filtersApplied, (res) => {
                setProperties(res?.data?.data);
                setPagination(res?.data);
                setCurrentPage(res?.data?.current_page);
              })
            }
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
        className="bg-primary grid lg:grid-cols-2 md:grid-cols-1   items-center px-[30px] md:px-[50px] lg:px-[100px] py-[50px]"
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
      <div className="flex no-scrollbar overflow-x-auto py-[80px] gap-5 px-[30px] md:px-[50px] lg:px-[100px]">
        {propertiesFeatured.map((item) => {
          return (
            <div className="min-w-72 ">
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
        })}
      </div>
      <div className="flex gap-3 justify-center py-4 pb-8">
        {/* Previous Button */}
        <button
          className={`text-gray-600  ${
            !paginationFeatured?.prev_page_url
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer"
          }`}
          disabled={!paginationFeatured?.prev_page_url}
          onClick={() =>
            fetchListings(
              currentPageFeatured - 1,
              { is_featured: 1 },
              (res) => {
                setPropertiesFeatured(res?.data?.data);
                setPaginationFeatured(res?.data);
                setCurrentPageFeatured(res?.data?.current_page);
              }
            )
          }
        >
          <IoArrowBackCircleOutline size={44} />
        </button>

        {/* Page Dots */}
        <div className="gap-3 grid grid-cols-5 items-center">
          {Array.from({ length: paginationFeatured?.last_page || 1 }).map(
            (_, index) => (
              <div
                key={index}
                className={`h-[10px] w-[10px] rounded-full ${
                  currentPageFeatured === index + 1
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
          className={`text-gray-600 ${
            !paginationFeatured?.next_page_url
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer"
          }`}
          disabled={!paginationFeatured?.next_page_url}
          onClick={() =>
            fetchListings(
              currentPageFeatured + 1,
              { is_featured: 1 },
              (res) => {
                setPropertiesFeatured(res?.data?.data);
                setPaginationFeatured(res?.data);
                setCurrentPageFeatured(res?.data?.current_page);
              }
            )
          }
        >
          <IoArrowForwardCircleOutline size={44} />
        </button>
      </div>
      <FAQs />
    </>
  );
};

export default Properties;
