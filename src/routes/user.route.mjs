import { Router } from "express";
import { user_error } from "../responses/ErrorResponse.mjs";
import { CheckApiKey } from "../auth/ValidateApiKey.mjs";
import upload from "../middlewares/multerFileUpload.mjs";
import { update_profile } from "../controllers/updateProfile.mjs";
import { get_user_profile_controllere } from "../controllers/user.controller.mjs";


const user_router = Router()


//Fetch profile info and all posts content
user_router.get("/profile/:user_id",CheckApiKey,get_user_profile_controllere)

//Update profile information
user_router.post("/update-profile",CheckApiKey,upload.array('image',1),update_profile)

export default user_router;
