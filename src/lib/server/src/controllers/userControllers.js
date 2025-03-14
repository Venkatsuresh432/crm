const userService = require('../services/userServices')
const responseHandler = require('../utils/responseHandler')


// Create An User 
exports.createUser = async ( req, res ) => {
    try {
        const user = await userService.createUser(req.body);
        return responseHandler.success(res, "User Created Successfully", user, 201);
    } 
    catch (error) {
       return responseHandler.error(res, error.message); 
    }
} 


// Get All Users
exports.getAllUsers = async ( req, res ) => {
    try {
        const users = await userService.getAllUsers();
        return responseHandler.success(res, "Users Fetched Successfully", users); 
    } 
    catch (error) {
        return responseHandler.error(res, error.message);
    }
} 


// Get User By Id
exports.getUserById = async ( req, res ) => {
    try {
        const { id } = req.params;
        if( !id ){
            return responseHandler.notFound(res, "User Not Found");
        }
        const user = await userService.getUserById(id);
        if(!user) return responseHandler.notFound(res, "User Not Found");
        return responseHandler.success(res, "User Fetch Successfully", user);
    } 
    catch (error) {
        return responseHandler.error(res, error.message)
    }
}

// update user using Id
exports.updateUserById = async ( req, res ) => {
    try { 
            const updateUser = userService.updateUser(req.params.id, req.body);
            if(!updateUser) return responseHandler.notFound(res, "User Not Found");
            return responseHandler.success(res, "User Updated Successfully", updateUser);
    } 
    catch (error) {
            return responseHandler.error(res, error.message)   
    }
}

// delete User By Id 
exports.deleteUserById = async ( req, res ) => {
    try {
        const  { id } = req.params;
        if(!id){
            return responseHandler.notFound(res, "Data Not Found")
        }
            const deleted = await userService.deleteUser(id);
            if(!deleted) return responseHandler.notFound(res, "User Not Found");
            return responseHandler.success(res, "User Deleted Successfully"); 
    } 
    catch (error) {
        return responseHandler.error(res, error.message)
    }
}