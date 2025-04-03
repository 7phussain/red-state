"use client";
import React, { useEffect, useState } from "react";
import { RxDotFilled } from "react-icons/rx";
import {
  IoArrowBackCircleOutline,
  IoArrowForwardCircleOutline,
  IoLocationOutline,
} from "react-icons/io5";
import DevelopersGrid from "./_components/developersGrid";
import Image from "next/image";
import Loader from "../_components/Loader";
import useApi from "@/utils/useApi";

const Developers = () => {
  const { fetchData } = useApi();
  const [developers, setDevelopers] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsloading] = useState(false);
  const fetchDevelopers = (page = 1, filters, callBack) => {
    fetchData(
      `/developers?page=${page}`,
      {
        method: "GET",
      },
      (res, status) => {
        callBack(res, status);
      }
    );
  };
  useEffect(() => {
    setIsloading(true);

    fetchDevelopers(1, {}, (res, status) => {
      if (status) {
        setDevelopers(res?.data?.developers);
        setPagination({ ...res?.data, data: {} || {} }); // Store pagination info
        setCurrentPage(res?.data?.current_page);
        setIsloading(false);
      }
    });
  }, []);

  return (
    <>
      <div className="relative pt-[60px] px-[30px] md:px-[50px] lg:px-[100px] h-[100vh]">
        {/* <div
        className="relative bg-cover bg-center  "
        style={{ backgroundImage: "url('/developers_hero.png')" }}
      > */}
        {/* <img
          src="/developers_hero.webp"
          className=" object-cover absolute bottom-0 z-20 left-0 w-[100vw] h-[100%] "
        /> */}

        <Image
          src="/developers_hero.webp"
          alt="Developer Hero"
          className="object-cover absolute bottom-0 z-20 left-0 w-[100vw] h-[100%]"
          layout="fill"
        />
        {/* Top Gradient */}
        <div className="absolute z-20 inset-x-0 top-0 h-1/2 bg-gradient-to-b from-black/70 to-transparent"></div>

        {/* Bottom Gradient */}
        <div className="absolute z-20 inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent"></div>

        {/* Content */}
        <div className="relative z-20 flex flex-col justify-center h-full pb-[60px]">
          <div className={` flex flex-col gap-4`}>
            <div className="">
              <span className="rounded-full  px-2 py-1 flex items-center mb-3 bg-primary w-fit text-white">
                <RxDotFilled size={30} />
                Our Developers
              </span>
            </div>
            <h3 className="text-5xl font-semibold text-primary  ">
              Explore Our Developers
            </h3>
            <span className="text-white text-md">
              Discover meticulously crafted homes and developers, blending
              contemporary aesthetics with sustainable living.
            </span>
          </div>
          {/* </div> */}
        </div>
      </div>
      <div className="px-[30px] md:px-[50px] lg:px-[100px] my-5 py-5">
        <DevelopersGrid developers={developers} />
      </div>
      <div className="flex gap-3 justify-center py-4 pb-8">
        <button
          className={`text-gray-600  ${!pagination?.prev_page_url
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer"
            }`}
          disabled={!pagination?.prev_page_url}
          onClick={() =>
            fetchListings(currentPage - 1, filtersApplied, (res) => {
              setDevelopers(res?.data?.data);
              setPagination(res?.data);
              setCurrentPage(res?.data?.current_page);
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
                  fetchListings(index + 1, {}, (res) => {
                    setDevelopers(res?.data?.data);
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
          className={`text-gray-600  ${!pagination?.next_page_url
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer"
            }`}
          disabled={!pagination?.next_page_url}
          onClick={() => {
            setIsFeaturedLoading(true);
            fetchListings(currentPage + 1, {}, (res) => {
              setDevelopers(res?.data?.data);
              setPagination(res?.data);
              setCurrentPage(res?.data?.current_page);
              setIsloading(false);
            });
          }}
        >
          <IoArrowForwardCircleOutline size={44} />
        </button>
      </div>
    </>
  );
};

export default Developers;
