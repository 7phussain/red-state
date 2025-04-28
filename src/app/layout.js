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
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const plusSans = Plus_Jakarta_Sans({
  // ✅ Use Plus_Jakarta_Sans here
  variable: "--font-plus-sans", // ✅ Correct variable name
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "RED ESTATE",
  description: "RED ESTATE",
  icons: {
    icon: "/icon.ico",
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

        {/* Meta Pixel Code */}
        {/* <link rel="icon" href="/fav.png?v=2" type="image/png" sizes="32x32" /> */}
        <link rel="icon" href="/icon.ico" />
        <link rel="manifest" href="/logo.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="apple-touch-icon" href="/logo.png" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://redestate.ae/logo.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://redestate.ae" />
        <meta property="og:image:type" content="image/png" />
        <meta name="twitter:card" content="summary_large_image"></meta>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?                         
              n.callMethod.apply(n,arguments):n.queue.push   
              (arguments)}; if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!
              0;n.version='2.0';n.queue=[];t=b.createElement(e);
              t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,
              'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1032827804874469');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=YOUR_PIXEL_ID&ev=
            PageView&noscript=1"
          />
        </noscript>
        {/* End Meta Pixel Code */}

        {/* TIKTOK */}
        {/* <script
          dangerouslySetInnerHTML={{
            __html: `
              !function (w, d, t) {
              w.TiktokAnalyticsObject = t;
              var ttq=w[t]=w[t]||[];
              ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],
              ttq.setAndDefer=function(t,e){
                t[e] = function () { 
                  t.push([e].concat(Array.prototype.slice.call(arguments, 0))) 
                }
              };
              for(var i=0;i<ttq.methods.length;i++)
                ttq.setAndDefer(ttq,ttq.methods[i]);
                ttq.instance=function(t){
              for( var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)
                ttq.setAndDefer(e,ttq.methods[n]);
                return e
              },ttq.load=function(e,n){
                var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;
                ttq._i=ttq._i||{ },
                ttq._i[e]=[],
                ttq._i[e]._u=r,
                ttq._t=ttq._t||{ },
                ttq._t[e]=+new Date,
                ttq._o=ttq._o||{ },
                ttq._o[e]=n||{ };
                n=document.createElement("script");
                n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;
                e=document.getElementsByTagName("script")[0];
                e.parentNode.insertBefore(n,e)
              };
              ttq.load('CPEA9IBC77U1S6M0C760');
              ttq.page();
            }(window, document, 'ttq');
            `,
          }}
        /> */}
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
