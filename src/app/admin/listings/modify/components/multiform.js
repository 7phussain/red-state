"use client";
import { useState, useEffect } from "react";
import useApi from "@/utils/useApi";
import { toast } from "react-toastify";
import AddListingAttribute from "@/app/admin/components/forms/AddListingAttribute";
import AddListingAttrType from "@/app/admin/components/forms/AddListingAttrType";
import AddListing from "@/app/admin/components/forms/AddListing";
import AddListingNearBy from "@/app/admin/components/forms/AddListingNearBy";
import { useRouter } from "next/navigation";
import AddListingMeta from "@/app/admin/components/forms/AddListingMeta";

// import {
//     Addlisting,
//     AddListingAttribute,
//     AddListingAttrType,
//     AddListingMeta,
//     AddListingNearBy,
// } from "./listingFormComp"; // Adjust path as needed

export default function MultiStepForm({
    id,
    FetchListings,
    updateData,
    handleClose,
    fetchSingleListing
}) {
    const steps = updateData ? [1, 2, 3, 4] : [1, 2, 3, 4, 5];
    const { fetchData } = useApi();
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());
    const [allImages, setAllImages] = useState([]);
    const [allDocs, setAllDocs] = useState([]);
    const [listingIds, setListingIDs] = useState({
        listing_attribute_id: null,
        listing_type_id: null,
        listing_arrtibute_type_id: null,
        meta_description: null,
        new_listing_id: null,
    });
    const [loading, setLoading] = useState(false);
    const [developers, setDevelopers] = useState([]);
    const [last_page, setLastPage] = useState(null);
    const [total, setTotal] = useState(null);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(null);
    const [listData, setListData] = useState({
        listing_type: updateData?.listing_type || "",
        property_type: updateData?.property_type || "",
        developer: updateData?.developer || "",
        project: updateData?.project || "",
        bedrooms: updateData?.bedrooms || "",
        bathrooms: updateData?.bathrooms || "",
        size: updateData?.size || "",
        address: updateData?.address || "",
        area: updateData?.area || "",
        latlong: updateData?.latlong || "",
        location: updateData?.location || "",
        city: updateData?.city || "",
        country: updateData?.country || "",
        listing_status: updateData?.listing_status || 1,
        is_featured: updateData?.is_featured || 2,
        currency: updateData?.currency || "AED",
        is_start_price: updateData?.is_start_price || 2,
        price: updateData?.price || "",
        handover: updateData?.handover || "",
        listing_title: updateData?.listing_title || "",
        description: updateData?.description || "",
        nearby: updateData?.nearby || "",
        banner_img: updateData?.banner_img || "",
        promo_video: updateData?.promo_video || "",
        size_unit: updateData?.size_unit || "sq.ft",
        nearby: updateData?.nearby || [],
    });
    const [column, setColumn] = useState({
        list_type: [],
        list_attribute: [],
        list_attr_type: [],
    });
    const [data, setData] = useState({
        list_type: [],
        list_attribute: [],
        list_attr_type: [],
    });


    console.log("listing data state:", listData);
    console.log("listing IDs:", listingIds);

    const type = activeStep === 0 ? "list_attribute" : null;

    const isStepSkipped = (step) => skipped.has(step);

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }
        setActiveStep((prev) => prev + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prev) => prev - 1);
    };

    const router = useRouter();

    const handleReset = () => {
        updateData
            ? router.push(`/admin/listings/${id}`)
            : setActiveStep(0);
    };

    const fetchDevelopers = async () => {
        try {
            await fetchData(
                "/developers",
                { method: "GET" },
                (response, success) => {
                    if (success && response?.data?.developers) {
                        setDevelopers(response.data.developers); // Use response.data.data
                        console.log("Developers fetched:", response.data.developers);
                    } else {
                        toast.error(response?.message || "Failed to fetch developers", {
                            position: "top-right",
                            autoClose: 3000,
                        });
                    }
                }
            );
        } catch (error) {
            console.error("Error fetching developers:", error);
            toast.error("Something went wrong!", {
                position: "top-right",
                autoClose: 3000,
            });
        }
    };

    useEffect(() => {
        fetchDevelopers();
    }, [fetchData]);

    const developerOptions = developers.map((dev) => ({
        value: dev.developerName,
        label: dev.developerName,
    }));

    return (
        <div className="w-full py-5">
            {/* Custom Stepper */}
            <div className="flex justify-between items-center mb-5">
                {steps.map((step, index) => (
                    <div key={step} className="flex-1 text-center">
                        <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${activeStep >= index ? "bg-primary text-white" : "bg-gray-300 text-gray-700"}`} >
                            {step}
                        </div>
                    </div>
                ))}
            </div>

            {/* Form Content */}
            {activeStep === steps.length ? (
                <div className="p-5 text-center">
                    <p className="mb-5">
                        {updateData ? (
                            <>
                                The listing details has been updated successfully.
                            </>
                        ) : (
                            <>
                                New listing has been added successfully.
                            </>
                        )}
                    </p>
                    {!updateData && (
                        <>
                            <button
                                onClick={handleReset}
                                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark"
                            >
                                Add New listing
                            </button>
                        </>
                    )}
                </div>
            ) : (
                <div>
                    {activeStep === 0 && (
                        <AddListingAttribute
                            data={data}
                            setData={setData}
                            column={column}
                            setColumn={setColumn}
                            type="list_attribute"
                            loading={loading}
                            setLoading={setLoading}
                            page={page}
                            pageSize={pageSize}
                            total={total}
                            setPage={setPage}
                            setPageSize={setPageSize}
                            FetchData={fetchData}
                            listingIds={listingIds}
                            setListingIDs={setListingIDs}
                            handleNext={handleNext}
                            developers={developerOptions}
                            listingData={listData}
                            listData={updateData}
                            setListingData={setListData}
                        />
                        // <>Add listing attribute</>
                    )}
                    {activeStep === 1 && (
                        <AddListingAttrType
                            data={data}
                            setData={setData}
                            column={column}
                            setColumn={setColumn}
                            type="list_attr_type"
                            loading={loading}
                            setLoading={setLoading}
                            page={page}
                            pageSize={pageSize}
                            total={total}
                            setPage={setPage}
                            setPageSize={setPageSize}
                            FetchData={fetchData}
                            listingIds={listingIds}
                            setListingIDs={setListingIDs}
                            handleNext={handleNext}
                            setListingData={setListData}
                            listingData={listData}
                            listData={updateData}
                        />
                        // <>Add listing attribute type</>
                    )}
                    {activeStep === 2 && (
                        <AddListing
                            data={data}
                            listingIds={listingIds}
                            setListingIDs={setListingIDs}
                            handleNext={handleNext}
                            listingData={listData}
                            setListingData={setListData}
                            listData={updateData}
                        />
                        // <>Add listing</>
                    )}
                    {activeStep === 3 && (
                        <AddListingNearBy
                            data={data}
                            listingIds={listingIds}
                            setListingIDs={setListingIDs}
                            handleNext={handleNext}
                            listingData={listData}
                            setListingData={setListData}
                            listData={updateData}
                            handleClose={handleClose}
                            fetchSingleListing={fetchSingleListing}
                            FetchListings={FetchListings}
                        />
                        // <>Add listing nearby</>
                    )}
                    {activeStep === 4 && !updateData && (
                        <AddListingMeta
                            listingIds={listingIds}
                            setListingIDs={setListingIDs}
                            handleNext={handleNext}
                            FetchData={fetchData}
                            FetchListings={FetchListings}
                            listingData={listData}
                            setListingData={setListData}
                            allImages={allImages}
                            setAllImages={setAllImages}
                            allDocs={allDocs}
                            setAllDocs={setAllDocs}
                            listData={updateData}
                        />
                        // <>Add listing meta</>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-5">
                        {activeStep === 0 ? (
                            <div></div>
                        ) : (
                            <button
                                onClick={handleBack}
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                            >
                                Back
                            </button>
                        )}
                        {updateData && activeStep === 3 ? null : activeStep === steps.length - 1 ? null : (
                            <button
                                onClick={handleNext}
                                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark"
                            >
                                Next
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}