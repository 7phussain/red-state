"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { BsChatDots, BsPin, BsTrash } from "react-icons/bs";
import useApi from "@/utils/useApi";
import dynamic from "next/dynamic";

const IMG_BASE_URL = process.env.NEXT_PUBLIC_IMG_BASE_URL;
const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

// Dynamically import Google Maps components to avoid SSR issues
const LoadScript = dynamic(() => import("@react-google-maps/api").then((mod) => mod.LoadScript), { ssr: false });
const GoogleMap = dynamic(() => import("@react-google-maps/api").then((mod) => mod.GoogleMap), { ssr: false });
const Marker = dynamic(() => import("@react-google-maps/api").then((mod) => mod.Marker), { ssr: false });

export default function Nearbies() {
  const router = useRouter();
  const { fetchData } = useApi();

  const [nearbies, setNearbies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, id: null, name: "" });
  const [isDeleting, setIsDeleting] = useState(false);
  const [mapError, setMapError] = useState(null);

  const fetchNearbies = async () => {
    try {
      setLoading(true);
      const endpoint = `/nearby`;
      await fetchData(
        endpoint,
        {
          method: "GET",
        },
        (response, success) => {
          console.log("Fetch response:", response);
          if (success && response?.data?.data) {
            setNearbies(response.data.data);
            console.log("nearbies:", response.data.data);
            // Set first location as default if available
            if (response.data.data.length > 0) {
              setSelectedLocation(response.data.data[0]);
              console.log("Default selected location:", response.data.data[0]);
            }
          } else {
            toast.error(response?.message || "Failed to fetch nearby locations", {
              position: "top-right",
              autoClose: 3000,
            });
          }
        }
      );
    } catch (error) {
      console.error("Error fetching nearby locations:", error);
      toast.error(
        error.response?.data?.message ||
        error.message ||
        "Something went wrong!",
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNearbies();
  }, []);

  // Log API key for debugging
  useEffect(() => {
    console.log("GOOGLE_MAPS_API_KEY:", GOOGLE_MAPS_API_KEY ? "Present" : "Missing");
  }, []);

  const parseLatLong = (latlong) => {
    if (!latlong) {
      console.warn("No latlong provided, using default");
      return null;
    }
    const [lat, lng] = latlong.split(",").map(Number);
    if (isNaN(lat) || isNaN(lng)) {
      console.warn(`Invalid latlong: ${latlong}`);
      return null;
    }
    return { lat, lng };
  };

  const handleSelectLocation = (nearby) => {
    console.log("Selected location:", nearby);
    setSelectedLocation(nearby);
  };

  const handleEdit = (id) => {
    router.push(`/admin/nearbies/edit/${id}`);
  };

  const handleDelete = async (e, id) => {
    e.preventDefault();
    if (!id) return;

    try {
      setIsDeleting(true);
      await fetchData(
        `/nearby/${id}`,
        {
          method: "DELETE",
        },
        (response, success) => {
          console.log("Delete response:", response);
          if (success) {
            toast.success(response.message || "Location deleted successfully", {
              position: "top-right",
              autoClose: 3000,
            });
            const updatedNearbies = nearbies.filter((n) => n.id !== id);
            setNearbies(updatedNearbies);
            setDeleteConfirm({ open: false, id: null, name: "" });
            if (selectedLocation?.id === id) {
              // Select first remaining location or clear
              setSelectedLocation(updatedNearbies.length > 0 ? updatedNearbies[0] : null);
              console.log("Post-delete selected location:", updatedNearbies.length > 0 ? updatedNearbies[0] : null);
            }
          } else {
            throw new Error(response?.message || "Failed to delete location");
          }
        }
      );
    } catch (error) {
      console.error("Error deleting location:", error);
      toast.error(
        error.response?.data?.message ||
        error.message ||
        "Something went wrong!",
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const openDeleteConfirm = (id, name) => {
    setDeleteConfirm({ open: true, id, name });
  };

  const closeDeleteConfirm = () => {
    setDeleteConfirm({ open: false, id: null, name: "" });
  };

  const HandleSingleNearby = (id) => {
    router.push(`/admin/nearbies/${id}`);
  };

  const mapStyles = {
    height: "100%",
    width: "100%",
  };

  return (
    <>
      <div className="fixed h-[50vh] w-[100vw] md:h-[100vh] top-0 left-0 flex items-center justify-center">
        {GOOGLE_MAPS_API_KEY && (
          <LoadScript
            googleMapsApiKey={GOOGLE_MAPS_API_KEY}
            onLoad={() => console.log("Google Maps script loaded")}
            onError={(error) => {
              console.error("LoadScript error:", error);
              setMapError("Failed to load Google Maps");
            }}
          >
            <GoogleMap
              mapContainerStyle={mapStyles}
              center={selectedLocation ? parseLatLong(selectedLocation.latlong) || parseLatLong(nearbies[0]?.latlong) : parseLatLong(nearbies[0]?.latlong)}
              zoom={13}
              options={{
                disableDefaultUI: false,
                zoomControl: true,
              }}
              onLoad={() => console.log("GoogleMap component loaded")}
              onError={(error) => {
                console.error("GoogleMap error:", error);
                setMapError("Failed to render map");
              }}
            >
              {selectedLocation && parseLatLong(selectedLocation.latlong) && (
                <Marker position={parseLatLong(selectedLocation.latlong)} />
              )}
            </GoogleMap>
          </LoadScript>
        )}
      </div>
      <div className="md:hidden fixed md:relative h-[50vh] md:h-full top-1/2 md:top-none left-0 md:left-none w-full flex flex-col gap-4 p-5 overflow-y-scroll overflow-x-hidden">
        <div className="z-1 hidden md:flex w-fit !bg-white rounded-xl flex items-center gap-4 z-1 px-5 py-4"
          style={{
            background: "linear-gradient(to bottom left, rgba(202, 30, 46, 0.6), rgba(202, 30, 46, 0.2), rgba(202, 30, 46, 0.6)"
          }}
        >
          <div className="text-primary">
            <BsPin size={30} />
          </div>
          <h4 className="text-lg font-semibold">
            Locations
          </h4>
        </div>
        {/* Results */}
        {loading ? (
          <p className="text-center py-10">Loading...</p>
        ) : nearbies.length > 0 ? (
          <>
            <div className="col-span-1 grid grid-cols-1 gap-4 z-1">
              {nearbies.map((nearby, index) => (
                <div
                  key={index}
                  className={`cursor-pointer rounded-xl overflow-hidden shadow-sm p-4 ${selectedLocation?.id === nearby.id
                    ? "bg-primary text-white shadow-md"
                    : "bg-white text-black"
                    }`}
                  onClick={() => handleSelectLocation(nearby)}
                >
                  <div className="flex flex-col gap-3">
                    <div className={`text-base font-bold ${selectedLocation?.id === nearby.id ? "text-white" : "text-primary"}`}>
                      {nearby.name}
                    </div>
                    <div className="grid grid-cols-7 items-center gap-2">
                      <BsPin
                        size={14}
                        className={selectedLocation?.id === nearby.id ? "text-white" : "text-primary"}
                      />
                      <p className="col-span-6">
                        {nearby.area} - {nearby.city} - {nearby.country}
                      </p>
                    </div><div className="grid grid-cols-7 items-center gap-2">
                      <BsChatDots
                        size={14}
                        className={selectedLocation?.id === nearby.id ? "text-white" : "text-primary"}
                      />
                      <p className="col-span-6">
                        {nearby?.notes}
                      </p>
                    </div>
                    <div className="w-full flex items-center justify-end gap-2 z-2">
                      <button
                        onClick={() => openDeleteConfirm(nearby.id, nearby.name)}
                        className={`p-2 rounded-full cursor-pointer ${selectedLocation?.id === nearby.id ? "border-white bg-white text-primary hover:shadow-md" : "text-white bg-primary hover:shadow-md"
                          }`}
                        title="Delete"
                      >
                        <BsTrash size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="text-center py-10">No locations found</p>
        )}
      </div>
      {/* DESKTOP */}
      <div className="hidden md:flex">
        <div className="z-1 flex w-fit h-fit !bg-white rounded-xl flex items-center gap-4 z-1 px-5 py-4"
          style={{
            background: "linear-gradient(to bottom left, rgba(202, 30, 46, 0.6), rgba(202, 30, 46, 0.2), rgba(202, 30, 46, 0.6)"
          }}
        >
          <div className="text-primary">
            <BsPin size={30} />
          </div>
          <h4 className="text-lg font-semibold">
            Locations
          </h4>
        </div>

        {/* Results */}
        {loading ? (
          <p className="text-center py-10">Loading...</p>
        ) : nearbies.length > 0 ? (
          <>
            <div className="flex md:grid md:grid-cols-3 md:gap-4">
              <div className="col-span-2"></div>
              <div className="col-span-1 grid grid-cols-1 gap-4 z-1">
                {nearbies.map((nearby, index) => (
                  <div
                    key={index}
                    className={`cursor-pointer rounded-xl overflow-hidden shadow-sm p-4 ${selectedLocation?.id === nearby.id
                      ? "bg-primary text-white shadow-md"
                      : "bg-white text-black"
                      }`}
                    onClick={() => handleSelectLocation(nearby)}
                  >
                    <div className="flex flex-col gap-3">
                      <div className={`text-base font-bold ${selectedLocation?.id === nearby.id ? "text-white" : "text-primary"}`}>
                        {nearby.name}
                      </div>
                      <div className="grid grid-cols-7 items-center gap-2">
                        <BsPin
                          size={14}
                          className={selectedLocation?.id === nearby.id ? "text-white" : "text-primary"}
                        />
                        <p className="col-span-6">
                          {nearby.area} - {nearby.city} - {nearby.country}
                        </p>
                      </div><div className="grid grid-cols-7 items-center gap-2">
                        <BsChatDots
                          size={14}
                          className={selectedLocation?.id === nearby.id ? "text-white" : "text-primary"}
                        />
                        <p className="col-span-6">
                          {nearby?.notes}
                        </p>
                      </div>
                      <div className="w-full flex items-center justify-end gap-2 z-2">
                        <button
                          onClick={() => openDeleteConfirm(nearby.id, nearby.name)}
                          className={`p-2 rounded-full cursor-pointer ${selectedLocation?.id === nearby.id ? "border-white bg-white text-primary hover:shadow-md" : "text-white bg-primary hover:shadow-md"
                            }`}
                          title="Delete"
                        >
                          <BsTrash size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <p className="text-center py-10">No locations found</p>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-[32px] w-full max-w-[80vw] min-w-[50vw] max-h-[90vh] p-6">
            <div className="flex flex-col gap-5 justify-center items-center">
              <BsTrash size={50} className="text-red-600" />
              <h1 className="font-semibold text-lg text-center flex flex-wrap items-center gap-2">
                <span>Do you really want to delete this location</span>
                <span className="bg-primary text-white px-3 py-2 rounded-xl">
                  {deleteConfirm.name}
                </span>
                <span>?</span>
              </h1>

              <form onSubmit={(e) => handleDelete(e, deleteConfirm.id)} className="w-full">
                <div className="p-5 flex flex-col w-full gap-5">
                  <div className="flex items-center justify-center gap-4">
                    <button
                      type="submit"
                      disabled={isDeleting}
                      className={`bg-primary text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-primary-dark ${isDeleting ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    >
                      {isDeleting ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <span>Confirm</span>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={closeDeleteConfirm}
                      className="bg-transparent border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}