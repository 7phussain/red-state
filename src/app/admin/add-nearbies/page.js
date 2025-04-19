"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { BsPinAngle } from "react-icons/bs";
import HeadingTitle from "@/app/_components/HeadingTitle";
import useApi from "@/utils/useApi";
import ListingLocation from "../components/forms/components/ListingLocation";

export default function AddNearby() {
  const router = useRouter();
  const { fetchData } = useApi();

  const initialNearByData = {
    name: "",
    area: "",
    city: "",
    country: "",
    notes: "",
  };
  const initialListingLocation = {
    lat: 0,
    lng: 0,
    addressText: "",
    city: "",
    country: "",
  };

  const [nearByData, setNearByData] = useState(initialNearByData);
  const [listingLocation, setListingLocation] = useState(
    initialListingLocation
  );
  const [loading, setLoading] = useState(false);

  // Log state changes
  useEffect(() => {
    console.log("nearByData:", nearByData);
  }, [nearByData]);

  useEffect(() => {
    console.log("listingLocation:", listingLocation);
  }, [listingLocation]);

  useEffect(() => {
    console.log("Syncing listingLocation:", listingLocation);
    setNearByData((prev) => ({
      ...prev,
      city: listingLocation.city || prev.city,
      country: listingLocation.country || prev.country,
    }));
  }, [listingLocation.city, listingLocation.country]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    console.log(`Input change: ${id} = ${value}`);
    setNearByData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const resetForm = () => {
    console.log("Resetting form and location");
    setNearByData(initialNearByData);
    setListingLocation(initialListingLocation);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit called with:", { nearByData, listingLocation });

    // Validate required fields
    if (
      !nearByData.name ||
      !nearByData.area ||
      !nearByData.city ||
      !nearByData.country
    ) {
      console.log("Validation failed: Missing required fields", nearByData);
      toast.error(
        "Please fill all required fields (Name, Area, City, Country)",
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
      return;
    }

    if (
      !listingLocation.lat ||
      !listingLocation.lng ||
      listingLocation.lat === 0 ||
      listingLocation.lng === 0
    ) {
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
      console.log("Attempting fetchData with FormData...");
      await fetchData(
        "/nearby",
        {
          method: "POST",
          body: formData,
        },
        (response, status) => {
          console.log("fetchData response:", response);
          if (status && response?.nearby) {
            console.log("Near by location added:", response);
            toast.success("Location Added Successfully", {
              position: "top-right",
              autoClose: 3000,
            });
            resetForm();
          } else {
            console.log("API failure response:", response);
            throw new Error(response?.message || "Failed to add location");
          }
        }
      );
    } catch (error) {
      console.error("fetchData error:", error);
      toast.error(error.message || "Unable to add location", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <HeadingTitle
        title={"Add Nearby Location"}
        icon={<BsPinAngle size={30} />}
      />

      <form onSubmit={handleSubmit} className="space-y-6 py-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Left Column: Form Inputs */}
          <div className="flex flex-col gap-6">
            <div className="relative">
              <label htmlFor="name">Location Name *</label>
              <input
                id="name"
                type="text"
                className="input-filter w-full"
                value={nearByData.name}
                onChange={handleChange}
                placeholder="Location Name"
                required
              />
            </div>

            <div className="relative">
              <label htmlFor="area">Area *</label>
              <input
                id="area"
                type="text"
                className="input-filter w-full"
                value={nearByData.area}
                onChange={handleChange}
                placeholder="Area"
                required
              />
            </div>

            <div className="relative">
              <label htmlFor="city">City *</label>
              <input
                id="city"
                type="text"
                className="input-filter w-full"
                value={nearByData.city}
                onChange={handleChange}
                placeholder="City"
                required
              />
            </div>

            <div className="relative">
              <label htmlFor="country">Country *</label>
              <input
                id="country"
                type="text"
                className="input-filter w-full"
                value={nearByData.country}
                onChange={handleChange}
                placeholder="Country"
                required
              />
            </div>

            <div className="relative">
              <label htmlFor="notes">Notes</label>
              <textarea
                id="notes"
                className="input-filter w-full"
                value={nearByData.notes}
                onChange={handleChange}
                placeholder="Notes"
                rows={4}
              />
            </div>
          </div>

          {/* Right Column: ListingLocation */}
          <div className="flex flex-col gap-5">
            <div className="relative">
              <ListingLocation
                listingLocation={listingLocation}
                currLocByDefault={true}
                setListingLocation={setListingLocation}
                required
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={resetForm}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-dark flex items-center gap-2 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Add Location"
            )}
          </button>
        </div>
      </form>
    </>
  );
}
