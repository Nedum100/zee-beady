/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['res.cloudinary.com'], // Add Cloudinary domain here
    unoptimized: true, // Keep if you're not optimizing images
  },
};

module.exports = nextConfig;
