const apiIntegrationService = require("../services/apiIntegrationService")
const responseHandler = require("../utils/responseHandler")

exports.createApiIntegration = async ( req, res ) => {
    try {
        const api = await apiIntegrationService.createApiIntegration(req.body)  
        return responseHandler.success(res, "Api Route Successfully Created", api, 201)  
    } 
    catch (error) {
        return responseHandler.error(res, error.message)
    }
}


exports.getAllApiIntegration = async ( req, res ) => {
    try {
        const apis = await apiIntegrationService.getAllApiIntegration();
        if(!apis) return responseHandler.notFound(res, "Api not Found")
        return responseHandler.success(res, "Api Fetched Successfully", apis);  
    } 
    catch (error) {
        return responseHandler.error(res, error.message)
    }
}

exports.getApiIntegrationById = async ( req, res ) => {
    try {
        const api = await apiIntegrationService.getApiIntegrationById(req.params.id);
        if(!api) return responseHandler.notFound(res, "api Not found");
        return responseHandler.success(res , "api fetch Successfully", api)
    } 
    catch (error) {
        return responseHandler.error(res, error.message)
    }
}

exports.updateApiIntegration = async ( req, res ) => {
    try {
        const api = await apiIntegrationService.updateApiIntegration(req.params.id, req.body);
        if(!api) return responseHandler.notFound(req, "api not found");
        return responseHandler.success(res, "api updated successfully", api)
    }
     catch (error) {
        return responseHandler.error(res, error.message)
    }
}

exports.deleteApiIntegration = async ( req, res ) => {
    try {
        const deleted = await apiIntegrationService.deleteApiIntegration(req.params.id);
        if(!deleted) return responseHandler.notFound(res, "api Not Found");
                    return responseHandler.success(res, "api Deleted Successfully"); 
    } 
    catch (error) {
        return responseHandler.error(res, error.message)
    }
} 