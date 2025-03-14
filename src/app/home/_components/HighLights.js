"use client";

import { selectStyles } from "@/app/_components/selectStyles";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import { LuSearch } from "react-icons/lu";
import SectionHeader from "./SectionHeader";
import { BsArrowUpRightCircle } from "react-icons/bs";
import { useRouter } from "next/navigation";
import useApi from "@/utils/useApi";
const Highlights = () => {
  const [selectedRegion, setSelectedRegion] = useState("Dubai");
  const links = ["Dubai", "Sharjah", "Abu Dhabi", "Ajman"];
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
        city: selectedRegion,
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
    <div className="md:px-[50px] lg:px-[100px] px-[30px] py-[50px]">
      <SectionHeader
        name={"Fetured Properties"}
        title={"City-by-City Real Estate Highlights"}
        desc={
          "Find the neighborhood you dream of and explore it with your real estate consultant. We are here to help you find the perfect home"
        }
      />
      <div className="flex justify-center py-11">
        <ul className="space-x-5">
          {links?.map((link) => {
            return (
              <button
                onClick={() => setSelectedRegion(link)}
                className={` p-2  rounded-full cursor-pointer ${
                  selectedRegion === link ? "bg-primary" : "text-primary"
                }`}
              >
                {link}
              </button>
            );
          })}
        </ul>
      </div>
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 py-[80px] gap-5">
        {properties?.slice(0, 3).map((item) => {
          return (
            <div>
              {/* <div
                className="relative h-[300px] rounded-2xl"
                style={{
                  backgroundImage: "url(/hero.png)",
                  backgroundSize: "cover",
                }}
              >
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
              </div> */}
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
    </div>
  );
};

export default Highlights;
