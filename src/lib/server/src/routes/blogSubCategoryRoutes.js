const express = require('express')
const router = express.Router()
const blogSubCategoryController = require('../controllers/blogSubCategoryController')
const validate = require('../middlewares/validate.middleware')
// const userValidation = require('../validators/userValidations')

router.route("/blogsubcategory")
.post( validate, blogSubCategoryController.createSubBlogCategory )
.get( blogSubCategoryController.getAllSubBlogCategory )

router.route('/blogsubcategory/:id')
.get( blogSubCategoryController.getSubBlogCategoryById )
.put( validate, blogSubCategoryController.updateSubBlogCategory )
.delete( blogSubCategoryController.deleteSubBlogsCategory )


module.exports = router