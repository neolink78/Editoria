/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://back:4000/:path*", // Proxy to Backend
      },
    ];
  },
};

module.exports = nextConfig;
