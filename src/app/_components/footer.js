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
      <div className="flex justify-between px-[100px]">
        <div className="flex flex-col gap-3">
          <span className="underline">Khalij tujari 2, Dubai</span>
          <span className="underline">+971 52 217 2300</span>
        </div>
        <div className="flex flex-col gap-3">
          <span>GET IN TOUCH</span>
          <p className="text-5xl font-semibold">marketing@redstate.com</p>
        </div>
      </div>
      <div className="flex justify-between w-full pt-[70px] px-[100px]">
        <div className="flex gap-3">
          {links?.map((link, ind) => {
            return (
              <Link key={ind} href={link?.link}>
                {link?.name}
              </Link>
            );
          })}
        </div>
        <div className="flex gap-3">
          {socialLinks?.map((link, ind) => {
            return (
              <Link key={ind} href={link?.link}>
                {link?.name}
              </Link>
            );
          })}
        </div>
      </div>
      <h2 className="text-[320px]  font-bold relative -left-[80px]">
        REDESTATE
      </h2>
      <div className="flex justify-between px-[100px]">
        <p>@2025 REDESTATE ALL RIGHTS RESERVED</p>
        <div>
          <div className="flex gap-3">
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
