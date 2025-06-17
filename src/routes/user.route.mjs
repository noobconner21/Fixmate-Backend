import { Router } from "express";
import { user_error } from "../responses/ErrorResponse.mjs";
import { CheckApiKey } from "../auth/ValidateApiKey.mjs";
import { get_user_profile_posts_controller } from "../controllers/user.controller.mjs";


const user_router = Router()


//Fetch profile info and all posts content
user_router.get("/:id",CheckApiKey,get_user_profile_posts_controller)

export default user_router;