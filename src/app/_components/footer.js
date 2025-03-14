import Link from "next/link";
import React from "react";

const Footer = () => {
  const links = [
    { name: "Home", link: "/home" },
    { name: "Properties", link: "/properties" },
    { name: "Developers", link: "/developers" },
    { name: "About Us", link: "/about-us" },
    { name: "Contact Us", link: "/contact-us" },
  ];
  const socialLinks = [
    { name: "INSTAGRAM", link: "/home" },
    { name: "FACEBOOK", link: "/properties" },
    { name: "LINKEDIN", link: "/developers" },
    { name: "YOUTUBE", link: "/about-us" },
  ];
  const termsLinks = [
    { name: "Privacy Policy", link: "/home" },
    { name: "TERM OF USE", link: "/properties" },
    { name: "Legal Disclaimer", link: "/properties" },
    { name: "COOKIEPOLICY", link: "/developers" },
  ];
  return (
    <div
      className="bg-primary  py-8 overflow-hidden"
      style={{
        backgroundImage: "url(/circle-design.png)",
        backgroundBlendMode: "soft-light",
      }}
    >
      <div className="flex lg:flex-row flex-col gap-7 justify-between md:px-[50px] lg:px-[100px] px-[30px] ">
        <div className="flex flex-col gap-3">
          <span className="underline">Khalij tujari 2, Dubai</span>
          <span className="underline">+971 52 217 2300</span>
        </div>
        <div className="flex flex-col gap-3">
          <span>GET IN TOUCH</span>
          <p className="md:text-5xl sm:text-4xl text-[18px] font-semibold">
            marketing@redstate.com
          </p>
        </div>
      </div>
      <div className="flex justify-between w-full pt-[70px] md:px-[50px] lg:px-[100px] px-[30px] ">
        <div className="flex lg:flex-row flex-col gap-3">
          {links?.map((link, ind) => {
            return (
              <Link key={ind} href={link?.link}>
                {link?.name}
              </Link>
            );
          })}
        </div>
        <div className="flex lg:flex-row flex-col gap-3">
          {socialLinks?.map((link, ind) => {
            return (
              <Link key={ind} href={link?.link}>
                {link?.name}
              </Link>
            );
          })}
        </div>
      </div>
      <h2 className="2xl:text-[320px] xl:text-[280px]  lg:text-[240px] md:text-[200px] sm:text-[150px] text-[60px] font-bold relative -left-[0px] sm:-left-[40px]  lg:-left-[80px]">
        REDESTATE
      </h2>
      <div className="flex justify-between md:px-[50px] lg:px-[100px] px-[30px] md:flex-row flex-col items-center gap-4 ">
        <p className="md:order-1 order-2 ">
          @2025 REDESTATE ALL RIGHTS RESERVED
        </p>
        <div className="md:order-2 order-1">
          <div className="grid sm:grid-cols-4  grid-cols-2 gap-3">
            {termsLinks?.map((link, ind) => {
              return (
                <Link key={ind} href={link?.link}>
                  {link?.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
