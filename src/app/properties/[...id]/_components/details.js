import React, { useState } from "react";
import { LuBedDouble, LuBath, LuMapPin, LuScale3D } from "react-icons/lu";
import GoogleMaps from "@/app/_components/map";
import useApi from "@/utils/useApi";
import { parsePhoneNumberFromString } from "libphonenumber-js";
const Details = ({ propertyDetails }) => {
  const { listing_attribute, meta_tags_for_listings, listing_attribute_type } =
    propertyDetails;
  const overview = [
    {
      icon: <LuBedDouble size={18} />,
      title: propertyDetails?.bedrooms,
    },
    {
      icon: <LuBath size={18} />,
      title: propertyDetails?.bathrooms,
    },
    {
      icon: <LuScale3D size={18} />,
      title: `${propertyDetails?.size} ${propertyDetails?.size_unit}`,
    },
    {
      icon: <LuMapPin size={18} />,
      title: propertyDetails?.area || propertyDetails?.address,
    },
    // {
    //   icon: <GiHomeGarage />,
    //   title: "1 car garage",
    // },
    // {
    //   icon: <MdOutlinePool />,
    //   title: "pool",
    // },
    // {
    //   icon: <BsTools />,
    //   title: `Built in ${meta_tags_for_listings?.year_build_in}`,
    // },
  ];
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    unitType: "Apartment",
    phone: "",
    note: "",
  });
  const { fetchData } = useApi();
  const [error, setError] = useState({ phone: "" });

  const validatePhone = (value) => {
    const phoneNumber = parsePhoneNumberFromString(value, "US"); // Change "US" for different country codes
    if (!phoneNumber || !phoneNumber.isValid()) {
      setError((pre) => ({ ...pre, phone: "Invalid phone number" }));
    } else {
      setError((pre) => ({ ...pre, phone: "" }));
    }
    setFormData((pre) => ({ ...pre, phone: value }));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (error.phone) {
      return;
    }
    const formPayload = new FormData();
    const data = [
      {
        leadName: formData.name,
        leadEmail: formData.email,
        leadContact: formData.phone, // Changed key from `contact` to `leadContact`
        project: formData.unitType,
        note: formData.note,
      },
    ];

    formPayload.append(
      "form_id",
      process.env.NEXT_PUBLIC_CONTACT_US_FORM_ID || 175
    );
    formPayload.append("data", JSON.stringify(data));

    try {
      const response = await fetchData(
        "/form-submissions",
        {
          method: "POST",
          data: formPayload, // Send FormData directly
        },
        (data, status) => {
          if (status) {
            setFormData({
              name: "",
              email: "",
              unitType: "Apartment",
              phone: "",
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
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-5 px-[30px] md:px-[50px] lg:px-[70px] xl:px-[100px]">
        <div className={`col-span-1 lg:col-span-2 flex flex-col gap-5`}>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary">
            {propertyDetails?.listing_title}
          </h3>
          <p className="text-secondary mb-5">{propertyDetails?.description}</p>
          <div className="flex flex-col gap-5">
            <h3 className="text-xl font-semibold text-primary">Overview</h3>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
              {overview?.map((item, ind) => {
                return (
                  <div
                    key={ind}
                    className="text-primary font-semibold grid grid-cols-6 gap-3 items-center"
                  >
                    <span className="">{item?.icon}</span>
                    <span className="col-span-5">{item?.title}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <h3 className="text-xl font-semibold text-primary">Location</h3>
          </div>

          <div className="py-4">
            <div className="w-full h-[400px] relative">
              <GoogleMaps
                lat={propertyDetails?.latlong?.split(",")[0]}
                lon={propertyDetails?.latlong?.split(",")[1]}
              />
            </div>
          </div>
        </div>
        <div className="col-span-1 w-full">
          <div className="text-4xl font-semibold text-primary">
            <h3 className="  ">Price</h3>
            <p>
              {" "}
              {listing_attribute_type?.price}{" "}
              {listing_attribute_type?.currency_type}
            </p>
          </div>
          <div className="">
            <img
              src="/azizi_logo-removebg-preview.png"
              className="w-[400px] h-[200px] object-cover"
            />
            {/* <Image
            src="/azizi_logo-removebg-preview.png"
            alt="Location"
            className="object-cover"
            layout="fill"
            height={200}
            width={400}
          /> */}
          </div>
          <button className="border-primary border  text-white py-3 rounded-full text-primary w-full">
            View Developer Profile
          </button>
          <div className="flex flex-col contact-us gap-4 text-primary border-primary  single_property">
            <div className="flex flex-col gap-3">
              <label htmlFor="">Name</label>
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
            <div className="flex flex-col gap-3">
              {" "}
              <label htmlFor="">Email</label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                id=""
                placeholder="Enter Your email"
                className="rounded-full"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 items-center">
              <div className="flex flex-col gap-3">
                <label htmlFor="">Unit Type</label>
                <div
                  className={`rounded-full border  border-primary px-4 py-[10px]`}
                >
                  <select
                    name="unitType"
                    value={formData.unitType}
                    onChange={handleChange}
                    id=""
                    className=" w-full border-none outline-none"
                  >
                    <option value="apartment" className="text-black">
                      Apartment
                    </option>
                    <option value="villa" className="text-black">
                      Villa
                    </option>
                    <option value="townhouse" className="text-black">
                      Townhouse
                    </option>
                    <option value="penthouse" className="text-black">
                      Penthouse
                    </option>
                    <option value="mansion" className="text-black">
                      Mansion
                    </option>
                    <option value="commercial" className="text-black">
                      {" "}
                      Commercial
                    </option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <label htmlFor="">Phone Number</label>
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
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="">Note</label>
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
    </>
  );
};

export default Details;
