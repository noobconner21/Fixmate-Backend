import { Router } from "express";
import { CheckApiKey } from "../auth/ValidateApiKey.mjs";
import { NotifyController, NotifyMarkasRead } from "../controllers/notify..controller..mjs";



const notify_router = Router()


notify_router.get("/:admin_id",CheckApiKey,NotifyController)

//Mar as read 

notify_router.get("/read/:notif_id",CheckApiKey,NotifyMarkasRead)


export default notify_router