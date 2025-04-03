"use client";

import { selectStyles } from "@/app/_components/selectStyles";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import { LuDot } from "react-icons/lu";
import SectionHeader from "./SectionHeader";
import { BsArrowUpRightCircle } from "react-icons/bs";
import { useRouter } from "next/navigation";
import useApi from "@/utils/useApi";
import formatPrice from "@/app/_functions/formatPrice";
const Highlights = () => {
  const [selectedRegion, setSelectedRegion] = useState("Dubai");
  const [filtersApplied, setFiltersApplied] = useState({});
  const [properties, setProperties] = useState([]);
  const { fetchData } = useApi();
  const router = useRouter();
  const links = ["Dubai", "Sharjah", "Abu Dhabi", "Ajman", "Umm Al Quwain", "Ras Al Khaimah", "Fujairah"];

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
        location: selectedRegion,
        // is_featured: 1,
      },
      (res, status) => {
        if (status) {
          setProperties(res?.data?.data);
        }
      }
    );
  }, [selectedRegion]);
  return (
    <div className="md:px-[50px] lg:px-[70px] xl:px-[100px] px-[30px] py-5 my-5">
      <SectionHeader
        name={"Fetured Properties"}
        title={"City-by-City Real Estate Highlights"}
        desc={
          "Find the neighborhood you dream of and explore it with your real estate consultant. We are here to help you find the perfect home"
        }
      />
      <div className="flex flex-wrap justify-center gap-2">
        {/* <ul className="gap-2"> */}
        {links?.map((link, ind) => {
          return (
            <button
              key={ind}
              onClick={() => setSelectedRegion(link)}
              className={`p-1 px-2 rounded-full cursor-pointer ${selectedRegion === link ? "bg-primary" : "text-primary"
                }`}
            >
              {link}
            </button>
          );
        })}
        {/* </ul> */}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-5 gap-5">
        {properties?.slice(0, 3).map((item, ind) => {
          return (
            <div key={ind}>
              <div
                className="relative h-[300px] rounded-2xl"
                style={{
                  backgroundImage: `url(${item?.banner_img})`,
                  backgroundSize: "cover",
                }}
              >
                {/* <img src="/hero.png" alt="" className="rounded-[100px]" /> */}
                <button className="p-1.5 px-3 rounded-full bg-primary uppercase text-xs absolute top-3 left-3 font-semibold">
                  {item?.listing_type}
                </button>
              </div>
              <div className="flex flex-col gap-1 py-4">
                <h4 className="text-primary font-bold text-2xl">
                  {item?.currency} {formatPrice(item?.price)}
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
                      <span>
                        {item?.bedrooms.slice(0, 5)}
                      </span>
                    )}
                    <LuDot size={20} />
                    <span>{item?.bathrooms.slice(0, 6)}</span>
                    <LuDot size={20} />
                    <span>{item?.size}{item?.size_unit}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Highlights;
