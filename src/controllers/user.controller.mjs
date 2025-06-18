import { StatusCodes } from "http-status-codes";
import { SendResponse } from "../responses/SuccussResponse.mjs";
import { user_error } from "../responses/ErrorResponse.mjs";
import { get_user_profile_service } from "../services/user.service.mjs";


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


//Get user profile
export const get_user_profile_controllere = async (req,res,next) => {
    try {
        const {user_id} = req.params;
        const response = await get_user_profile_service(user_id)
        if (!response.succuss) {
            return next(new user_error(response.msg,StatusCodes.BAD_REQUEST))
        }
        if (response.succuss) {
            return SendResponse(response.msg,StatusCodes.OK,response.data,res)
        }
    } catch (error) {
        console.log(error);
        
    }
}


