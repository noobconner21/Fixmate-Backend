
import { StatusCodes } from "http-status-codes"
import superbase from "../database/connect.mjs"
import { system_error } from "../responses/ErrorResponse.mjs"

//Get all comments to specific post via id
export const get_all_comment_service = async(post_id) => {
    try {
        //Check post_id is valid post
        const {data:Post,error:PostError} = await superbase.from("posts").select("post_id").eq("post_id",post_id).single()
        
        if (!Post) {
            return {"status":false,"msg":"Invalid post id"}
        }
        //retrive comments from db
        const {data:Comments,error:CommentsError} = await superbase.from("comments").select("commentor_name, commentor_profile_pic, comment_id, comment").eq("post_id",post_id)
        if (!Comments || CommentsError) {
            return {"status":false,"msg":CommentsError.details}
        }
        // return response
        return {"status":true,"msg":"Fetched succuss","data":Comments}

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
        const {data:Post,error:PostError} = await superbase.from("posts").select("post_id, post_comment_count").eq("post_id",post_id).single()
        if (!Post) {
            return {"status":false,"msg":"Invalid post id"}
        }
        //check commentor id is valid user id
        const {data:User,error:UserError} = await superbase.from("users").select("profile_pic","user_name").eq("user_id",commentor_id).select().single()
        
        
        if (!User) {
            return {"status":false,"msg":"Invalid user id"}
        }
      
        //create comment
        const {data:comment,error:commentError} = await superbase.from("comments").insert({
            post_id,
            commentor_id,
            "comment":comment_content,
            "commentor_name":User.user_name,
            "commentor_profile_pic":User.profile_pic
        }).select().single()
        //return respons
        if (!comment || commentError) {
            throw new system_error("Something went wrong when creating comment",StatusCodes.INTERNAL_SERVER_ERROR)
        }

        const {data:UpdatedPost,error:PostUpdateError} = await superbase.from("posts").update({"post_comment_count":Post.post_comment_count+1}).eq("post_id",post_id).select().single()
        if (!UpdatedPost || PostUpdateError) {
            throw new system_error("Something went wrong when updating comment count",StatusCodes.INTERNAL_SERVER_ERROR)
        }
        
        
        return {"status":true,"msg":"Comment added!"}
        
    } catch (error) {        
        throw error
    }
}