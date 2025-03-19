// "use client";

// import { selectStyles } from "@/app/_components/selectStyles";
// import React, { useState } from "react";
// import { FaStar } from "react-icons/fa6";
// import SectionHeader from "./SectionHeader";
// import {
//   IoArrowBackCircleOutline,
//   IoArrowForwardCircleOutline,
// } from "react-icons/io5";
// const Reviews = () => {
//   return (
//     <div
//       style={{
//         backgroundImage: "url(/circle-design.png)",
//         backgroundBlendMode: "soft-light",
//       }}
//       className="bg-[#F5F5F5] px-[20px] md:px-[50px] lg:px-[70px] xl:px-[100px] py-6"
//     >
//       <SectionHeader
//         name={"Testimonial"}
//         title={"What People Are Saying"}
//         subtitle={"Real Feedback, Real Success"}
//       />
//       <div className="text-black flex flex-col items-center pb-5 mb-5">
//         <div className="text-lg flex flex-col items-center w-[80%] md:w-[70%] lg:w-[60%]">
//           <h4 className="font-semibold">Ali Bin Saleh</h4>
//           <h5>Client</h5>
//           <div className="grid grid-cols-5 gap-3 py-2">
//             {[1, 2, 3, 4, 5].map((start, ind) => {
//               return (
//                 <div key={ind}>
//                   <FaStar size={24} color="#e2b93b" />
//                 </div>
//               );
//             })}
//           </div>
//           <p className="font-normal text-2xl py-4 text-center">
//             “Seamless and stress-free home buying, thanks to a dedicated and
//             expert team. Highly recommended for outstanding service”
//           </p>
//           <div className="flex gap-3">
//             <button className="text-gray-600">
//               <IoArrowBackCircleOutline size={44} />
//             </button>
//             <div className="gap-3 grid grid-cols-5 items-center">
//               {[1, 2, 3, 4, 5].map((dot, ind) => {
//                 return (
//                   <div
//                     key={ind}
//                     className="h-[10px] w-[10px] bg-primary rounded-full"
//                   ></div>
//                 );
//               })}
//             </div>
//             <button className="text-gray-600">
//               <IoArrowForwardCircleOutline size={44} />
//             </button>
//           </div>
//         </div>
//         {/* <div></div>
//         <div></div> */}
//       </div>
//     </div>
//   );
// };

// export default Reviews;
"use client";

import { selectStyles } from "@/app/_components/selectStyles";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa6";
import SectionHeader from "./SectionHeader";
import {
  IoArrowBackCircleOutline,
  IoArrowForwardCircleOutline,
} from "react-icons/io5";

const reviews = [
  {
    name: "Ali Bin Saleh",
    role: "Client",
    rating: 5,
    feedback:
      "Seamless and stress-free home buying, thanks to a dedicated and expert team. Highly recommended for outstanding service.",
  },
  {
    name: "Sarah Johnson",
    role: "Customer",
    rating: 5,
    feedback:
      "An amazing experience! The team went above and beyond to ensure everything was perfect. Highly professional and efficient.",
  },
  {
    name: "Michael Lee",
    role: "Homeowner",
    rating: 5,
    feedback:
      "Excellent service! The process was smooth, and their expertise made all the difference. I would definitely use their service again.",
  },
];

const Reviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextReview = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length
    );
  };

  return (
    <div
      style={{
        backgroundImage: "url(/circle-design.png)",
        backgroundBlendMode: "soft-light",
      }}
      className="bg-[#F5F5F5] px-[20px] md:px-[50px] lg:px-[70px] xl:px-[100px] py-6"
    >
      <SectionHeader
        name={"Testimonial"}
        title={"What People Are Saying"}
        subtitle={"Real Feedback, Real Success"}
      />
      <div className="text-black flex flex-col items-center pb-5 mb-5">
        <div className="text-lg flex flex-col items-center w-[80%] md:w-[70%] lg:w-[60%]">
          <h4 className="font-semibold">{reviews[currentIndex].name}</h4>
          <h5>{reviews[currentIndex].role}</h5>
          <div className="grid grid-cols-5 gap-3 py-2">
            {[...Array(reviews[currentIndex].rating)].map((_, ind) => (
              <FaStar key={ind} size={24} color="#e2b93b" />
            ))}
          </div>
          <p className="font-normal text-2xl py-4 text-center">
            “{reviews[currentIndex].feedback}”
          </p>
          <div className="flex gap-3 justify-between">
            <button className="text-gray-600" onClick={prevReview}>
              <IoArrowBackCircleOutline size={44} />
            </button>
            <div className="gap-3 flex items-center justify-center">
              {reviews.map((_, ind) => (
                <div
                  key={ind}
                  className={`h-[10px] w-[10px] rounded-full ${
                    ind === currentIndex ? "bg-primary" : "bg-gray-800"
                  }`}
                ></div>
              ))}
            </div>
            <button className="text-gray-600" onClick={nextReview}>
              <IoArrowForwardCircleOutline size={44} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
