import { Geist, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import SubLayout from "./sublayout";
import { ToastContainer } from "react-toastify";
import AnalyticsHead from "./AnalyticsHead";
import AnalyticsBody from "./AnalyticsBody";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const plusSans = Plus_Jakarta_Sans({
  // ✅ Use Plus_Jakarta_Sans here
  variable: "--font-plus-sans", // ✅ Correct variable name
  subsets: ["latin"],
});

export const metadata = {
  title: "RED ESTATE",
  description: "RED ESTATE",
  icons: {
    icon: "/fav.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="5GDWX1MSrnVzEp4ZQKJ8j9aq1hoEF7uenPZQMmzYG8E"
        />
        {/* PIXEL */}
        {/* <AnalyticsHead /> */}
      </head>

      <body
        className={` ${plusSans.variable} antialiased max-w-[100vw] text-white min-h-screen`}
      >
        {/* PIXELS */}
        {/* <AnalyticsBody /> */}
        <ToastContainer position="top-right" autoClose={3000} />
        {/* <Navbar /> */}
        <SubLayout>{children}</SubLayout>
        {/* {children}
        <ContactUs />
        <Footer />
        <WhatsAppButton /> */}
      </body>
    </html>
  );
}
