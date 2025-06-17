import { user_error } from "../responses/ErrorResponse.mjs"

export const GlobalMiddleware  = async(err,req,res,next)=>{
    if (err instanceof user_error) {
        return res.status(err.statusCode).json({
            succuss:false,
            message:err.message
        })
    }
    console.log(err.message);
    return res.status(err.statusCode).json({
        succuss:false,
        message:"Server failure!!"
    })
}