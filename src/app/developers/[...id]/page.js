"use client";
import React, { useState, useEffect } from "react";
import { RxDotFilled } from "react-icons/rx";
import {
  IoArrowBackCircleOutline,
  IoArrowForwardCircleOutline,
  IoLocationOutline,
} from "react-icons/io5";
import { FiPhone } from "react-icons/fi";
import { SlEnvolope } from "react-icons/sl";
import Image from "next/image";
import { useParams } from "next/navigation";
import useApi from "@/utils/useApi";
import PropertyFilters from "@/app/_components/filters";
import Loader from "@/app/_components/Loader";
import { LuDot } from "react-icons/lu";
const Developers = () => {
  const [developerDetails, setDeveloperDetails] = useState({});
  const [properties, setProperties] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsloading] = useState(false);
  const { fetchData } = useApi();
  const { id } = useParams();
  const [filtersApplied, setFiltersApplied] = useState({});

  const contactDetails = [
    {
      title: "Our Phone",
      icon: <FiPhone />,
      desc: "+971 52 217 2300",
    },
    {
      title: "Email Address",
      icon: <SlEnvolope />,
      desc: "info@redestate.ae",
    },
  ];
  useEffect(() => {
    fetchData(
      `/developers/${id}`,
      {
        method: "GET",
      },
      (res, status) => {
        if (status) {
          setDeveloperDetails(res?.data[0] || {});
        }
      }
    );
  }, [id]);
  const fetchListings = (page = 1, filters, callBack) => {
    fetchData(
      `/listings?page=${page}`,
      {
        method: "GET",
        params: { ...filters, developer: developerDetails?.developerName },
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
  return (
    <div className="pt-[50px]">
      <div className="grid grid-cols-1 md:grid-cols-2 px-[30px] md:px-[50px] lg:px-[100px] py-5 my-5">
        <div className="relative z-10 w-full h-full flex flex-col justify-center gap-5 md:order-1 order-2">
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-primary">
            {developerDetails?.developerName}
          </h3>
          <div className="text-secondary text-md">
            {developerDetails?.description}
          </div>
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5">
            {contactDetails?.map((details, ind) => {
              return (
                <div key={ind} className="flex items-center gap-3 text-primary">
                  <span className="p-4 rounded-full border text-xl">
                    {details?.icon}
                  </span>
                  <div className="flex flex-col gap-1">
                    <p className="font-semibold">{details?.title}</p>
                    <p className="text-black">{details?.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="md:order-2 order-1 w-full h-full flex items-center justify-center">
          <img
            src={
              developerDetails?.logo
                ? `${process.env.NEXT_PUBLIC_BASE_URL.slice(0, -3)}${
                    developerDetails?.logo
                  }`
                : "/no_image.png"
            }
            onError={(e) => {
              e.target.onerror = null; // Prevent infinite loop
              e.target.src = "/no_image.png"; // Set fallback image
            }}
            className="w-full h-full max-w-[300px] max-h-[300px] object-contain"
          />
        </div>
      </div>

      <div
        style={{
          backgroundImage: "url(/circle-design.png)",
          backgroundBlendMode: "soft-light",
        }}
        className="bg-primary grid lg:grid-cols-2 md:grid-cols-1 gap-5 items-center px-[10px] md:px-[50px] lg:px-[100px] py-[50px] my-5"
      >
        <img
          src="/aboutus/leading_excellence.webp"
          className="rounded-lg w-full  h-full object-cover "
        />
        {/* <Image
          src="/aboutus/leading_excellence.webp"
          alt="Leading Excellence"
          className=""
          layout="fill"
          objectFit="cover" // Controls how the image is resized
        /> */}
        <div className={`flex flex-col gap-5`}>
          <div className="rounded-full py-1 px-2 flex items-center gap-2 border w-fit text-white">
            <div className="w-2 h-2 rounded-full bg-white"></div>
            <div>Why Choose {developerDetails?.developerName}</div>
          </div>
          <h3 className="text-lg md:text-xl lg:text-2xl font-semibold  ">
            Evidenced by its commitment to develop and grow businesses
          </h3>
          <div className="text-white text-sm">
            {developerDetails?.longDescription}
          </div>
        </div>
      </div>

      <div className="my-5 py-5 px-[30px] md:px-[50px] lg:px-[100px] flex flex-col gap-5">
        <div className="text-lg md:text-xl lg:text-2xl text-primary font-semibold">
          {developerDetails?.developerName} s Listings
        </div>
        <PropertyFilters
          filtersApplied={filtersApplied}
          setFiltersApplied={setFiltersApplied}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
            })
          )}
        </div>

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
                  onClick={() => {
                    setIsloading(true);
                    fetchListings(index + 1, filtersApplied, (res) => {
                      setProperties(res?.data?.data);
                      setPagination(res?.data);
                      setCurrentPage(res?.data?.current_page);
                      setIsloading(false);
                    });
                  }}
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
            onClick={() => {
              setIsFeaturedLoading(true);
              fetchListings(currentPage + 1, filtersApplied, (res) => {
                setProperties(res?.data?.data);
                setPagination(res?.data);
                setCurrentPage(res?.data?.current_page);
                setIsloading(false);
              });
            }}
          >
            <IoArrowForwardCircleOutline size={44} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Developers;
