import { StatusCodes } from "http-status-codes"
import { system_error, user_error } from "../responses/ErrorResponse.mjs"
import { create_comment_service } from "../services/comment.service.mjs";

//Get all comments to some specific post
export const get_comment_controller = async (req,res,next) => {
    try {
        //get id from req.body
        const {post_id} = req.params;
        if (!post_id) {
            return next(new user_error("Post id required"),StatusCodes.BAD_REQUEST)
        }
        console.log(post_id);
        
        //pass id to services and get posts
        //handle response
    } catch (error) {
        return next(new system_error(error.message,StatusCodes.INTERNAL_SERVER_ERROR))
    }
}


//Add comemnt to post
//required post id
//require comment content and commentor id
export const create_comment_controller = async (req,res,next) => {
    try {
        //get post id from param
        const {post_id} = req.params;
        
        //get commentor id and comment content
        const {commentor_id,comment_content} = req.body;
        
        //send post id and post content and commentor id to service
        const response = await create_comment_service(post_id,commentor_id,comment_content)
        //handle response
    } catch (error) {
        return next(new system_error(error.details,StatusCodes.INTERNAL_SERVER_ERROR))
    }
    
}