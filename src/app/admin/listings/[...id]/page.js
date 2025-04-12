"use client";
import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import { useParams, useRouter } from "next/navigation";
import useApi from "@/utils/useApi";
import Image from "next/image";
import { LoadScript } from "@react-google-maps/api";
import formatPrice from "@/app/_functions/formatPrice";
import HeadingTitle from "@/app/_components/HeadingTitle";
import { BsDot, BsHouse, BsHouseAdd, BsImage, BsPen, BsPersonAdd } from "react-icons/bs";
import { selectStyles } from "@/app/_components/selectStyles";
import { FaStar } from "react-icons/fa6";
import { PiBathtubDuotone, PiBedDuotone, PiBuildingDuotone, PiCurrencyCircleDollarDuotone, PiMapPinDuotone, PiShovelDuotone, PiTagDuotone, PiVectorTwoDuotone } from "react-icons/pi";
import { currencies, size_unit } from "@/app/_components/selectOptions";
import useCurrencyInfo from "@/app/_functions/currencyConverter";
import GoogleMaps from "@/app/_components/map";
import moment from "moment";

const convertUnit = (size, fromUnit, toUnit) => {
  if (fromUnit === "sq.ft" && toUnit === "sq.m") {
    return size / 10.7639; // Convert from sq.ft to sq.m
  } else if (fromUnit === "sq.m" && toUnit === "sq.ft") {
    return size * 10.7639; // Convert from sq.m to sq.ft
  }
  return size; // If units are the same, return the original size
};

