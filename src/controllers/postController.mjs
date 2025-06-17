import { StatusCodes } from "http-status-codes"
import { user_error } from "../responses/ErrorResponse.mjs";
import { create_post_service } from "../services/post.service.mjs";
import { SendResponse } from "../responses/SuccussResponse.mjs";

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