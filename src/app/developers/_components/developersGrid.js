import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
const DevelopersGrid = ({ developers }) => {
  const router = useRouter();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {developers
        ?.filter((item) => item?.logo)
        .map((item, ind) => {
          return (
            <div
              key={ind}
              className="w-full h-full flex flex-col gap-3 items-center justify-between p-5 cursor-pointer border border-[#EEE] rounded-xl"
              onClick={() => {
                router.push(`/developers/${item?.id}`);
              }}
            >
              <div></div>
              <img
                src={`${process.env.NEXT_PUBLIC_BASE_URL.slice(0, -3)}${item?.logo
                  }`}
                onError={(e) => {
                  e.target.onerror = null; // Prevent infinite loop
                  e.target.src = "/no_image.png"; // Set fallback image
                }}
                className="max-w-[200px] max-h-[200px] object-contain"
              />
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
              <div className="w-full flex flex-col gap-4 items-center justify-center">
                <div className="text-primary text-lg font-semibold">
                  {item?.developerName}
                </div>
                {/* <button className="border-primary border text-primary text-white py-1 rounded-full px-4">
                View Properties
              </button> */}
                <div className="w-full border-primary border text-primary text-xs p-2 rounded-full text-center">
                  View Properties
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default DevelopersGrid;
