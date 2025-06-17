import { StatusCodes } from "http-status-codes";
import { user_error } from "../responses/ErrorResponse.mjs";
import { SendResponse } from "../responses/SuccussResponse.mjs";
import { update_profile_service } from "../services/user.service.mjs";
import { upload_profile_pic } from "../utils/cloudinary.mjs";

export const update_profile = async (req,res,next) => {
    try {
        let {user_id,name} = req.body;
        
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ success: false, message: "No file uploaded." });
        }

        if (name=="" || !name) {
            return next(new user_error("Name field required",StatusCodes.BAD_REQUEST))
        }

       const updated_user = await update_profile_service(user_id,name,req.files,next)
       return SendResponse("Profile updated!!",StatusCodes.CREATED,updated_user,res)        
        
    } catch (error) {
        console.log(error);
    }
}