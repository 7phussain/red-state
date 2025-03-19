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
    { name: "Privacy Policy", link: "/home" },
    // { name: "TERM OF USE", link: "/properties" },
    // { name: "Legal Disclaimer", link: "/properties" },
    // { name: "COOKIEPOLICY", link: "/developers" },
  ];
  return (
    <div
      className="bg-primary text-base py-6 overflow-hidden"
      style={{
        backgroundImage: "url(/circle-design.png)",
        backgroundBlendMode: "soft-light",
      }}
    >
      <div className="flex flex-col gap-6 mt-5 pt-5">
        <div className="flex flex-col lg:flex-row gap-5 justify-between md:px-[50px] lg:px-[70px] xl:px-[100px] px-[30px] py-2">
          <div className="order-1 lg:order-0 flex flex-col gap-3 text-base">
            <div>Khalij tujari 2, Dubai</div>
            <a target="_blank" href="https://wa.me/+971522172300">
              +971 522 17 2300
            </a>
          </div>
          <div className="order-0 lg:order-1 flex flex-col gap-3">
            <span>GET IN TOUCH</span>
            <p className="text-3xl md:text-5xl font-semibold">
              Info@redestate.ae
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 w-full md:px-[50px] lg:px-[70px] xl:px-[100px] px-[30px] pt-5 pb-2">
          <div className="w-full h-fit flex items-center justify-center flex-col lg:flex-row gap-2">
            {links?.map((link, ind) => {
              return (
                <Link key={ind} href={link?.link}>
                  {link?.name}
                </Link>
              );
            })}
          </div>
          <div className="w-full h-fit flex flex-col items-center justify-center lg:flex-row gap-2">
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
          <div className="text-[19vw] font-bold relative leading-none">
            REDESTATE
          </div>
        </div>
        {/* <h2 className="2xl:text-[320px] xl:text-[280px]  lg:text-[240px] md:text-[200px] sm:text-[150px] text-[60px] font-bold relative -left-[0px] sm:-left-[40px]  lg:-left-[80px]">
          REDESTATE
        </h2> */}
        <div className="grid grid-cols-1 lg:grid-cols-3 md:px-[50px] lg:px-[70px] xl:px-[100px] px-[30px] gap-5">
          <div className="col-span-2 order-1 lg:order-0 flex flex-wrap justify-center lg:justify-start gap-1">
            Copyright {new Date().getFullYear()} RedEstate. All Rights Reserved
            by
            <a
              href="https://dodeal.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              DODEAL
            </a>
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
