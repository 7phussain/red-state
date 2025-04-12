// src/_components/Leads/listings/AddNearByLocaModal.js
"use client";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import useApi from "@/utils/useApi";
import axios from "axios";
import ListingLocation from "./ListingLocation";
import { PiX } from "react-icons/pi";

export default function AddNearByLocaModal({
    nearByModal,
    handleCloseNearByModal,
    fetchLocations,
}) {
    const { fetchData } = useApi();
    const [isClosing, setIsClosing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [nearByData, setNearByData] = useState({
        name: "",
        area: "",
        city: "",
        country: "",
        notes: "",
    });
    const [listingLocation, setListingLocation] = useState({
        lat: 0,
        lng: 0,
        addressText: "",
        city: "",
        country: "",
    });

    // Log state changes
    useEffect(() => {
        console.log("nearByData:", nearByData);
    }, [nearByData]);

    useEffect(() => {
        console.log("listingLocation:", listingLocation);
    }, [listingLocation]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        console.log(`Input change: ${id} = ${value}`);
        setNearByData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const AddLocations = async () => {
        console.log("AddLocations called with:", { nearByData, listingLocation });

        // Validate required fields
        if (!nearByData.name || !nearByData.area || !nearByData.city || !nearByData.country) {
            console.log("Validation failed: Missing required fields", nearByData);
            toast.error("Please fill all required fields (Name, Area, City, Country)", {
                position: "top-right",
                autoClose: 3000,
            });
            return;
        }

        if (!listingLocation.lat || !listingLocation.lng || listingLocation.lat === 0 || listingLocation.lng === 0) {
            console.log("Validation failed: Invalid map location", listingLocation);
            toast.error("Please select a valid location on the map", {
                position: "top-right",
                autoClose: 3000,
            });
            return;
        }

        setLoading(true);

        // Construct FormData
        const formData = new FormData();
        formData.append("name", nearByData.name);
        formData.append("area", nearByData.area);
        formData.append("city", nearByData.city);
        formData.append("country", nearByData.country);
        formData.append("latLong", `${listingLocation.lat},${listingLocation.lng}`);
        if (nearByData.notes) formData.append("notes", nearByData.notes);

        // Log FormData entries
        console.log("FormData entries:");
        const entries = Object.fromEntries(formData.entries());
        console.log(entries);
        if (Object.keys(entries).length === 0) {
            console.log("Warning: FormData is empty!");
        }

        try {
            // Try fetchData
            console.log("Attempting fetchData with FormData...");
            await fetchData(
                "/nearby",
                {
                    method: "POST",
                    body: formData,
                },
                (response, success) => {
                    if (success && response?.data) {
                        console.log("Near by location added:", response);
                        toast.success("Location Added Successfully", {
                            position: "top-right",
                            autoClose: 3000,
                        });
                        handleCloseNearByModal();
                        fetchLocations();
                    } else {
                        console.log("API failure response:", response);
                        throw new Error(response?.message || "Failed to add location");
                    }
                }
            );
        } catch (error) {
            console.error("fetchData error:", error);
            toast.error("fetchData failed, trying raw axios...", {
                position: "top-right",
                autoClose: 3000,
            });

            // Fallback to raw axios
            try {
                const token = localStorage.getItem("auth-token");
                console.log("Raw axios with token:", token);
                const res = await axios.post(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/nearby`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                console.log("Raw axios response:", res.data);
                toast.success("Location Added Successfully (raw axios)", {
                    position: "top-right",
                    autoClose: 3000,
                });
                handleCloseNearByModal();
                fetchLocations();
            } catch (rawError) {
                console.error("Raw axios error:", rawError.response?.data);
                toast.error(rawError.response?.data?.message || "Unable to add location", {
                    position: "top-right",
                    autoClose: 3000,
                });
            }
        } finally {
            setLoading(false);
        }
    };

    const closingTimeoutId = useRef(null);
    useEffect(() => {
        return () => clearTimeout(closingTimeoutId.current);
    }, []);

    useEffect(() => {
        console.log("Syncing listingLocation:", listingLocation);
        setNearByData((prev) => ({
            ...prev,
            city: listingLocation.city || prev.city,
            country: listingLocation.country || prev.country,
        }));
    }, [listingLocation.city, listingLocation.country]);

    const handleClose = () => {
        setIsClosing(true);
        closingTimeoutId.current = setTimeout(() => {
            setIsClosing(false);
            handleCloseNearByModal();
        }, 500);
    };

    if (!nearByModal) return null;

    return (
        <div className="fixed inset-0 bg-black/50 w-[100vw] h-[100vh] flex items-center justify-center z-50">
            <div
                className={`relative bg-white max-w-[90vw] max-h-[90vh] rounded-3xl transition-transform duration-500 ${isClosing ? "translate-y-full" : "translate-y-0"
                    }`}
            >
                <button
                    onClick={handleClose}
                    className="absolute top-2 right-2 bg-primary text-white rounded-full p-2 hover:border-[var(--primary)] hover:text-primary hover:bg-transparent cursor-pointer"
                >
                    <PiX size={14} />
                </button>
                <div className="max-w-[90vw] max-h-[90vh] overflow-x-hidden p-6 overflow-y-auto w-full h-full">
                    <h3 className="text-lg font-semibold mb-6">Add New Nearby Location</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left Column: Form Inputs */}
                        <div className="flex flex-col gap-6">
                            <div className="relative">
                                <label htmlFor="name">Location Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    className="input-filter w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                                    value={nearByData.name}
                                    onChange={handleChange}
                                    placeholder="Location Name"
                                    required
                                />
                            </div>

                            <div className="relative">
                                <label htmlFor="area">Area</label>
                                <input
                                    id="area"
                                    type="text"
                                    className="input-filter w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                                    value={nearByData.area}
                                    onChange={handleChange}
                                    placeholder="Area"
                                    required
                                />
                            </div>

                            <div className="relative">
                                <label htmlFor="city">City</label>
                                <input
                                    id="city"
                                    type="text"
                                    className="input-filter w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                                    value={nearByData.city}
                                    onChange={handleChange}
                                    placeholder="City"
                                    required
                                />
                            </div>

                            <div className="relative">
                                <label htmlFor="country">Country</label>
                                <input
                                    id="country"
                                    type="text"
                                    className="input-filter w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                                    value={nearByData.country}
                                    onChange={handleChange}
                                    placeholder="Country"
                                    required
                                />
                            </div>

                            <div className="relative">
                                <label htmlFor="notes">Notes</label>
                                <input
                                    id="notes"
                                    type="text"
                                    className="input-filter w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                                    value={nearByData.notes}
                                    onChange={handleChange}
                                    placeholder="Notes"
                                />
                            </div>
                        </div>

                        {/* Right Column: ListingLocation */}
                        <div className="flex flex-col gap-6">
                            <ListingLocation
                                listingLocation={listingLocation}
                                currLocByDefault={true}
                                setListingLocation={setListingLocation}
                                required
                            />
                        </div>
                    </div>

                    <div className="mt-6">
                        <button
                            onClick={AddLocations}
                            disabled={loading}
                            className={`cursor-pointer w-full bg-primary text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-primary-dark ${loading ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                "Submit"
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}