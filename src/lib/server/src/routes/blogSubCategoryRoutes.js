const express = require('express')
const router = express.Router()
const blogSubCategoryController = require('../controllers/blogSubCategoryController')
const validate = require('../middlewares/validate.middleware')
const subCategoryValidation = require('../validators/blogSubCategoryValidation')
const admin = require('../middlewares/authMiddleware')

router.use(admin)
router.route("/blogsubcategory")
.post( validate(subCategoryValidation.createBlogSubCategorySchema), blogSubCategoryController.createSubBlogCategory )
.get( blogSubCategoryController.getAllSubBlogCategory )

router.route('/blogsubcategory/:id')
.get( blogSubCategoryController.getSubBlogCategoryById )
.put( validate(subCategoryValidation.updateblogSubCategorySchema), blogSubCategoryController.updateSubBlogCategory )
.delete( blogSubCategoryController.deleteSubBlogsCategory )


module.exports = router