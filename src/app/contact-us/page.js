import React from "react";
import { RxDotFilled } from "react-icons/rx";
import { IoLocationOutline } from "react-icons/io5";
import { FiPhone } from "react-icons/fi";
import { SlEnvolope } from "react-icons/sl";
const ContactUs = () => {
  const contactDetails = [
    {
      title: "Our Address",
      icon: <IoLocationOutline />,
      desc: "Business Bay - Khalij Tujari 2 -Dubai",
    },
    {
      title: "Our Phone",
      icon: <FiPhone />,
      desc: "Business Bay - Khalij Tujari 2 -Dubai",
    },
    {
      title: "Email Address",
      icon: <SlEnvolope />,
      desc: "info@redestate.ae",
    },
  ];
  return (
    <div
      className="relative bg-cover bg-center pt-[60px] px-[30px] md:px-[50px] lg:px-[100px] h-[140vh]"
      style={{ backgroundImage: "url('/contact-us-map.png')" }}
    >
      {/* Top Gradient */}
      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-black/70 to-transparent"></div>

      {/* Bottom Gradient */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between h-full pb-[60px]">
        <div></div>
        <div className={` flex flex-col gap-4`}>
          <div className="">
            <span className="rounded-full  px-2 py-1 flex items-center mb-3 bg-primary w-fit text-white">
              <RxDotFilled size={30} />
              Contact Redestate
            </span>
          </div>
          <h3 className="sm:text-5xl text-3xl font-semibold text-primary  ">
            GET IN TOUCH
          </h3>
          <span className="text-white text-md">
            We’re here to help you with all your real estate needs. Fill out the
            form below, and our team will get back to you shortly!
          </span>
        </div>
        <div className="grid md:grid-cols-3 grid-rows-3 gap-3 md:gap-0">
          {contactDetails?.map((details) => {
            return (
              <div className="flex items-center gap-4 md:justify-center">
                <span className="p-4 rounded-full border text-xl">
                  {details?.icon}
                </span>
                <div className="flex flex-col gap-3">
                  <p className="text-lg font-semibold">{details?.title}</p>
                  <p>{details?.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
