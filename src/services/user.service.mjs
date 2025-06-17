import { StatusCodes } from "http-status-codes";
import superbase from "../database/connect.mjs";
import { system_error, user_error } from "../responses/ErrorResponse.mjs";
import { get_all_posts } from "./post.service.mjs";
import { upload_profile_pic } from "../utils/cloudinary.mjs";

//User registration service
export const user_register_service = async (user_id, name, email, next) => {
    try {
        //Check user existance
        const {data: existingUser, error: existingUserError} = await superbase.from("users").select("user_id").eq("user_id",user_id).single()
        if (existingUser) {
            console.log("exists suer:" ,existingUser);
            return next(new user_error("User already exists!",StatusCodes.BAD_REQUEST))
        }
        
        //if not exists then create record
        const {data:User,error:UserError} = await superbase.from("users").insert([{ user_name:name, user_id: user_id, user_email: email }]).select("user_name").single();
        if (UserError) {
            return next(new system_error("Something went wrong when registering user",StatusCodes.INTERNAL_SERVER_ERROR))
        }
        return User
    } catch (error) {
        return next(new system_error(error.message,StatusCodes.INTERNAL_SERVER_ERROR))
    } 
};

//Fetch user information
export const fetch_user_info_and_posts = async (user_id,next) => {
    try {
        const {data:UserData,error:UserDataError} = await superbase.from("users").select("*").eq("user_id",user_id).single()
        
        if (!UserData) {
            return next(new user_error("Invalid user id",StatusCodes.BAD_REQUEST))
        }
        
        if (UserDataError) {
            return next(new system_error(UserDataError.details,StatusCodes.BAD_REQUEST))
        }
  
              
        //Getting all post information
        const posts = await get_all_posts(next);
        if (!posts || !UserData) {
            return next(new system_error("Error fetching data",StatusCodes.INTERNAL_SERVER_ERROR))
        }
        return {
            user:UserData,
            posts
        }
    } catch (error) {
        return next(error.message,StatusCodes.BAD_REQUEST)
    }
    
}

//Update profile
export const update_profile_service = async (user_id,name,fileArray,next) => {
    try {
        const imageUrls = []
        for(const file of fileArray){
            const imagePath = file.path
            const image_url = await upload_profile_pic(imagePath,user_id)
            imageUrls.push(image_url)
        }
        console.log(user_id);
        
        const {data:User , error:UserCantFindError} = await superbase.from("users").select("user_id").eq("user_id",user_id).single()

        if (!User) {
            return next(new user_error("User cant find",StatusCodes.BAD_REQUEST)) 
        }

        if (UserCantFindError) {
            return next(new system_error(UserCantFindError.details,StatusCodes.INTERNAL_SERVER_ERROR))
        }

        const {data:UpdatedUser,error:UpdateError} = await superbase.from("users").update({user_name:name,profile_pic:imageUrls[0]}).eq("user_id",user_id).select("*").single()
        if (UpdateError) {
            return next(new system_error(UpdateError.details,StatusCodes.INTERNAL_SERVER_ERROR))
        }
        if (UpdatedUser) {
            return UpdatedUser
        }
        
    } catch (error) {
        console.log(error);
    }
}


