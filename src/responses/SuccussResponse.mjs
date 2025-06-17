export const SendResponse = async (message,statucCode,data={},res)=>{

    return res.status(statucCode).json({
        message,
        success:true,
        data
    })
    
}

