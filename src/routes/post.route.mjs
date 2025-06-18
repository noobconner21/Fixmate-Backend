import { Router } from "express";
import { CheckApiKey } from "../auth/ValidateApiKey.mjs";
import multer from "multer";
import upload from "../middlewares/multerFileUpload.mjs";
import { create_post, delete_post_controller, get_all_posts_controller, get_posts_via_admin_id } from "../controllers/postController.mjs";
import { get_all_posts } from "../services/post.service.mjs";


const post_router = Router()




//Get all the posts
post_router.get("/",CheckApiKey,get_all_posts_controller)
//Create post
post_router.post("/create",CheckApiKey,upload.array("images",3),create_post)
//Get posts to related to admin id
post_router.get("/get-posts/:id",CheckApiKey,get_posts_via_admin_id)
//delete cirtain post
post_router.delete("/delete-post/:post_id",CheckApiKey,delete_post_controller)

//update certain post

export default post_router