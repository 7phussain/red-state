// src/app/admin/components/forms/AddListingMeta.js
"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import useApi from "@/utils/useApi";
import { FaPlus } from "react-icons/fa";
import AddImageModal from "./components/AddImageModal";

export default function AddListingMeta({
    data,
    setData,
    loading,
    setLoading,
    listingIds,
    setListingIDs,
    handleNext,
    FetchData,
    edit,
    handleClose,
    fetchSingleListing,
    listData,
    FetchListings,
    listingData,
    setListingData,
    allImages,
    setAllImages,
    allDocs,
    setAllDocs,
    updateData,
}) {
    const { fetchData } = useApi();
    const [btnLoading, setBtnLoading] = useState(false);
    const [bannerPreview, setBannerPreview] = useState(null);
    const [selectImagesModal, setSelectImagesModal] = useState({
        isOpen: false,
        gallery: null,
    });
    const [selectDocModal, setSelectDocModal] = useState({
        isOpen: false,
        docs: null,
    });

    const [listingMeta, setListingMeta] = useState({
        // new_listing_id: edit ? listData?.id : listingIds?.new_listing_id,
        // long_description: listData?.meta_tags_for_listings?.long_description || "",
        // year_build_in: listData?.meta_tags_for_listings?.year_build_in || "",
        // promo_video: listData?.meta_tags_for_listings?.promo_video || "",
        // is_featured: listData?.meta_tags_for_listings?.is_featured || 0,
        // meta_title: listData?.meta_tags_for_listings?.meta_title || "",
        // meta_keywords: listData?.meta_tags_for_listings?.meta_keywords || "",
        // meta_description:
        //     listData?.meta_tags_for_listings?.meta_description ||
        //     listingIds?.meta_description ||
        //     "",
        // banner: listData?.meta_tags_for_listings?.banner || "",
        additional_gallery: listData?.meta_tags_for_listings?.additional_gallery || [],
    });

    const handleChange = (e) => {
        setListingMeta((prev) => ({
            ...prev,
            [e.target.id]: e.target.value,
        }));
    };

    const handleCheckboxChange = (e) => {
        setListingMeta({
            ...listingMeta,
            is_featured: e.target.checked ? 1 : 0,
        });
    };

    const AddListMeta = async () => {
        setBtnLoading(true);
        const formData = new FormData();

        // Use listingData (from MultiStepForm)
        Object.keys(listingData).forEach((key) => {
            if (key === "nearby") {
                formData.append(key, JSON.stringify(listingData[key]));
            } else {
                formData.append(key, listingData[key]);
            }
        });

        // Append listingMeta fields
        Object.keys(listingMeta).forEach((key) => {
            formData.append(key, listingMeta[key]);
        });

        // Append images and docs
        if (allImages?.length > 0) {
            allImages.forEach((img) => {
                formData.append("img_name[]", img);
            });
        }

        const url = updateData
            ? `/listings/${listData?.id}`
            : `/listings`;

        try {
            await fetchData(
                url,
                {
                    method: "POST",
                    body: formData,
                },
                (response, success) => {
                    if (success) {
                        console.log("Listing added:", response);
                        toast.success(
                            `Listing ${updateData ? "updated" : "added"} successfully.`,
                            {
                                position: "top-right",
                                autoClose: 3000,
                            }
                        );

                        if (updateData) {
                            handleClose();
                            fetchSingleListing();
                            FetchListings(1);
                        } else {
                            setListingData({
                                listing_type: "",
                                property_type: "",
                                developer: "",
                                project: "",
                                bedrooms: "",
                                bathrooms: "",
                                size: "",
                                address: "",
                                area: "",
                                latlong: "",
                                location: "",
                                city: "",
                                country: "",
                                listing_status: 1,
                                is_featured: 2,
                                currency: "AED",
                                is_start_price: 2,
                                price: "",
                                handover: "",
                                listing_title: "",
                                description: "",
                                nearby: [],
                                banner_img: "",
                                promo_video: "",
                                size_unit: "sq.ft",
                                img_name: []
                            });
                            // setListingMeta({
                            //     new_listing_id: "",
                            //     long_description: "",
                            //     year_build_in: "",
                            //     promo_video: "",
                            //     is_featured: 0,
                            //     meta_title: "",
                            //     meta_keywords: "",
                            //     meta_description: "",
                            //     banner: "",
                            //     additional_gallery: [],
                            // });
                            setAllImages([]);
                            setAllDocs([]);
                            FetchListings(1);
                            handleNext();
                        }
                    } else {
                        throw new Error(response?.message || "Failed to save listing");
                    }
                }
            );
        } catch (error) {
            console.error("Error saving listing:", error);
            const errors = error.response?.data?.data;
            toast.error(
                errors
                    ? `Errors: ${Object.values(errors).flat().join(" ")}`
                    : "Something went wrong!",
                {
                    position: "top-right",
                    autoClose: 3000,
                }
            );
        } finally {
            setBtnLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-5 w-full my-5 p-5">
            <h4 className="text-primary uppercase text-center font-semibold mb-4">
                Listing IMAGES
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Left Column */}

                <div>
                    <input
                        accept="image/*"
                        style={{ display: "none" }}
                        id="banner-image-file"
                        type="file"
                        name="picture"
                        onChange={(e) => {
                            const image = e.target.files[0];
                            if (image) {
                                const reader = new FileReader();
                                reader.onload = () => {
                                    setBannerPreview(reader.result);
                                    setListingData({
                                        ...listingData,
                                        banner_img: image,
                                    });
                                };
                                reader.readAsDataURL(image);
                            }
                        }}
                    />
                    <label htmlFor="banner-image-file" className="w-full cursor-pointer">
                        <div className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark flex items-center justify-center gap-2">
                            <FaPlus />
                            Banner Image
                        </div>
                    </label>
                    {listingMeta.banner || listingData.banner_img ? (
                        <p className="text-primary mt-2 italic">Banner image selected.</p>
                    ) : null}
                    {bannerPreview && (
                        <div className="mt-2 flex justify-center">
                            <img
                                src={bannerPreview}
                                width={100}
                                height={100}
                                alt="Banner Preview"
                                className="object-cover"
                            />
                        </div>
                    )}
                </div>
                <div>
                    <button
                        type="button"
                        className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark"
                        onClick={() =>
                            setSelectImagesModal({
                                isOpen: true,
                                gallery: true,
                            })
                        }
                    >
                        Additional Images
                    </button>
                    {allImages?.length > 0 && (
                        <p className="text-primary mt-2 italic">
                            {allImages.length} images selected.
                        </p>
                    )}
                </div>
            </div>

            {selectImagesModal.isOpen && (
                <AddImageModal
                    selectImagesModal={selectImagesModal}
                    handleClose={() => setSelectImagesModal({ isOpen: false })}
                    allImages={allImages}
                    setAllImages={setAllImages}
                />
            )}

            <button
                onClick={AddListMeta}
                disabled={btnLoading}
                className={`w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark flex items-center justify-center ${btnLoading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
            >
                {btnLoading ? (
                    <svg
                        className="animate-spin h-5 w-5 text-white"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
                        />
                    </svg>
                ) : (
                    updateData ? "Update" : "Submit"
                )}
            </button>
        </div>
    );
}