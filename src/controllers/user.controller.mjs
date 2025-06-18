import { StatusCodes } from "http-status-codes";
import { fetch_user_info_and_posts, user_register_service } from "../services/user.service.mjs";
import { SendResponse } from "../responses/SuccussResponse.mjs";
import { get_all_posts_service } from "../services/post.service.mjs";
import { user_error } from "../responses/ErrorResponse.mjs";


//User register controller
export const user_register_controller = async (req, res, next) => {
    try {
        const { user_id, name, email } = req.body;
        console.log(user_id);
        
        const user = await user_register_service(user_id, name, email, next);
        if (user) {
            // Send success response after successful registration
            return res.status(StatusCodes.CREATED).json({
            message: "User registered successfully",
            "success": true,
            user: user
        });
        }

        
    } catch (error) {
        console.log(error);
        return next(error); 
    }
};

//Get userprofile info and all posts when dashboard loads
export const get_user_profile_posts_controller = async (req,res,next) => {
    try {
        const {id} = req.params;
        console.log(id);
        
        const data = await fetch_user_info_and_posts(id,next);
        if (data) {
            return SendResponse("Succuss",StatusCodes.OK,data,res)
        }
    } catch (error) {
        console.log(error);
    }
}


