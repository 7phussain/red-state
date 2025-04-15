"use client";
import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import useApi from "@/utils/useApi";
import Image from "next/image";
import HeadingTitle from "@/app/_components/HeadingTitle";
import { BsDatabase } from "react-icons/bs";

const IMG_BASE_URL = process.env.NEXT_PUBLIC_IMG_BASE_URL;

const SingleDeveloper = () => {
  const { id } = useParams();
  const { fetchData } = useApi();
  const [developers, setDevelopers] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchSingleDeveloper = async () => {
    try {
      setIsLoading(true);
      const endpoint = `/developers/${id}`;
      await fetchData(
        endpoint,
        {
          method: "GET",
        },
        (response, success) => {
          console.log("Fetch response:", response?.data[0]);
          if (success && response?.data) {
            setDevelopers(response?.data[0]);
            console.log("DEVELOPERS: ", developers);
          } else {
            toast.error(response?.message || "Failed to fetch developer", {
              position: "top-right",
              autoClose: 3000,
            });
          }
        }
      );
    } catch (error) {
      console.error("Error fetching listing:", error);
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
      fetchSingleDeveloper();
    }
  }, [id]);

  return (
    <div className="flex flex-col gap-5">
      <HeadingTitle
        icon={<BsDatabase size={30} />}
        title={`${developers?.developerName}`}
      />
      <div className="relative w-full flex items-center justify-center">
        {developers?.logo ? (
          <img
            src={`${IMG_BASE_URL}/${developers.logo}`}
            alt="Real Estate"
            className="max-w-[250px] max-h-[250px] object-contain m-1 bg-transparent"
          />
        ) : (
          <></>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-lg font-bold text-primary">
          Short Description
        </h1>
        <p>
          {developers?.description || "N/A"}
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-lg font-bold text-primary">
          Long Description
        </h1>
        <p>
          {developers?.longDescription || "N/A"}
        </p>
      </div>
    </div>
  );
};

export default SingleDeveloper;