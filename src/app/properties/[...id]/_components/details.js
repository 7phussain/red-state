import React from "react";
import { IoBedSharp } from "react-icons/io5";
import { BiSolidBath } from "react-icons/bi";
import { FaMap } from "react-icons/fa6";
import { GiHomeGarage } from "react-icons/gi";
import { MdOutlinePool } from "react-icons/md";
import { BsTools } from "react-icons/bs";
const Details = ({ propertyDetails }) => {
  const { listing_attribute, meta_tags_for_listings, listing_attribute_type } =
    propertyDetails;
  const overview = [
    {
      icon: <IoBedSharp />,
      title: listing_attribute?.bedroom,
    },
    {
      icon: <BiSolidBath />,
      title: listing_attribute?.bathroom,
    },

    {
      icon: <FaMap />,
      title: listing_attribute?.area,
    },
    {
      icon: <GiHomeGarage />,
      title: "1 car garage",
    },
    {
      icon: <MdOutlinePool />,
      title: "pool",
    },
    {
      icon: <BsTools />,
      title: `Built in ${meta_tags_for_listings?.year_build_in}`,
    },
  ];
  return (
    <div className="grid grid-cols-3 px-[100px]">
      <div className={` flex flex-col gap-4  col-span-2`}>
        <h3 className="text-5xl font-semibold text-primary  ">
          {propertyDetails?.title}
        </h3>
        <p className="text-secondary ">
          {meta_tags_for_listings?.long_description}
        </p>
        <div className="text-primary space-y-5 col-span-2 ">
          <h3 className=" text-3xl font-semibold text-primary ">Overview</h3>
          <div className="grid grid-cols-3 gap-5 pl-4">
            {overview?.map((item) => {
              return (
                <div className="flex gap-3 items-center">
                  <span className="text-2xl">{item?.icon}</span>
                  <span>{item?.title}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="py-4">
          <h3 className=" text-3xl font-semibold text-primary py-3">
            Location
          </h3>
          <img src="/location.png" alt="" className="h-[400px]" />
        </div>
      </div>
      <div>
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
        </div>
        <button className="border-primary border  text-white py-3 rounded-full text-primary w-full">
          View Developer Profile
        </button>
        <form
          action=""
          className="flex flex-col contact-us gap-4 text-primary border-primary  single_property"
        >
          <div className="flex flex-col gap-3">
            <label htmlFor="">Name</label>
            <input
              type="text"
              name=""
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
              name=""
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
                  name=""
                  id=""
                  className=" w-full border-none outline-none"
                >
                  <option value="">Apartment</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="">Phone Number</label>
              <input
                type="number"
                name=""
                id=""
                placeholder="+999"
                className="rounded-full"
              />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="">Note</label>
            <input
              type="text"
              name=""
              id=""
              placeholder="Type Your Message"
              className="rounded-full"
            />
          </div>
          <button className="bg-primary text-white py-3 rounded-full">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Details;
