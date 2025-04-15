"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import useApi from "@/utils/useApi";
import HeadingTitle from "@/app/_components/HeadingTitle";
import { BsDatabase, BsArrowLeft, BsDatabaseAdd } from "react-icons/bs";

const BACKEND_URL = process.env.NEXT_PUBLIC_BASE_URL;
const IMG_BASE_URL = process.env.NEXT_PUBLIC_IMG_BASE_URL;

export default function AddDeveloper() {
    const router = useRouter();
    const { fetchData } = useApi();
    const [formData, setFormData] = useState({
        developerName: "",
        description: "",
        longDescription: "",
    });
    const [logoFile, setLogoFile] = useState(null);
    const [logoPreview, setLogoPreview] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const fileInputRef = useRef(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear error for this field on change
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const handleLogoSelect = (e) => {
        const file = e.target.files[0];
        if (!file) return;

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

        setLogoFile(file);
        setLogoPreview(URL.createObjectURL(file));
        setErrors((prev) => ({ ...prev, logo: "" }));
        e.target.value = null; // Reset input
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.developerName.trim()) {
            newErrors.developerName = "Developer name is required";
        }
        if (!formData.longDescription.trim()) {
            newErrors.longDescription = "Long description is required";
        }
        if (!logoFile) {
            newErrors.logo = "Logo is required";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            toast.error("Please fill all required fields.", {
                position: "top-right",
                autoClose: 3000,
            });
            return;
        }

        try {
            setIsSubmitting(true);
            const data = new FormData();
            data.append("developerName", formData.developerName);
            data.append("description", formData.description);
            data.append("longDescription", formData.longDescription);
            data.append("logo", logoFile);

            console.log("Submitting FormData:", [...data.entries()].map(([key, value]) => ({
                key,
                value: value instanceof File ? { name: value.name, size: value.size, type: value.type } : value,
            })));

            await fetchData(
                "/developers",
                {
                    method: "POST",
                    body: data,
                },
                (response, success) => {
                    console.log("Add developer response:", response);
                    if (success) {
                        toast.success(response.message || "Developer added successfully", {
                            position: "top-right",
                            autoClose: 3000,
                        });
                        router.push("/admin/developers");
                    } else {
                        throw new Error(response?.message || "Failed to add developer");
                    }
                }
            );
        } catch (error) {
            console.error("Error adding developer:", error);
            toast.error(
                error.message || "Something went wrong! Please try again",
                {
                    position: "top-right",
                    autoClose: 3000,
                }
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col gap-5">
            <HeadingTitle
                icon={<BsDatabaseAdd size={30} />}
                title="Add New Developer"
            />

            <form onSubmit={handleSubmit} className="py-5 my-5 grid grid-cols-1 grid-cols-2 gap-5">
                <div className="flex flex-col gap-5">
                    {/* Developer Name */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="developerName">
                            Developer Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="developerName"
                            name="developerName"
                            value={formData.developerName}
                            onChange={handleInputChange}
                            className={`input-filter w-full`}
                            placeholder="Enter developer name"
                        />
                        {errors.developerName && (
                            <p className="text-red-500 text-sm">{errors.developerName}</p>
                        )}
                    </div>

                    {/* Logo Upload */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700">
                            Logo <span className="text-red-500">*</span>
                        </label>
                        <div className="w-full flex items-center justify-center gap-4">
                            {logoPreview ? (
                                <div className="relative">
                                    <img
                                        src={logoPreview}
                                        alt="Logo preview"
                                        className="w-32 h-32 object-contain rounded-lg"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setLogoFile(null);
                                            setLogoPreview(null);
                                            setErrors((prev) => ({ ...prev, logo: "" }));
                                        }}
                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200"
                                >
                                    <span className="text-gray-500">Upload Logo</span>
                                </button>
                            )}
                        </div>
                        {errors.logo && (
                            <p className="text-red-500 text-sm">{errors.logo}</p>
                        )}
                        <input
                            type="file"
                            hidden
                            ref={fileInputRef}
                            onChange={handleLogoSelect}
                            accept="image/*"
                        />
                    </div>

                </div>
                <div className="flex flex-col gap-5">
                    {/* Description */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="description" className="text-sm font-medium text-gray-700">
                            Short Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows={1}
                            className={`input-filter w-full`}
                            placeholder="Enter a short description"
                        />
                    </div>

                    {/* Long Description */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="longDescription" className="text-sm font-medium text-gray-700">
                            Long Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            id="longDescription"
                            name="longDescription"
                            value={formData.longDescription}
                            onChange={handleInputChange}
                            rows={6}
                            className={`input-filter w-full`}
                            placeholder="Enter a detailed description"
                        />
                        {errors.longDescription && (
                            <p className="text-red-500 text-sm">{errors.longDescription}</p>
                        )}
                    </div>
                </div>
                {/* Buttons */}
                <div className="col-span-2 flex items-center justify-end gap-4 mt-5">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`bg-primary text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-primary-dark ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                    >
                        {isSubmitting ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            <span>Add Developer</span>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}