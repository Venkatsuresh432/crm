const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/blogCategoryController')
const validate = require('../middlewares/validate.middleware')
const categoryValidation = require('../validators/blogCategoryValidations')

router.route("/blogcategory")
.post( validate(categoryValidation.craeteBlogCategorySchema), categoryController.createBlogCategory )
.get( categoryController.getAllBlogCategory )

router.route('/blogcategory/:id')
.get( categoryController.getBlogCategoryById )
.put( validate(categoryValidation.updateblogCategorySchema), categoryController.updateBlogCategory )
.delete( categoryController.deleteBlogsCategory )


module.exports = router