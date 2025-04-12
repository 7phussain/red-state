"use client";
import React, { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { LoadScript } from "@react-google-maps/api";
import formatPrice from "@/app/_functions/formatPrice";
import HeadingTitle from "@/app/_components/HeadingTitle";
import { BsDot, BsHouse, BsHouseAdd, BsHouseGear, BsImage, BsPen, BsPersonAdd } from "react-icons/bs";
import { selectStyles } from "@/app/_components/selectStyles";
import { FaStar } from "react-icons/fa6";
import { PiBathtubDuotone, PiBedDuotone, PiBuildingDuotone, PiCurrencyCircleDollarDuotone, PiMapPinDuotone, PiShovelDuotone, PiTagDuotone, PiVectorTwoDuotone, PiX } from "react-icons/pi";
import { currencies, size_unit } from "@/app/_components/selectOptions";
import useCurrencyInfo from "@/app/_functions/currencyConverter";
import GoogleMaps from "@/app/_components/map";
import moment from "moment";
import useApi from "@/utils/useApi";
import MultiStepForm from "../listings/modify/components/multiform";

const AddListing = () => {
  const router = useRouter();
  const { id } = useParams();
  const { fetchData } = useApi();
  const [isLoading, setIsLoading] = useState(false);

  const fetchSingleListing = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("auth-token");
      const endpoint = `/listings/${id}`;
      await fetchData(
        endpoint,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Authorization: "Bearer " + token,
          },
        },
        (response, success) => {
          if (success && response?.data) {
            setPropertyDetails(response.data);
          } else {
            toast.error(response?.message || "Failed to fetch property", {
              position: "top-right",
              autoClose: 3000,
            });
            router.push(`/admin/listings/${id}`);
          }
        }
      );
    } catch (error) {
      console.log("Error", error);
      if (error?.response?.status === 404) {
        setLeadNotFound(true);
      } else {
        toast.error("Something went wrong!", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (id) {
      fetchSingleListing();
    }
  }, [id]);

  const handleClose = () => {
    router.push(`/admin/listings/${id}`);
  };

  const fetchListings = async () => {
    // Implement if MultiStepForm requires it
    console.log("Fetching listing details...");
  };
  

  return (
    <>
      {/* <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}> */}
      <div className="flex flex-col gap-5">
        <HeadingTitle
          icon={<BsHouseGear size={30} />}
          title={`Add New Listing`}
        />
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <MultiStepForm
            FetchListings={fetchListings}
            fetchSingleListing={fetchSingleListing}
            handleClose={handleClose}
          />
        )}
      </div>
      {/* </LoadScript > */}
    </>
  );
};

export default AddListing;
