import { Router } from "express";
import { CheckApiKey } from "../auth/ValidateApiKey.mjs";
import multer from "multer";
import upload from "../middlewares/multerFileUpload.mjs";
import { create_post, get_posts_via_admin_id } from "../controllers/postController.mjs";


const post_router = Router()


//Create post
post_router.post("/create",CheckApiKey,upload.array("images",3),create_post)
//Get posts to related to admin id
post_router.get("/get-posts/:id",CheckApiKey,get_posts_via_admin_id)


//delete cirtain post

//update certain post

export default post_router