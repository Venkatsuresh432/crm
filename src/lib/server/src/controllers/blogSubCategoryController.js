const subCategoryService = require("../services/blogSubCategoryServices")
const responseHandler = require("../utils/responseHandler")

exports.createSubBlogCategory = async ( req, res ) => {
    try {
        const subBlog = await subCategoryService.createBlogSubCategory(req.body)  
        return responseHandler.success(res, "subBlog Successfully Created", subBlog, 201)  
    } 
    catch (error) {
        return responseHandler.error(res, error.message)
    }
}

exports.getAllSubBlogCategory = async ( req, res ) => {
    try {
        const subBlog = await subCategoryService.getAllBlogSubCategory();
        if(!subBlog) return responseHandler.notFound(res, "subBlog not Found")
        return responseHandler.success(res, "subBlog Fetched Successfully", subBlog);  
    } 
    catch (error) {
        return responseHandler.error(res, error.message)
    }
}

exports.getSubBlogCategoryById = async ( req, res ) => {
    try {
        const subBlog = await subCategoryService.getBlogSubCategoryById(req.params.id);
        if(!subBlog) return responseHandler.notFound(res, "Blog Not found");
        return responseHandler.success(res , "subBlog fetch Successfully", subBlog)
    } 
    catch (error) {
        return responseHandler.error(res, error.message)
    }
}

exports.updateSubBlogCategory = async ( req, res ) => {
    try {
        const subBlog = await subCategoryService.updateBlogSubCategory(req.params.id, req.body);
        if(!subBlog) return responseHandler.notFound(res, "subBlog not found");
        return responseHandler.success(res, "subBlog updated successfully", subBlog)
    }
     catch (error) {
        return responseHandler.error(res, error.message)
    }
}

exports.deleteSubBlogsCategory = async ( req, res ) => {
    try {
        const deleted = await subCategoryService.deleteBlogSubCategory(req.params.id);
        if(!deleted) return responseHandler.notFound(res, "subBlog Not Found");
                    return responseHandler.success(res, "subBlog Deleted Successfully"); 
    } 
    catch (error) {
        return responseHandler.error(res, error.message)
    }
}