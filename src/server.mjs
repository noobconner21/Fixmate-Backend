import express from "express"
import ENV from "./utils/ENV.mjs"
import cors from "cors"
import auth_router from "./routes/auth.route.mjs"
import { GlobalMiddleware } from "./middlewares/GlobalMiddleware.mjs"



const app = express()
app.use(cors())
app.use(express.json())





//Routes
app.use("/api/v1/auth",auth_router)


app.use(GlobalMiddleware)

app.listen(ENV.PORT,()=>{
    console.log(`Server is running🔥 on http://localhost:${ENV.PORT}`);
})