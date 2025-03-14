const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/blogCategoryController')
const validate = require('../middlewares/validate.middleware')
// const userValidation = require('../validators/userValidations')

router.route("/blogcategory")
.post( validate, categoryController.createBlogCategory )
.get( categoryController.getAllBlogCategory )

router.route('/blogcategory/:id')
.get( categoryController.getBlogCategoryById )
.put( validate, categoryController.updateBlogCategory )
.delete( categoryController.deleteBlogsCategory )


module.exports = router