"use client";
import { useEffect, useState } from "react";
import {
  PiBathtubDuotone,
  PiBedDuotone,
  PiEye,
  PiEyeDuotone,
  PiEyeSlash,
  PiHouse,
  PiLock,
  PiPlus,
  PiPlusBold,
  PiRulerDuotone,
  PiScales,
  PiSignOut,
  PiStarDuotone,
  PiTagDuotone,
  PiTrash,
  PiUser,
} from "react-icons/pi";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import AdminNavbar from "../components/AdminSidebar";
import useIsMobile from "@/app/_functions/useIsMobile";
import {
  BsChevronBarLeft,
  BsChevronBarRight,
  BsChevronRight,
  BsHouse,
  BsPin,
  BsSearch,
  BsTrash,
} from "react-icons/bs";
import HeadingTitle from "@/app/_components/HeadingTitle";
import { debounce } from "lodash";
import Select from "react-select";
import { selectStylesFilter } from "@/app/_components/selectStyles";
import {
  bathroom_options,
  enquiry_options,
  listing_options,
  property_options,
} from "@/app/_components/selectOptions";
import formatPrice from "@/app/_functions/formatPrice";

const BACKEND_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function Listings() {
  const router = useRouter();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("auth-token") : null;

  const [listing, setListings] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState("project");
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    bedrooms: null,
    max_price: null,
    min_price: null,
    listing_type: null,
    listing_status: 1,
    is_featured: 0,
    project: null,
    developer: null,
    location: "",
    property_type: null,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [dropDownLoading, setDropDownLoading] = useState(false);
  const [listingModalOpen, setListingModalOpen] = useState(false);
  const [model, setModel] = useState(false);

  const [openDialogue, setOpenDialogue] = useState(false);
  const handleCloseModal = () => setOpenDialogue(false);

  const handleSearchQueryChange = (e) => setSearchQuery(e.target.value);
  const handleSearchCriteriaChange = (option) =>
    setSearchCriteria(option.value);
  const handleCloseListingModal = () => setListingModalOpen(false);

  const handleOpenDialogue = (e, id, name) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenDialogue([id, name]);
  };

  const isFilterApplied = Object.values(filters).some(
    (val) => val !== null && val !== 0
  );

  const clearFilter = (e) => {
    e.preventDefault();
    setFilters({
      bedrooms: null,
      max_price: "",
      min_price: "",
      listing_type: null,
      listing_status: 1,
      is_featured: 0,
      project: null,
      developer: null,
      location: "",
      property_type: null,
    });
    setSearchQuery("");
    setSearchCriteria("project");
  };

  const SearchListings = async (page = 1) => {
    setLoading(true);
    let url = `${BACKEND_URL}/listings/?page=${page}`;

    Object.entries(filters).forEach(([key, val]) => {
      if (val && val !== "") {
        url += `&${key}=${val}`;
      }
    });

    if (searchCriteria === "developer") url += `&developer=${searchQuery}`;
    if (searchCriteria === "project") url += `&project=${searchQuery}`;

    try {
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = res?.data?.data?.data || [];
      setListings(data);
      setLastPage(res?.data?.data?.last_page);
      setTotal(res?.data?.data?.total);
    } catch (err) {
      console.error(err);
      toast.error("Unable to fetch listings.");
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = debounce(() => {
    if (searchQuery?.length >= 3 || filters?.location?.length >= 3) {
      SearchListings(currentPage);
    } else {
      SearchListings(currentPage);
    }
  }, 600);

  useEffect(() => {
    debouncedSearch();
    return () => debouncedSearch.cancel();
  }, [searchQuery, filters]);

  // SINGLE LISTING
  const HandleSingleListing = (id) => {
    router.push(`/admin/listings/${id}`);
  };

  return (
    <>
      <HeadingTitle title={"Listings"} icon={<BsHouse size={30} />} />
      <div className={`grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4`}>
        <div className="col-span-2 grid grid-cols-2 gap-2 ">
          <Select
            value={{ value: searchCriteria, label: searchCriteria }}
            onChange={handleSearchCriteriaChange}
            options={[
              { value: "project", label: "Project" },
              { value: "developer", label: "Developer" },
            ]}
            placeholder={"select"}
            className="w-full capitalize"
            styles={selectStylesFilter}
          />
          <div className="col-span-1 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchQueryChange}
              placeholder={"Search"}
              className="input-filter w-full px-3 py-2 !pr-8 border rounded-md"
            />
            <BsSearch
              size={14}
              className="absolute right-2 top-3 text-primary"
            />
          </div>
        </div>

        {/* Location input */}
        <div className="relative">
          <input
            type="text"
            value={filters.location || ""}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, location: e.target.value }))
            }
            placeholder={"Location"}
            className="input-filter w-full px-3 py-2 !pr-8 border rounded-md"
          />
          <BsPin size={14} className="absolute right-3 top-3 text-primary" />
        </div>

        {/* Listing Type */}
        <Select
          value={
            listing_options().find(
              (opt) => opt.value === filters?.listing_type
            ) || null
          }
          onChange={(opt) =>
            setFilters((prev) => ({
              ...prev,
              listing_type: opt?.value || null,
            }))
          }
          options={listing_options()}
          placeholder={"Listing type"}
          className="w-full"
          isClearable
          styles={selectStylesFilter}
        />

        {/* Property Type */}
        <Select
          value={
            property_options().find(
              (opt) => opt.value === filters?.property_type
            ) || null
          }
          onChange={(opt) =>
            setFilters((prev) => ({
              ...prev,
              property_type: opt?.value || null,
            }))
          }
          options={property_options()}
          placeholder={"Property type"}
          className="w-full"
          isClearable
          styles={selectStylesFilter}
        />

        {/* Bedrooms */}
        <Select
          value={
            enquiry_options().find((opt) => opt.value === filters?.bedrooms) ||
            null
          }
          onChange={(opt) =>
            setFilters((prev) => ({ ...prev, bedrooms: opt?.value || null }))
          }
          options={enquiry_options()}
          placeholder={"Bedrooms"}
          className="w-full"
          isClearable
          styles={selectStylesFilter}
        />

        {/* Is Featured - Toggle */}
        <div className="flex items-center gap-2">
          <label className="text-sm">Featured</label>
          <label className="relative inline-flex items-center cursor-pointer border border-primary px-2 py-1 rounded-xl">
            <input
              type="checkbox"
              checked={filters.is_featured === 1}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  is_featured: e.target.checked ? 1 : 2,
                })
              }
              className="sr-only peer"
            />
            <div className="w-3 h-3 bg-gray-200 rounded-full peer peer-checked:bg-[var(--primary)]"></div>
            <span className="ml-2 text-xs">
              {filters.is_featured === 1 ? "Yes" : "No"}
            </span>
          </label>
        </div>

        {/* Listing Status - Toggle */}
        <div className="flex items-center gap-2">
          <label className="text-sm">Status</label>
          <label className="relative inline-flex items-center cursor-pointer border border-primary px-2 py-1 rounded-xl">
            <input
              type="checkbox"
              checked={filters.listing_status === 1}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  listing_status: e.target.checked ? 1 : 2,
                })
              }
              className="sr-only peer"
            />
            <div className="w-3 h-3 bg-gray-200 rounded-full peer peer-checked:bg-[var(--primary)]"></div>
            <span className="ml-2 text-xs">
              {filters.listing_status === 1 ? "Active" : "Inactive"}
            </span>
          </label>
        </div>
      </div>

      {/* Listing Results */}
      {loading ? (
        <p className="text-center py-10">Loading...</p>
      ) : listing.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
            {listing?.map((listing, index) => (
              <div
                key={index}
                className="bg-white shadow-sm rounded-xl overflow-hidden"
              >
                <div className="relative overflow-hidden p-0">
                  {/* FEATURED */}
                  {listing?.is_featured == 1 && (
                    <div className="absolute top-4 left-4 ">
                      <PiStarDuotone size={20} color={"#FFD700"} />
                    </div>
                  )}
                  <div className="flex flex-col justify-between">
                    <div>
                      {listing?.banner_img ? (
                        <img
                          src={listing?.banner_img}
                          alt="secondary"
                          className="w-full h-[200px] object-cover"
                          // onClick={() => handleImageClick(listing?.banner_img)}
                        />
                      ) : (
                        <img
                          src={static_img}
                          alt="default"
                          className="w-full h-[200px] object-cover"
                        />
                      )}
                      <div className="absolute top-4 right-4 flex flex-col gap-2">
                        <button
                          onClick={() => HandleSingleListing(listing?.id)}
                          className="bg-white shadow-sm aspect-square rounded-full p-2 flex items-center justify-center"
                          title="View Property"
                        >
                          <PiEyeDuotone size={14} />
                        </button>
                        {/* {hasPermission("delete_listing") && ( */}
                        {/* <button
                          className="bg-white shadow-md aspect-square rounded-full p-2 flex items-center justify-center"
                          onClick={(e) =>
                            handleOpenDialogue(
                              e,
                              listing?.id,
                              listing?.listing_title
                            )
                          }
                          title="Delete Listing"
                        >
                          <PiTrash size={14} />
                        </button> */}
                        {/* )} */}
                      </div>
                    </div>

                    <div
                      onClick={() => HandleSingleListing(listing?.id)}
                      className="p-4 flex flex-col gap-1 cursor-pointer"
                    >
                      <h1 className="text-lg font-bold capitalize flex items-center flex-wrap">
                        {listing?.currency && listing?.price ? (
                          <>
                            {listing.currency} {formatPrice(listing.price)}
                            {listing?.is_start_price === 1 && (
                              <PiPlusBold size={14} />
                            )}
                          </>
                        ) : (
                          <span className="text-gray-500 font-normal">
                            Unavailable
                          </span>
                        )}
                      </h1>

                      <div className="text-primary text-base font-bold">
                        {listing?.listing_title
                          ? listing.listing_title.length > 30
                            ? listing.listing_title.slice(0, 30) + "..."
                            : listing.listing_title
                          : `Title unknown`}
                      </div>
                      <div className="capitalize mb-2">
                        {listing?.area || `Area unknown`}
                      </div>

                      <div className="flex flex-col gap-2">
                        <div className="grid grid-cols-8 gap-4 items-center">
                          <PiBedDuotone className="text-primary" size={16} />
                          <p className="col-span-7 flex gap-2">
                            <span>
                              {listing?.bedrooms === "null"
                                ? ""
                                : listing?.bedrooms}
                            </span>
                            <span>
                              {listing?.property_type === "null"
                                ? ""
                                : listing?.property_type}
                            </span>
                          </p>
                        </div>

                        <div className="grid grid-cols-8 gap-4 items-center">
                          <PiBathtubDuotone
                            className="text-primary"
                            size={16}
                          />
                          <p className="col-span-7">
                            {listing?.bathrooms === "null"
                              ? ""
                              : listing?.bathrooms}
                          </p>
                        </div>

                        <div className="grid grid-cols-8 gap-4 items-center">
                          <PiRulerDuotone className="text-primary" size={16} />
                          <p className="col-span-7">
                            {listing?.listing_type === "null"
                              ? ""
                              : listing?.listing_type}
                          </p>
                        </div>

                        <div className="grid grid-cols-8 gap-4 items-center">
                          <PiTagDuotone className="text-primary" size={16} />
                          <p className="col-span-7">
                            <span>
                              {listing?.size === "null" ? "-" : listing?.size}
                            </span>
                            <span>{listing?.size_unit}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Pagination */}
          {lastPage > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <button
                disabled={currentPage === 1}
                onClick={() => {
                  setCurrentPage((prev) => Math.max(prev - 1, 1));
                  SearchListings(currentPage - 1);
                }}
                className={`p-2 rounded-full border ${
                  currentPage === 1
                    ? "text-gray-500 border-gray-500"
                    : "cursor-pointer border-primary text-primary"
                }`}
              >
                <BsChevronBarLeft size={16} />
              </button>

              {[...Array(lastPage)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => {
                    setCurrentPage(index + 1);
                    SearchListings(index + 1);
                  }}
                  className={`h-10 w-10 rounded-full aspect-square flex items-center justify-center ${
                    currentPage === index + 1
                      ? "bg-primary text-white"
                      : "cursor-pointer bg-white/50 text-primary border border-primary"
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                disabled={currentPage === lastPage}
                onClick={() => {
                  setCurrentPage((prev) => Math.min(prev + 1, lastPage));
                  SearchListings(currentPage + 1);
                }}
                className={`p-2 rounded-full border ${
                  currentPage === lastPage
                    ? "text-gray-500 border-gray-500"
                    : "cursor-pointer border-primary text-primary"
                }`}
              >
                <BsChevronBarRight size={16} />
              </button>
            </div>
          )}
        </>
      ) : (
        <p className="text-center py-10">No listings found</p>
      )}
    </>
  );
}
