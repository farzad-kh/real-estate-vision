import { v2 as cloudinary } from 'cloudinary';
const cloud_name = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
const api_key = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY
const api_secret = process.env.CLOUDINARY_API_SECRET
cloudinary.config({
    cloud_name,
    api_key,
    api_secret,
    timeout: 600000  
});
export default cloudinary