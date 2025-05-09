import React from "react";
import { RxDotFilled } from "react-icons/rx";
import { PiCrownSimpleFill } from "react-icons/pi";
import { LuShieldCheck } from "react-icons/lu";
import { HiLightBulb } from "react-icons/hi";
import { FaHandshake } from "react-icons/fa";
import { ImLeaf } from "react-icons/im";
import { FaUser } from "react-icons/fa";
const OurCoreValue = () => {
  const values = [
    {
      icon: <LuShieldCheck />,
      title: "Integrity",
      desc: "We are always honest and transparent in all dealings, ensuring that clients receive clear and accurate information to make informed decisions.",
    },
    {
      icon: <PiCrownSimpleFill />,
      title: "Excellence",
      desc: "We strive to exceed expectations by delivering outstanding results, paying close attention to detail and committing fully to the quality of our services.",
    },
    {
      icon: <FaUser />,
      title: "Customer-Centricity",
      desc: "Our clients are our top priority; we listen carefully to their needs and provide personalized solutions tailored to each individual.",
    },
    {
      icon: <HiLightBulb />,
      title: "Innovation",
      desc: "We continuously adopt the latest technologies and ideas to offer better, more efficient, and relevant services in the ever-evolving real estate market.",
    },
    {
      icon: <FaHandshake />,
      title: "Collaboration",
      desc: "We believe in the power of teamwork, both internally and with our clients, ensuring that every project benefits from collective expertise and shared goals.",
    },
    {
      icon: <ImLeaf />,
      title: "Sustainability",
      desc: "We are dedicated to supporting eco-friendly practices and sustainable development, ensuring a positive impact on both the community and the environment.",
    },
  ];
  return (
    <div className="py-5 my-5 relative">
      <div className="absolute top-0 right-0 text-secondary opacity-10">
        <div className="text-[12vw] font-bold relative leading-none">
          REDESTATE
        </div>
      </div>
      <div className="h-[30px]"></div>
      <div className={`flex flex-col gap-4 px-[20px] md:px-[50px] lg:px-[100px]`}>
        <div className="rounded-full py-1 px-2 flex gap-2 items-center text-primary w-fit border border-primary">
          <div className="w-2 h-2 rounded-full bg-primary"></div>
          Our Core Value
        </div>
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-primary  ">
          What We Stand For You
        </h3>
        <span className="text-secondary">
          Core principles that guide every transaction, ensuring excellence and
          client satisfaction.
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3  gap-8 px-[20px] md:px-[50px] lg:px-[100px] py-[70px]">
        {values.map((item, ind) => {
          return (
            <Card
              key={ind}
              icon={item?.icon}
              title={item?.title}
              desc={item?.desc}
            />
          );
        })}
      </div>
    </div>
  );
};

export default OurCoreValue;

const Card = ({ icon, title, desc }) => {
  return (
    <div className="flex flex-col gap-3">
      <span className="p-4 bg-primary text-2xl w-fit rounded-full">{icon}</span>
      <h4 className="text-primary font-semibold">{title}</h4>
      <p className="text-secondary">{desc}</p>
    </div>
  );
};
