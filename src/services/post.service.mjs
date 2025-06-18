//fetch all the posts

import { getStatusCode, StatusCodes } from "http-status-codes";
import superbase from "../database/connect.mjs";
import { system_error, user_error } from "../responses/ErrorResponse.mjs";
import { upload_profile_pic } from "../utils/cloudinary.mjs";





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


//Delete post
export const delete_post_service = async (post_id) => {
    try {

        const {data:delete_post,error:deletederror} = await superbase.from("posts").delete().eq("post_id",post_id).select();
        console.log("delete",delete_post);
        if (delete_post.length == 0) {
            return {"succuss":false,"msg":"Cant find post"}
        }
        if (deletederror) {
            console.log(deletederror);
            
            throw new system_error(deletederror.details,getStatusCode.INTERNAL_SERVER_ERROR)
        }
        console.log(delete_post);
        return {"succuss":true,"msg":"Post deleted"}
    } catch (error) {
        throw error;
    }
}



//Get all the posts in database
export const get_all_posts_service = async () => {
    try {
        const {data:posts,error:postError} = await superbase.from("posts").select(`
        post_id, 
        post_title, 
        post_description, 
        post_comment_count, 
        post_react, 
        post_author_id, 
        post_images, 
        author_name:users!posts_post_author_id_fkey(user_name),
        author_profile_pic:users!posts_post_author_id_fkey(profile_pic)
      `)
        if (!posts || posts.length == 0) {
            return {"succuss":false,"msg":"Posts not found"}
        }
        if (postError) {
            throw new system_error(PostgresError.details,StatusCodes.INTERNAL_SERVER_ERROR)
        }
        return {"succuss":true,"msg":"Post fetched","data":posts}

    } catch (error) {
        throw error
    }
}


//update_post
export const update_post_service = async (post_id,post_data) => {
    try {
        const {data:updatePost , error:updatePostError} = await superbase.from("posts").update(post_data).eq("post_id",post_id).select().single()
        if (!updatePost) {
            return {"succuss":false,"msg":"Something went wrong went updating posts"}
        }
        if (updatePostError) {
            throw new system_error(updatePostError.details,StatusCodes.INTERNAL_SERVER_ERROR)
        }
        return {"succuss":true,"msg":"Post updated"}
    } catch (error) {
        throw error
    }
}