const apiIntegrationService = require("../services/apiIntegrationService")
const responseHandler = require("../utils/responseHandler")

exports.createApiInetgration = async ( req, res ) => {
    try {
        const api = await apiIntegrationService.createApiInetgration(req.body)  
        return responseHandler.success(res, "Api Route Successfully Created", api, 201)  
    } 
    catch (error) {
        return responseHandler.error(res, error.message)
    }
}


exports.getAllApiInetgration = async ( req, res ) => {
    try {
        const apis = await apiIntegrationService.getAllApiInetgration();
        if(!apis) return responseHandler.notFound(res, "Api not Found")
        return responseHandler.success(res, "Api Fetched Successfully", apis);  
    } 
    catch (error) {
        return responseHandler.error(res, error.message)
    }
}

exports.getApiInetgrationById = async ( req, res ) => {
    try {
        const api = await apiIntegrationService.getApiInetgrationById(req.params.id);
        if(!api) return responseHandler.notFound(res, "api Not found");
        return responseHandler.success(res , "api fetch Successfully", api)
    } 
    catch (error) {
        return responseHandler.error(res, error.message)
    }
}

exports.updateApiInetgration = async ( req, res ) => {
    try {
        const api = await apiIntegrationService.updateApiInetgration(req.params.id, req.body);
        if(!api) return responseHandler.notFound(req, "api not found");
        return responseHandler.success(res, "api updated successfully", api)
    }
     catch (error) {
        return responseHandler.error(res, error.message)
    }
}

exports.deleteApiInetgration = async ( req, res ) => {
    try {
        const deleted = await apiIntegrationService.deleteApiInetgration(req.params.id);
        if(!deleted) return responseHandler.notFound(res, "api Not Found");
                    return responseHandler.success(res, "api Deleted Successfully"); 
    } 
    catch (error) {
        return responseHandler.error(res, error.message)
    }
} 