import React from "react";
import Hero from "./_components/hero";
import DreamProperty from "./_components/dreamProperty";
import Stats from "./_components/stats";
import Highlights from "./_components/HighLights";
import Developers from "./_components/Developers";
import Reviews from "./_components/Reviews";
import Insights from "./_components/Insights";

const Page = () => {
  return (
    <div>
      <Hero />
      <DreamProperty />
      {/* <Stats />
      <Highlights />
      <Developers />
      <Reviews />
      <Insights /> */}
    </div>
  );
};

export default Page;
