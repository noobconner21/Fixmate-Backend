import { StatusCodes } from "http-status-codes"
import { system_error, user_error } from "../responses/ErrorResponse.mjs"
import { create_comment_service, get_all_comment_service,create_notification } from "../services/comment.service.mjs";
import { SendResponse } from "../responses/SuccussResponse.mjs";

//Get all comments to some specific post
export const get_comment_controller = async (req,res,next) => {
    try {
        //get id from req.body
        const {post_id} = req.params;
        if (!post_id) {
            return next(new user_error("Post id required"),StatusCodes.BAD_REQUEST)
        }
        //pass id to services and get posts
        const response = await get_all_comment_service(post_id)
        if (!response.status) {
            return next(new user_error(response.msg,StatusCodes.BAD_REQUEST))
        }
        return SendResponse(response.msg,StatusCodes.OK,response.data,res)
        
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
        const {post_id} = req.params;
        console.log(post_id);
        
        //get post id from param
        
        
        //get commentor id and comment content
        const {commentor_id,comment_content} = req.body;
        console.log(comment_content);
        
        
        //send post id and post content and commentor id to service
        const response = await create_comment_service(post_id,commentor_id,comment_content)
        
        //handle response
        if (!response.status) {
            return next(new user_error(response.msg,StatusCodes.BAD_REQUEST))
        }

        //Create notification
        const res2 = await create_notification(post_id,commentor_id,comment_content)
        return SendResponse(response.msg,StatusCodes.CREATED,{},res)
    } catch (error) {
        console.log(error);
        
        return next(new system_error(error.details,StatusCodes.INTERNAL_SERVER_ERROR))
    }
    
}