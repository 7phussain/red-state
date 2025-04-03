"use client";
import React, { useState, useEffect } from "react";
import Details from "./_components/details";
import { RxDotFilled } from "react-icons/rx";
import {
  IoArrowBackCircleOutline,
  IoArrowForwardCircleOutline,
} from "react-icons/io5";
import FAQs from "@/app/about-us/_components/FAQs";
import { useParams, useRouter } from "next/navigation";
import useApi from "@/utils/useApi";
import Loader from "@/app/_components/Loader";
import Image from "next/image";
import { LoadScript } from "@react-google-maps/api";
import formatPrice from "@/app/_functions/formatPrice";
import { LuDot } from "react-icons/lu";

const SingleProperty = () => {

  const router = useRouter();
  
  const { id } = useParams();
  const [propertyDetails, setPropertyDetails] = useState({});
  const { fetchData } = useApi();
  const { listing_attribute, meta_tags_for_listings } = propertyDetails;
  const [properties, setProperties] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsloading] = useState(false);
  const images = [
    ...(meta_tags_for_listings?.additional_gallery
      ? meta_tags_for_listings?.additional_gallery
      : []),
  ];
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
        min_price: propertyDetails?.listing_attribute_type?.price,
        max_price: propertyDetails?.listing_attribute_type?.price,
      },
      (res, status) => {
        if (status) {
          setProperties(res?.data?.data);
          setIsloading(false);
        }
      }
    );
  }, []);
  useEffect(() => {
    fetchData(
      `/listings/${id}`,
      {
        method: "GET",
      },
      (res, status) => {
        if (status) {
          setPropertyDetails(res?.data || {});
        }
      }
    );
  }, [id]);

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <div className="flex flex-col gap-5 py-5 my-5">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-2 px-[30px] md:px-[50px] lg:px-[70px] xl:px-[100px] py-5 mt-5">
          <div className={`w-full h-full object-cover`}>
            <img
              src={`${propertyDetails?.banner_img}`}
              alt=""
              className="object-cover h-full w-full rounded-3xl"
            />
          </div>
          {propertyDetails?.images?.length >= 3 ? (
            <div className="lg:grid lg:grid-cols-2 flex no-scrollbar overflow-x-auto gap-2 grid-row-2">
              {propertyDetails?.images?.slice(0, 4).map((item, ind) => {
                return (
                  <div
                    key={ind}
                    className={`min-w-[200px] h-full w-full object-cover`}
                  >
                    <img
                      src={item?.img_url}
                      alt=""
                      className="object-cover h-full w-full rounded-3xl"
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="lg:grid lg:grid-cols-1 flex no-scrollbar overflow-x-auto gap-2 lg:grid-row-1 h-[100px] md:h-[150px] lg:h-auto">
              {propertyDetails?.images?.map((item, ind) => {
                return (
                  <>
                    <div
                      key={ind}
                      className={`w-auto h-full lg:min-w-[200px] lg:max-w-[300px] object-cover`}
                    >
                      <img
                        src={item?.img_url}
                        alt=""
                        className="object-cover h-full w-full rounded-3xl"
                      />
                    </div>
                  </>
                );
              })}
            </div>
          )}
        </div>

        <Details propertyDetails={propertyDetails} />

        <div
          style={{
            backgroundImage: "url(/circle-design.png)",
            backgroundBlendMode: "soft-light",
          }}
          className="bg-primary grid md:grid-cols-2 grid-cols-1 items-center px-[30px] md:px-[50px] lg:px-[70px] xl:px-[100px] py-[50px] mt-[50px]"
        >
          <div className={` flex flex-col gap-4 `}>
            <div className="">
              <span className="rounded-full pr-2   py-1 flex items-center mb-3 border w-fit text-white">
                <RxDotFilled size={30} />
                Related Properties
              </span>
            </div>
            <h3 className="text-5xl font-semibold  ">See Simialr Units</h3>
            <span className="text-white ">
              Browse the homes and investments that have captivated buyers and
              investors alike, offering outstanding deals and high demand.
            </span>
          </div>
        </div>
        <div className="md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 flex no-scrollbar overflow-x-auto py-5 gap-5 px-[30px] md:px-[50px] lg:px-[70px] xl:px-[100px]">
          {isLoading ? (
            <Loader />
          ) : (
            properties?.slice(0, 3).map((item, ind) => {
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

        <FAQs />
      </div>
    </LoadScript>
  );
};

export default SingleProperty;
