import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const getCloudinaryUrl = (publicId: string, options = {}) => {
  const defaultOptions = {
    width: 800,
    quality: 'auto',
    format: 'auto',
    crop: 'fill',
  };

  const mergedOptions = { ...defaultOptions, ...options };
  
  return cloudinary.url(publicId, mergedOptions);
};

export default cloudinary;
