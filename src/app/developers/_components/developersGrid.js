import React from "react";
import { RxDotFilled } from "react-icons/rx";
import { IoLocationOutline } from "react-icons/io5";
import { FiPhone } from "react-icons/fi";
import { SlEnvolope } from "react-icons/sl";
const DevelopersGrid = () => {
  return (
    <div className="grid grid-cols-5 gap-4">
      {[1, 2, 3, 4, 5].map((item) => {
        return (
          <div className="flex flex-col gap-3 items-center p-4">
            <img src="/developer_logo.png" className="w-[200px]" />
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
