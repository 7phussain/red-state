import React from "react";
import Image from "next/image";
const DevelopersGrid = () => {
  return (
    <div className="md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 flex no-scrollbar overflow-x-auto ">
      {[1, 2, 3, 4, 5].map((item, ind) => {
        return (
          <div
            key={ind}
            className="min-w-72 flex flex-col gap-3 items-center p-4"
          >
            <img src="/developer_logo.png" className="w-[200px]" />
            {/* <div className="w-[200px]">
              <Image
                src="/developer_logo.png"
                alt="Sea site"
                className="rounded-lg"
                layout="fill"
                // width={200}
                objectFit="cover" // Controls how the image is resized
              />
            </div> */}

            <span className="text-primary">AL Habtoor</span>
            <button className="border-primary border text-primary text-white py-1 rounded-full px-4">
              View Properties
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default DevelopersGrid;
