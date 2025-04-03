import React from "react";
import Hero from "./home/_components/hero";
import DreamProperty from "./home/_components/dreamProperty";
import Stats from "./home/_components/stats";
import Highlights from "./home/_components/HighLights";
import Developers from "./home/_components/Developers";
import Reviews from "./home/_components/Reviews";
import Insights from "./home/_components/Insights";

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
