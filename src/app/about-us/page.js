import React from "react";
import { RxDotFilled } from "react-icons/rx";
import OurCoreValue from "./_components/OurCoreValue";
import Reviews from "../home/_components/Reviews";
import FAQs from "./_components/FAQs";
import Image from "next/image";
import SectionHeader from "../home/_components/SectionHeader";

const AboutUs = () => {
  return (
    <div className="py-[50px] flex flex-col gap-5 ">
      <div className="px-[20px] md:px-[50px] lg:px-[100px] flex flex-col">
        {/* 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center py-5 my-5">
          <SectionHeader
            name={"About Redestate"}
            title={"Your Dream Home, Our Expertise."}
          />
          <img src="/aboutus/seasite.webp" className="hidden lg:flex rounded-lg w-full aspect-3/2 object-cover" />
        </div>
        {/* 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center py-5 my-5">
          <div className="relative">
            <img src="/aboutus/redstate.webp" className="order-1 lg:order-0 rounded-lg w-full aspect-3/2 object-cover" />
            <div className="absolute inset-0 bg-[#00000080] bg-opacity-500 rounded-lg"></div>
            <img
              src="/logo.png"
              className="rounded-lg w-[300px] absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2"
            />
          </div>
          <p className={`text-secondary`}>
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
        {/* 3 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center py-5 my-5">
          <div className={`flex flex-col gap-4 order-1 lg:order-0`}>
            <div className="rounded-full py-1 px-2 flex gap-2 items-center text-primary w-fit border border-primary">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              Our Vision
            </div>
            <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-primary  ">
              Tailored Real Estate Solutions for Every Client.
            </h3>
            <span className="text-secondary">
              Our vision is to become a trusted leader in the real estate
              industry by delivering excellence, integrity, and innovation in
              every transaction.
            </span>
          </div>
          <img src="/aboutus/tailored.webp" className="order-0 lg:order-1 rounded-lg w-full aspect-3/2 object-cover" />
        </div>
        {/* 4 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center py-5 my-5">
          <img src="/aboutus/leading_excellence.webp" className="rounded-lg w-full aspect-3/2 object-cover" />
          <div className={`flex flex-col gap-4`}>
            <div className="rounded-full py-1 px-2 flex gap-2 items-center text-primary w-fit border border-primary">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              Our Mission
            </div>
            <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-primary  ">
              Leading with Excellence, Integrity, and Innovation in Real Estate
            </h3>
            <span className="text-secondary">
              At Redestate, our mission is to provide clients with seamless real
              estate solutions tailored to their unique needs, ensuring a
              rewarding and fulfilling experience at every step.
            </span>
          </div>
        </div>
        {/* 5 */}
      </div>

      <OurCoreValue />
      <Reviews />
      <FAQs />
    </div>
  );
};

export default AboutUs;
