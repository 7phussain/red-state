"use client";
import { useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import { CiCirclePlus } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import { selectStylesFilter } from "@/app/_components/selectStyles";
import { currencies, listing_options } from "@/app/_components/selectOptions";

export default function AddListing({
    listData,
    listingIds,
    setListingIDs,
    handleNext,
    listingData,
    setListingData,
}) {
    console.log("list data:", listingData);

    const [bannerPreview, setBannerPreview] = useState(null);

    const handleChange = (e) => {
        setListingData((prev) => ({
            ...prev,
            [e.target.id]: e.target.value,
        }));
    };

    return (
        <div className="flex flex-col gap-5 w-full my-5 p-5">
            <h4 className="text-primary uppercase text-center font-semibold mb-4">
                Add Listing
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Left Column */}
                <div className="flex flex-col gap-6">
                    <div className="relative">
                        <label htmlFor="listing_title" >
                            Title
                        </label>
                        <input
                            id="listing_title"
                            type="text"
                            className="input-filter w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                            placeholder="Listing Title"
                            value={listingData?.listing_title || ""}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="relative">
                        <label htmlFor="description" >
                            Description
                        </label>
                        <textarea
                            id="description"
                            className="input-filter w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                            placeholder="Description"
                            value={listingData?.description || ""}
                            onChange={handleChange}
                            rows={5}
                            required
                        />
                    </div>

                    {!listData && (
                        <div className="flex flex-col items-center gap-5">
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
                                <div
                                    className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark flex items-center justify-center gap-2"
                                >
                                    <FaPlus />
                                    Banner Image
                                </div>
                            </label>
                            {listingData?.banner_img && (
                                <p className="italic text-center">Banner image selected.</p>
                            )}
                            {bannerPreview && (
                                <div className="rounded-lg border">
                                    <img
                                        src={bannerPreview}
                                        width={200}
                                        height={200}
                                        alt="Banner Preview"
                                        className="object-cover"
                                    />
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Right Column */}
                <div className="flex flex-col gap-6">
                    <div className="relative">
                        <label htmlFor="type">Listing type</label>
                        <Select
                            id="type"
                            value={
                                listing_options().find(
                                    (option) =>
                                        option.value?.toLowerCase() ===
                                        listingData?.listing_type?.toLowerCase()
                                ) || { value: "", label: "Select Listing Type" }
                            }
                            onChange={(e) =>
                                setListingData({ ...listingData, listing_type: e.value })
                            }
                            options={listing_options()}
                            placeholder="Select Listing Type"
                            className="w-full"
                            styles={selectStylesFilter}
                        />
                    </div>

                    <div className="flex items-center justify-center gap-5">
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={listingData?.listing_status == 1}
                                onChange={() =>
                                    setListingData({
                                        ...listingData,
                                        listing_status: listingData?.listing_status == 1 ? 2 : 1,
                                    })
                                }
                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                            />
                            Status
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={listingData?.is_featured == 1}
                                onChange={() =>
                                    setListingData({
                                        ...listingData,
                                        is_featured: listingData?.is_featured == 1 ? 2 : 1,
                                    })
                                }
                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                            />
                            Is Featured
                        </label>
                    </div>

                    <div className="grid grid-cols-3 gap-5">
                        <div className="relative">
                            <label htmlFor="currency">Currency</label>
                            <Select
                                id="currency"
                                value={
                                    currencies().find(
                                        (curr) => curr.value === listingData?.currency
                                    ) || { value: "", label: "Currency" }
                                }
                                onChange={(e) =>
                                    setListingData({ ...listingData, currency: e.value })
                                }
                                options={currencies()}
                                placeholder="Currency"
                                className="w-full"
                                styles={selectStylesFilter}
                            />
                        </div>
                        <div className="relative col-span-2">
                            <label htmlFor="price" >
                                Price
                            </label>
                            <input
                                id="price"
                                type="number"
                                className="input-filter w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                                placeholder="Price"
                                value={listingData?.price || ""}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-center gap-5">
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={listingData?.is_start_price == 1}
                                onChange={() =>
                                    setListingData({
                                        ...listingData,
                                        is_start_price: listingData?.is_start_price == 1 ? 2 : 1,
                                    })
                                }
                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                            />
                            Is Start Price
                        </label>
                    </div>
                </div>
            </div>

            {/* Next Button */}
            {/* <div className="flex justify-end mt-5">
                <button
                    onClick={handleNext}
                    className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark"
                >
                    Next
                </button>
            </div> */}
        </div >
    );
}