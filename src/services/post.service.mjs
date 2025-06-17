//fetch all the posts

import superbase from "../database/connect.mjs";
import { system_error } from "../responses/ErrorResponse.mjs";

export const get_all_posts = async (next) => {
    try {
        const {data:Posts , error:DataFetchError} = await superbase.from("posts").select("*");
        if (DataFetchError) {
            console.log(DataFetchError);
        }
        return Posts        
    } catch (error) {
        console.log(error);
    }
}