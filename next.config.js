/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['res.cloudinary.com'], // Add Cloudinary domain here
    unoptimized: true, // Keep if you're not optimizing images
  },
  output: 'standalone',
  // Ensure proper handling of trailing slashes
  trailingSlash: true,
};

module.exports = nextConfig;
