"use client";
import { useEffect, useState, useRef } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import useApi from "@/utils/useApi";
import { selectStyles, selectStylesFilter } from "@/app/_components/selectStyles";
import ListingLocation from "./components/ListingLocation";

export default function AddListingAttrType({
    data,
    setData,
    loading,
    setLoading,
    page,
    pageSize,
    total,
    setPage,
    setPageSize,
    FetchData,
    listingIds,
    setListingIDs,
    handleNext,
    listingData,
    setListingData,
}) {
    const { fetchData } = useApi();
    const [btnLoading, setBtnLoading] = useState(false);
    const [countryList, setCountryList] = useState([]);
    const [countryLoading, setCountryLoading] = useState(false);
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const isFirstRender = useRef(true);

    const latLong = listingData?.latlong?.split(",").map(Number) || [0, 0];
    const [listingLocation, setListingLocation] = useState({
        lat: latLong[0] || 0,
        lng: latLong[1] || 0,
        addressText: listingData?.location || "",
        city: listingData?.city || "",
        country: listingData?.country || "",
    });

    const handleChange = (e) => {
        setListingData((prev) => ({
            ...prev,
            [e.target.id]: e.target.value,
        }));
    };

    const fetchCountries = async () => {
        setCountryLoading(true);
        try {
            await fetchData(
                "/countries",
                {
                    method: "GET",
                    headers: { "Content-Type": "multipart/form-data" },
                },
                (response, success) => {
                    if (success && response?.data) {
                        setCountryList(response.data);
                        console.log("Countries list:", response.data);
                    } else {
                        throw new Error(response?.message || "Failed to fetch countries");
                    }
                }
            );
        } catch (error) {
            console.error("Error fetching countries:", error);
            toast.error("Unable to fetch countries", {
                position: "top-right",
                autoClose: 3000,
            });
        } finally {
            setCountryLoading(false);
        }
    };

    useEffect(() => {
        fetchCountries();
    }, []);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        setListingData({
            ...listingData,
            latlong: `${listingLocation?.lat},${listingLocation?.lng}`,
            location: listingLocation?.addressText,
            city: listingLocation?.city,
            country: listingLocation?.country,
        });
    }, [listingLocation]);

    return (
        <div className="flex flex-col gap-5 w-full p-5">
            <h4 className="text-primary uppercase text-center font-semibold mb-4">
                Listing Location
            </h4>

            {countryLoading ? (
                <div className="w-full h-[400px] flex justify-center items-center">
                    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Left Column */}
                    <div className="flex flex-col gap-6">
                        <div className="relative">
                            <label htmlFor="area">
                                Project Area
                            </label>
                            <input
                                id="area"
                                type="text"
                                className="input-filter w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                                placeholder="Project Area"
                                value={listingData?.area || ""}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="relative">
                            <label htmlFor="address" >
                                Address
                            </label>
                            <input
                                id="address"
                                type="text"
                                className="input-filter w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                                placeholder="Address"
                                value={listingData?.address || ""}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="relative">
                            <label htmlFor="city" >
                                City
                            </label>
                            <input
                                id="city"
                                type="text"
                                className="input-filter w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                                placeholder="City"
                                value={listingData?.city || ""}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="relative">
                            <label htmlFor="country_id" >
                                Country
                            </label>
                            <input
                                id="country"
                                type="text"
                                className="input-filter w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                                placeholder="Country"
                                value={listingData?.country || ""}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="w-full">
                        <ListingLocation
                            listingLocation={listingLocation}
                            currLocByDefault={true}
                            setListingLocation={setListingLocation}
                            city={city}
                            setCity={setCity}
                            country={country}
                            setCountry={setCountry}
                            required
                        />
                    </div>
                </div>
            )}

            {/* Next Button */}
            {/* <div className="flex justify-end mt-5">
                <button
                    onClick={handleNext}
                    className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark"
                >
                    Next
                </button>
            </div> */}
        </div>
    );
}