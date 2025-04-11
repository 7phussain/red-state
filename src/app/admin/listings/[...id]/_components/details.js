import React, { useState, useEffect } from "react";
import { LuBedDouble, LuBath, LuMapPin, LuScale3D } from "react-icons/lu";
import GoogleMaps from "@/app/_components/map";
import useApi from "@/utils/useApi";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { Link } from "next/link";
import { useRouter } from "next/navigation";


const Details = ({ propertyDetails }) => {
  const router = useRouter();
  const { listing_attribute, meta_tags_for_listings, listing_attribute_type } =
    propertyDetails;

  const overview = [
    {
      key: "bed",
      icon: <LuBedDouble size={18} />,
      title: propertyDetails?.bedrooms,
    },
    {
      key: "bath",
      icon: <LuBath size={18} />,
      title: propertyDetails?.bathrooms,
    },
    {
      key: "size",
      icon: <LuScale3D size={18} />,
      title: propertyDetails?.size ? `${propertyDetails?.size} ${propertyDetails?.size_unit}` : null,
    },
    {
      key: "location",
      icon: <LuMapPin size={18} />,
      title: propertyDetails?.area || propertyDetails?.address,
    },
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    developer: "",
    project: "",
    bedrooms: "",
    leadType: "",
    leadFor: "Investment",
    note: "",
  });

  const { fetchData } = useApi();
  const [error, setError] = useState({ phone: "" });
  const [developerDetails, setDeveloperDetails] = useState(null);

  const validatePhone = (value) => {
    const phoneNumber = parsePhoneNumberFromString(value, "US"); // Change "US" for different country codes
    if (!phoneNumber || !phoneNumber.isValid()) {
      setError((pre) => ({ ...pre, phone: "Invalid phone number" }));
    } else {
      setError((pre) => ({ ...pre, phone: "" }));
    }
    setFormData((pre) => ({ ...pre, phone: value }));
  };

  // Fetch Developer Details if developer_id exists
  useEffect(() => {
    if (propertyDetails?.developer_id) {
      // Fetch developer details using developer_id
      fetchData(`/developers/${propertyDetails.developer_id}`, { method: "GET" }, (res, status) => {
        if (status && res?.data) {
          setDeveloperDetails({
            id: res.data.id,
            logo: res.data.logo,
          });
        }
      });
    } else if (propertyDetails?.developer) {
      // Fetch developer details by searching with developer name
      fetchData(`/developers?developerName=${encodeURIComponent(propertyDetails.developer)}`, { method: "GET" }, (res, status) => {
        // console.log("DEV RESPONSE: ", res);
        if (status && res?.data?.developers?.length) {
          setDeveloperDetails({
            id: res.data?.developers[0].id, // Assuming the first match is the correct developer
            logo: res.data?.developers[0].logo,
          });
        }
      });
    }
  }, [propertyDetails?.developer_id, propertyDetails?.developer]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (error.phone) {
      return;
    }

    const getUserIP = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
      } catch (err) {
        return null;
      }
    };

    const ip = await getUserIP();
    const deviceType = navigator.userAgent;
    const fullUrl = window.location.href;

    const data = {
      leadName: formData.name,
      leadContact: formData.phone,
      leadEmail: formData.email,
      developer: formData?.developer || propertyDetails?.developer,
      project: formData?.project || propertyDetails?.project,
      projectName: formData?.project || propertyDetails?.project,
      enquiryType: formData?.bedrooms || propertyDetails?.bedrooms,
      leadType: formData.leadType || propertyDetails?.property_type,
      leadFor: formData.leadFor,
      notes: `User Note: ${formData.note}`,
      ip: ip,
      device: deviceType,
      filename: fullUrl
    };

    try {
      await fetchData(
        "/create-lead",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          data: data, // Send FormData directly
        },
        (response, status) => {
          console.log('API Response:', response);
          console.log('API Error Details:', response?.data);

          if (status) {
            setFormData({
              name: "",
              email: "",
              phone: "",
              developer: "",
              project: "",
              bedrooms: "",
              leadType: "",
              leadFor: "Investment",
              note: "",
            });
            alert("Form submitted successfully!");
          } else {
            alert("Error submitting form!");
          }
        }
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6 px-[30px] md:px-[50px] lg:px-[70px] xl:px-[100px]">
        <div className={`col-span-1 lg:col-span-2 flex flex-col gap-5`}>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary">
            {propertyDetails?.listing_title}
          </h3>
          <p className="text-secondary mb-5">{propertyDetails?.description}</p>

          {/* OVERVIEW */}
          <div className="flex flex-col gap-3 mb-5">
            <h3 className="text-xl font-semibold text-primary">Overview</h3>
            <div className="p-5"
              style={{
                gap: "40px",
                borderRadius: "16px",
                borderWidth: "1px",
                border: "1px solid rgba(240, 240, 240, 1)"
              }}
            >
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
                {overview?.map((item, ind) => {
                  return (
                    <div
                      key={ind}
                      className={`text-primary font-semibold flex gap-3 items-center ${item?.key === "location" && "lg:col-span-3"}`}
                    >
                      <span>{item?.icon}</span>
                      <span>{item?.title}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* NEARBY */}
          <div className="flex flex-col gap-3 mb-5">
            <h3 className="text-xl font-semibold text-primary">Nearby Locations</h3>
            <div className="p-5"
              style={{
                gap: "40px",
                borderRadius: "16px",
                borderWidth: "1px",
                border: "1px solid rgba(240, 240, 240, 1)"
              }}
            >
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
                {propertyDetails?.nearby?.map((near, ind) => {
                  return (
                    <div
                      key={ind}
                      className={`text-gray-500 w-full flex items-center text-center`}
                    >
                      {near?.name}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* LOCATION */}
          <div className="flex flex-col gap-5 mb-5">
            <h3 className="text-xl font-semibold text-primary">Location</h3>
            <div className="w-full h-[400px] relative">
              <GoogleMaps
                lat={propertyDetails?.latlong?.split(",")[0]}
                lon={propertyDetails?.latlong?.split(",")[1]}
              />
            </div>
          </div>

        </div>
        <div className="col-span-1 w-full flex flex-col">
          <div className="p-5 w-fit lg:w-full"
            style={{
              gap: "40px",
              borderRadius: "16px",
              borderWidth: "1px",
              border: "1px solid rgba(240, 240, 240, 1)"
            }}
          >
            <div className="text-2xl md:text-3xl lg:text-4xl font-semibold text-primary">
              {propertyDetails?.is_start_price === 1 && (
                <h3 className="">
                  Starting from
                </h3>
              )}
              <h3>
                {propertyDetails?.currency}
                {" "}
                {propertyDetails?.price}
              </h3>
            </div>
          </div>
          {/* DEVELOPER PROFILE */}
          {developerDetails && (
            <div className="flex flex-col items-center justify-center p-5">
              <img
                src={`${process.env.NEXT_PUBLIC_BASE_URL.slice(0, -3)}${developerDetails?.logo}`}
                alt={`REDESTATE ${developerDetails?.name}`}
                className="w-[200px] h-[200px] object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/no_image.png";
                }}
              />
              <div
                onClick={() => router.push(`/developers/${developerDetails?.id || 2}`)}
                className="border border-primary w-full text-primary py-3 rounded-full text-center cursor-pointer hover:bg-primary hover:text-white transition">
                View Developer Profile
              </div>
            </div>
          )}

          {/* FORM */}
          <div className="my-5 py-5 flex flex-col gap-2 p-5">
            <h3 className="text-xl font-semibold text-primary">
              Connect us & learn more
            </h3>
            <p className="text-gray-500 w-2/3 mb-5">
              Reach our team to know more about your favourable unit.
            </p>

            <div className="flex flex-col contact-us gap-4 text-primary border-primary  single_property">
              <div className="flex flex-col gap-1">
                <label htmlFor="" className="px-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  id=""
                  placeholder="Your Name"
                  className="rounded-full"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="" className="px-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => validatePhone(e?.target.value)}
                  id=""
                  placeholder="+999"
                  className="rounded-full"
                />
                {error?.phone && (
                  <p className="text-white bg-primary p-2 ">{error?.phone}</p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="" className="px-2">Email Address</label>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  id=""
                  placeholder="Enter Your email address"
                  className="rounded-full"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="hidden flex flex-col gap-2">
                  <label htmlFor="" className="px-2">Developer</label>
                  <input
                    type="text"
                    name="developer"
                    value={propertyDetails?.developer}
                    id="developer"
                    className="rounded-full"
                    readOnly
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="" className="px-2">Project</label>
                  <input
                    type="text"
                    name="project"
                    value={propertyDetails?.project}
                    id="project"
                    className="rounded-full"
                    readOnly
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="" className="px-2">Bedrooms</label>
                  <input
                    type="text"
                    name="bedrooms"
                    value={propertyDetails?.bedrooms}
                    id="bedrooms"
                    className="rounded-full"
                    readOnly
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="" className="px-2">Property Type</label>
                  <input
                    type="text"
                    name="leadType"
                    value={propertyDetails?.property_type}
                    id="leadType"
                    className="rounded-full"
                    readOnly
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="" className="px-2">Property For</label>
                  <div className={`rounded-full border border-primary px-4 py-[10px]`}>
                    <select
                      name="leadFor"
                      value={formData.leadFor}
                      onChange={handleChange}
                      id="leadFor"
                      className="w-full border-none outline-none"
                    >
                      <option value="Investment" className="text-black">
                        Investment
                      </option>
                      <option value="End-user" className="text-black">
                        End-user
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="" className="px-2">Note</label>
                <input
                  type="text"
                  name="note"
                  value={formData.note}
                  onChange={handleChange}
                  id=""
                  placeholder="Type Your Message"
                  className="rounded-full"
                />
              </div>
              <button
                onClick={() => handleSubmit()}
                className="bg-primary text-white py-3 rounded-full cursor-pointer"
              >
                Submit
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Details;
