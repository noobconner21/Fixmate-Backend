import { Router } from "express";
import { CheckApiKey } from "../auth/ValidateApiKey.mjs";
import multer from "multer";
import upload from "../middlewares/multerFileUpload.mjs";
import { create_post } from "../controllers/postController.mjs";


const post_router = Router()


//Create post
post_router.post("/create",CheckApiKey,upload.array("images",3),create_post)
//Get posts to related to that id

//delete cirtain post

//update certain post

export default post_router