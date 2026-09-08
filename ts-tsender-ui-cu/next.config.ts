import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export', // Tells Next.js not to expect a Node.js server and to export the app as static app
  distDir: 'out',
  images: {
    unoptimized: true, // Tells Next.js not to optimize images and to use the original image files as-is
  },
  basePath: "",
  assetPrefix: "./",
  trailingSlash: true,
};

export default nextConfig;
