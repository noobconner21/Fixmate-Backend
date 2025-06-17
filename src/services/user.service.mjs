import { StatusCodes } from "http-status-codes";
import superbase from "../database/connect.mjs";
import { system_error, user_error } from "../responses/ErrorResponse.mjs";
import { get_all_posts } from "./post.service.mjs";

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


