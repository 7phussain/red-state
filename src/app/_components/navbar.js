"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  const links = [
    { name: "Home", link: "/home" },
    { name: "Properties", link: "/properties" },
    { name: "Developers", link: "/developers" },
    { name: "About Us", link: "/about-us" },
    { name: "Contact Us", link: "/contact-us" },
  ];

  return (
    <nav className="flex justify-between items-center fixed px-[100px] z-50  top-0 left-0 py-4  w-[100vw]">
      <img src="/logo.png" alt="Red State logo" width={120} priority />

      <ul className="flex space-x-4">
        {links.map(({ name, link }) => (
          <li key={link}>
            <Link
              href={link}
              className={`px-2 py-2 ${
                pathname === link
                  ? "text-red-600 font-bold border-b-2 border-red-600"
                  : pathname === "/about-us" ||
                    pathname === "/properties" ||
                    /^\/properties\/[^/]+$/.test(pathname)
                  ? "text-black"
                  : ""
              } `}
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
