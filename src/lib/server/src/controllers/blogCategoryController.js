const categoryService = require("../services/blogCategoryService")
const responseHandler = require("../utils/responseHandler")

exports.createBlogCategory = async ( req, res ) => {
    try {
        const blog = await categoryService.createBlogCategory(req.body)  
        return responseHandler.success(res, "Blog Category Successfully Created", blog, 201)  
    } 
    catch (error) {
        return responseHandler.error(res, error.message)
    }
}


exports.getAllBlogCategory = async ( req, res ) => {
    try {
        const blogs = await categoryService.allBlogCategories();
        if(!blogs) return responseHandler.notFound(res, "Blogs not Found")
        return responseHandler.success(res, "Blog Categories Fetched Successfully", blogs);  
    } 
    catch (error) {
        return responseHandler.error(res, error.message)
    }
}

exports.getBlogCategoryById = async ( req, res ) => {
    try {
        const blog = await categoryService.getBlogCategoryById(req.params.id);
        if(!blog) return responseHandler.notFound(res, "Blog Not found");
        return responseHandler.success(res , "Blog category fetch Successfully", blog)
    } 
    catch (error) {
        return responseHandler.error(res, error.message)
    }
}

exports.updateBlogCategory = async ( req, res ) => {
    try {
        const blog = await categoryService.updateBlogCategory(req.params.id, req.body);
        if(!blog) return responseHandler.notFound(req, "data not found");
        return responseHandler.success(res, "blog updated successfully", blog)
    }
     catch (error) {
        return responseHandler.error(res, error.message)
    }
}

exports.deleteBlogsCategory = async ( req, res ) => {
    try {
        const deleted = await categoryService.deleteBlogCategory(req.params.id);
        if(!deleted) return responseHandler.notFound(res, "blog Not Found");
                    return responseHandler.success(res, "blog Deleted Successfully"); 
    } 
    catch (error) {
        return responseHandler.error(res, error.message)
    }
} 