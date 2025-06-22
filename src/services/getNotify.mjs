import superbase from "../database/connect.mjs"

export const getNotifyServic = async (admin_id) => {
    try {

        const {data:Notifications, error:NotificationsError} = await superbase
            .from("notification")
            .select(
                `
                notification_id,
                related_post_id,
                from_who,
                created_at,
                posts: related_post_id (post_title),
                users: from_who (user_name, profile_pic)
            `
            )
            .eq("post_author_id", admin_id).eq("isRead", false)
            .order("created_at", { ascending: false });

        if (!Notifications || NotificationsError) {
            return {
                status: 404,
                message: "No notifications found or error fetching notifications",
                error: NotificationsError
            }
            
        }
        const FormatedNotify = Notifications.map((notification) => {
            return {
                notification_id: notification.notification_id,
                content:`${notification.users.user_name} commented on your post: ${notification.posts.post_title}`,
                commentor_profile_pic: notification.users.profile_pic
            }
        })
        return {
            status: 200,
            message: "Notifications fetched successfully",
            data: FormatedNotify
        }
        console.log(FormatedNotify);
        
        
    } catch (error) {
        throw error
    }
}

export const NotifyMarkAsReadService = async (notif_id) => {
    try {
        const {data:Notify,error:NotifyError} =await superbase.from("notification").update({"isRead":true}).eq("notification_id",notif_id).select().single()
        if (!Notify || NotifyError) {
            return {
                status: 404,
                message: "Notification not found or error marking as read",
                error: NotifyError
            }
        }
        return {
            status: 200,
            message: "Notification marked as read successfully",
            data: Notify
        }
        
    } catch (error) {
        return error
    }
}