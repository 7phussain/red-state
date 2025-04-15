"use client";
import { useEffect, useState } from "react";
import { PiBathtubDuotone, PiBedDuotone, PiEye, PiEyeDuotone, PiEyeSlash, PiHouse, PiLock, PiPlus, PiPlusBold, PiRulerDuotone, PiScales, PiSignOut, PiStarDuotone, PiTagDuotone, PiTrash, PiUser } from "react-icons/pi";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { BsChevronBarLeft, BsChevronBarRight, BsChevronRight, BsDatabase, BsHouse, BsPin, BsSearch } from "react-icons/bs";
import HeadingTitle from "@/app/_components/HeadingTitle";
import useApi from "@/utils/useApi";

const IMG_BASE_URL = process.env.NEXT_PUBLIC_IMG_BASE_URL;

export default function Developers() {
  const router = useRouter();
  const { fetchData } = useApi();

  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDevelopers = async () => {
    try {
      setLoading(true);
      const endpoint = `/developers`;
      await fetchData(
        endpoint,
        {
          method: "GET",
        },
        (response, success) => {
          console.log("Fetch response:", response);
          if (success && response?.data?.developers) {
            setDevelopers(response?.data?.developers);
            console.log("developers:", response.data?.developers);
          } else {
            toast.error(response?.message || "Failed to fetch developer", {
              position: "top-right",
              autoClose: 3000,
            });
          }
        }
      );
    } catch (error) {
      console.error("Error fetching developer:", error);
      if (error?.response?.status === 404) {
        toast.error(response?.message || "Failed to fetch developer", {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        toast.error("Something went wrong!", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevelopers();
  }, []);

  // SINGLE DEVELOPER
  const HandleSingleDeveloper = (id) => {
    router.push(`/admin/developers/${id}`)
  };

  return (
    <>
      <HeadingTitle
        title={"Developers"}
        icon={<BsDatabase size={30} />}
      />

      {/* Results */}
      {loading ? (
        <p className="text-center py-10">Loading...</p>
      ) : developers.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
            {developers?.map((developer, index) => (
              <div
                key={index}
                className="cursor-pointer bg-white shadow-sm rounded-xl overflow-hidden"
                onClick={() => HandleSingleDeveloper(developer?.id)}
              >
                <div className="relative overflow-hidden p-0 p-4">
                  <div className="flex flex-col gap-4 justify-between">
                    <div className="h-[150px] flex items-center justify-center">
                      {developer?.logo ? (
                        <img
                          src={`${IMG_BASE_URL}/${developer?.logo}`}
                          alt="Real estate"
                          className="w-auto h-auto max-w-full max-h-[150px] object-contain"
                        />
                      ) : (
                        <img
                          src={static_img}
                          alt="default"
                          className="w-full h-[200px] object-cover"
                        />
                      )}
                    </div>
                    <div className="text-primary text-base text-center font-bold">
                      {developer?.developerName}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-center py-10">No developers found</p>
      )}
    </>
  );
}
