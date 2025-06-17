import { StatusCodes } from "http-status-codes";
import { user_register_service } from "../services/user.service.mjs";


//User register controller
export const user_register_controller = async (req, res, next) => {
    try {
        const { user_id, name, email } = req.body;
        const user = await user_register_service(user_id, name, email, next);
        if (user) {
            // Send success response after successful registration
            return res.status(StatusCodes.CREATED).json({
            message: "User registered successfully",
            user: user
        });
        }

        
    } catch (error) {
        console.log(error);
        return next(error); 
    }
};
