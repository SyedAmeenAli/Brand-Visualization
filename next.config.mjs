/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  // Photos are pre-optimised WebP (max 1800px). Serving them directly removes the runtime optimiser as a failure point.
  images: { unoptimized: true },
  experimental: { optimizePackageImports: ['framer-motion'] },
};
export default nextConfig;
