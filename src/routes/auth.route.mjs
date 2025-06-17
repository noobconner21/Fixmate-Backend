import { Router } from "express";
import { CheckApiKey } from "../auth/ValidateApiKey.mjs";
import { user_register_controller } from "../controllers/user.controller.mjs";

const auth_router = Router()


auth_router.post("/register",CheckApiKey,user_register_controller)

export default auth_router