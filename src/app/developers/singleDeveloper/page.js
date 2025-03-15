import React from "react";
import { RxDotFilled } from "react-icons/rx";
import {
  IoArrowBackCircleOutline,
  IoArrowForwardCircleOutline,
  IoLocationOutline,
} from "react-icons/io5";
import { FiPhone } from "react-icons/fi";
import { SlEnvolope } from "react-icons/sl";
import Image from "next/image";
const Developers = () => {
  const contactDetails = [
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
    <div className="pt-[60px]">
      <div className="grid lg:grid-cols-2 grid-cols-1 h-[100vh] grid-rows-1 text px-[30px] md:px-[50px] lg:px-[100px]  py-[100px]">
        <div className="relative z-10 flex flex-col justify-between h-full pb-[60px] lg:order-1 order-2">
          <div></div>
          <div className={` flex flex-col gap-4`}>
            <h3 className="text-5xl font-semibold text-primary  ">
              Al Habtoor
            </h3>
            <span className="text-secondary text-md">
              The Al Habtoor Group is one of the UAE’s most respected and
              successful businesses. Today it operates in the UAE and
              international markets.
            </span>
          </div>
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-3 gap-y-5">
            {contactDetails?.map((details, ind) => {
              return (
                <div
                  key={ind}
                  className="flex items-center gap-4 sm:justify-center text-primary"
                >
                  <span className="p-4 rounded-full border text-xl">
                    {details?.icon}
                  </span>
                  <div className="flex flex-col gap-3">
                    <p className="text-lg font-semibold">{details?.title}</p>
                    <p className="text-black"> {details?.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="lg:order-2 order-1">
          {/* <img
            src="/developer_logo.png"
            alt=""
            className="w-full h-full object-contain"
          /> */}
          <Image
            src="/developer_logo.png"
            alt="Sea site"
            className=""
            layout="fill"
            objectFit="contain" // Controls how the image is resized
          />
        </div>
      </div>

      <div
        style={{
          backgroundImage: "url(/circle-design.png)",
          backgroundBlendMode: "soft-light",
        }}
        className="bg-primary grid lg:grid-cols-2 md:grid-cols-1  gap-4  items-center px-[10px] md:px-[50px] lg:px-[100px] py-[50px]"
      >
        {/* <img
          src="/aboutus/leading_excellence.webp"
          className="rounded-lg w-full  h-full object-cover "
        /> */}
        <Image
          src="/aboutus/leading_excellence.webp"
          alt="Leading Excellence"
          className=""
          layout="fill"
          objectFit="cover" // Controls how the image is resized
        />
        <div className={` flex flex-col gap-4 `}>
          <div className="">
            <span className="rounded-full pr-2   py-1 flex items-center mb-3 border w-fit text-white">
              <RxDotFilled size={30} />
              Why Choose Al Habtoor
            </span>
          </div>
          <h3 className="sm:text-5xl text-3xl font-semibold  ">
            evidenced by its commitment to develop and grow businesses
          </h3>
          <span className="text-secondary ">
            The Al Habtoor Group has grown with the United Arab Emirates. What
            started out as a small engineering firm in 1970, is today one of the
            region’s most respected conglomerates with interests in the
            hospitality, automotive, real estate, education and publishing
            sectors. The Al Habtoor Group has earned itself a solid reputation
            both locally and internationally due to the vision of its Chairman,
            Khalaf Ahmad Al Habtoor. The Al Habtoor Group is one of the UAE’s
            most respected and successful businesses. Today it operates in the
            UAE and international markets. It employs thousands of
            highly-qualified, experienced professionals.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Developers;
