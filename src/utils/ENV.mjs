import dotenv from "dotenv"

dotenv.config()


const ENV = {
    DATABASE_URL:process.env.DATABASE_URL,
    DATABASE_KEY:process.env.DATABASE_KEY,
    PORT:process.env.PORT,
    CLOUD_NAME:process.env.CLOUD_NAME,
    API_KEY:process.env.API_KEY,
    API_SECRET:process.env.API_SECRET
}

export default ENV