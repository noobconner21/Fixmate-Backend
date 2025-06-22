import { StatusCodes } from "http-status-codes";
import { system_error } from "../responses/ErrorResponse.mjs";
import { getNotifyServic, NotifyMarkAsReadService } from "../services/getNotify.mjs";

export const NotifyController = async (req,res,next)=>{
    try {
        const {admin_id} = req.params;
        console.log(admin_id);
        
        const response = await getNotifyServic(admin_id)
        if (response.status === 200) {
            return res.status(200).json({
                status: "success",
                message: response.message,
                data: response.data
            });
        } else {
            return res.status(response.status).json({
                status: "error",
                message: response.message,
                error: response.error
            });
        }
        
    } catch (error) {
        return next(new system_error(error.message,StatusCodes.INTERNAL_SERVER_ERROR))
    }
}


//Notify mark as read
export const NotifyMarkasRead = async (req,res,next) => {
    try {
        const {notif_id} = req.params
        console.log(notif_id);
        
        const response = await NotifyMarkAsReadService(notif_id);
        if (response.status === 200) {
            return res.status(200).json({
                status: "success",
                message: response.message,
                data: response.data
            });
        } else {
            return res.status(response.status).json({
                status: "error",
                message: response.message,
                error: response.error
            });
        }
    } catch (error) {
        return next(new system_error(error.message,StatusCodes.INTERNAL_SERVER_ERROR))
    }
}