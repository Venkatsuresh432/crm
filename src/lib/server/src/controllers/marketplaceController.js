const marketplaceService = require("../services/marketplaceServices")
const responseHandler = require("../utils/responseHandler")

exports.createMarketplace = async ( req, res ) => {
    try {
        const marketplace = await marketplaceService.createMarketPlace(req.body)  
        return responseHandler.success(res, "Blog Category Successfully Created", marketplace, 201)  
    } 
    catch (error) {
        return responseHandler.error(res, error.message)
    }
}


exports.getAllcreateMarketplace = async ( req, res ) => {
    try {
        const marketplaces = await marketplaceService.getAllMarketPlace();
        if(!marketplaces) return responseHandler.notFound(res, "marketplace not Found")
        return responseHandler.success(res, "marketplaces Fetched Successfully", marketplaces);  
    } 
    catch (error) {
        return responseHandler.error(res, error.message)
    }
}

exports.getMarketplaceById = async ( req, res ) => {
    try {
        const marketplace = await marketplaceService.getMarketPlaceById(req.params.id);
        if(!marketplace) return responseHandler.notFound(res, "marketplace Not found");
        return responseHandler.success(res , "marketplace fetch Successfully", marketplace)
    } 
    catch (error) {
        return responseHandler.error(res, error.message)
    }
}

exports.updateMarketplace = async ( req, res ) => {
    try {
        const marketplace = await marketplaceService.updateMarketPlace(req.params.id, req.body);
        if(!marketplace) return responseHandler.notFound(req, "marketplace not found");
        return responseHandler.success(res, "marketplace updated successfully", marketplace)
    }
     catch (error) {
        return responseHandler.error(res, error.message)
    }
}

exports.deleteMarketplace = async ( req, res ) => {
    try {
        const deleted = await marketplaceService.deleteMarketPlace(req.params.id);
        if(!deleted) return responseHandler.notFound(res, "marketplace Not Found");
                    return responseHandler.success(res, "marketplace Deleted Successfully"); 
    } 
    catch (error) {
        return responseHandler.error(res, error.message)
    }
} 