/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["testing.hikalcrm.com"],
  },
  // async redirects() {
  //   return [
  //     {
  //       source: "/",
  //       destination: "/home",
  //       permanent: true,
  //     },
  //   ];
  // },
};

export default nextConfig;
