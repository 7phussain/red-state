import React from "react";
import { RxDotFilled } from "react-icons/rx";
import OurCoreValue from "./_components/OurCoreValue";
import Reviews from "../home/_components/Reviews";
import FAQs from "./_components/FAQs";
import Image from "next/image";

const AboutUs = () => {
  return (
    <div className="pt-[70px]">
      {" "}
      <div className=" px-[20px] md:px-[50px] lg:px-[100px]">
        <div className="grid sm:grid-cols-2 grid-cols-1  items-center">
          <div className={` flex flex-col gap-4`}>
            <div className="">
              <span className="rounded-full  px-2 py-1 flex items-center mb-3 bg-primary w-fit text-white">
                <RxDotFilled size={30} />
                About Redestate
              </span>
            </div>
            <h3 className="sm:text-5xl text-3xl font-semibold text-primary  ">
              Your Dream Home, Our Expertise.
            </h3>
            <span className="text-secondary text-xl"></span>
          </div>

          <img src="/aboutus/seasite.webp" className="rounded-lg w-full" />
          {/* <Image
            src="/aboutus/seasite.webp"
            alt="Sea site"
            className="rounded-lg"
            layout="fill"
            objectFit="cover" // Controls how the image is resized
          /> */}
        </div>
      </div>
      <div className=" px-[20px] md:px-[50px] lg:px-[100px] py-[70px]">
        <div className=" items-center gap-[50px] grid sm:grid-cols-2  grid-cols-1">
          {/* <div className="relative ">
            <img src="/aboutus/redstate.png" className="rounded-lg w-full" />
            <img
              src="/logo.png"
              className="rounded-lg w-[300px] absolute top-[50%] left-[50%] -translate-x-1/2"
            />
          </div> */}
          <div className="relative order-2 sm:order-1">
            {/* Background Image */}
            <img src="/aboutus/redstate.webp" className="rounded-lg w-full" />
            {/* <Image
              src="/aboutus/redstate.webp"
              alt="Sea site"
              className="rounded-lg"
              layout="fill"
              objectFit="cover" // Controls how the image is resized
            /> */}

            {/* Black Overlay */}
            <div className="absolute inset-0 bg-[#00000083] bg-opacity-50 rounded-lg"></div>

            {/* Centered Logo */}
            <img
              src="/logo.png"
              className="rounded-lg w-[300px] absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2"
            />
            {/* <Image
              src="/logo.png"
              alt="Logo"
              className="rounded-lg absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2"
              width={300}
              height={300}
            /> */}
          </div>
          <p className={` text-secondary order-1 sm:order-2`}>
            Founded in 2020, Red Estate has quickly risen to the top and
            established itself as a leading force in the real estate industry.
            As a respected brokerage, investment, and advisory firm, our
            dedicated team of international brokers and associates is committed
            to providing a wide range of innovative and customizable real estate
            solutions and asset management services. Since our beginning, we
            have grown to become a trusted partner for clients in the UAE and
            overseas, demonstrating a commitment to excellence in navigating the
            complexities of the real estate market. Over the years, Redestate
            has grown into a trusted leader in the real estate industry. Our
            success is built on strong relationships and a commitment to
            transparency, integrity, and personalized service. Whether it’s
            guiding first-time buyers or working with seasoned investors, we’re
            proud to be the partner people trust to help them find not just a
            property, but a place to call home.
          </p>
        </div>
      </div>
      <div className=" px-[20px] md:px-[50px] lg:px-[100px] py-[70px]">
        <div className="grid grid-cols-1 items-center gap-[50px] sm:grid-cols-2">
          <div className={` flex flex-col gap-4`}>
            <div className="">
              <span className="rounded-full  py-1 flex items-center mb-3 text-primary w-fit text-white">
                <RxDotFilled size={30} />
                Our Vision
              </span>
            </div>
            <h3 className="sm:text-5xl text-2xl  font-semibold text-primary  ">
              Tailored Real Estate Solutions for Every Client.
            </h3>
            <span className="text-secondary ">
              At Redestate, our mission is to provide clients with seamless real
              estate solutions tailored to their unique needs, ensuring a
              rewarding and fulfilling experience at every step.
            </span>
          </div>

          <img src="/aboutus/tailored.webp" className="rounded-lg w-full" />
          {/* <Image
            src="/aboutus/tailored.webp"
            alt="Tailored"
            className="rounded-lg"
            layout="fill"
            objectFit="cover" // Controls how the image is resized
          /> */}
        </div>
      </div>
      <div className=" px-[20px] md:px-[50px] lg:px-[100px] py-[70px]">
        <div className="grid grid-cols-1 items-center gap-[50px] sm:grid-cols-2 ">
          <img
            src="/aboutus/leading_excellence.webp"
            className="rounded-lg w-full order-2 sm:order-1"
          />
          {/* <Image
            src="/aboutus/leading_excellence.webp"
            alt="Sea site"
            className="rounded-lg  order-2 sm:order-1"
            layout="fill"
            objectFit="cover" // Controls how the image is resized
          /> */}
          <div className={` flex flex-col gap-4 order-1 sm:order-2`}>
            <div className="">
              <span className="rounded-full   py-1 flex items-center mb-3 text-primary w-fit text-white">
                <RxDotFilled size={30} />
                Our Mission
              </span>
            </div>
            <h3 className="sm:text-5xl text-2xl font-semibold text-primary  ">
              Leading with Excellence, Integrity, and Innovation in Real Estate
            </h3>
            <span className="text-secondary ">
              Our vision is to become a trusted leader in the real estate
              industry by delivering excellence, integrity, and innovation in
              every transaction.
            </span>
          </div>
        </div>
      </div>
      <OurCoreValue />
      <Reviews />
      <FAQs />
    </div>
  );
};

export default AboutUs;
