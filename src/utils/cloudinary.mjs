import { v2 as cloudinary } from 'cloudinary'
import ENV from './ENV.mjs';


cloudinary.config({
    cloud_name:ENV.CLOUD_NAME,
    api_key:ENV.API_KEY,
    api_secret:ENV.API_SECRET,
    secure: true
    
});

export const upload_profile_pic = async (imagePath,user_id) => {
    const options = {
      use_filename: true,
      unique_filename: true,
      overwrite: true,
      folder:"profilepic",
      public_id: `profilepic/${user_id}/${Date.now()}`,
    };

    try {
      const result = await cloudinary.uploader.upload(imagePath, options);
      console.log(result.url);
      
      return result.url;
    } catch (error) {
      console.error(error);
    }
};




