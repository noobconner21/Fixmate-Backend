import { StatusCodes } from "http-status-codes";
import superbase from "../database/connect.mjs";
import { system_error, user_error } from "../responses/ErrorResponse.mjs";

export const CheckApiKey = async (req,res,next)=>{
    try {
        const key = req.headers["x-api-key"] 
        const {data,error} = await superbase.from("api_keys").select("x-api-key").eq("x-api-key",key).single();
        if (!data) {
        return next(new user_error("Invalid api key!!",StatusCodes.BAD_REQUEST))
       }
       if (error) {
        return next(new system_error(error.message,StatusCodes.BAD_REQUEST))
       }
       return next()
    } catch (error) {
        return next(new system_error(error.message,StatusCodes.INTERNAL_SERVER_ERROR))
    }
}