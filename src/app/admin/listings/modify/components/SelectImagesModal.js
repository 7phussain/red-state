"use client";
import { useState, useRef } from "react";
import { toast } from "react-toastify";
import { FaTimes, FaPlus } from "react-icons/fa";
import useApi from "@/utils/useApi";

export default function SelectImagesModal({
    fetchSingleListing,
    selectImagesModal,
    handleClose,
}) {
    const { fetchData } = useApi();
    const imagesInputRef = useRef(null);
    const [btnLoading, setBtnLoading] = useState(false);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [allImages, setAllImages] = useState([]);

    const handleSelectImage = (e) => {
        e.preventDefault();
        const file = e.target.files[0];

        if (!file) return;

        if (allImages.length >= 10) {
            toast.error("You can upload a maximum of 10 images.", {
                position: "top-right",
                autoClose: 3000,
            });
            return;
        }

        if (!file.type.startsWith("image/")) {
            toast.error("Only image files are allowed.", {
                position: "top-right",
                autoClose: 3000,
            });
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            toast.error("Image size must be under 2MB.", {
                position: "top-right",
                autoClose: 3000,
            });
            return;
        }

        const imageURL = URL.createObjectURL(file);
        setAllImages([...allImages, file]);
        setImagePreviews([...imagePreviews, imageURL]);
        e.target.value = null; // Reset input
    };

    const handleRemoveImage = (index) => {
        const updatedImages = [...allImages];
        updatedImages.splice(index, 1);

        const updatedPreviews = [...imagePreviews];
        updatedPreviews.splice(index, 1);

        setAllImages(updatedImages);
        setImagePreviews(updatedPreviews);
    };

    const handleUploadImages = async () => {
        if (allImages.length === 0) {
            toast.error("Please select at least one image.", {
                position: "top-right",
                autoClose: 3000,
            });
            return;
        }

        try {
            setBtnLoading(true);
            const token = localStorage.getItem("auth-token");

            for (let i = 0; i < allImages.length; i++) {
                const img = allImages[i];
                const formData = new FormData();
                formData.append("img_name[]", img);
                console.log(`Preparing img_name:`, img.name, img.size, img.type);

                const requestDetails = {
                    url: `/listings/${selectImagesModal?.listingId}`,
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                console.log("Request being sent:", requestDetails);
                console.log("FormData:", [...formData.entries()].map(([key, value]) => ({
                    key,
                    value: value instanceof File ? { name: value.name, size: value.size, type: value.type } : value,
                })));

                await fetchData(
                    requestDetails.url,
                    {
                        method: requestDetails.method,
                        body: formData,
                        headers: requestDetails.headers,
                    },
                    (response, success) => {
                        console.log("Upload response:", JSON.stringify(response, null, 2));
                        if (success && response.status) {
                            toast.success(`Image ${img.name} uploaded successfully`, {
                                position: "top-right",
                                autoClose: 3000,
                            });
                        } else {
                            throw new Error(
                                response?.data?.error ||
                                response?.message ||
                                JSON.stringify(response?.data || response) ||
                                `Failed to upload ${img.name}`
                            );
                        }
                    }
                );
            }

            fetchSingleListing();
            handleClose();
        } catch (error) {
            console.error("Error uploading images:", error);
            const errors = error.message.includes("errors")
                ? JSON.parse(error.message)?.errors
                : null;
            console.log("Parsed error details:", JSON.stringify(errors || error.message, null, 2));
            toast.error(
                errors
                    ? `Errors: ${Object.values(errors).flat().join(" ")}`
                    : error.message || "Something went wrong! Please try again",
                {
                    position: "top-right",
                    autoClose: 3000,
                }
            );
        } finally {
            setBtnLoading(false);
        }
    };

    const handleAddMoreImages = () => {
        if (allImages.length < 10) {
            imagesInputRef.current?.click();
        } else {
            toast.error("You can upload a maximum of 10 images.", {
                position: "top-right",
                autoClose: 3000,
            });
        }
    };

    return (
        <>
            {selectImagesModal?.isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-auto p-6 relative">
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 bg-primary text-white rounded-full p-2 hover:bg-primary-dark"
                        >
                            <FaTimes size={14} />
                        </button>

                        <h3 className="text-xl font-semibold text-primary mb-6 text-center">
                            Upload Images
                        </h3>

                        <div className="flex items-center overflow-x-auto gap-4 pb-4">
                            {allImages.length < 10 && (
                                <button
                                    onClick={handleAddMoreImages}
                                    disabled={btnLoading}
                                    className="flex items-center justify-center w-24 h-24 bg-gray-100 rounded-lg hover:bg-gray-200"
                                >
                                    <FaPlus size={20} className="text-primary" />
                                </button>
                            )}
                            {imagePreviews.map((preview, index) => (
                                <div key={index} className="relative flex-shrink-0">
                                    <img
                                        src={preview}
                                        alt={`Preview ${index}`}
                                        className="w-48 h-48 object-cover rounded-lg"
                                    />
                                    <button
                                        onClick={() => handleRemoveImage(index)}
                                        className="absolute bottom-2 right-2 bg-primary text-white rounded-full p-2 hover:bg-primary-dark"
                                    >
                                        <FaTimes size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-center mt-6">
                            <button
                                onClick={() => {
                                    if (allImages.length === 0) {
                                        imagesInputRef.current?.click();
                                    } else {
                                        handleUploadImages();
                                    }
                                }}
                                disabled={btnLoading}
                                className={`bg-primary text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-primary-dark ${btnLoading ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                            >
                                {btnLoading ? (
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    <span>{allImages.length === 0 ? "Upload" : "Submit"}</span>
                                )}
                            </button>
                        </div>

                        <input
                            type="file"
                            hidden
                            multiple
                            ref={imagesInputRef}
                            onChange={handleSelectImage}
                            accept="image/*"
                        />
                    </div>
                </div>
            )}
        </>
    );
}