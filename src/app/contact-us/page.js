import React from "react";
import { RxDotFilled } from "react-icons/rx";
import { IoLocationOutline } from "react-icons/io5";
import { FiPhone } from "react-icons/fi";
import { SlEnvolope } from "react-icons/sl";
import Image from "next/image";

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
      desc: "+971 522 17 2300 ",
    },
    {
      title: "Email Address",
      icon: <SlEnvolope />,
      desc: "info@redestate.ae",
    },
  ];
  return (
    <>
      <div
        className="relative bg-cover bg-center pt-[60px] px-[30px] md:px-[50px] lg:px-[100px] h-[100vh] bg-[#00000075]"
        style={{ backgroundImage: "url('/mapcontact.svg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Content */}
        <div className="relative z-20 flex flex-col gap-5 justify-between h-full py-[50px]">
          <div></div>
          <div className={`flex flex-col gap-4`}>
            <div className="rounded-full py-2 px-3 flex gap-2 items-center bg-primary w-fit text-white">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              Contact Redestate
            </div>
            <h3 className="text-5xl font-semibold text-primary  ">
              GET IN TOUCH
            </h3>
            <span className="text-white">
              We re here to help you with all your real estate needs. Fill out
              the form below, and our team will get back to you shortly!
            </span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 pb-5 mb-5">
            {contactDetails?.map((details, indx) => {
              return (
                <div
                  key={indx}
                  className="flex items-center gap-4 lg:justify-center"
                >
                  <span className="p-4 rounded-full border text-xl">
                    {details?.icon}
                  </span>
                  <div className="flex flex-col gap-1">
                    <p className="text-lg font-semibold">{details?.title}</p>
                    <p>{details?.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
