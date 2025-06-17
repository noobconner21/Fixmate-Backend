//fetch all the posts

import { StatusCodes } from "http-status-codes";
import superbase from "../database/connect.mjs";
import { system_error, user_error } from "../responses/ErrorResponse.mjs";
import { upload_profile_pic } from "../utils/cloudinary.mjs";



//Feed for all users
export const get_all_posts = async (next) => {
    try {
        const {data:Posts , error:DataFetchError} = await superbase.from("posts").select("*");
        if (DataFetchError) {
            console.log(DataFetchError);
        }
        return Posts        
    } catch (error) {
        console.log(error);
    }
}


//Create post

export const create_post_service = async (images,folder,user_id,title,description,next) => {
    try {
        const {data:PostAuthor,error:PostAuthorFindError} = await superbase.from("users").select("user_id").eq("user_id",user_id).single()
        if (!PostAuthor) {
            return next(new user_error("Invalid user id",StatusCodes.BAD_REQUEST))
        }
        if (PostAuthorFindError) {
            return next(new system_error(PostAuthorFindError.details,StatusCodes.INTERNAL_SERVER_ERROR))
        }


        const imageUrls = []
        for(const file of images){
            const imagePath = file.path
            const image_url = await upload_profile_pic(imagePath,user_id,folder)
            imageUrls.push(image_url)
        }

    const {data:CreatedPost,error:CreatePostError} = await superbase.from("posts").insert({"post_title":title,"post_description":description,"post_author_id":user_id,"post_images":imageUrls}).select("*").single()
    console.log(CreatedPost);
    if (CreatePostError) {
        console.log(CreatePostError);
        
    }
    
       
        
        
    } catch (error) {
        return next(new system_error(error.message,StatusCodes.INTERNAL_SERVER_ERROR))
    }
    
}