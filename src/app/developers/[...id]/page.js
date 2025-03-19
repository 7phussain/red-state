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
      desc: developerDetails?.developerContact,
    },
    {
      title: "Email Address",
      icon: <SlEnvolope />,
      desc: developerDetails?.developerEmail,
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
    <div className="pt-[60px]">
      <div className="grid lg:grid-cols-2 grid-cols-1 h-[100vh] grid-rows-1 text px-[30px] md:px-[50px] lg:px-[100px]  py-[100px]">
        <div className="relative z-10 flex flex-col justify-between h-full pb-[60px] lg:order-1 order-2">
          <div></div>
          <div className={` flex flex-col gap-4`}>
            <h3 className="text-5xl font-semibold text-primary  ">
              {developerDetails?.developerName}
            </h3>
            <span className="text-secondary text-md">
              {developerDetails?.longDescription}
            </span>
          </div>
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-3 gap-y-5">
            {contactDetails?.map((details, ind) => {
              return (
                <div
                  key={ind}
                  className="flex items-center gap-4 sm:justify-center text-primary"
                >
                  <span className="p-4 rounded-full border text-xl">
                    {details?.icon}
                  </span>
                  <div className="flex flex-col gap-3">
                    <p className="text-lg font-semibold">{details?.title}</p>
                    <p className="text-black"> {details?.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="lg:order-2 order-1">
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
            className="w-full h-full object-contain"
          />
          {/* <Image
            src="/developer_logo.png"
            alt="Sea site"
            className=""
            layout="fill"
            objectFit="contain" // Controls how the image is resized
          /> */}
        </div>
      </div>

      <div
        style={{
          backgroundImage: "url(/circle-design.png)",
          backgroundBlendMode: "soft-light",
        }}
        className="bg-primary grid lg:grid-cols-2 md:grid-cols-1  gap-4  items-center px-[10px] md:px-[50px] lg:px-[100px] py-[50px]"
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
        <div className={` flex flex-col gap-4 `}>
          <div className="">
            <span className="rounded-full pr-2   py-1 flex items-center mb-3 border w-fit text-white">
              <RxDotFilled size={30} />
              Why Choose {developerDetails?.developerName}
            </span>
          </div>
          <h3 className="sm:text-5xl text-3xl font-semibold  ">
            evidenced by its commitment to develop and grow businesses
          </h3>
          <span className="text-gray-300 ">
            The Al Habtoor Group has grown with the United Arab Emirates. What
            started out as a small engineering firm in 1970, is today one of the
            region’s most respected conglomerates with interests in the
            hospitality, automotive, real estate, education and publishing
            sectors. The Al Habtoor Group has earned itself a solid reputation
            both locally and internationally due to the vision of its Chairman,
            Khalaf Ahmad Al Habtoor. The Al Habtoor Group is one of the UAE’s
            most respected and successful businesses. Today it operates in the
            UAE and international markets. It employs thousands of
            highly-qualified, experienced professionals.
          </span>
        </div>
      </div>
      <div className="px-[30px] md:px-[50px] lg:px-[100px]  py-[100px]">
        <PropertyFilters
          filtersApplied={filtersApplied}
          setFiltersApplied={setFiltersApplied}
        />

        <div className="md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 flex no-scrollbar overflow-x-auto py-5 gap-5">
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
