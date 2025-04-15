import Link from "next/link";
import React from "react";

const Footer = () => {
  const links = [
    { name: "Home", link: "/" },
    { name: "Properties", link: "/properties" },
    { name: "Developers", link: "/developers" },
    { name: "About Us", link: "/about-us" },
    { name: "Contact Us", link: "/contact-us" },
  ];
  const socialLinks = [
    {
      name: "INSTAGRAM",
      link: "https://www.instagram.com/redestate1?igsh=MWVuYmRibTAxa3B3aw== ",
    },
    {
      name: "FACEBOOK",
      link: "https://www.facebook.com/share/19Rsvzco95/?mibextid=wwXIfr",
    },
    { name: "LINKEDIN", link: "https://www.linkedin.com/company/red-estate/" },
    // { name: "YOUTUBE", link: "/about-us" },
    {
      name: "TIKTOK",
      link: "https://www.tiktok.com/@redestate1?_t=ZS-8uoQKzLQArq&_r=1",
    },
  ];
  const termsLinks = [
    { name: "Privacy Policy", link: "/privacy-policy" },
    // { name: "TERM OF USE", link: "/properties" },
    // { name: "Legal Disclaimer", link: "/properties" },
    // { name: "COOKIEPOLICY", link: "/developers" },
    { name: "Login", link: "/admin" },
  ];
  return (
    <div
      className="bg-primary text-sm font-light py-6 overflow-hidden"
      style={{
        backgroundImage: "url(/circle-design.png)",
        backgroundBlendMode: "soft-light",
      }}
    >
      <div className="flex flex-col gap-[20px] mt-5 py-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:px-[50px] lg:px-[70px] xl:px-[100px] px-[30px]">
          <div className="order-1 lg:order-0 flex flex-col gap-2 text-base">
            <div className="pb-0.1 border-b border-white w-fit">
              Khalij tujari 2, Dubai
            </div>
            <Link
              target="_blank"
              href="https://wa.me/+971522172300"
              className="pb-0.1 border-b border-white w-fit"
            >
              +971 522 17 2300
            </Link>
          </div>
          <div className="order-0 lg:order-1 flex flex-col">
            <span>GET IN TOUCH</span>
            <Link
              href="mailto:info@redestate.ae"
              target="_blank"
              className="text-3xl md:text-5xl font-semibold"
            >
              info@redestate.ae
            </Link>
          </div>
        </div>
        <div className="uppercase grid grid-cols-1 lg:grid-cols-2 gap-5 md:px-[50px] lg:px-[70px] xl:px-[100px] px-[30px] pt-5 mt-5">
          <div className="w-full h-fit flex flex-wrap items-center justify-center lg:justify-start gap-4">
            {links?.map((link, ind) => {
              return (
                <Link key={ind} href={link?.link}>
                  {link?.name}
                </Link>
              );
            })}
          </div>
          <div className="w-full flex flex-wrap items-center justify-center lg:justify-end gap-4">
            {socialLinks?.map((link, ind) => {
              return (
                <Link key={ind} href={link?.link} target="_blank">
                  {link?.name}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="w-[100vw] flex items-center justify-center">
          <div className="text-[19vw] font-bold relative leading-none m-0 p-0">
            REDESTATE
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 md:px-[50px] lg:px-[70px] xl:px-[100px] px-[30px] gap-5">
          <div className="col-span-2 order-1 lg:order-0 flex flex-wrap justify-center lg:justify-start items-center gap-1">
            <span>@{new Date().getFullYear()} RedEstate.</span>
            <span>All Rights Reserved by</span>
            <Link
              href="https://dodeal.com"
              rel="noopener noreferrer"
              target="_blank"
              className="font-bold text-lg hover:text-[#00af6b]"
              style={{
                textShadow: "1px 1px 0px #00af6b, 2px 2px 0px #022334",
              }}
            >
              DODEAL
            </Link>
          </div>
          <div className="order-0 lg:order-1 flex justify-center gap-4 lg:justify-end">
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
