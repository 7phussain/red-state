/** @type {import('next').NextConfig} */
const nextConfig = {
  crossOrigin: "anonymous",
  //   async rewrites() {
  //     return [
  //       {
  //         source: "/api/:path*", // Matches any request under `/api/`
  //         destination: "https://test.hikalcrm.com/api/:path*", // Redirects to the backend
  //       },
  //     ];
  //   },
};

export default nextConfig;
