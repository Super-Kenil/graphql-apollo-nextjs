/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: "res.cloudinary.com",
        protocol: "https",
      },
      {
        hostname: "ap-south-1.graphassets.com",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
