// "use client";
// import React from "react";
// import { usePathname } from "next/navigation";

// const ContactUs = () => {
//   const pathname = usePathname();
//   fetchData(
//     `/form-submissions`,
//     { method: "POST"  },
//     (res, status) => {
//       if (status) {
//         setProperties(res?.data);
//         setPagination(res?.pagination); // Store pagination info
//         setCurrentPage(res?.pagination?.current_page);
//       }
//     }
//   );
//   https: return (
//     <div
//       style={{
//         background:
//           pathname !== "/contact-us" &&
//           `
//     linear-gradient(0deg, rgba(9, 12, 27, 0.4), rgba(9, 12, 27, 0.4)),
//     linear-gradient(180deg, rgba(9, 12, 27, 0) 22.75%, #090C1B 87.07%),
//     url(/contact_us.png)
//   `,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         "--border-color":
//           pathname !== "/contact-us" ? "white" : "var(--primary)",
//       }}
//       className={`grid grid-cols-2 py-8 px-[100px]  items-center ${
//         pathname === "/contact-us" ? "text-primary" : "text-white"
//       }`}
//     >
//       <div>
//         <h4 className="text-5xl font-semibold mb-4">Contact Us</h4>
//         <p className="font-normal">
//           We’re here to help you with all your real estate needs.
//         </p>
//       </div>
//       <form action="" className="flex flex-col contact-us gap-4">
//         <div className="flex flex-col gap-3">
//           <label htmlFor="">Name</label>
//           <input
//             type="text"
//             name=""
//             id=""
//             placeholder="Your Name"
//             className="rounded-full"
//           />
//         </div>
//         <div className="flex flex-col gap-3">
//           {" "}
//           <label htmlFor="">Email</label>
//           <input
//             type="text"
//             name=""
//             id=""
//             placeholder="Enter Your email"
//             className="rounded-full"
//           />
//         </div>

//         <div className="grid grid-cols-2 gap-4 items-center">
//           <div className="flex flex-col gap-3">
//             <label htmlFor="">Unit Type</label>
//             <div
//               className={`rounded-full border  ${
//                 pathname === "/contact-us" ? "border-primary" : "border-white"
//               } px-4 py-[10px]`}
//             >
//               <select
//                 name=""
//                 id=""
//                 className=" w-full border-none outline-none"
//               >
//                 <option value="">Apartment</option>
//               </select>
//             </div>
//           </div>
//           <div className="flex flex-col gap-3">
//             <label htmlFor="">Phone Number</label>
//             <input
//               type="number"
//               name=""
//               id=""
//               placeholder="+999"
//               className="rounded-full"
//             />
//           </div>
//         </div>
//         <div className="flex flex-col gap-3">
//           <label htmlFor="">Note</label>
//           <input
//             type="text"
//             name=""
//             id=""
//             placeholder="Type Your Message"
//             className="rounded-full"
//           />
//         </div>
//         <button className="bg-primary text-white py-3 rounded-full">
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ContactUs;
"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import useApi from "@/utils/useApi";
import { parsePhoneNumberFromString } from "libphonenumber-js";

const ContactUs = () => {
  const pathname = usePathname();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    unitType: "Apartment",
    phone: "",
    note: "",
  });
  const { fetchData } = useApi();
  const [error, setError] = useState({ phone: "" });

  const validatePhone = (value) => {
    const phoneNumber = parsePhoneNumberFromString(value, "US"); // Change "US" for different country codes
    if (!phoneNumber || !phoneNumber.isValid()) {
      setError((pre) => ({ ...pre, phone: "Invalid phone number" }));
    } else {
      setError((pre) => ({ ...pre, phone: "" }));
    }
    setFormData((pre) => ({ ...pre, phone: value }));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (error.phone) {
      alert("Invalid Phone");
      return;
    }

    const formPayload = new FormData();
    const data = [
      {
        leadName: formData.name,
        leadEmail: formData.email,
        leadContact: formData.phone, // Changed key from `contact` to `leadContact`
        project: formData.unitType,
        note: formData.note,
      },
    ];

    formPayload.append(
      "form_id",
      process.env.NEXT_PUBLIC_CONTACT_US_FORM_ID || 175
    );
    formPayload.append("data", JSON.stringify(data));

    try {
      const response = await fetchData(
        "/form-submissions",
        {
          method: "POST",
          data: formPayload, // Send FormData directly
        },
        (data, status) => {
          if (status) {
            setFormData({
              name: "",
              email: "",
              unitType: "Apartment",
              phone: "",
              note: "",
            });
            alert("Form submitted successfully!");
          } else {
            alert("Error submitting form!");
          }
        }
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div
      style={{
        background:
          pathname !== "/contact-us" &&
          `linear-gradient(0deg, rgba(9, 12, 27, 0.4), rgba(9, 12, 27, 0.4)), 
          linear-gradient(180deg, rgba(9, 12, 27, 0) 22.75%, #090C1B 87.07%), 
          url(/contact_us.webp)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        "--border-color":
          pathname !== "/contact-us" ? "white" : "var(--primary)",
      }}
      className={`py-6 px-[30px] md:px-[50px] lg:px-[100px] ${
        pathname === "/contact-us" ? "text-primary" : "text-white"
      }`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 items-center my-5 py-5">
        <div>
          <h4 className="text-3xl md:text-5xl font-semibold mb-4 text-center md:text-start">
            Contact Us
          </h4>
          <p className="font-normal text-xs text-center md:text-start">
            We’re here to help you with all your real estate needs.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col contact-us gap-4"
        >
          <div className="grid grid-cols-2 md:grid-cols-1 gap-4 md:pt-0 pt-3">
            <div className="flex flex-col gap-3">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="rounded-full px-4 py-2"
              />
            </div>

            <div className="flex flex-col gap-3">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Your Email"
                className="rounded-full px-4 py-2"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 items-center ">
            <div className="flex flex-col gap-3">
              <label>Unit Type</label>
              <div
                className={`rounded-full border px-4 py-2 ${
                  pathname === "/contact-us"
                    ? "border-primary "
                    : "border-white "
                }`}
              >
                <select
                  name="unitType"
                  value={formData.unitType}
                  onChange={handleChange}
                  className={`w-full bg-transparent border-none outline-none `}
                >
                  <option value="apartment" className="text-black">
                    Apartment
                  </option>
                  <option value="villa" className="text-black">
                    Villa
                  </option>
                  <option value="townhouse" className="text-black">
                    Townhouse
                  </option>
                  <option value="penthouse" className="text-black">
                    Penthouse
                  </option>
                  <option value="mansion" className="text-black">
                    Mansion
                  </option>
                  <option value="commercial" className="text-black">
                    {" "}
                    Commercial
                  </option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={(e) => validatePhone(e?.target.value)}
                placeholder="+999"
                className="rounded-full px-4 py-2"
              />
              {error?.phone && (
                <p className="text-white bg-primary p-2 ">{error?.phone}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <label>Note</label>
            <input
              type="text"
              name="note"
              value={formData.note}
              onChange={handleChange}
              placeholder="Type Your Message"
              className="rounded-full px-4 py-2"
            />
          </div>

          <button
            type="submit"
            className="bg-primary text-white py-3 rounded-full cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
