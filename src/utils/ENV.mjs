import dotenv from "dotenv"

dotenv.config()


const ENV = {
    DATABASE_URL:process.env.DATABASE_URL,
    DATABASE_KEY:process.env.DATABASE_KEY,
    PORT:process.env.PORT
}

export default ENV