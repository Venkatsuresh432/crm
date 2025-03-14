const pageBlogService = require("../services/pageBlogServices")
const responseHandler = require("../utils/responseHandler")

exports.createPageBlogCategory = async ( req, res ) => {
    try {
        const pageBlog = await pageBlogService.createPageBlog(req.body)  
        return responseHandler.success(res, "pageBlog Successfully Created", pageBlog, 201)  
    } 
    catch (error) {
        return responseHandler.error(res, error.message)
    }
}


exports.getAllPageBlogCategory = async ( req, res ) => {
    try {
        const pageBlogs = await pageBlogService.getAllPageBlog();
        if(!pageBlogs) return responseHandler.notFound(res, "pageBlog not Found")
        return responseHandler.success(res, "pageBlog Categories Fetched Successfully", pageBlogs);  
    } 
    catch (error) {
        return responseHandler.error(res, error.message)
    }
}

exports.getPageBlogCategoryById2 = async ( req, res ) => {
    try {
        const pageBlog = await pageBlogService.getPageBlogById(req.params.id);
        if(!pageBlog) return responseHandler.notFound(res, "pageBlog Not found");
        return responseHandler.success(res , "pageBlog category fetch Successfully", pageBlog)
    } 
    catch (error) {
        return responseHandler.error(res, error.message)
    }
}

exports.getPageBlogCategoryById = async (req, res) => {
    try {
        const pageBlog = await pageBlogService.getPageBlogById(req.params.id);
        if (!pageBlog) return responseHandler.notFound(res, "Page blog not found");
        return responseHandler.success(res, "Page blog fetched successfully", pageBlog);
    } catch (error) {
        return responseHandler.error(res, error.message);
    }
};


exports.updatePageBlogCategory = async ( req, res ) => {
    try {
        const pageBlog = await pageBlogService.updatePageBlog(req.params.id, req.body);
        if(!pageBlog) return responseHandler.notFound(req, "pageBlog not found");
        return responseHandler.success(res, "pageBlog updated successfully", pageBlog)
    }
     catch (error) {
        return responseHandler.error(res, error.message)
    }
}

exports.deletePageBlogsCategory = async ( req, res ) => {
    try {
        const deleted = await pageBlogService.deletePageBlog(req.params.id);
        if(!deleted) return responseHandler.notFound(res, "pageBlog Not Found");
                    return responseHandler.success(res, "pageBlog Deleted Successfully"); 
    } 
    catch (error) {
        return responseHandler.error(res, error.message)
    }
} 