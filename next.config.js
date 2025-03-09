/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true, // For static export compatibility
  },
  output: 'export', // Static HTML export for Cloudflare Pages
};

module.exports = nextConfig; 