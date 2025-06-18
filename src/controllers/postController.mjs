import { StatusCodes } from "http-status-codes"
import { system_error, user_error } from "../responses/ErrorResponse.mjs";
import { create_post_service,delete_post_service,get_all_posts_service,get_posts_service, update_post_service } from "../services/post.service.mjs";
import { SendResponse } from "../responses/SuccussResponse.mjs";



//create post
export const create_post = async (req,res,next) => {
    try {
        const {user_id,title,description} = req.body
        if (!user_id || !title || !description) {
            return next(new user_error("All fields are required"),StatusCodes.BAD_REQUEST)
        }
        const images = req.files;  
        console.log(images);
          
        if (!images || images.legth ==0) {
            return next(new user_error("At least one image required"),StatusCodes.BAD_REQUEST)
        }
        const post = await create_post_service(images,"post_images",user_id,title,description,next)
        return SendResponse("Post creasted!!",StatusCodes.CREATED,post,res)
        
    } catch (error) {
        return next(error.message,StatusCodes.INTERNAL_SERVER_ERROR)
    }
}


// Get posts via specific admin id
export const get_posts_via_admin_id = async (req, res, next) => {
    try {
        const { id } = req.params;
        const posts = await get_posts_service(id, next); 

        if (!posts) {
            return SendResponse("Cannot find posts related to this user", StatusCodes.NOT_FOUND, null, res);
        }

        return SendResponse("Post fetched", StatusCodes.OK, posts, res); 

    } catch (error) {
        console.error(error);
        return next(error); 
    }
};

//Delete post

export const delete_post_controller = async (req,res,next) => {
    try {
        const {post_id} = req.params;
        const response = await delete_post_service(post_id)
        
        if (!response.succuss) {
            return next(new user_error(response.msg,StatusCodes.BAD_REQUEST))
        }

        return SendResponse(response.msg,StatusCodes.OK,{},res)

    } catch (error) {
        console.log(error);
    }
}

//Get all the posts
export const get_all_posts_controller =async (req,res,next) => {
    try {
        const response = await get_all_posts_service()
        if (!response.succuss) {
            return next(new user_error(response.msg,StatusCodes.BAD_REQUEST))
        }
        if (response.succuss) {
            return SendResponse(response.msg,StatusCodes.OK,response?.data,res)
        }
    } catch (error) {
      console.log(error);
        
    }
}


//Update post
export const update_post_controller = async (req,res,next) => {
    try {
        const {title,description} = req.body
        if (!title || !description) {
            return next(new user_error("All fields are required"))
        }
        const response  = await update_post_service(req.params.post_id,{"post_title":title,"post_description":description})
        if (!response.succuss) {
            return next(new user_error(response.msg,StatusCodes.BAD_REQUEST))
        }
        return SendResponse(response.msg,StatusCodes.ACCEPTED,{},res)
    } catch (error) {
        return next(new system_error(error.message,StatusCodes.INTERNAL_SERVER_ERROR))
    }
}