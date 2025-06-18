
import superbase from "../database/connect.mjs"

//Get all comments to specific post via id
export const get_all_comment_service = async(post_id) => {
    try {
        //check that post really exists
    } catch (error) {
        throw error
    }
}



//Add comemnt to post
//required post id
//require comment content and commentor id
export const create_comment_service = async (post_id,commentor_id,comment_content)=>{
    try {
        //Check post_id is valid post
        const {data:Post,error:PostError} = await superbase.from("posts").select("post_id").eq("post_id",post_id).single()
        console.log(Post);
        if (!Post) {
            return {"status":false,"msg":"Invalid post id"}
        }
        //check commentor id is valid user id
        const {data:User,error:UserError} = await superbase.from("users").select("user_id").eq("user_id",commentor_id).single()
        console.log(User);
        if (!User) {
            return {"status":false,"msg":"Invalid user id"}
        }
        //create comment
        //return response
    } catch (error) {
        throw error
    }
}