const SingleListing = () => {
  const router = useRouter();
  const { id } = useParams();
  const { fetchData } = useApi();
  const [propertyDetails, setPropertyDetails] = useState({});
  const [developers, setDevelopers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const closingTImeoutId = useRef(null);
  const [openEdit, setOpenEdit] = useState({
    open: false,
    data: null,
    type: null,
  });
  const [singleImageModal, setSingleImageModal] = useState({
    isOpen: false,
    url: "",
    id: null,
    video: false,
  });
  const [selectImagesModal, setSelectImagesModal] = useState({
    isOpen: false,
    listingId: null,
    img_id: null,
  });
  const [selectDocumentModal, setSelectDocumentModal] = useState({
    isOpen: false,
    listingId: null,
  });
  const [currConvertor, setCurrConvertor] = useState("Aed");
  const [size, setSize] = useState(null);
  const [sizeUnit, setSizeUnit] = useState(null);
  const [price, setPrice] = useState(null);
  const [allCurrencies, filteredOptions] = useCurrencyInfo(
    currConvertor?.toLowerCase()
  );
  const [leadNotFound, setLeadNotFound] = useState(false);

  const fileInputRef = useRef(null);

  const handleImageSelect = () => {
    fileInputRef.current.click();
  };

  const handleEdit = () => {
    router.push(`/admin/listings/modify/${id}`);
  };

  // CURRENCY CONVERTOR
  const convert = (e) => {
    console.log("event value: ", typeof e?.value);
    setCurrConvertor(e?.value?.toLowerCase());

    const convertedPrice =
      allCurrencies && allCurrencies[e?.value?.toLowerCase()]
        ? price * allCurrencies[e?.value?.toLowerCase()]
        : price;

    console.log("converted Price: ", convertedPrice);

    setPrice(convertedPrice);
  };

  // UNIT CONVERTOR
  const handleUnitChange = (e) => {
    const newUnit = e.value;
    const convertedSize = convertUnit(size, sizeUnit, newUnit); // Convert size based on selected unit
    setSize(convertedSize); // Update the size state
    setSizeUnit(newUnit); // Update the unit state
  };

  const [isClosing, setIsClosing] = useState(false);
  const handleClose = () => {
    setIsClosing(true);
    closingTImeoutId.current = setTimeout(() => {
      setIsClosing(false);
      handleCloseSingleListingModel();
    }, 1000);
  };

  const updateBanner = async (e, type) => {
    const file = e.target.files[0];
    let data = {
      // ...listData,
      banner_img: file,
    };

    console.log("data to be sended ::: ", data);
    try {
      setloading(true);
      const token = localStorage.getItem("auth-token");
      const updateBanner = await axios.post(
        `${BACKEND_URL}/listings/${listData?.id}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + token,
          },
        }
      );

      console.log("update banner: ", updateBanner);

      setloading(false);
      fetchSingleListing();
      FetchListings(currentPage);
    } catch (error) {
      setloading(false);
      console.log("Error", error);
      const errors = error.response?.data?.errors;

      if (errors) {
        const errorMessages = Object.values(errors).flat().join(" ");
        toast.error(`Errors: ${errorMessages}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error("Something Went Wrong! Please Try Again", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

  const fetchSingleListing = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("auth-token");
      const endpoint = `/listings/${id}?images=1`;
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
            setCurrConvertor(response.data.currency || "Aed");
            setPrice(response.data.price || "");
            setSize(response.data.size || "");
            setSizeUnit(response.data.size_unit || "");
          } else {
            setLeadNotFound(true);
            toast.error(response?.message || "Failed to fetch property", {
              position: "top-right",
              autoClose: 3000,
            });
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

  const Additional = ({ propertyDetails }) => {
    return (
      <>
        <div className="flex items-center justify-end gap-2 flex-wrap order-0 md:order-1">
          <button
            className={`w-fit h-fit bg-primary text-white rounded-full aspect-square shadow-sm p-3 cursor-pointer`}
            title="Edit Listing Details"
            onClick={() => handleEdit()}
          >
            <BsPen size={14} />
          </button>
          <button
            className={`w-fit h-fit bg-primary text-white rounded-full aspect-square shadow-sm p-3 cursor-pointer`}
            title="Edit Gallery"
          // onClick={() =>
          //   setSelectImagesModal({
          //     isOpen: true,
          //     listingId: propertyDetails?.id,
          //   })
          // }
          >
            <BsImage size={14} />
          </button>
        </div>
      </>
    )
  };

  return (
    <>
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
        <div className="flex flex-col gap-5">
          <HeadingTitle
            icon={<BsHouse size={30} />}
            title={`${propertyDetails?.developer}${" "}${propertyDetails?.project}`}
            additional={<Additional propertyDetails={propertyDetails} />}
          />
          <div className="relative">
            {/* {propertyDetails?.is_featured === 1 && ( */}
            <div className="absolute top-3 right-3 flex items-center gap-2 bg-black/0 backdrop-blur-xs p-2 rounded-xl">
              <FaStar size={16} color={"#FFD700"} />
              <h3 className={`text-xs font-semibold uppercase text-white`} >
                Featured
              </h3>
            </div>
            {/* )} */}
            <div className={`w-full flex items-center gap-1 overflow-x-scroll ${propertyDetails?.banner_img && "h-[240px]"}`}>
              {propertyDetails?.banner_img ? (
                <>
                  <img
                    // onClick={() =>
                    //   setSingleImageModal({
                    //     isOpen: true,
                    //     url: propertyDetails?.banner_img,
                    //     listingId: propertyDetails?.id,
                    //   })
                    // }
                    src={propertyDetails?.banner_img}
                    alt={"banner"}
                    className="w-[250px] h-[200px] object-cover m-1 rounded-xl cursor-pointer"
                  />
                </>
              ) : (
                <></>
              )}
              {propertyDetails?.images?.map((pic) =>
                pic ? (
                  <img
                    key={pic?.id} // Ensure you have a unique key for each item in the array
                    // onClick={() =>
                    //   setSingleImageModal({
                    //     isOpen: true,
                    //     url: pic?.img_url,
                    //     listingId: propertyDetails?.id,
                    //     img_id: pic?.id,
                    //   })
                    // }
                    src={pic?.img_url}
                    alt={pic?.img_alt}
                    className="w-[250px] h-[200px] object-cover m-1 rounded-xl cursor-pointer"
                  />
                ) : null
              )}
            </div>
          </div>
          <div className="flex items-center justify-between w-full gap-4">
            <h1 className={`text-xl font-bold text-primary`} >
              {propertyDetails?.listing_title}
            </h1>
            <div
              className={`${propertyDetails?.listing_status === "1"
                ? "bg-green-600"
                : "bg-red-600"
                } rounded-xl text-white text-[10px] px-2 py-1`}
            >
              {propertyDetails?.listing_status === "1"
                ? "ACTIVE"
                : "INACTIVE"
              }
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-5">
            <div className="flex flex-col">
              {/* BED  */}
              <div className="grid grid-cols-7 items-center gap-4 mb-4">
                <PiBedDuotone
                  size={16}
                  className={"text-primary"}
                />
                <h6 className="col-span-6">
                  {propertyDetails?.bedrooms}
                  {" "}
                  {propertyDetails?.property_type}
                </h6>
              </div>
              {/* BATH  */}
              <div className="grid grid-cols-7 items-center gap-4 mb-2">
                <PiBathtubDuotone
                  size={16}
                  className={"text-primary"}
                />
                <h6 className="col-span-6">
                  {propertyDetails?.bathrooms}
                </h6>
              </div>
              {/* SIZE */}
              <div className="grid grid-cols-7 items-center gap-4">
                <PiVectorTwoDuotone
                  size={16}
                  className={"text-primary"}
                />
                <div className="col-span-6 grid grid-cols-2 items-center gap-2">
                  <h6>
                    {size && Number(size)?.toFixed(2)}
                  </h6>
                  <Select
                    id="currency_type"
                    options={size_unit()?.map((unit) => ({
                      value: unit.value,
                      label: unit.label,
                    }))}
                    value={size_unit()?.filter(
                      (unit) => unit?.value === sizeUnit
                    )}
                    onChange={(e) => handleUnitChange(e)}
                    placeholder={"Unit"}
                    // menuPortalTarget={document.body}
                    styles={selectStyles}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {/* LISTING TYPE */}
              <div className="grid grid-cols-7 items-center gap-4">
                <PiTagDuotone
                  size={16}
                  className={"text-primary"}
                />
                <h6 className="col-span-6">
                  {propertyDetails?.listing_type}
                </h6>
              </div>
              {/* DEVELOPER */}
              <div className="grid grid-cols-7 items-center gap-4">
                <PiShovelDuotone
                  size={16}
                  className={"text-primary"}
                />
                <h6 className="col-span-6">
                  {propertyDetails?.developer}
                </h6>
              </div>
              {/* PROJECT */}
              <div className="grid grid-cols-7 items-center gap-4">
                <PiBuildingDuotone
                  size={16}
                  className={"text-primary"}
                />
                <h6 className="col-span-6">
                  {propertyDetails?.project}
                </h6>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {/* AREA */}
              <div className="grid grid-cols-7 items-center gap-4">
                <PiMapPinDuotone
                  size={16}
                  className={"text-primary"}
                />
                <h6 className="col-span-6">
                  {propertyDetails?.area} | {propertyDetails?.city} | {propertyDetails?.country}
                </h6>
              </div>
              {/* PRICE */}
              <div className="grid grid-cols-7 items-center gap-4">
                <PiCurrencyCircleDollarDuotone
                  size={16}
                  className={"text-primary"}
                />
                <div className="col-span-6 grid grid-cols-2 items-center gap-2">
                  <h6 className="col-span-1 flex items-center gap-1">
                    {propertyDetails?.is_start_price === 1 && (
                      <>
                        Starting from{" "}
                      </>
                    )}
                    {price && formatPrice(price)}
                  </h6>
                  <Select
                    id="currency"
                    options={currencies()?.map((curr) => ({
                      value: curr.value,
                      label: curr.label,
                    }))}
                    value={currencies()?.filter(
                      (curr) =>
                        curr?.value?.toLowerCase() ===
                        currConvertor?.toLowerCase()
                    )}
                    onChange={(e) => convert(e)}
                    placeholder={"Currency"}
                    // menuPortalTarget={document.body}
                    styles={selectStyles}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* DESCRIPTION */}
          {propertyDetails?.description && (
            <div className="text-xs leading-5">
              {propertyDetails?.description}
            </div>
          )}
          {/* NEARBY */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 my-5">
            <div className="flex flex-col gap-5">
              <h4 className="text-lg font-bold">
                Nearby locations
              </h4>
              {propertyDetails?.nearby?.length > 0 ? (
                <>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-2 gap-5">
                    {propertyDetails?.nearby?.map((near) => (
                      <p className="flex gap-2">
                        <BsDot size={22} className="text-primary" /> {near?.name}
                      </p>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <div className="italic">
                    Nothing to show
                  </div>
                </>
              )}
            </div>
            <div className="flex flex-col gap-5">
              {/* MAP */}
              {propertyDetails?.latlong === null || propertyDetails?.latlong === "" ? (
                <></>
              ) : (
                <div className="w-full min-h-[50vh] h-full border border-primary relative">
                  <GoogleMaps
                    lat={propertyDetails?.latlong?.split(",")[0]}
                    lon={propertyDetails?.latlong?.split(",")[1]}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <p className="text-xs flex gap-2 items-center">
              {moment(propertyDetails?.created_at).format(
                "YYYY-MM-DD HH:MM"
              )}
              <BsHouseAdd
                size={16}
                className="text-primary"
              />
            </p>
            <p className="text-xs flex gap-2 items-center">
              {propertyDetails?.addedBy_name}
              <BsPersonAdd
                size={16}
                className="text-primary"
              />
            </p>
          </div>
          {/* {singleImageModal?.isOpen && (
            <SingleImageModal
              singleImageModal={singleImageModal}
              handleClose={() => setSingleImageModal({ isOpen: false })}
              fetchSingleListing={fetchSingleListing}
              listing="true"
            />
          )} */}
        </div>
      </LoadScript >
    </>
  );
};

export default SingleListing;
