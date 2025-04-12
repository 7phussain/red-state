"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useApi from "@/utils/useApi";
import { FaPlus } from "react-icons/fa";
import LocationCheckBox from "./components/LocationCheckBox";
import AddNearByLocaModal from "./components/AddNearByLocaModal";

export default function AddListingNearBy({
    listData,
    listingIds,
    setListingIDs,
    handleNext,
    listingData,
    setListingData,
}) {
    const { fetchData } = useApi();
    const [loading, setLoading] = useState(false);
    const [nearByLocations, setNearByLocations] = useState([]);
    const [selectedLocations, setSelectedLocations] = useState(listData?.nearby || []);
    const [btnLoading, setBtnLoading] = useState(false);
    const [nearByModal, setNearByModal] = useState(false);

    const handleCloseNearByModal = () => setNearByModal(false);
    const handleNearByLocaModal = () => setNearByModal(true);

    const fetchLocations = async () => {
        setLoading(true);
        try {
            await fetchData(
                "/nearby",
                {
                    method: "GET",
                    headers: { "Content-Type": "multipart/form-data" },
                },
                (response, success) => {
                    if (success && response?.data?.data) {
                        setNearByLocations(response.data.data);
                        console.log("Near by location list:", response.data.data);
                    } else {
                        throw new Error(response?.message || "Failed to fetch locations");
                    }
                }
            );
        } catch (error) {
            console.error("Error fetching locations:", error);
            toast.error("Unable to fetch locations", {
                position: "top-right",
                autoClose: 3000,
            });
        } finally {
            setLoading(false);
        }
    };

    const AddListMeta = async () => {
        setBtnLoading(true);
        const formData = new FormData();
        Object.keys(listingData)?.forEach((key) =>
            formData.append(key, listingData[key])
        );
        console.log("Sending meta data:", listingData);

        const url = listData ? `/listings/${listData?.id}` : `/listings`;

        try {
            await fetchData(
                url,
                {
                    method: "POST",
                    body: formData,
                    headers: { "Content-Type": "multipart/form-data" },
                },
                (response, success) => {
                    if (success) {
                        console.log("Listing added:", response);
                        toast.success("Listing updated successfully", {
                            position: "top-right",
                            autoClose: 3000,
                        });
                        handleNext(); // Advance or close form
                    } else {
                        throw new Error(response?.message || "Failed to update listing");
                    }
                }
            );
        } catch (error) {
            console.error("Error updating listing:", error);
            toast.error("Something went wrong! Please try again", {
                position: "top-right",
                autoClose: 3000,
            });
        } finally {
            setBtnLoading(false);
        }
    };

    useEffect(() => {
        fetchLocations();
    }, []);

    return (
        <div className="flex flex-col gap-5 w-full my-5 p-5">
            <h4 className="text-primary uppercase text-center font-semibold mb-4">
                Near By Locations
            </h4>
            {loading ? (
                <div className="w-full h-[400px] flex justify-center items-center">
                    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
                    {nearByLocations?.length > 0 ? (
                        nearByLocations.map((location) => (
                            <LocationCheckBox
                                key={location?.id}
                                location={location}
                                selectedLocations={selectedLocations}
                                setSelectedLocations={setSelectedLocations}
                                listingData={listingData}
                                setListingData={setListingData}
                            />
                        ))
                    ) : (
                        <p>No locations found</p>
                    )}
                </div>
            )}

            <div className="flex items-center justify-center my-5">
                <button
                    onClick={handleNearByLocaModal}
                    className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary-dark"
                >
                    <FaPlus size={16} />
                    Add Near By Location
                </button>
            </div>

            {listData && (
                <div className="flex items-center justify-end my-5">
                    <button
                        onClick={AddListMeta}
                        disabled={btnLoading}
                        className={`bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary-dark ${btnLoading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                    >
                        {btnLoading ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            "Update"
                        )}
                    </button>
                </div>
            )}

            {nearByModal && (
                <AddNearByLocaModal
                    nearByModal={nearByModal}
                    setNearByModal={setNearByModal}
                    fetchLocations={fetchLocations}
                    handleCloseNearByModal={handleCloseNearByModal}
                />
            )}
        </div>
    );
}