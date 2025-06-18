// define all the comment based routes here

import { Router } from "express";
import { create_comment_controller, get_comment_controller } from "../controllers/commentController.mjs";
import { CheckApiKey } from "../auth/ValidateApiKey.mjs";

const comment_router = Router()

//Get comments to specific post
//required post id
comment_router.get("/:post_id",CheckApiKey,get_comment_controller)

//Add comemnt to post
//required post id
//require comment content and commentor id
comment_router.post("/:post_id",CheckApiKey,create_comment_controller)


export default comment_router