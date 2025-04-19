"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { PiCheckCircleDuotone } from "react-icons/pi";

const ContactUs = () => {
  const pathname = usePathname();
  const [submissionStatus, setSubmissionStatus] = useState("idle");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    project: "Consultation",
    bedrooms: "3 Bedrooms",
    leadFor: "Investment",
    note: "",
  });
  const [error, setError] = useState({ phone: "" });

  const validatePhone = (value) => {
    const phoneNumber = parsePhoneNumberFromString(value, "US");
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
      return;
    }

    const getUserIP = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
      } catch (err) {
        return null;
      }
    };

    const ip = await getUserIP();
    const deviceType = navigator.userAgent;
    const fullUrl = window.location.href;

    // Email content to send to SEND_TO (info@dodeal.com)
    const emailMessage = `
      <h1>New Contact Form Submission</h1>
      <p><strong>Name:</strong> ${formData.name}</p>
      <p><strong>Phone:</strong> ${formData.phone}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Project:</strong> ${formData.project}</p>
      <p><strong>Bedrooms:</strong> ${formData.bedrooms}</p>
      <p><strong>Property For:</strong> ${formData.leadFor}</p>
      <p><strong>Note:</strong> ${formData.note}</p>
      <p><strong>User IP:</strong> ${ip || 'N/A'}</p>
      <p><strong>Device:</strong> ${deviceType}</p>
      <p><strong>URL:</strong> ${fullUrl}</p>
    `;
    const emailSubject = `New Contact Form Submission from ${formData.name}`;

    try {
      // Send email to SEND_TO using /api/send-email
      const emailResponse = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: process.env.SEND_TO || 'info@dodeal.com', // Use SEND_TO from .env.local
          subject: emailSubject,
          message: emailMessage,
        }),
      });

      const emailResult = await emailResponse.json();
      if (!emailResponse.ok) {
        throw new Error(emailResult.error || 'Failed to send email');
      }

      // Reset form and show success
      setFormData({
        name: "",
        email: "",
        phone: "",
        project: "Consultation",
        bedrooms: "3 Bedrooms",
        leadFor: "Investment",
        note: "",
      });
      setSubmissionStatus("success");
    } catch (error) {
      console.error("Error:", error);
      setSubmissionStatus("error");
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
      className={`py-6 px-[30px] md:px-[50px] lg:px-[100px] ${pathname === "/contact-us" ? "text-primary" : "text-white"
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

        {submissionStatus === "success" ? (
          <div className="text-center p-6 flex flex-col items-center justify-center gap-2">
            <PiCheckCircleDuotone size={70} className="text-green-600" />
            <p>Thank you! Your enquiry has been submitted successfully.</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col contact-us gap-5"
          >
            {/* NAME */}
            <div className="flex flex-col gap-1">
              <label className="px-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="rounded-full px-4 py-2"
                required
              />
            </div>
            {/* CONTACT EMAIL */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1">
                <label className="px-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => validatePhone(e?.target.value)}
                  placeholder="+999"
                  className="rounded-full px-4 py-2"
                  required
                />
                {error?.phone && (
                  <p className="text-white bg-primary p-2 ">{error?.phone}</p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label className="px-2">Email</label>
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
            {/* BEDROOMS FOR */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1">
                <label className="px-2">Bedrooms</label>
                <div
                  className={`rounded-full border px-4 py-2 ${pathname === "/contact-us"
                    ? "border-primary "
                    : "border-white "
                    }`}
                >
                  <select
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleChange}
                    className={`w-full bg-transparent border-none outline-none `}
                  >
                    <option value="Studio" className="text-black">
                      Studio
                    </option>
                    <option value="1 Bedroom" className="text-black">
                      1 Bedroom
                    </option>
                    <option value="2 Bedrooms" className="text-black">
                      2 Bedrooms
                    </option>
                    <option value="3 Bedrooms" className="text-black">
                      3 Bedrooms
                    </option>
                    <option value="4 Bedrooms" className="text-black">
                      4 Bedrooms
                    </option>
                    <option value="5 Bedrooms" className="text-black">
                      5 Bedrooms
                    </option>
                    <option value="Retail" className="text-black">
                      Retail
                    </option>
                    <option value="Other" className="text-black">
                      Other
                    </option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="px-2">Property For</label>
                <div
                  className={`rounded-full border px-4 py-2 ${pathname === "/contact-us"
                    ? "border-primary "
                    : "border-white "
                    }`}
                >
                  <select
                    name="leadFor"
                    value={formData.leadFor}
                    onChange={handleChange}
                    className={`w-full bg-transparent border-none outline-none `}
                  >
                    <option value="Investment" className="text-black">
                      Investment
                    </option>
                    <option value="End-user" className="text-black">
                      End-user
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="px-2">Note</label>
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
            {submissionStatus === "error" && (
              <div className="text-center flex justify-center rounded-sm">
                <p
                  className="opacity-100 text-white w-fit p-2"
                  style={{
                    background: "rgba(202, 30, 46, 0.5)"
                  }}
                >
                  Something went wrong! Please try again.
                </p>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactUs;