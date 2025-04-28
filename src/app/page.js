import React from "react";
import dynamic from "next/dynamic";

const Hero = dynamic(() => import("./home/_components/hero"));
const DreamProperty = dynamic(() => import("./home/_components/dreamProperty"));
const Stats = dynamic(() => import("./home/_components/stats"));
const Highlights = dynamic(() => import("./home/_components/HighLights"));
const Developers = dynamic(() => import("./home/_components/Developers"));
const Reviews = dynamic(() => import("./home/_components/Reviews"));
// const Insights = dynamic(() => import("./home/_components/Insights"));

const Page = () => {
  return (
    <div>
      <Hero />
      <DreamProperty />
      <Stats />
      <Highlights />
      <Developers />
      <Reviews />
      {/* <Insights /> */}
    </div>
  );
};

export default Page;
