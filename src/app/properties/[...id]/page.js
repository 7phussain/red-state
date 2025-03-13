"use client";
import React, { useState, useEffect } from "react";
import Details from "./_components/details";
import { RxDotFilled } from "react-icons/rx";
import {
  IoArrowBackCircleOutline,
  IoArrowForwardCircleOutline,
} from "react-icons/io5";
import FAQs from "@/app/about-us/_components/FAQs";
import { useParams } from "next/navigation";
import useApi from "@/utils/useApi";

const SingleProperty = () => {
  const { id } = useParams();
  const [propertyDetails, setPropertyDetails] = useState({});
  const { fetchData } = useApi();
  const { listing_attribute, meta_tags_for_listings } = propertyDetails;
  const images = [
    `${meta_tags_for_listings?.banner}`,
    ...(meta_tags_for_listings?.additional_gallery
      ? meta_tags_for_listings?.additional_gallery
      : []),
  ];
  useEffect(() => {
    fetchData(
      `/new-listings/${id}`,
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
    <div className="pt-[60px]">
      <div className="grid grid-cols-4 gap-3.5  pb-[50px] h-[500px]  grid-rows-2 px-[100px]">
        {images?.map((item, ind) => {
          return (
            <div
              className={`${
                ind == 0 ? "row-span-2 col-span-2" : ""
              }  w-full h-full object-cover`}
            >
              <img
                src={item}
                alt=""
                className="object-cover h-full w-full rounded-3xl"
              />
              <div>{ind}</div>
            </div>
          );
        })}
      </div>
      <Details propertyDetails={propertyDetails} />
      <div
        style={{
          backgroundImage: "url(/circle-design.png)",
          backgroundBlendMode: "soft-light",
        }}
        className="bg-primary grid grid-cols-2   items-center  px-[100px] py-[50px] my-[50px]"
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
    </div>
  );
};

export default SingleProperty;
