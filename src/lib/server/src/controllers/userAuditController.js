const userAuditService = require("../services/userAuditServices")
const responseHandler = require("../utils/responseHandler")

exports.createUserAudit = async ( req, res ) => {
    try {
        const blog = await userAuditService.createUserAudit(req.body)  
        return responseHandler.success(res, "Blog Category Successfully Created", blog, 201)  
    } 
    catch (error) {
        return responseHandler.error(res, error.message)
    }
}

exports.getAllUserAudit = async ( req, res ) => {
    try {
        const blogs = await userAuditService.getAllUsersAudit();
        if(!blogs) return responseHandler.notFound(res, "Blogs not Found")
        return responseHandler.success(res, "Blog Categories Fetched Successfully", blogs);  
    } 
    catch (error) {
        return responseHandler.error(res, error.message)
    }
}

exports.getUserAuditById = async ( req, res ) => {
    try {
        const blog = await userAuditService.getUserAuditById(req.params.id);
        if(!blog) return responseHandler.notFound(res, "Blog Not found");
        return responseHandler.success(res , "Blog category fetch Successfully")
    } 
    catch (error) {
        return responseHandler.error(res, error.message)
    }
}

exports.updateUserAudit = async ( req, res ) => {
    try {
        const blog = await userAuditService.deleteUserAudit(req.params.id, req.body);
        if(!blog) return responseHandler.notFound(req, "data not found");
        return responseHandler.success(res, "blog updated successfully", blog)
    }
     catch (error) {
        return responseHandler.error(res, error.message)
    }
}

exports.deleteUserAudit= async ( req, res ) => {
    try {
        const deleted = await userAuditService.deleteBlogCategory(req.params.id);
        if(!deleted) return responseHandler.notFound(res, "blog Not Found");
                    return responseHandler.success(res, "blog Deleted Successfully"); 
    } 
    catch (error) {
        return responseHandler.error(res, error.message)
    }
} 