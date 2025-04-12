// src/app/admin/components/forms/AddImageModal.js
"use client";
import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { PiX, PiPlus } from "react-icons/pi";

export default function AddImageModal({
    selectImagesModal,
    handleClose,
    allImages,
    setAllImages,
}) {
    const imagesInputRef = useRef(null);
    const [imagePreviews, setImagePreviews] = useState([]);

    useEffect(() => {
        // Generate previews for allImages
        if (allImages?.length > 0) {
            const previews = allImages.map((file) =>
                typeof file === "string" ? file : URL.createObjectURL(file)
            );
            setImagePreviews(previews);
        } else {
            setImagePreviews([]);
        }
    }, [allImages]);

    const handleSelectImages = (e) => {
        e.preventDefault();
        const selectedFiles = [...e.target.files];

        if (selectedFiles.length + allImages.length > 5) {
            toast.error("You can upload a maximum of 5 images.", {
                position: "top-right",
                autoClose: 3000,
            });
            return;
        }

        setAllImages([...allImages, ...selectedFiles]);
    };

    const handleRemoveImage = (index) => {
        const updatedImages = [...allImages];
        updatedImages.splice(index, 1);

        const updatedPreviews = [...imagePreviews];
        updatedPreviews.splice(index, 1);

        setAllImages(updatedImages);
        setImagePreviews(updatedPreviews);
    };

    return (
        <div
            className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 ${selectImagesModal?.isOpen ? "block" : "hidden"
                }`}
        >
            <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-auto relative">
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 bg-primary text-white rounded-full p-2 hover:bg-primary-dark"
                >
                    <PiX size={14} />
                </button>
                <div className="flex flex-col gap-5 p-5">
                    <h3 className="text-lg font-semibold text-primary">Upload Images</h3>

                    <div className="flex flex-wrap items-center gap-5">
                        {imagePreviews?.map((preview, index) => (
                            <div key={index} className="relative w-[100px] h-[100px]">
                                <img
                                    src={preview}
                                    alt={`Preview ${index}`}
                                    className="w-[100px] h-[100px] rounded border object-cover"
                                />
                                <button
                                    className="absolute bottom-1 right-1 bg-primary rounded-full p-1"
                                    onClick={() => handleRemoveImage(index)}
                                >
                                    <PiX size={12} color="#ffffff" />
                                </button>
                            </div>
                        ))}
                        {allImages?.length < 5 && (
                            <button
                                onClick={() => imagesInputRef.current?.click()}
                                className="w-[100px] h-[100px] border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100"
                            >
                                <PiPlus size={24} className="text-gray-500" />
                            </button>
                        )}
                    </div>

                    <div className="flex justify-center">
                        <button
                            onClick={() => {
                                if (allImages?.length === 0) {
                                    imagesInputRef.current?.click();
                                } else {
                                    handleClose();
                                }
                            }}
                            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark"
                        >
                            {allImages?.length === 0 ? "Upload Images" : "Select"}
                        </button>
                    </div>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        hidden
                        ref={imagesInputRef}
                        onChange={handleSelectImages}
                    />
                </div>
            </div>
        </div>
    );
}