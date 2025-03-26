import { Geist, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/navbar";
import ContactUs from "./_components/ContactUs";
import Footer from "./_components/footer";
import WhatsAppButton from "./_components/WhatsappButton";

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
  title: "RED STATE",
  description: "REAL STATE WEBSITE",
  icons: {
    icon: "/fav.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={` ${plusSans.variable} antialiased max-w-[100vw] text-white`}
      >
        <Navbar />
        {children}
        <ContactUs />
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
