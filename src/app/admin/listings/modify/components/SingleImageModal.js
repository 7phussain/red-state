"use client";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { FaShare, FaDownload, FaTrash, FaEdit, FaTimes, FaVideo } from "react-icons/fa";
import useApi from "@/utils/useApi";
// import { saveAs } from "file-saver";

export default function SingleImageModal({
    singleImageModal,
    handleClose,
    fetchSingleListing,
    FetchProperty,
    module,
    closeSingleModal,
    listing,
}) {
    console.log("single image modal:", singleImageModal);
    const { fetchData } = useApi();
    const videoFileRef = useRef();
    const [deleteBtnLoading, setDeleteBtnLoading] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef();

    const handleDelete = async () => {
        try {
            setDeleteBtnLoading(true);
            const token = localStorage.getItem("auth-token");

            if (module === "property") {
                await fetchData(
                    `/destroy/images/${singleImageModal?.listingId}?image_id=${singleImageModal?.id}`,
                    {
                        method: "DELETE",
                        headers: { Authorization: `Bearer ${token}` },
                    },
                    (response, success) => {
                        if (!success) {
                            throw new Error(
                                response?.message || JSON.stringify(response) || "Failed to delete image"
                            );
                        }
                    }
                );
            } else {
                await fetchData(
                    `/listings/${singleImageModal?.listingId}/images`,
                    {
                        method: "DELETE",
                        body: JSON.stringify({ img_ids: [singleImageModal?.img_id] }),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    },
                    (response, success) => {
                        if (!success) {
                            throw new Error(
                                response?.message || JSON.stringify(response) || "Failed to delete image"
                            );
                        }
                    }
                );
            }

            toast.success("Image deleted successfully!", {
                position: "top-right",
                autoClose: 3000,
            });

            if (module !== "property") {
                fetchSingleListing();
            } else {
                closeSingleModal();
                FetchProperty();
            }
            handleClose();
        } catch (error) {
            console.error("Error deleting image:", error);
            toast.error("Something went wrong!", {
                position: "top-right",
                autoClose: 3000,
            });
        } finally {
            setDeleteBtnLoading(false);
        }
    };

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(singleImageModal?.url);
            toast.success("Image URL copied", {
                position: "top-right",
                autoClose: 3000,
            });
        } catch (error) {
            console.error("Error copying URL:", error);
            toast.error("Failed to copy URL!", {
                position: "top-right",
                autoClose: 3000,
            });
        }
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <>
            {singleImageModal?.isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="fixed inset-0 bg-black/50" onClick={handleClose}></div>
                    <div className="relative z-10">
                        <img
                            src={singleImageModal?.url}
                            alt="Selected media"
                            className="max-h-[90vh] max-w-[90vw] object-contain"
                        />
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 bg-gray-400 text-white rounded-full p-2 hover:bg-gray-500"
                        >
                            <FaTimes size={16} />
                        </button>
                        <div className="absolute bottom-4 right-4 flex items-center space-x-2">
                            {module !== "property" && (
                                <>
                                    <button
                                        onClick={handleCopyLink}
                                        className="bg-primary text-white p-2 rounded-full hover:bg-primary-dark"
                                        title="Copy Link"
                                    >
                                        <FaShare size={16} />
                                    </button>
                                </>
                            )}
                            {/* {module === "property" && hasPermission("property_delete_img") && ( */}
                            {module === "property" && (
                                <button
                                    onClick={handleDelete}
                                    className="bg-primary text-white p-2 rounded-full hover:bg-primary-dark"
                                    title="Delete"
                                >
                                    {deleteBtnLoading ? (
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        <FaTrash size={16} />
                                    )}
                                </button>
                            )}
                            {module !== "property" && singleImageModal?.video && (
                                <>
                                    <input
                                        accept="video/mp4"
                                        className="hidden"
                                        id="promo-video-file"
                                        type="file"
                                        ref={videoFileRef}
                                        onChange={handleUpdateVideo}
                                    />
                                    <label htmlFor="promo-video-file">
                                        <button
                                            className="bg-primary text-white p-2 rounded-full hover:bg-primary-dark"
                                            title="Edit Video"
                                        >
                                            {deleteBtnLoading ? (
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            ) : (
                                                <FaEdit size={16} />
                                            )}
                                        </button>
                                    </label>
                                </>
                            )}
                            {/* {module !== "property" && singleImageModal?.img_id && hasPermission("delete_listing_img") && ( */}
                            {module !== "property" && singleImageModal?.img_id && (
                                <button
                                    onClick={handleDelete}
                                    className="bg-primary text-white p-2 rounded-full hover:bg-primary-dark"
                                    title="Delete"
                                >
                                    {deleteBtnLoading ? (
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        <FaTrash size={16} />
                                    )}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}