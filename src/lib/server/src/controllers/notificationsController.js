const notificationService = require("../services/notificationServices")
const responseHandler = require("../utils/responseHandler")

exports.createNotifications = async ( req, res ) => {
    try {
        const notification = await notificationService.createNotification(req.body)  
        return responseHandler.success(res, "notification Successfully Created", notification, 201)  
    } 
    catch (error) {
        return responseHandler.error(res, error.message)
    }
}


exports.getAllNotifications = async ( req, res ) => {
    try {
        const notifications = await notificationService.getAllNotifications();
        if(!notifications) return responseHandler.notFound(res, "notification not Found")
        return responseHandler.success(res, "notification Fetched Successfully", notifications);  
    } 
    catch (error) {
        return responseHandler.error(res, error.message)
    }
}

exports.getNotificationsById = async ( req, res ) => {
    try {
        const notification = await notificationService.getNotificationById(req.params.id);
        if(!notification) return responseHandler.notFound(res, "notification Not found");
        return responseHandler.success(res , "notification fetch Successfully", notification)
    } 
    catch (error) {
        return responseHandler.error(res, error.message)
    }
}

exports.updateNotifications = async ( req, res ) => {
    try {
        const notification = await notificationService.updateNotification(req.params.id, req.body);
        if(!notification) return responseHandler.notFound(req, "notification not found");
        return responseHandler.success(res, "notification successfully", notification)
    }
     catch (error) {
        return responseHandler.error(res, error.message)
    }
}

exports.deleteNotifications = async ( req, res ) => {
    try {
        const deleted = await notificationService.deleteNotification(req.params.id);
        if(!deleted) return responseHandler.notFound(res, "notification Not Found");
                    return responseHandler.success(res, "notification Deleted Successfully"); 
    } 
    catch (error) {
        return responseHandler.error(res, error.message)
    }
} 