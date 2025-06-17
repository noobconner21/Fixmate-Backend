//fetch all the posts

import { StatusCodes } from "http-status-codes";
import superbase from "../database/connect.mjs";
import { system_error, user_error } from "../responses/ErrorResponse.mjs";
import { upload_profile_pic } from "../utils/cloudinary.mjs";

import { SendResponse } from "../responses/SuccussResponse.mjs";



//Feed for all users
export const get_all_posts = async (user_id,next) => {
    try {
        const {data:Posts , error:DataFetchError} = await superbase.from("posts").select(`
        post_id, 
        post_title, 
        post_description, 
        post_comment_count, 
        post_react, 
        post_author_id, 
        post_images, 
        author_name:users!posts_post_author_id_fkey(user_name)
      `)
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
    if (!CreatedPost) {
        return next(system_error("Something went wrong went createing post!!",StatusCodes.INTERNAL_SERVER_ERROR))
    }
    if (CreatePostError) {
        return next(system_error(CreatePostError.details,StatusCodes.INTERNAL_SERVER_ERROR))
    }

    return CreatedPost
    } catch (error) {
        return next(new system_error(error.message,StatusCodes.INTERNAL_SERVER_ERROR))
    }
    
}


//Get posts via admin id
// Get posts via admin id
export const get_posts_service = async (admin_id, next) => {
    try {
        const {data: existsUser, error: userExistsError} = await superbase.from("users").select("user_id").eq("user_id", admin_id).single();
        if (!existsUser) {
            // Return null instead of calling next to prevent halting execution
            return null; 
        }

        if (userExistsError) {
            console.log(userExistsError.details);  // Log for debugging
            return null;  // Return null to prevent crashing the app
        }

        const {data: posts, error: postError} = await superbase.from("posts").select("*").eq("post_author_id", admin_id);
        if (postError) {
            console.log(postError);  // Log for debugging
            return null;  // Return null if there is an error fetching posts
        }

        return posts;  // Return the posts if no errors
    } catch (error) {
        console.log(error);  // Log the error
        return null;  // Return null if any error occurs, so the controller can handle it
    }
};
