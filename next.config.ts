import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Basic redirect
      {
        source: "/generate",
        destination: "/",
        permanent: true,
      },
      // Wildcard path matching
      // {
      //   source: '/blog/:slug',
      //   destination: '/news/:slug',
      //   permanent: true,
      // },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.licdn.com",
        port: "",
        pathname: "/dms/image/**",
      },
    ],
  },
  experimental: {
    turbo: {
      resolveAlias: {
        canvas: "./empty-module.ts",
      },
    },
  },
  // Fix for "Can't resolve 'canvas'" error in pdfjs
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    return config;
  },
};

export default nextConfig;
