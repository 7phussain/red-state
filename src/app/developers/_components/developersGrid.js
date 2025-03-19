import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
const DevelopersGrid = ({ developers }) => {
  const router = useRouter();
  return (
    <div className="md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 flex no-scrollbar overflow-x-auto ">
      {developers.map((item, ind) => {
        return (
          <div
            key={ind}
            className="min-w-72 flex flex-col gap-3 items-center p-4 cursor-pointer"
            onClick={() => {
              router.push(`/developers/${item?.id}`);
            }}
          >
            <img
              src={`${process.env.NEXT_PUBLIC_BASE_URL.slice(0, -3)}${
                item?.logo
              }`}
              onError={(e) => {
                e.target.onerror = null; // Prevent infinite loop
                e.target.src = "/no_image.png"; // Set fallback image
              }}
              className="w-[200px] h-[200px] object-contain"
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

            <span className="text-primary">{item?.developerName}</span>
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
