// "use client";
// import { useState } from "react";
// import { FiChevronDown, FiChevronUp } from "react-icons/fi";

// const collapsibleItems = [
//   {
//     title: "Invention",
//     description:
//       "A completely new creation or concept that did not exist before. Often refers to groundbreaking technological or scientific developments.",
//   },
//   {
//     title: "Breakthrough",
//     description:
//       "A significant and sudden discovery or advancement that changes an industry, field, or way of thinking.",
//   },
//   {
//     title: "Advancement",
//     description:
//       "A gradual improvement or progression in a field, technology, or idea.",
//   },
// ];

// export default function FAQs() {
//   const [openIndex, setOpenIndex] = useState(null);

//   const toggleItem = (index) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

//   return (
//     <div className="max-w-lg mx-auto mt-8 space-y-4">
//       {collapsibleItems.map((item, index) => (
//         <div key={index} className="border rounded-lg p-4 shadow-md">
//           <button
//             className="flex justify-between items-center w-full text-lg font-semibold"
//             onClick={() => toggleItem(index)}
//           >
//             {item.title}
//             {openIndex === index ? (
//               <FiChevronUp className="w-5 h-5" />
//             ) : (
//               <FiChevronDown className="w-5 h-5" />
//             )}
//           </button>
//           {openIndex === index && (
//             <p className="mt-2 text-gray-700">{item.description}</p>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }
"use client";
import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { motion } from "framer-motion";
import { RxDotFilled } from "react-icons/rx";

const collapsibleItems = [
  {
    title: "How can I search for properties on RedEstate.ae?",
    description:
      "Use our advanced search filters to refine your property search by location, price, property type, number of bedrooms, and more.",
  },
  {
    title: "Can I schedule a property viewing?",
    description:
      "Yes, you can schedule a property viewing at your convenience. Simply contact our team, and we will arrange a visit based on your availability.",
  },
  {
    title: "What should I consider before buying a property in the UAE?",
    description:
      "Before purchasing a property in the UAE, consider factors such as location, developer reputation, legal requirements, service charges, and potential return on investment.",
  },
  {
    title: "What are the financing options for property purchases?",
    description:
      "There are multiple financing options available, including bank mortgages, developer payment plans, and private financing solutions. Loan eligibility depends on factors such as income, employment status, and residency.",
  },
  {
    title: "Can foreigners buy property in the UAE?",
    description:
      "Yes, foreigners can buy property in designated freehold areas in the UAE. They can own properties outright or leasehold depending on the location and legal framework.",
  },
];

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-[50px] px-[20px] md:px-[50px] lg:px-[100px] py-[70px]">
      <div className=" mt-8 order-2 sm:order-1 space-y-4">
        {collapsibleItems.map((item, index) => (
          <div key={index} className="border rounded-lg p-1  ">
            <button
              className="flex justify-between items-center w-full text-lg font-semibold text-primary"
              onClick={() => toggleItem(index)}
            >
              {item.title}
              <motion.div
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {openIndex === index ? (
                  <FiChevronUp className="w-5 h-5" />
                ) : (
                  <FiChevronDown className="w-5 h-5" />
                )}
              </motion.div>
            </button>

            <motion.div
              initial={false}
              animate={{
                height: openIndex === index ? "auto" : 0,
                opacity: openIndex === index ? 1 : 0,
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <p className="mt-2 text-gray-700 text-[14px]">
                {item.description}
              </p>
            </motion.div>
          </div>
        ))}
      </div>
      <div className={` flex order-1 sm:order-2 flex-col gap-4 items-end`}>
        <div className=" ">
          <span className="rounded-full   py-1 flex items-center mb-3 text-primary w-fit text-white">
            <RxDotFilled size={30} />
            FAQ's
          </span>
        </div>
        <h3 className="sm:text-5xl text-3xl text-right sm:text-start font-semibold text-primary  ">
          Frequently Asked Questions
        </h3>
        <span className="text-secondary text-right sm:text-start">
          Have questions about buying, selling, or renting with Redestate? We’ve
          got the answers to help guide you through the process.
        </span>
      </div>
    </div>
  );
}
