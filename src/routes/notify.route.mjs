import { Router } from "express";
import { CheckApiKey } from "../auth/ValidateApiKey.mjs";
import { NotifyController } from "../controllers/notify..controller..mjs";



const notify_router = Router()


notify_router.get("/:admin_id",CheckApiKey,NotifyController)


export default notify_router