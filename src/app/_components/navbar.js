// "use client";

// import React, { useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { HiOutlineMenuAlt3 } from "react-icons/hi";

// const Navbar = () => {
//   const pathname = usePathname();
//   const [isMeneOpened, setIsMenuOpened] = useState(false);

//   const links = [
//     { name: "Home", link: "/home" },
//     { name: "Properties", link: "/properties" },
//     { name: "Developers", link: "/developers" },
//     { name: "About Us", link: "/about-us" },
//     { name: "Contact Us", link: "/contact-us" },
//   ];

//   return (
//     <nav className="flex justify-between items-center fixed px-[50px] lg:px-[100px] z-50  top-0 left-0 py-4  w-[100vw]">
//       <img src="/logo.png" alt="Red State logo" width={120} priority />

//       <ul className=" space-x-4 md:flex hidden">
//         {links.map(({ name, link }) => (
//           <li key={link}>
//             <Link
//               href={link}
//               className={`px-2 py-2 ${
//                 pathname === link
//                   ? "text-red-600 font-bold border-b-2 border-red-600"
//                   : pathname === "/about-us" ||
//                     pathname === "/properties" ||
//                     /^\/properties\/[^/]+$/.test(pathname)
//                   ? "text-black"
//                   : ""
//               } `}
//             >
//               {name}
//             </Link>
//           </li>
//         ))}
//       </ul>

//       <HiOutlineMenuAlt3 />
//     </nav>
//   );
// };

// export default Navbar;
// "use client";

// import React, { useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { HiOutlineMenuAlt3 } from "react-icons/hi";

// const Navbar = () => {
//   const pathname = usePathname();
//   const [isMenuOpened, setIsMenuOpened] = useState(false);

//   const links = [
//     { name: "Home", link: "/home" },
//     { name: "Properties", link: "/properties" },
//     { name: "Developers", link: "/developers" },
//     { name: "About Us", link: "/about-us" },
//     { name: "Contact Us", link: "/contact-us" },
//   ];

//   const handleMenuToggle = () => {
//     setIsMenuOpened(!isMenuOpened);
//   };

//   return (
//     <nav className="flex justify-between items-center fixed px-[50px] lg:px-[100px] z-50 top-0 left-0 py-4 w-[100vw] ">
//       <img src="/logo.png" alt="Red State logo" width={120} />

//       {/* Desktop Links */}
//       <ul className="space-x-4 md:flex hidden">
//         {links.map(({ name, link }) => (
//           <li key={link}>
//             <Link
//               href={link}
//               className={`px-2 py-2 ${
//                 pathname === link
//                   ? "text-red-600 font-bold border-b-2 border-red-600"
//                   : pathname === "/about-us" ||
//                     pathname === "/properties" ||
//                     pathname === "/developers" ||
//                     /^\/properties\/[^/]+$/.test(pathname)
//                   ? "text-black"
//                   : ""
//               }`}
//             >
//               {name}
//             </Link>
//           </li>
//         ))}
//       </ul>

//       {/* Mobile Menu Icon */}
//       <span className="text-primary md:hidden">
//         <HiOutlineMenuAlt3
//           className=" cursor-pointer"
//           onClick={handleMenuToggle}
//           size={30}
//         />
//       </span>

//       {/* Mobile Menu */}
//       {isMenuOpened && (
//         <ul className="absolute top-16 left-0 w-full bg-white  flex flex-col items-center space-y-4 py-4 shadow-md md:hidden">
//           {links.map(({ name, link }) => (
//             <li key={link}>
//               <Link
//                 href={link}
//                 className={`px-2 py-2 ${
//                   pathname === link
//                     ? "text-red-600 font-bold border-b-2 border-red-600"
//                     : "text-black"
//                 }`}
//                 onClick={() => setIsMenuOpened(false)} // Close menu on click
//               >
//                 {name}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       )}
//     </nav>
//   );
// };

// export default Navbar;
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import Image from "next/image";

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const links = [
    { name: "Home", link: "/" },
    { name: "Properties", link: "/properties" },
    { name: "Developers", link: "/developers" },
    { name: "About Us", link: "/about-us" },
    { name: "Contact Us", link: "/contact-us" },
  ];

  const handleMenuToggle = () => {
    setIsMenuOpened(!isMenuOpened);
  };

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`flex justify-between items-center fixed px-[50px] lg:px-[100px] z-50 top-0 left-0 py-4 w-[100vw] transition-all duration-300 ${
        isScrolled
          ? "bg-white/30 backdrop-blur-md shadow-md text-black"
          : "bg-transparent"
      }`}
    >
      {/* <img src="/logo.png" alt="Red State logo" width={120} /> */}
      <Image
        src="/logo.png"
        alt="Red State logo"
        width={120}
        height={0} // Temporary placeholder, not needed with layout="intrinsic"
        layout="intrinsic"
        className={
          isScrolled
            ? `brightness-75`
            : pathname === "/about-us" ||
              pathname === "/properties" ||
              pathname === "/developers" ||
              pathname === "/privacy-policy" ||
              /^\/properties\/[^/]+$/.test(pathname) ||
              /^\/developers\/[^/]+$/.test(pathname)
            ? "brightness-75"
            : ""
        }
      />
      {/* <Image src="/logo.png" alt="Red State logo" width={120} height={auto} /> */}

      {/* Desktop Links */}
      <ul className="space-x-4 md:flex hidden">
        {links.map(({ name, link }) => (
          <li key={link}>
            <Link
              href={link}
              prefetch={true}
              className={`px-2 py-2 ${
                pathname === link
                  ? "text-red-600 font-bold border-b-2 border-red-600"
                  : pathname === "/about-us" ||
                    pathname === "/properties" ||
                    pathname === "/developers" ||
                    pathname === "/privacy-policy" ||
                    /^\/properties\/[^/]+$/.test(pathname) ||
                    /^\/developers\/[^/]+$/.test(pathname)
                  ? "text-black"
                  : ""
              }`}
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile Menu Icon */}
      <span className="text-primary md:hidden">
        <HiOutlineMenuAlt3
          className="cursor-pointer"
          onClick={handleMenuToggle}
          size={30}
        />
      </span>

      {/* Mobile Menu */}
      {isMenuOpened && (
        <ul className="absolute top-0 right-0 py-[40px] w-[80%] h-[100vh] rounded-l-[90px] bg-primary flex flex-col items-center justify-between space-y-4 py-4 shadow-md md:hidden">
          <div className="flex flex-col gap-8">
            <div className="border-b border-white">
              <img
                src="/logo.png"
                className="w-[200px] py-3 object-contain grayscale-50"
              />
            </div>

            {links.map(({ name, link }) => (
              <li key={link} className="text-white text-xl">
                <Link
                  href={link}
                  className={`px-2 py-2 ${
                    pathname === link ? "font-bold " : "font-normal"
                  }`}
                  onClick={() => setIsMenuOpened(false)} // Close menu on click
                >
                  {name}
                </Link>
              </li>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row gap-5 justify-between  py-2">
            <div className="order-1 lg:order-0 flex flex-col gap-3 text-base">
              <div>Khalij tujari 2, Dubai</div>
              <Link target="_blank" href="https://wa.me/+971522172300">
                +971 522 17 2300
              </Link>
            </div>
            <div className="order-0 lg:order-1 flex flex-col gap-3">
              <span>GET IN TOUCH</span>
              <p className="text-xl font-semibold">Info@redestate.ae</p>
            </div>
          </div>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
