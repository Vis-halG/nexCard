import { fileURLToPath } from "node:url";

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  turbopack: {
    root: fileURLToPath(new URL("..", import.meta.url)),
  },
};

export default nextConfig;
